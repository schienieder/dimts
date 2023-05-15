import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateDocket, updateHearing } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface HigherCourtModalParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const HigherCourtModal = ({
	isShow,
	onConfirm,
	onCancel,
}: HigherCourtModalParams) => {
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		const parsedHearing = JSON.parse(localStorage.courtHearingData);
		const parsedHearingId = JSON.parse(localStorage.courtHearingId);
		const parsedDocketId = JSON.parse(localStorage.docketId);
		const hearingData = {
			hearing_schedule: parsedHearing.hearingSchedule,
			hearing_type: parsedHearing.hearingType,
			start_time: parsedHearing.hearingStartTime,
			end_time: parsedHearing.hearingEndTime,
			status: parsedHearing.hearingStatus,
		};
		dispatch(
			updateHearing({ formData: hearingData, hearing_id: parsedHearingId })
		);
		dispatch(
			updateDocket({
				formData: { is_closed: false, imprisonment_span: 0, is_solved: true },
				docket_id: parsedDocketId,
			})
		).then(() => {
			onConfirm();
		});
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Docket Case"
			addText="Proceed to higher court"
			onConfirm={onSubmit}
			onCancel={onCancel}
		>
			<h4 className="w-96 font-mont text-gray-700 font-medium tracking-wide">
				Clicking submit will proceed this case to higher court, do you want to
				continue?
			</h4>
		</SubmitModal>
	);
};

export default HigherCourtModal;
