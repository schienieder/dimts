import React, { useState } from "react";
import SubmitModal from "../SubmitModal";
import { useForm, useWatch } from "react-hook-form";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { fieldRules } from "../authHelper";
import MyCreatableSelect from "../MyCreatableSelect";
import { useAppDispatch } from "../../redux/hooks";
import { newCrime } from "../../redux/dataSlice";

interface AddCrimeParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const AddCrime = ({ isShow, onConfirm, onCancel }: AddCrimeParams) => {
	const { control, handleSubmit, setValue } = useForm();

	const [notEqualItems, setNotEqualItems] = useState(false);
	const dispatch = useAppDispatch();

	// const [penaltyOptions, setPenaltyOptions] = useState([
	// 	{
	// 		penaltyItemName: "penaltyItem1",
	// 		penaltyItemValue: "",
	// 		penaltySentenceName: "penaltySentence1",
	// 		penaltySentenceValue: 0,
	// 	},
	// ]);

	const caseType = useWatch({
		control,
		name: "caseType",
		defaultValue: "",
	});

	const penaltyItems = useWatch({
		control,
		name: "penaltyItems",
		defaultValue: "",
	});

	const penaltySentences = useWatch({
		control,
		name: "penaltySentences",
		defaultValue: "",
	});

	const onSubmit = (data: any) => {
		console.log("Add crime data:", data);
		if (data.caseType === "Criminal") {
			const notEqual =
				data?.penaltyItems.length !== data?.penaltySentences.length;
			setNotEqualItems(notEqual);
			if (notEqual) {
				return;
			}
		}
		const items = data.penaltyItems.length
			? data.penaltyItems.map((item: any) => {
					return item.value;
			  })
			: [];
		const sentences = data.penaltySentences.length
			? data.penaltySentences.map((sentence: any) => {
					return Number(sentence.value);
			  })
			: [];
		dispatch(
			newCrime({
				crime_type: data.crimeType,
				penalty_items: JSON.stringify(items),
				penalty_sentences: JSON.stringify(sentences),
				case_type: data.caseType,
			})
		).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Crime List"
			addText="Add New Crime"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="Crime"
					fieldType="text"
					fieldName="crimeType"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Criminal Case", value: "Criminal" },
						{ label: "Civil Case", value: "Civil" },
					]}
					fieldName="caseType"
					fieldLabel="Designation"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				{caseType === "Criminal" ? (
					<>
						<div className="flex flex-col">
							<MyCreatableSelect
								myControl={control}
								myOptions={[]}
								isAllowMulti
								fieldName="penaltyItems"
								fieldLabel="Penalty Descriptions"
								fieldRules={fieldRules.requiredRule}
								defaultValue=""
								setFieldValue={setValue}
							/>
						</div>
						<div className="flex flex-col">
							<MyCreatableSelect
								myControl={control}
								myOptions={[]}
								isAllowMulti
								fieldName="penaltySentences"
								fieldLabel="Imprisonment Years"
								fieldRules={fieldRules.requiredRule}
								defaultValue=""
								setFieldValue={setValue}
							/>
						</div>
					</>
				) : null}
				{notEqualItems && penaltyItems.length !== penaltySentences.length ? (
					<div className="col-span-2 w-full flex justify-center -mt-5">
						<p className="text-xs text-rose-500">
							Penalties & Imprisonment should have equal length
						</p>
					</div>
				) : null}
			</div>
		</SubmitModal>
	);
};

export default AddCrime;
