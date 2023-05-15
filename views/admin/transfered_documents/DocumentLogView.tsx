import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getDocumentLogs } from "../../../redux/dataSlice";
import { useRouter } from "next/router";
import moment from "moment";

const DocumentLogView = () => {
	const dispatch = useAppDispatch();
	const { documentLogs, transferedDocuments } = useAppSelector(
		(state) => state.dataState
	);
	const [documentDetails, setDocumentDetails] = useState<any>({});

	const router = useRouter();
	const { document, tracker } = router.query;

	useEffect(() => {
		if (document && tracker) {
			dispatch(getDocumentLogs({ document, tracker }));
			setDocumentDetails(
				transferedDocuments.find(
					(doc: any) =>
						doc.case__qr_code_tracker === tracker && doc.id === Number(document)
				)
			);
		}
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<div className="w-full flex justify-between">
				<div className="flex items-center gap-x-1">
					<p className="text-sm tracking-wider">
						{documentDetails.office_name}
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-sm text-purple-600 tracking-wider">
						{documentDetails.case__qr_code_tracker}
					</p>
				</div>
				{/*  */}
				<div
					className="flex justify-center items-center gap-x-1 hover:cursor-pointer"
					onClick={() => router.back()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 text-purple-500"
					>
						<path
							fillRule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-purple-500 text-sm">Back</p>
				</div>
			</div>
			{/*  */}
			<div className="w-full grid grid-cols-2 gap-x-5 items-start">
				<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg flex flex-col gap-y-5">
					<h4 className="text-xl font-black tracking-wider">
						Document Details
					</h4>
					{/*  */}
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					{/*  */}
					<div className="flex flex-col gap-y-1 my-5">
						<div className="w-full h-72 flex flex-col justify-center items-center">
							<img
								src={documentDetails.case__qr_code}
								className="max-w-full h-full"
								alt="QRcode"
							/>
							<p className="text-sm font-medium my-2">
								{documentDetails.case__qr_code_tracker}
							</p>
						</div>
					</div>
					{/*  */}
					<div className="w-full grid grid-cols-2 justify-items-center">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Office</h4>
							<p className="text-sm text-gray-500">
								{documentDetails.office_name}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Case No.</h4>
							<p className="text-sm text-gray-500">
								{documentDetails.case__case_no}
							</p>
						</div>
					</div>
					{/*  */}
					<div className="grid grid-cols-2 justify-items-center mb-3">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Date Submitted</h4>
							<p className="text-sm text-gray-500">
								{moment(documentDetails.date_received).format("LL")}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Status</h4>
							<p className="text-sm text-gray-500">{documentDetails.status}</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg flex flex-col gap-y-5">
					<h4 className="text-xl font-black tracking-wider">Activity Log</h4>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					<div className="flex flex-col gap-y-5">
						{documentLogs.map((log: any) => {
							return (
								<div
									className="w-full flex items-center gap-x-5"
									key={log.id}
								>
									<div className="min-w-[30px] min-h-[30px] rounded-full bg-purple-600 flex justify-center items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											strokeWidth={5}
											className="w-4 h-4 text-white"
										>
											<path
												fillRule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="flex flex-col gap-y-1">
										<p className="text-sm">{log.activity}</p>
										<div className="flex gap-x-5">
											<p className="text-xs text-gray-400">
												{moment(log.created_at).format("LL")}
											</p>
											<p className="text-xs text-gray-400">
												{moment(log.created_at).format("hh:mm A")}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentLogView;
