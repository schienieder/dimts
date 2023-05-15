import React, { useEffect, useState } from "react";
import MyInputFieldFull from "../../../components/MyInputFieldFull";
import MyCreatableSelect from "../../../components/MyCreatableSelectFull";
import MyMultiSelectField from "../../../components/MyMultiSelectFieldFull";
// import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useForm, useWatch } from "react-hook-form";
import { fieldRules } from "../../../components/authHelper";
import { criminalCrimeTypes, civilCrimeTypes } from "../../../crimeTypesHelper";
import { QRCodeCanvas } from "qrcode.react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hooks";
import { useRouter } from "next/router";
import { createNewDocket } from "../../../redux/dataSlice";
import { PulseLoader } from "react-spinners";
import crimeQuestions from "../../../crime_questions.json";

const caseCrimeSentences: any = crimeQuestions;

const AddCaseView = () => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const [qrValue, setQrValue] = useState<any>();
	const [qrTracker, setQrTracker] = useState<any>();
	const [showLoading, setShowLoading] = useState(false);

	const router = useRouter();
	const { type } = router.query;

	const caseType = useWatch({
		control,
		name: "caseType",
		defaultValue: type,
	});

	const caseNo = useWatch({
		control,
		name: "caseNo",
		defaultValue: "",
	});

	const caseDocTitle = useWatch({
		control,
		name: "caseDocTitle",
		defaultValue: "",
	});

	const caseTitle = useWatch({
		control,
		name: "caseTitle",
		defaultValue: "",
	});

	const caseCrimeType = useWatch({
		control,
		name: "caseCrimeType",
		defaultValue: "",
	});

	const caseReceived = useWatch({
		control,
		name: "caseReceived",
		defaultValue: "",
	});

	const caseRaffled = useWatch({
		control,
		name: "caseRaffled",
		defaultValue: "RTC-4",
	});

	const caseJudge = useWatch({
		control,
		name: "caseJudge",
		defaultValue: "",
	});

	const onSubmit = (formData: any) => {
		let qrImage: any = document.getElementById("qr-gen");
		let qrBase64 = qrImage.toDataURL("image/jpeg");
		setShowLoading(true);
		const crimes = formData.caseCrimeType.map((crime: any) => {
			return crime.value;
		});
		const data = {
			type_of_case: caseType,
			case_no: formData.caseNo,
			document_title: formData.caseDocTitle,
			case_title: formData.caseTitle,
			crime_type: JSON.stringify(crimes),
			received_date: formData.caseReceived,
			raffled_court: formData.caseRaffled,
			judge_assigned: formData.caseJudge.value,
			qr_code: qrBase64,
			qr_code_tracker: qrTracker,
		};
		setTimeout(() => {
			dispatch(createNewDocket(data)).then(() => {
				setShowLoading(false);
				router.back();
			});
		}, 1000);
	};

	useEffect(() => {
		let tracker = nanoid();
		const crimes =
			caseCrimeType !== ""
				? caseCrimeType.map((crime: any) => {
						return crime.value;
				  })
				: [];
		const qrData = `
			Case Type: ${caseType}\n\n
			Case No: ${caseNo}\n\n
			Tracking: ${tracker}\n\n
			Document Title: ${caseDocTitle}\n\n
			Case Title: ${caseTitle}\n\n
			Crime Type: ${crimes.toString()}\n\n
			Received Date: ${caseReceived}\n\n
			Raffled Court: ${caseRaffled}\n\n
			Judge Assigned: ${caseJudge.value}
		`;
		setQrTracker(tracker);
		setQrValue(qrData);
	}, [
		caseType,
		caseNo,
		caseDocTitle,
		caseTitle,
		caseCrimeType,
		caseReceived,
		caseRaffled,
		caseJudge,
	]);

	return (
		<div className="flex flex-col items-center gap-y-5 font-mont text-gray-700">
			{/* <div className="w-full flex justify-start">
				<AdminBreadCrumbs activeText="Add Criminal Case" />
			</div> */}
			<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg w-[700px]">
				<div className="flex justify-between">
					<div className="w-full flex flex-col">
						<h4 className="text-xl font-black tracking-wider">
							{type ?? ""} Case
						</h4>
						<p className="text-sm text-gray-500">
							Create new <span className="lowercase">{type ?? ""}</span> record
						</p>
					</div>
					{/*  */}
					<div
						className="flex text-purple-600 gap-x-1 hover:cursor-pointer"
						onClick={() => router.back()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
							/>
						</svg>
						<p className="text-sm">Back</p>
					</div>
				</div>
				<div className="w-full border-b border-gray-200 mt-3 mb-5"></div>
				<div className="flex flex-col gap-y-5">
					<div className="grid grid-cols-2 gap-x-5 gap-y-8">
						<MyInputFieldFull
							control={control}
							fieldLabel="Case No."
							fieldType="text"
							fieldName="caseNo"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							placeHolder=""
							setFieldValue={setValue}
						/>
						{/*  */}
						<MyMultiSelectField
							myControl={control}
							myOptions={
								type != undefined && String(type).toLowerCase() === "criminal"
									? criminalCrimeTypes
									: civilCrimeTypes
							}
							fieldName="caseCrimeType"
							fieldLabel="Crime Type"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							setFieldValue={setValue}
						/>
						{/*  */}
						<MyInputFieldFull
							control={control}
							fieldLabel="Document Title"
							fieldType="text"
							fieldName="caseDocTitle"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							placeHolder=""
							setFieldValue={setValue}
						/>
						{/*  */}
						<MyInputFieldFull
							control={control}
							fieldLabel="Case Title"
							fieldType="text"
							fieldName="caseTitle"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							placeHolder=""
							setFieldValue={setValue}
						/>
						{/*  */}
						<MyInputFieldFull
							control={control}
							fieldLabel="Received Date"
							fieldType="date"
							fieldName="caseReceived"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							placeHolder=""
							setFieldValue={setValue}
						/>
						{/*  */}
						<div className="hidden">
							<MyInputFieldFull
								control={control}
								fieldLabel="Raffled Court"
								fieldType="hidden"
								fieldName="caseRaffled"
								fieldRules={fieldRules.requiredRule}
								defaultValue="RTC-4"
								placeHolder=""
								setFieldValue={setValue}
							/>
						</div>
						{/*  */}
						<MyCreatableSelect
							myControl={control}
							myOptions={[
								{
									label: "Hon. Carmel Gil Grado",
									value: "Hon. Carmel Gil Grado",
								},
								{ label: "Hon. Gemma Betonio", value: "Hon. Gemma Betonio" },
								{
									label: "Hon. Dorothy Montejo-Gonzaga",
									value: "Hon. Dorothy Montejo-Gonzaga",
								},
							]}
							fieldName="caseJudge"
							fieldLabel="Judge Assigned"
							fieldRules={fieldRules.requiredRule}
							defaultValue=""
							setFieldValue={setValue}
						/>
						{/*  */}
						{caseCrimeType.length && type === "Criminal" ? (
							<div className="col-span-2 w-full overflow-y-auto flex flex-col gap-y-5">
								{caseCrimeType.map((crimeType: any) => {
									const crimeTypeValue = crimeType.value;
									if (caseCrimeSentences[crimeTypeValue] !== undefined) {
										return (
											<div
												key={crimeType}
												className="flex flex-col gap-y-1"
											>
												<h4 className="text-xl font-bold">{crimeTypeValue}</h4>
												<div className="flex flex-col gap-y-3">
													{caseCrimeSentences[crimeTypeValue].penaltyItems.map(
														(crimeQuestion: any, index: number) => {
															// console.log("Penalty question: ", crimeQuestion);
															return (
																<div
																	key={`${crimeType}+${index}`}
																	className="flex items-center px-4 border border-gray-300 rounded"
																>
																	<input
																		type="checkbox"
																		value={
																			caseCrimeSentences[crimeTypeValue]
																				.penaltySentences[index]
																		}
																		name="bordered-checkbox"
																		className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
																	/>
																	<label className="w-full py-4 ml-2 text-sm font-normal text-gray-700 dark:text-gray-300">
																		{crimeQuestion}
																	</label>
																</div>
															);
														}
													)}
												</div>
											</div>
										);
									}
								})}
							</div>
						) : null}
						{/*  */}
						<div className="col-span-2">
							<div className="flex flex-col gap-y-1">
								<p className="font-semibold text-sm text-gray-700">
									QRCode Preview
								</p>
								<div className="w-full h-auto bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center">
									<QRCodeCanvas
										id="qr-gen"
										value={qrValue}
										size={300}
										level={"H"}
										className="self-center py-5"
									/>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="col-span-2 w-full flex justify-end">
							<button
								type="button"
								className=" w-48 bg-purple-600 hover:bg-purple-500 focus:outline-none px-5 py-2 rounded-lg flex justify-center items-center"
								onClick={handleSubmit(onSubmit)}
								disabled={showLoading}
							>
								{showLoading ? (
									<PulseLoader
										loading={showLoading}
										color="#ffffff"
										speedMultiplier={1}
										size={10}
									/>
								) : (
									<p className="text-white font-medium tracking-wider text-sm">
										Submit
									</p>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCaseView;
