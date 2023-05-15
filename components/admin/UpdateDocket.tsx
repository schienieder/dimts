import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateDocket } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface UpdateDocketParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedID: number;
}

const UpdateDocket = ({
	isShow,
	onConfirm,
	onCancel,
	selectedID,
}: UpdateDocketParams) => {
	const { handleSubmit } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		const data = {
			is_closed: false,
		};
		dispatch(updateDocket({ formData: data, docket_id: selectedID })).then(() =>
			onConfirm()
		);
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Docket Case"
			addText="Update docket case"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<h4 className="w-96 font-mont text-gray-700 font-medium tracking-wide">
				Clicking the submit button results into reopening this case, do you want
				to proceed?
			</h4>
		</SubmitModal>
	);
};

export default UpdateDocket;
