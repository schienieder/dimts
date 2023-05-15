import moment from "moment";

const RecentDocuments = ({ recentDocuments }: any) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Office</th>
						<th className="py-3 px-6 text-left">Date Arrived</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{recentDocuments.map((doc: any) => {
						return (
							<tr
								key={doc.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{doc.office_name}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(doc.date_received).format("LL")}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default RecentDocuments;
