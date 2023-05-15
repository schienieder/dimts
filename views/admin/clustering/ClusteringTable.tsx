const ClusteringTable = ({ crimeList }: { crimeList: any }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Crime</th>
						<th className="py-3 px-6 text-left">Total</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="py-3 px-6 text-left whitespace-nowrap"></td>
						<td className="py-3 px-6 text-left whitespace-nowrap"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ClusteringTable;
