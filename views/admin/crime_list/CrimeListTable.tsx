import React from "react";

type CrimeListTableParams = {
	crimeList: any;
	onShowEdit(crime_id: number): void;
	onShowWarning(crime_id: number): void;
};

const CrimeListTable = ({
	crimeList,
	onShowEdit,
	onShowWarning,
}: CrimeListTableParams) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Crime Type</th>
						{/* <th className="py-3 px-6 text-left">Penalty Sentences</th> */}
						<th className="py-3 px-6 text-left">Case Type</th>
						<th className="py-3 px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{crimeList.map((crime: any) => {
						return (
							<tr
								key={crime.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td
									className="py-3 px-6 text-left whitespace-nowrap hover:cursor-pointer"
									// onClick={() => onViewCaseProceedings(crime.case_no)}
								>
									{crime.crime_type}
								</td>
								{/* <td className="py-3 px-6 text-left whitespace-nowrap"> */}
								{/* {crime.crime_type.includes("[")
										? crime.crime_type.slice(1, -1).replace(/['"]+/g, "")
										: crime.crime_type} */}
								{/* {JSON.parse(crime.penalty_sentences).join(", ")} */}
								{/* </td> */}
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{crime.case_type}
								</td>
								<td className="py-3 px-6 text-center">
									<div className="flex items-center justify-center gap-x-5">
										<div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
											onClick={() => onShowEdit(crime.id)}
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
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												/>
											</svg>
										</div>
										<div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
											onClick={() => onShowWarning(crime.id)}
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

export default CrimeListTable;
