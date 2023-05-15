import { useState } from "react";
import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { sendDocumentEmail } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface SendDocumentParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	recipientOptions: any;
	caseOptions: any;
}

const SendDocument = ({
	isShow,
	onConfirm,
	onCancel,
	recipientOptions,
	caseOptions,
}: SendDocumentParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const [showLoading, setShowLoading] = useState(false);

	const onSubmit = (formData: any) => {
		const selectedCase = caseOptions.find(
			(selectedOption: any) =>
				selectedOption.id === Number(formData.documentCase)
		);
		const recipient = recipientOptions.find(
			(receiver: any) => receiver.id === Number(formData.documentOffice)
		);

		const data = {
			office: formData.documentOffice,
			date_received: formData.documentDate,
			case: formData.documentCase,
			status: formData.documentStatus,
			qr_tracker: selectedCase.qr_code_tracker,
			case_no: selectedCase.case_no,
			office_name: recipient.name,
		};
		setShowLoading(true);
		dispatch(sendDocumentEmail(data)).then(() => {
			setShowLoading(false);
			onConfirm();
		});
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Transfered Documents"
			addText="Send new document"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
			loadingState={showLoading}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MySelectField
					myControl={control}
					myOptions={recipientOptions.map((option: any) => {
						return { label: option.name, value: option.id };
					})}
					fieldName="documentOffice"
					fieldLabel="Office/Person"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={caseOptions.map((option: any) => {
						return { label: option.case_no, value: option.id };
					})}
					fieldName="documentCase"
					fieldLabel="Case"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Submitted"
					fieldType="date"
					fieldName="documentDate"
					fieldRules={fieldRules.requiredRule}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Status"
					fieldType="text"
					fieldName="documentStatus"
					fieldRules={fieldRules.requiredRule}
					defaultValue="Pending"
					readOnly={true}
					setFieldValue={setValue}
				/>
			</div>
		</SubmitModal>
	);
};

export default SendDocument;
