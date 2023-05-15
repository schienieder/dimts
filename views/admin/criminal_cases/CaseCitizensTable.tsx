const CaseCitizensTable = ({ caseCitizensList, onShowWarning }: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-center">Action</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{caseCitizensList.map((case_: any) => {
						return (
							<tr
								key={case_.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{case_.citizen__first_name} {case_.citizen__last_name}
								</td>
								<td className="py-3 px-6 flex justify-center">
									<div
										className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
										onClick={() => onShowWarning(case_.id)}
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
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CaseCitizensTable;
