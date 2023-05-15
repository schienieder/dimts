import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewDocumentParams {
	isShow: boolean;
	onClose(): void;
	selectedDocument: any;
}

const ViewDocument = ({
	isShow,
	onClose,
	selectedDocument,
}: ViewDocumentParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Transfered Document"
			viewText="View transfered document details"
			onClose={onClose}
		>
			<div className="flex flex-col gap-y-8 font-mont text-gray-700">
				<div className="grid grid-cols-2 gap-5">
					{/* QRCode Details */}
					<div className="w-full col-span-2 flex flex-col gap-y-1">
						<h4 className="font-bold">QRCode</h4>
						<p className="text-xs font-medium mb-2">
							{selectedDocument.case__qr_code_tracker}
						</p>
						<div className="w-full h-72 flex justify-center items-center">
							<img
								src={selectedDocument.case__qr_code}
								className="max-w-full h-full"
								alt="QRcode"
							/>
						</div>
					</div>
					{/* Office */}
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Office</h4>
						<p className="text-sm text-gray-500">
							{selectedDocument.office__first_name}
						</p>
					</div>
					{/* Case No */}
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Case No.</h4>
						<p className="text-sm text-gray-500">
							{selectedDocument.case__case_no}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-5">
					{/* Case No */}
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Date Submitted</h4>
						<p className="text-sm text-gray-500">
							{moment(selectedDocument.date_received).format("LL")}
						</p>
					</div>
					{/* Status */}
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Status</h4>
						<p className="text-sm text-gray-500">{selectedDocument.status}</p>
					</div>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewDocument;
