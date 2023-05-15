import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import MyTextAreaField from "../MyTextArea";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateProceeding } from "../../redux/dataSlice";

interface UpdateProceedingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedProceeding: any;
}

const UpdateProceeding = ({
	isShow,
	onConfirm,
	onCancel,
	selectedProceeding,
}: UpdateProceedingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		if (
			Object.entries(selectedProceeding).toString() ===
			Object.entries(formData).toString()
		) {
			onCancel();
			return;
		}
		const data = {
			proceeding_schedule: formData.proceedingSchedule,
			proceeding_type: formData.proceedingType,
			start_time: formData.proceedingStartTime,
			end_time: formData.proceedingEndTime,
			status: formData.proceedingStatus,
			remarks: formData.proceedingRemarks,
		};
		dispatch(
			updateProceeding({
				formData: data,
				proceeding_id: selectedProceeding.proceedingID,
			})
		).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Court Proceeding"
			addText="Update court proceeding schedule"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden">
					<MyInputField
						control={control}
						fieldLabel=""
						fieldType="hidden"
						fieldName="proceedingID"
						fieldRules=""
						defaultValue={selectedProceeding.proceedingID}
						placeHolder=""
						setFieldValue={setValue}
					/>
				</div>
				<MyInputField
					control={control}
					fieldLabel="Proceeding Schedule"
					fieldType="date"
					fieldName="proceedingSchedule"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedProceeding.proceedingSchedule}
					placeHolder=""
					setFieldValue={setValue}
				/>
				{/* <MySelectField
					myControl={control}
					myOptions={[
						{ label: "Hearing", value: "Hearing" },
						{ label: "Arraignment", value: "Arraignment" },
						{ label: "Initial Trial", value: "Initial Trial" },
						{ label: "Last Court Action", value: "Last Court Action" },
					]}
					fieldName="proceedingType"
					fieldLabel="Proceeding Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedProceeding.proceedingType}
				/> */}
				<MyInputField
					control={control}
					fieldLabel="Start Time"
					fieldType="time"
					fieldName="proceedingStartTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedProceeding.proceedingStartTime}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="End Time"
					fieldType="time"
					fieldName="proceedingEndTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedProceeding.proceedingEndTime}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Pending", value: "Pending" },
						{ label: "Canceled", value: "Canceled" },
						{ label: "Completed", value: "Completed" },
					]}
					fieldName="proceedingStatus"
					fieldLabel="Status"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedProceeding.proceedingStatus}
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="proceedingRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue={selectedProceeding.proceedingRemarks}
						placeHolder=""
						setFieldValue={setValue}
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default UpdateProceeding;
