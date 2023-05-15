import moment from "moment";
import Link from "next/link";

const ServedDocsTable = ({
	transaferedDocuments,
	onViewDocument,
	onShowWarning,
}: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Office/Person</th>
						<th className="py-3 px-6 text-left">QRCode Tracker</th>
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Date Submitted</th>
						<th className="py-3 px-6 text-left">Status</th>
						<th className="py-3 px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{transaferedDocuments.map((doc: any) => {
						return (
							<tr
								key={doc.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{doc.office_name}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{doc.case__qr_code_tracker}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{doc.case__case_no}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(doc.date_received).format("ll")}
								</td>
								<td
									className={`py-3 px-6 text-left whitespace-nowrap ${
										doc.status.toLowerCase() === "pending"
											? "text-yellow-500"
											: "text-teal-500"
									}`}
								>
									{doc.status}
								</td>
								<td className="py-3 px-6 text-center">
									<div className="flex items-center justify-center gap-x-5">
										<Link
											href={{
												pathname: "/admin/transfered_documents/logs",
												query: {
													document: doc.id,
													tracker: doc.case__qr_code_tracker,
												},
											}}
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 hover:cursor-pointer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-5 h-5 hover:cursor-pointer"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
												/>
											</svg>
										</Link>
										<div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 hover:cursor-pointer"
											onClick={() => onShowWarning(doc.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ServedDocsTable;
