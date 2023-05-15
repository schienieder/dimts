import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewDocketParams {
	isShow: boolean;
	viewTitle: string;
	viewText: string;
	onClose(): void;
	selectedCase: any;
}

const ViewDocket = ({
	isShow,
	viewTitle,
	viewText,
	onClose,
	selectedCase,
}: ViewDocketParams) => {
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
					<h4 className="font-bold">Type of Case</h4>
					<p className="text-sm text-gray-500">{selectedCase.type_of_case}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case No.</h4>
					<p className="text-sm text-gray-500">{selectedCase.case_no}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Document Title</h4>
					<p className="text-sm text-gray-500">{selectedCase.document_title}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case Title</h4>
					<p className="text-sm text-gray-500">{selectedCase.case_title}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Crime Type</h4>
					<p className="text-sm text-gray-500">
						{selectedCase.crime_type !== undefined &&
						selectedCase?.crime_type.includes("[")
							? selectedCase.crime_type.slice(1, -1).replace(/['"]+/g, "")
							: selectedCase.crime_type}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Received Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.received_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Hearing Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.hearing_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Arraignment Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.arraignment_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Initial Trial Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.initial_trial_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Last Court Action</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.last_court_action).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Raffled Court</h4>
					<p className="text-sm text-gray-500">{selectedCase.raffled_court}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Judge Assigned</h4>
					<p className="text-sm text-gray-500">{selectedCase.judge_assigned}</p>
				</div>
				{/*  */}
				<div className="w-full col-span-2 flex flex-col gap-y-1">
					<h4 className="font-bold">QRCode</h4>
					<p className="text-xs">{selectedCase.qr_code_tracker}</p>
					<img
						src={selectedCase.qr_code}
						className="w-full h-auto"
						alt="QRcode"
					/>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewDocket;
