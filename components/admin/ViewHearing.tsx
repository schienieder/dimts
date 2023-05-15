import ViewModal from "../ViewModal";
import moment from "moment";
import { useEffect, useState } from "react";

interface ViewHearingParams {
	isShow: boolean;
	onClose(): void;
	selectedHearing: any;
	allDockets: any;
}

const ViewHearing = ({
	isShow,
	onClose,
	selectedHearing,
	allDockets,
}: ViewHearingParams) => {
	const [caseDetails, setCaseDetails] = useState<any>();

	useEffect(() => {
		const currentCase = allDockets.find(
			(case_: any) => case_.case_no === selectedHearing.case__case_no
		);
		setCaseDetails(currentCase);
	}, [selectedHearing]);

	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Court Hearing"
			viewText="View court hearing schedule"
			onClose={onClose}
		>
			<div className="flex gap-x-12 font-mont text-gray-700">
				{/*  */}
				<div className="flex flex-col justify-center items-center">
					<img
						src={caseDetails?.qr_code ?? ""}
						className="w-auto h-56"
						alt="QRcode"
					/>
					<p className="text-sm font-medium">
						{caseDetails?.qr_code_tracker ?? ""}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-8">
					{/*  */}
					<div className="flex gap-x-12">
						{/*  */}
						<div className="flex flex-col">
							<h4 className="font-normal">Case No.</h4>
							<p className="text-sm text-gray-500 font-bold">
								{caseDetails?.case_no ?? ""}
							</p>
						</div>
						{/*  */}
						<div className="flex flex-col">
							<h4 className="font-normal">Type of Case</h4>
							<p className="text-sm text-gray-500 font-bold">
								{caseDetails?.type_of_case ?? ""}
							</p>
						</div>
						{/*  */}
						<div className="flex flex-col">
							<h4 className="font-normal">Crime</h4>
							<p className="text-sm text-gray-500 font-bold">
								{caseDetails?.crime_type !== undefined &&
								caseDetails?.crime_type.includes("[")
									? caseDetails?.crime_type.slice(1, -1).replace(/['"]+/g, "")
									: caseDetails?.crime_type}
							</p>
						</div>
					</div>
					{/*  */}
					<div className="flex flex-col">
						<h4 className="font-normal">Case Title</h4>
						<p className="text-sm text-gray-500 font-bold">
							{caseDetails?.case_title ?? ""}
						</p>
					</div>
					{/*  */}
					<div className="flex flex-col">
						<h4 className="font-bold">Hearing Details</h4>
						<div className="p-2 bg-purple-100 text-purple-700 my-2 rounded-md flex flex-col items-start">
							<p className="text-sm font-bold">
								{selectedHearing.hearing_type}
								{" - "}
								{moment(selectedHearing.proceeding_schedule).format("LL")}
							</p>
							<p className="text-xs">
								{moment(selectedHearing.start_time, "HH:mm").format("hh:mm A")}
								{" - "}
								{moment(selectedHearing.end_time, "HH:mm").format("hh:mm A")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewHearing;
