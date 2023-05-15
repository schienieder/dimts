import ViewModal from "../ViewModal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCaseProceedings, getAllDockets } from "../../redux/dataSlice";
import { Disclosure } from "@headlessui/react";
import React from "react";

interface ViewProceedingParams {
	isShow: boolean;
	onClose(): void;
	selectedProceeding: any;
}

const ViewProceeding = ({
	isShow,
	onClose,
	selectedProceeding,
}: ViewProceedingParams) => {
	const dispatch = useAppDispatch();
	const { caseProceedingsList, allDocketList } = useAppSelector(
		(state) => state.dataState
	);

	const [caseDetails, setCaseDetails] = useState<any>();

	useEffect(() => {
		dispatch(getCaseProceedings(selectedProceeding.case__case_no));
		dispatch(getAllDockets());
		const currentCase = allDocketList.find(
			(case_: any) => case_.case_no === selectedProceeding.case__case_no
		);
		setCaseDetails(currentCase);
	}, [selectedProceeding]);

	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Court Proceeding"
			viewText="View court proceeding details"
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
							<p className="text-sm  font-bold">{caseDetails?.case_no ?? ""}</p>
						</div>
						{/*  */}
						<div className="flex flex-col">
							<h4 className="font-normal">Type of Case</h4>
							<p className="text-sm  font-bold">
								{caseDetails?.type_of_case ?? ""}
							</p>
						</div>
						{/*  */}
						<div className="flex flex-col">
							<h4 className="font-normal">Crime</h4>
							<p className="text-sm  font-bold">
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
						<p className="text-sm  font-bold">
							{caseDetails?.case_title ?? ""}
						</p>
					</div>
					{/*  */}
					<div className="flex flex-col">
						<h4 className="font-bold">Proceedings</h4>
						{caseProceedingsList.map((proceeding: any) => {
							return (
								<Disclosure key={proceeding.id}>
									{({ open }) => (
										<React.Fragment>
											<Disclosure.Button className="p-2 bg-purple-100 text-purple-700 my-2 rounded-md">
												<div className="w-full flex justify-between items-center">
													<div className="flex flex-col items-start">
														<p className="text-sm font-bold">
															{proceeding.proceeding_type}
															{" - "}
															{moment(proceeding.proceeding_schedule).format(
																"LL"
															)}
														</p>
														<p className="text-xs">
															{moment(proceeding.start_time, "HH:mm").format(
																"hh:mm A"
															)}
															{" - "}
															{moment(proceeding.end_time, "HH:mm").format(
																"hh:mm A"
															)}{" "}
															({proceeding.status})
														</p>
													</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														className={`${
															open ? "rotate-180 transform" : ""
														} h-5 w-5`}
													>
														<path
															fillRule="evenodd"
															d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
											</Disclosure.Button>
											<Disclosure.Panel className="text-sm p-3 text-gray-700 font-medium">
												<ul className="list-disc">
													<li>{proceeding.remarks}</li>
												</ul>
											</Disclosure.Panel>
										</React.Fragment>
									)}
								</Disclosure>
							);
						})}
					</div>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewProceeding;
