import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewHearing } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface AddHearingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectOptions?: any;
}

const AddHearing = ({
	isShow,
	onConfirm,
	onCancel,
	selectOptions,
}: AddHearingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const data = {
			hearing_schedule: formData.hearingSchedule,
			hearing_type: "Hearing",
			start_time: formData.hearingStartTime,
			end_time: formData.hearingEndTime,
			case: formData.hearingCase,
			remarks: formData.hearingRemarks,
			status: "Pending",
		};
		dispatch(createNewHearing(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Court Hearing"
			addText="Create new court hearing"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MySelectField
					myControl={control}
					myOptions={selectOptions.map((option: any) => {
						return { label: option.case_no, value: option.id };
					})}
					fieldName="hearingCase"
					fieldLabel="Case No."
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Hearing Schedule"
					fieldType="date"
					fieldName="hearingSchedule"
					fieldRules={fieldRules.requiredWeekDayRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Start Time"
					fieldType="time"
					fieldName="hearingStartTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="End Time"
					fieldType="time"
					fieldName="hearingEndTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="hearingRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
						setFieldValue={setValue}
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default AddHearing;
