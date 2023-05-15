import moment from "moment";
import ViewRecord from "../../components/admin/ViewRecord";
import useCrudModals from "../../hooks/useCrudModals";
import useModalIDs from "../../hooks/useModalIDs";

const OfficeDocumentsTable = ({ officeDocuments }: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Crime Type</th>
						<th className="py-3 px-6 text-left">Date Submitted</th>
						<th className="py-3 px-6 text-left">Status</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{officeDocuments.length > 0 ? (
						officeDocuments.map((doc: any) => {
							return (
								<tr
									key={doc.id}
									className="border-b border-gray-200 hover:bg-gray-50"
								>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{doc.case__case_no}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{doc.case__crime_type.includes("[")
											? doc.case__crime_type.slice(1, -1).replace(/['"]+/g, "")
											: doc.case__crime_type}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{moment(doc.date_received).format("LL")}
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
									{/* <td className="py-3 px-6 text-center">
									<div className="flex items-center justify-center gap-x-5">
										<div className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer">
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
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												/>
											</svg>
										</div>
									</div>
								</td> */}
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={5}>No data available</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default OfficeDocumentsTable;
