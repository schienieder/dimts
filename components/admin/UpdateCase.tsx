import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateDocket } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface UpdateCaseParams {
	isShow: boolean;
	updateTitle: string;
	updateText: string;
	onConfirm(): void;
	onCancel(): void;
	caseType: string;
	selectedID: number;
	selectedCase: any;
}

const UpdateCase = ({
	isShow,
	updateTitle,
	updateText,
	onConfirm,
	onCancel,
	caseType,
	selectedID,
	selectedCase,
}: UpdateCaseParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		if (
			Object.entries(selectedCase).toString() ===
			Object.entries(formData).toString()
		) {
			onCancel();
			return;
		}
		const data = {
			case_no: formData.caseNo,
			document_title: formData.caseDocTitle,
			case_title: formData.caseTitle,
			crime_type: formData.caseCrimeType,
			received_date: formData.caseReceived,
			hearing_date: formData.caseHearing,
			arraignment_date: formData.caseArraignment,
			initial_trial_date: formData.caseInital,
			last_court_action: formData.caseLastAction,
			raffled_court: formData.caseRaffled,
			judge_assigned: formData.caseJudge,
			case_status: formData.caseStatus,
		};
		dispatch(updateDocket({ formData: data, docket_id: selectedID })).then(() =>
			onConfirm()
		);
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle={updateTitle}
			addText={updateText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="Type of Case"
					fieldType="text"
					fieldName="caseType"
					fieldRules={fieldRules.requiredRule}
					defaultValue={caseType}
					readOnly={true}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case No."
					fieldType="text"
					fieldName="caseNo"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseNo}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Document Title"
					fieldType="text"
					fieldName="caseDocTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseDocTitle}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case Title"
					fieldType="text"
					fieldName="caseTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseTitle}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Antisocial Behaviour", value: "Antisocial Behaviour" },
						{ label: "Arson", value: "Arson" },
						{ label: "Burglary", value: "Burglary" },
						{ label: "Child Abuse", value: "Child Abuse" },
						{ label: "Crime Abroad", value: "Crime Abroad" },
						{ label: "Cybercrime", value: "Cybercrime" },
						{ label: "Domestic Abuse", value: "Domestic Abuse" },
						{ label: "Fraud", value: "Fraud" },
						{ label: "Hate Crime", value: "Hate Crime" },
						{ label: "Modern Slavery", value: "Modern Slavery" },
						{ label: "Murder", value: "Murder" },
						{ label: "Rape/Sexual Assault", value: "Rape/Sexual Assault" },
						{ label: "Robbery", value: "Robbery" },
						{ label: "Sexual Harassment", value: "Sexual Harassment" },
						{ label: "Stalking", value: "Stalking" },
						{ label: "Terrorism", value: "Terrorism" },
						{ label: "Violent Crime", value: "Violent Crime" },
					]}
					fieldName="caseCrimeType"
					fieldLabel="Crime Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseCrimeType}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Received Date"
					fieldType="date"
					fieldName="caseReceived"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseReceived}
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Raffled Court"
					fieldType="text"
					fieldName="caseRaffled"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseRaffled}
					placeHolder=""
					setFieldValue={setValue}
					readOnly={true}
				/>
				<MyInputField
					control={control}
					fieldLabel="Judge Assigned"
					fieldType="text"
					fieldName="caseJudge"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedCase.caseJudge}
					placeHolder=""
					setFieldValue={setValue}
				/>
			</div>
		</SubmitModal>
	);
};

export default UpdateCase;
