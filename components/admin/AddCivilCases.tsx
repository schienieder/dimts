import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyMultiSelectField from "../MyMultiSelectField";
import MyCreatableSelect from "../MyCreatableSelect";
import { useForm, useWatch } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDocket } from "../../redux/dataSlice";
import { QRCodeCanvas } from "qrcode.react";
import MyInputFieldFull from "../MyInputFieldFull";
import { civilCrimeTypes } from "../../crimeTypesHelper";

interface AddCivilCaseParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	onConfirm(): void;
	onCancel(): void;
}

const AddCivilCase = ({
	isShow,
	addTitle,
	addText,
	onConfirm,
	onCancel,
}: AddCivilCaseParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const [qrValue, setQrValue] = useState<any>();
	const [qrTracker, setQrTracker] = useState<any>();
	const [showLoading, setShowLoading] = useState(false);

	const caseType = useWatch({
		control,
		name: "caseType",
		defaultValue: "Civil",
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
			type_of_case: formData.caseType,
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
		// console.log("Data: ", data);
		// onConfirm();
		setTimeout(() => {
			dispatch(createNewDocket(data)).then(() => {
				setShowLoading(false);
				onConfirm();
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
		console.log("QR Data: ", qrData);
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
		<SubmitModal
			isShow={isShow}
			addTitle={addTitle}
			addText={addText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
			loadingState={showLoading}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden col-span-2">
					<MyInputField
						control={control}
						fieldLabel="Type of Case"
						fieldType="text"
						fieldName="caseType"
						fieldRules={fieldRules.requiredRule}
						defaultValue="Civil"
						// readOnly={true}
						setFieldValue={setValue}
					/>
				</div>
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
				<MyMultiSelectField
					myControl={control}
					myOptions={civilCrimeTypes}
					fieldName="caseCrimeType"
					fieldLabel="Civil Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Document Title"
					fieldType="text"
					fieldName="caseDocTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case Title"
					fieldType="text"
					fieldName="caseTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Received Date"
					fieldType="date"
					fieldName="caseReceived"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<div className="hidden">
					<MyInputField
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
				<MyCreatableSelect
					myControl={control}
					myOptions={[
						{ label: "Hon. Carmel Gil Grado", value: "Hon. Carmel Gil Grado" },
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
			</div>
		</SubmitModal>
	);
};

export default AddCivilCase;
