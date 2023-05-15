import SubmitModal from "../SubmitModal";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { newCourtProceeding } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface AddProceedingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectOptions: any;
}

const AddProceeding = ({
	isShow,
	onConfirm,
	onCancel,
	selectOptions,
}: AddProceedingParams) => {
	const { control, handleSubmit } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		console.log("Proceeding data: ", formData);
		const data = {
			case: formData.proceedingCase,
			proceeding_type: formData.proceedingType,
			proceeding_date: formData.proceedingDate,
			remarks: formData.proceedingRemarks,
		};
		dispatch(newCourtProceeding(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Court Proceeding"
			addText="Create new court proceeding"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="w-72">
					<MySelectField
						myControl={control}
						myOptions={selectOptions.map((option: any) => {
							return { label: option.case_no, value: option.id };
						})}
						fieldName="proceedingCase"
						fieldLabel="Case"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
				<div className="w-72">
					<MySelectField
						myControl={control}
						myOptions={[
							{ label: "Arraignment", value: "Arraignment" },
							{ label: "Initial Trial", value: "Initial Trial" },
							{ label: "Last Court Action", value: "Last Court Action" },
						]}
						fieldName="proceedingType"
						fieldLabel="Proceeding Type"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
				<div className="col-span-2">
					<MyInputFieldFull
						control={control}
						fieldLabel="Date"
						fieldType="date"
						fieldName="proceedingDate"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="proceedingRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default AddProceeding;
