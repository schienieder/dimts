import SubmitModal from "../SubmitModal";
import { useState } from "react";
import MultiSelectFull from "../MultiSelectFull";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { newCaseCitizens } from "../../redux/dataSlice";

interface AddCaseCitizenParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	citizenOptions: any;
	id: number;
}

const AddCaseCitizen = ({
	isShow,
	onConfirm,
	onCancel,
	citizenOptions,
	id,
}: AddCaseCitizenParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const [selectedCitizens, setSelectedCitizens] = useState<any>([]);

	const onSubmit = (formData: any) => {
		let data: any = [];
		const citizens = Object.values(formData.caseCitizen);
		data = citizens.map((citizen: any) => {
			return {
				citizen: citizen.value,
				case: id,
			};
		});
		console.log("Submit data: ", data);
		dispatch(newCaseCitizens(data)).then(() => {
			onConfirm();
			setSelectedCitizens([]);
		});
	};

	const onClickCancel = () => {
		onCancel();
		setSelectedCitizens([]);
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Case Citizens"
			addText="Add citizens for this case"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onClickCancel}
		>
			<div className="w-96 flex flex-col gap-y-8">
				<MultiSelectFull
					myControl={control}
					myOptions={citizenOptions.map((option: any) => {
						return {
							label: option.first_name + " " + option.last_name,
							value: option.id,
						};
					})}
					fieldName="caseCitizen"
					fieldLabel="Citizen"
					fieldRules={fieldRules.requiredRule}
					setFieldValue={setValue}
					onChangeSelected={(selected: any) => setSelectedCitizens(selected)}
				/>
			</div>
			<div className="w-full flex flex-col gap-y-2">
				{selectedCitizens.length > 0 && (
					<h4 className="text-base font-bold">Case Citizens: </h4>
				)}
				{selectedCitizens
					? selectedCitizens.map((citizen: any) => {
							return (
								<div
									key={citizen.value}
									className="w-full bg-purple-100 rounded-lg p-2 flex items-center gap-x-2 text-purple-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
										/>
									</svg>

									<p className="font-medium">{citizen.label}</p>
								</div>
							);
					  })
					: null}
			</div>
		</SubmitModal>
	);
};

export default AddCaseCitizen;
