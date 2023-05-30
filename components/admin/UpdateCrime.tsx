import React, { useState } from "react";
import SubmitModal from "../SubmitModal";
import { useForm, useWatch } from "react-hook-form";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { fieldRules } from "../authHelper";
import MyCreatableSelect from "../MyCreatableSelect";
import { useAppDispatch } from "../../redux/hooks";
import { updateCrime } from "../../redux/dataSlice";

interface UpdateCrimeParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedCrime: any;
}

const UpdateCrime = ({
	isShow,
	onConfirm,
	onCancel,
	selectedCrime,
}: UpdateCrimeParams) => {
	const { control, handleSubmit, setValue } = useForm();

	const [notEqualItems, setNotEqualItems] = useState(false);
	const dispatch = useAppDispatch();

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
		console.log("Update crime data:", data);

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
		const formData = {
			crime_type: data.crimeType,
			penalty_items: JSON.stringify(items),
			penalty_sentences: JSON.stringify(sentences),
			case_type: data.caseType,
		};
		dispatch(
			updateCrime({
				formData,
				crime_id: selectedCrime.crimeId,
			})
		).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Crime List"
			addText="Update Crime Record"
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
					defaultValue={selectedCrime.crimeType}
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
					defaultValue={selectedCrime.caseType}
					setFieldValue={setValue}
				/>
				{caseType === "Criminal" ? (
					<>
						<div className="flex flex-col">
							<MyCreatableSelect
								myControl={control}
								myOptions={
									selectedCrime.penaltyItems.length
										? selectedCrime.penaltyItems.map((item: any) => {
												return {
													label: item,
													value: item,
												};
										  })
										: []
								}
								isAllowMulti
								fieldName="penaltyItems"
								fieldLabel="Penalty Descriptions"
								fieldRules={fieldRules.requiredRule}
								defaultValue={
									selectedCrime.penaltyItems.length
										? selectedCrime.penaltyItems.map((item: any) => {
												return {
													label: item,
													value: item,
												};
										  })
										: []
								}
								setFieldValue={setValue}
							/>
						</div>
						<div className="flex flex-col">
							<MyCreatableSelect
								myControl={control}
								myOptions={
									selectedCrime.penaltySentences.length
										? selectedCrime.penaltySentences.map((item: any) => {
												return {
													label: item,
													value: item,
												};
										  })
										: []
								}
								isAllowMulti
								fieldName="penaltySentences"
								fieldLabel="Imprisonment Years"
								defaultValue={
									selectedCrime.penaltySentences.length
										? selectedCrime.penaltySentences.map((item: any) => {
												return {
													label: item,
													value: item,
												};
										  })
										: []
								}
								fieldRules={fieldRules.requiredRule}
								setFieldValue={setValue}
							/>
						</div>
					</>
				) : null}
				{selectedCrime?.penaltyItems !== undefined &&
				selectedCrime?.penaltyItems.length ? (
					<div className="col-span-2 max-w-screen-sm flex flex-col gap-y-1">
						<h4 className=" text-xl font-semibold">Penalty Description List</h4>
						<ol className="space-y-1 border border-gray-200 rounded divide-y divide-slate-200">
							{selectedCrime.penaltyItems.map((item: any, index: number) => {
								return (
									<li
										key={`${item}-${index}`}
										className="py-2 px-5 text-sm flex gap-x-3"
									>
										{`${index + 1}. `}
										<p>{item}</p>
									</li>
								);
							})}
						</ol>
					</div>
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

export default UpdateCrime;
