import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import { useForm, useWatch } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateHearing, updateDocket } from "../../redux/dataSlice";
import { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import MyTextAreaField from "../MyTextArea";

interface UpdateHearingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedHearing: any;
	docketList: any;
	showCourtHearing: any;
}

const UpdateHearing = ({
	isShow,
	onConfirm,
	onCancel,
	selectedHearing,
	docketList,
	showCourtHearing,
}: UpdateHearingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const [caseDetails, setCaseDetails] = useState<any>();

	const allowedTypes =
		selectedHearing?.hearingAllowedTypes !== undefined
			? selectedHearing?.hearingAllowedTypes.split(",")
			: [];

	const onCloseCase = (
		hearingIsClosed: any,
		hearingImprisonment: any,
		hearingStatus: any
	) => {
		const solved = hearingStatus === "Completed" ? true : false;
		const data = {
			is_closed: Number(hearingIsClosed) === 0 ? true : false,
			imprisonment_span: hearingImprisonment,
			is_solved: solved,
		};
		dispatch(
			updateDocket({
				formData: data,
				docket_id: caseDetails?.id,
			})
		);
	};

	const onUpdateHearing = (data: any, activityRef: any, newActivity: any) => {
		dispatch(
			updateHearing({ formData: data, hearing_id: selectedHearing.hearingID })
		).then(() => {
			try {
				if (data.hearing_type === "Last Court Action") {
					setDoc(activityRef, newActivity);
				}
			} catch (error) {
				console.log(error);
			}
			onConfirm();
		});
	};

	const onSubmit = (formData: any) => {
		console.log("Hearing type: ", formData.hearingType);
		if (
			Object.entries(selectedHearing).toString() ===
			Object.entries(formData).toString()
		) {
			onCancel();
			return;
		}
		const hearingTypeIndex = allowedTypes.indexOf(formData.hearingType);
		const newAllowedTypesArr =
			formData.hearingStatus === "Completed"
				? allowedTypes.filter(
						(_: any, index: number) => index !== hearingTypeIndex
				  )
				: allowedTypes;
		const data = {
			hearing_schedule: formData.hearingSchedule,
			hearing_type: formData.hearingType,
			start_time: formData.hearingStartTime,
			end_time: formData.hearingEndTime,
			status: formData.hearingStatus,
			remarks: formData.hearingRemarks,
			allowed_hearing_types: newAllowedTypesArr.join(","),
		};
		const newActivity = {
			activity_description: "New case forwarded to docket case",
			activity_name: "Case",
			activity_type: "case",
		};
		const collectionRef = collection(db, "activity-logs");
		const activityRef = doc(collectionRef);

		if (formData?.hearingIsClosed === undefined) {
			console.log("Hearing closed undefined");
			onCloseCase("1", 0, formData.hearingStatus);
			onUpdateHearing(data, activityRef, newActivity);
		} else if (
			formData?.hearingIsClosed !== undefined &&
			Number(formData.hearingIsClosed) === 0
		) {
			console.log("Close case");
			onCloseCase(
				formData?.hearingIsClosed,
				formData?.hearingImprisonment,
				formData.hearingStatus
			);
			onUpdateHearing(data, activityRef, newActivity);
		} else if (
			formData?.hearingIsClosed !== undefined &&
			Number(formData.hearingIsClosed) === 1 &&
			formData.hearingStatus.toLowerCase() !== "completed"
		) {
			console.log("Not completed and closed");
			onCloseCase("1", 0, formData.hearingStatus);
			onUpdateHearing(data, activityRef, newActivity);
		} else if (
			formData?.hearingIsClosed !== undefined &&
			Number(formData.hearingIsClosed) === 1 &&
			formData.hearingStatus.toLowerCase() === "completed"
		) {
			console.log("Completed but not closed");
			localStorage.courtHearingData = JSON.stringify(formData);
			localStorage.courtHearingId = selectedHearing.hearingID;
			localStorage.docketId = caseDetails.id;
			showCourtHearing();
		}
	};

	const hearingType = useWatch({
		control,
		name: "hearingType",
		defaultValue: "Hearing",
	});

	const hearingStatus = useWatch({
		control,
		name: "hearingStatus",
		defaultValue: "Pending",
	});

	useEffect(() => {
		const currentCase = docketList.find(
			(docket: any) => docket.case_no === selectedHearing.hearingCaseNo
		);
		setCaseDetails(currentCase);
	}, [isShow]);

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Court Hearing"
			addText="Update court hearing schedule"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden">
					<MyInputField
						control={control}
						fieldLabel=""
						fieldType="hidden"
						fieldName="hearingID"
						fieldRules=""
						defaultValue={selectedHearing.hearingID}
						placeHolder=""
						setFieldValue={setValue}
					/>
				</div>
				<MyInputFieldFull
					control={control}
					fieldLabel="Case No."
					fieldType="text"
					fieldName="hearingCaseNo"
					fieldRules=""
					defaultValue={selectedHearing.hearingCaseNo}
					placeHolder=""
					readOnly={true}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Hearing Schedule"
					fieldType="date"
					fieldName="hearingSchedule"
					fieldRules={fieldRules.requiredWeekDayRule}
					defaultValue={selectedHearing.hearingSchedule}
					placeHolder=""
					setFieldValue={setValue}
				/>
				{/* [
					{ label: "Hearing", value: "Hearing" },
					{ label: "Arraignment", value: "Arraignment" },
					{ label: "Initial Trial", value: "Initial Trial" },
					{ label: "Last Court Action", value: "Last Court Action" },
				] */}
				<MySelectField
					myControl={control}
					myOptions={allowedTypes.map((hearing_type: string) => {
						return { label: hearing_type, value: hearing_type };
					})}
					fieldName="hearingType"
					fieldLabel="Hearing Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue={
						allowedTypes.find(
							(type: any) => type === selectedHearing.hearingType
						) !== undefined
							? selectedHearing.hearingType
							: ""
					}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Start Time"
					fieldType="time"
					fieldName="hearingStartTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingStartTime}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="End Time"
					fieldType="time"
					fieldName="hearingEndTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingEndTime}
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
					fieldName="hearingStatus"
					fieldLabel="Status"
					fieldRules={fieldRules.requiredRule}
					defaultValue={
						allowedTypes.find(
							(type: any) => type === selectedHearing.hearingType
						) !== undefined
							? selectedHearing.hearingStatus
							: ""
					}
					setFieldValue={setValue}
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="hearingRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue={
							allowedTypes.find(
								(type: any) => type === selectedHearing.hearingType
							) !== undefined
								? selectedHearing.hearingRemarks
								: ""
						}
						setFieldValue={setValue}
					/>
				</div>
				{hearingType.toLowerCase() === "last court action" &&
					hearingStatus.toLowerCase() === "completed" && (
						<div className="col-span-2 grid grid-cols-2 gap-y-8 gap-x-5">
							<MySelectField
								myControl={control}
								myOptions={[
									{ label: "Yes", value: "0" },
									{ label: "No", value: "1" },
								]}
								fieldName="hearingIsClosed"
								fieldLabel="Close Case?"
								fieldRules={fieldRules.requiredRule}
								defaultValue={caseDetails?.is_closed ? "0" : "1"}
								setFieldValue={setValue}
							/>
							<MyInputField
								control={control}
								fieldLabel="Imprisonment"
								fieldType="number"
								fieldName="hearingImprisonment"
								fieldRules={fieldRules.requiredNumberRule}
								defaultValue={caseDetails?.imprisonment_span ?? 0}
								placeHolder=""
								setFieldValue={setValue}
							/>
						</div>
					)}
			</div>
		</SubmitModal>
	);
};

export default UpdateHearing;
