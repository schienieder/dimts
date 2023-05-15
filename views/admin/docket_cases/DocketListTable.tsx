import { query } from "firebase/firestore";
import Link from "next/link";

const DocketListTable = ({ pastDocketList, onViewDocket }: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Type of Case</th>
						<th className="py-3 px-6 text-left">Crime Type</th>
						<th className="py-3 px-6 text-left">Judge Assigned</th>
						<th className="py-3 px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{pastDocketList.length > 0 ? (
						pastDocketList.map((docket: any) => {
							return (
								<tr
									key={docket.id}
									className="border-b border-gray-200 hover:bg-gray-50"
								>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{docket.case_no}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{docket.type_of_case} Case
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{docket.crime_type.includes("[")
											? docket.crime_type.slice(1, -1).replace(/['"]+/g, "")
											: docket.crime_type}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{docket.judge_assigned}
									</td>
									<td className="py-3 px-6 text-center">
										<div className="flex items-center justify-center gap-x-5">
											<Link
												href={{
													pathname: "/admin/docket_cases/case",
													query: { case_id: docket.id },
												}}
												className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 hover:cursor-pointer"
												// onClick={() => onViewDocket(docket)}
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
											{/* <div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 hover:cursor-pointer"
											onClick={() => onShowWarning(docket.id)}
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
										</div> */}
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<tr className="border-b border-gray-200 hover:bg-gray-50">
							<td
								className="py-3 px-6 text-center whitespace-nowrap"
								colSpan={5}
							>
								No available dockets
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DocketListTable;
