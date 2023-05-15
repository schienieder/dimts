import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import MyTextAreaField from "../MyTextArea";
import MyInputFieldFull from "../MyInputFieldFull";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateDetainee } from "../../redux/dataSlice";

interface UpdateRecordParams {
	isShow: boolean;
	editTitle: string;
	editText: string;
	onConfirm(): void;
	onCancel(): void;
	selectedRecord: any;
}

const UpdateRecord = ({
	isShow,
	editTitle,
	editText,
	onConfirm,
	onCancel,
	selectedRecord,
}: UpdateRecordParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		if (
			Object.entries(selectedRecord).toString() ===
			Object.entries(formData).toString()
		) {
			onCancel();
			return;
		}
		console.log("Selected Record: ", Object.entries(selectedRecord));
		console.log("Form data: ", Object.entries(formData));
		onConfirm();
		const data = {
			name: formData.recordName,
			height: formData.recordHeight,
			weight: formData.recordWeight,
			birthdate: formData.recordBirthdate,
			blood_type: formData.recordBloodType,
			date_arrived: formData.recordDateArrived,
			date_released: formData.recordDateReleased
				? formData.recordDateReleased
				: "",
			assigned_personnel: formData.recordPersonnel,
			address: formData.recordAddress,
			remarks: formData.recordRemarks,
			detained_in: formData.recordDetained,
		};
		dispatch(
			updateDetainee({ formData: data, detainee_id: selectedRecord.recordID })
		).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle={editTitle}
			addText={editText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden">
					<MyInputField
						control={control}
						fieldLabel="Record ID"
						fieldType="hidden"
						fieldName="recordID"
						fieldRules={fieldRules.requiredRule}
						defaultValue={selectedRecord.recordID}
						setFieldValue={setValue}
					/>
				</div>
				<MyInputFieldFull
					control={control}
					fieldLabel="Name"
					fieldType="text"
					fieldName="recordName"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordName}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Height (cm)"
					fieldType="number"
					fieldName="recordHeight"
					fieldRules={fieldRules.requiredNumberRule}
					defaultValue={selectedRecord.recordHeight}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Weight (kg)"
					fieldType="number"
					fieldName="recordWeight"
					fieldRules={fieldRules.requiredNumberRule}
					defaultValue={selectedRecord.recordWeight}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Birthdate"
					fieldType="date"
					fieldName="recordBirthdate"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordBirthdate}
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "A (+)", value: "A (+)" },
						{ label: "A (-)", value: "A (-)" },
						{ label: "B (+)", value: "B (+)" },
						{ label: "B (-)", value: "B (-)" },
						{ label: "O (+)", value: "O (+)" },
						{ label: "O (-)", value: "O (-)" },
						{ label: "AB (+)", value: "AB (+)" },
						{ label: "AB (-)", value: "AB (-)" },
					]}
					fieldName="recordBloodType"
					fieldLabel="Blood Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordBloodType}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Arrived"
					fieldType="date"
					fieldName="recordDateArrived"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordDateArrived}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Released"
					fieldType="date"
					fieldName="recordDateReleased"
					fieldRules=""
					defaultValue={selectedRecord.recordDateReleased}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Assigned Personnel"
					fieldType="text"
					fieldName="recordPersonnel"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordPersonnel}
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "PNP", value: "pnp" },
						{ label: "BJMP", value: "bjmp" },
						{ label: "BuCor", value: "bucor" },
					]}
					fieldName="recordDetained"
					fieldLabel="Forward To"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordDetained}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case"
					fieldType="text"
					fieldName="recordCase"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedRecord.recordCase}
					readOnly={true}
					setFieldValue={setValue}
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Address"
						fieldName="recordAddress"
						fieldRules={fieldRules.requiredRule}
						defaultValue={selectedRecord.recordAddress}
						setFieldValue={setValue}
					/>
				</div>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="recordRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue={selectedRecord.recordRemarks}
						setFieldValue={setValue}
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default UpdateRecord;
