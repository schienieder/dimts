import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewClusterParams {
	isShow: boolean;
	viewTitle: string;
	viewText: string;
	onClose(): void;
	selectedCase: any;
	selectedCrime: any;
}

const ViewCluster = ({
	isShow,
	viewTitle,
	viewText,
	onClose,
	selectedCase,
	selectedCrime,
}: ViewClusterParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle={viewTitle}
			viewText={viewText}
			onClose={onClose}
		>
			<div className="grid grid-cols-2 justify-items-center gap-y-8 gap-x-5">
				<div className="w-full flex flex-col gap-y-1">
					<h4 className="font-bold">QRCode</h4>
					<p className="text-xs">{selectedCase.qr_code_tracker}</p>
					<img
						src={selectedCase.qr_code}
						className="w-full h-auto"
						alt="QRcode"
					/>
				</div>
				{/*  */}
				<div className="grid grid-cols-2">
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
						<p className="text-sm text-gray-500">
							{selectedCase.document_title}
						</p>
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
						<h4 className="font-bold">Raffled Court</h4>
						<p className="text-sm text-gray-500">
							{selectedCase.raffled_court}
						</p>
					</div>
					{/*  */}
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Judge Assigned</h4>
						<p className="text-sm text-gray-500">
							{selectedCase.judge_assigned}
						</p>
					</div>
					{/*  */}
					{Object.keys(selectedCase).length && isShow
						? selectedCase.type_of_case.toLowerCase() === "criminal" && (
								<div className="w-full col-span-2 flex flex-col gap-y-1">
									<h4 className="font-bold">Imrpisonment</h4>
									<p className="text-sm text-gray-500">
										{selectedCase.imprisonment_span} Years
									</p>
								</div>
						  )
						: null}
					{/*  */}
				</div>
				{/*  */}
				<div className="col-span-2 w-[700px] overflow-y-auto flex flex-col gap-y-5">
					<h4 className="text-xl font-bold">{selectedCrime.crime_type}</h4>
					{selectedCrime?.penalty_items !== undefined
						? JSON.parse(selectedCrime.penalty_items).map(
								(penaltyItem: any, index: number) => {
									const parsedCrimes = JSON.parse(
										selectedCase.crime_type_list.replaceAll("'", '"')
									);
									return (
										<div
											key={`${selectedCrime.crime_type}-${index}`}
											className="flex flex-col gap-y-1"
										>
											<div className="flex flex-col gap-y-3">
												<div className="flex items-center px-4 border border-gray-300 rounded">
													<input
														type="checkbox"
														name="bordered-checkbox"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
														// checked={selectedCrime.penalty_items}
														// disabled
														checked={parsedCrimes[index] === 1}
														readOnly
													/>
													<label className="w-full py-4 ml-2 text-sm font-normal text-gray-700">
														{penaltyItem}
													</label>
												</div>
											</div>
										</div>
									);
								}
						  )
						: null}
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewCluster;
