import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewRecordParams {
	isShow: boolean;
	viewTitle: string;
	viewText: string;
	onClose(): void;
	selectedRecord: any;
}

const ViewRecord = ({
	isShow,
	viewTitle,
	viewText,
	onClose,
	selectedRecord,
}: ViewRecordParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle={viewTitle}
			viewText={viewText}
			onClose={onClose}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case No.</h4>
					<p className="text-sm text-gray-500">
						{selectedRecord.case__case_no}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Crime/Offense</h4>
					<p className="text-sm text-gray-500">
						{selectedRecord?.case__crime_type !== undefined &&
						selectedRecord?.case__crime_type.includes("[")
							? selectedRecord.case__crime_type
									.slice(1, -1)
									.replace(/['"]+/g, "")
							: selectedRecord.case__crime_type}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Name</h4>
					<p className="text-sm text-gray-500">{selectedRecord.name}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Birthdate</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedRecord.birthdate).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Height</h4>
					<p className="text-sm text-gray-500">{selectedRecord.height} cm</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Weight</h4>
					<p className="text-sm text-gray-500">{selectedRecord.weight} kg</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Blood Type</h4>
					<p className="text-sm text-gray-500">{selectedRecord.blood_type}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Date Arrived</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedRecord.date_arrived).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Date Released</h4>
					<p className="text-sm text-gray-500">
						{selectedRecord.date_released
							? moment(selectedRecord.date_released).format("LL")
							: "Not Released"}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Assigned Personnel</h4>
					<p className="text-sm text-gray-500">
						{selectedRecord.assigned_personnel}
					</p>
				</div>
				{/*  */}
				<div className="col-span-2">
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Address</h4>
						<p className="text-sm text-gray-500">{selectedRecord.address}</p>
					</div>
				</div>
				{/*  */}
				<div className="col-span-2">
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Remarks</h4>
						<p className="text-sm text-gray-500">{selectedRecord.remarks}</p>
					</div>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewRecord;
