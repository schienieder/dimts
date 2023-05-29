import React, { useState } from "react";
import SubmitModal from "../SubmitModal";
import { useForm } from "react-hook-form";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { fieldRules } from "../authHelper";
import useDebounce from "../../hooks/useDebounce";

interface AddCrimeParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const AddCrime = ({ isShow, onConfirm, onCancel }: AddCrimeParams) => {
	const { control, handleSubmit, setValue } = useForm();

	const [penaltyOptions, setPenaltyOptions] = useState([
		{
			penaltyItemName: "penaltyItem1",
			penaltyItemValue: "",
			penaltySentenceName: "penaltySentence1",
			penaltySentenceValue: 0,
		},
	]);

	const onSubmit = (data: any) => {
		console.log("Add crime data:", data);
		console.log("Penalty options: ", penaltyOptions);
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
				<div className="col-span-2 flex flex-col gap-y-8">
					<h4 className="text-base font-semibold -mb-5">Penalties</h4>
					{/*  */}
					{penaltyOptions.map((penalty: any, index: number) => {
						return (
							<div
								key={`${penalty.penaltyItemName}-${index + 1}`}
								className="flex gap-x-5"
							>
								<input
									className="bg-gray-100 px-3 py-1 flex-1 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
									onChange={(e: any) => {
										const updatedOptions = penaltyOptions.map((option: any) => {
											if (option.penaltyItemName === penalty.penaltyItemName) {
												return {
													...option,
													penaltyItemValue: e.target.value,
												};
											}
											return { ...option };
										});
										setPenaltyOptions(() => updatedOptions);
									}}
									defaultValue={penalty.penaltyItemValue ?? ""}
								/>
								{/*  */}
								<div className="flex gap-x-3">
									<button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 6v12m6-6H6"
											/>
										</svg>
									</button>
									<input
										className="bg-gray-100 text-center px-3 py-1 w-12 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
										onChange={(e: any) => {
											const updatedOptions = penaltyOptions.map(
												(option: any) => {
													if (
														option.penaltySentenceName ===
														penalty.penaltySentenceName
													) {
														return {
															...option,
															penaltySentenceValue: e.target.value,
														};
													}
													return { ...option };
												}
											);
											setPenaltyOptions(() => updatedOptions);
										}}
										defaultValue={penalty.penaltySentenceValue ?? ""}
									/>
									<button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M18 12H6"
											/>
										</svg>
									</button>
								</div>
							</div>
						);
					})}
					{/*  */}
					<button
						type="button"
						className="flex justify-center items-center gap-x-3 text-gray-500 bg-white hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2"
						onClick={() =>
							setPenaltyOptions((previousPenalties) => [
								...previousPenalties,
								{
									penaltyItemName: `penaltyItem${penaltyOptions.length + 1}`,
									penaltyItemValue: "",
									penaltySentenceName: `penaltySentence${
										penaltyOptions.length + 1
									}`,
									penaltySentenceValue: 0,
								},
							])
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
						Add New
					</button>
					<button
						type="button"
						className="-mt-5 flex justify-center items-center gap-x-3 text-gray-500 bg-white hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2"
						onClick={() => {
							const filteredOptions = penaltyOptions.filter(
								(option: any, index: number) => {
									if (index !== penaltyOptions.length - 1) {
										return { ...option };
									}
								}
							);
							setPenaltyOptions(() => filteredOptions);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M18 12H6"
							/>
						</svg>
						Remove
					</button>
				</div>
				<div className=""></div>
			</div>
		</SubmitModal>
	);
};

export default AddCrime;
