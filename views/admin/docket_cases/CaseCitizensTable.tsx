const CaseCitizensTable = ({ caseCitizensList }: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Mobile</th>
						<th className="py-3 px-6 text-left">Email</th>
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
									{case_.citizen__last_name} {case_.citizen__first_name}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{case_.citizen__contact_number}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{case_.citizen__email}
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
