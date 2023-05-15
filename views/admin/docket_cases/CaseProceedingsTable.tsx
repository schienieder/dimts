import moment from "moment";

const CaseProceedingsTable = ({ caseProceedingsList }: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Proceeding Type</th>
						<th className="py-3 px-6 text-left">Date Scheduled</th>
						<th className="py-3 px-6 text-left">Start Time</th>
						<th className="py-3 px-6 text-left">End Time</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{caseProceedingsList.map((proceeding: any) => {
						return (
							<tr
								key={proceeding.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{proceeding.proceeding_type}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(proceeding.proceeding_schedule).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(proceeding.start_time, "HH:mm").format("hh:mm A")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(proceeding.end_time, "HH:mm").format("hh:mm A")}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CaseProceedingsTable;
