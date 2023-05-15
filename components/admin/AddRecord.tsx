import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDetainee } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";
import MyMultiSelectField from "../MyMultiSelectFieldFull";

interface AddRecordParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	detainedIn: string;
	onConfirm(): void;
	onCancel(): void;
	selectOptions: any;
}

const AddRecord = ({
	isShow,
	addTitle,
	addText,
	detainedIn,
	onConfirm,
	onCancel,
	selectOptions,
}: AddRecordParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const detainee_cases = formData.recordCase.map((dc: any) => {
			return dc.value;
		});
		const data = {
			name: `${formData.recordFirstName} ${formData.recordMiddleName} ${formData.recordLastName} ${formData.recordSuffix}`,
			height: formData.recordHeight,
			weight: formData.recordWeight,
			birthdate: formData.recordBirthdate,
			blood_type: formData.recordBloodType,
			address: formData.recordAddress,
			date_arrived: formData.recordDateArrived,
			assigned_personnel: formData.recordPersonnel,
			remarks: formData.recordRemarks,
			detained_in: detainedIn,
			cases: JSON.stringify(detainee_cases),
		};
		dispatch(createNewDetainee(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle={addTitle}
			addText={addText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="col-span-2">
					<MyMultiSelectField
						myControl={control}
						myOptions={selectOptions.map((option: any) => {
							return { label: option.case_no, value: option.id };
						})}
						fieldName="recordCase"
						fieldLabel="Case"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
						setFieldValue={setValue}
					/>
				</div>
				<MyInputField
					control={control}
					fieldLabel="First Name"
					fieldType="text"
					fieldName="recordFirstName"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Middle Name"
					fieldType="text"
					fieldName="recordMiddleName"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Last Name"
					fieldType="text"
					fieldName="recordLastName"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Suffix"
					fieldType="text"
					fieldName="recordSuffix"
					fieldRules=""
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Height (cm)"
					fieldType="text"
					fieldName="recordHeight"
					fieldRules={fieldRules.requiredNumberRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Weight (kg)"
					fieldType="text"
					fieldName="recordWeight"
					fieldRules={fieldRules.requiredNumberRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Birthdate"
					fieldType="date"
					fieldName="recordBirthdate"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
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
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Arrived"
					fieldType="date"
					fieldName="recordDateArrived"
					fieldRules=""
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Assigned Personnel"
					fieldType="text"
					fieldName="recordPersonnel"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Address"
						fieldName="recordAddress"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
						setFieldValue={setValue}
					/>
				</div>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="recordRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default AddRecord;
