import moment from "moment";
import db from "../../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

const UpcomingHearings = ({ upcomingHearings }: any) => {
	const collectionRef = collection(db, "activity-logs");
	const activityRef = doc(collectionRef);
	const addNewActivity = ({ case_no }: { case_no: string }) => {
		const newActivity = {
			activity_description: `Hearing for ${case_no} is on going`,
			activity_name: "Hearing Schedule",
			activity_type: "hearing",
		};
		try {
			setDoc(activityRef, newActivity);
		} catch (error) {
			console.log(error);
		}
	};
	const current_date = new Date();
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Hearing Schedule</th>
						<th className="py-3 px-6 text-left">Status</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{upcomingHearings.map((hearing: any) => {
						if (
							hearing.hearing_schedule ===
							`${current_date.getFullYear()}-${
								current_date.getMonth() + 1
							}-${current_date.getDate()}`
						) {
							addNewActivity({ case_no: hearing.case__case_no });
						}
						return (
							<tr
								key={hearing.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{hearing.case__case_no}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(hearing.hearing_schedule).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{hearing.hearing_schedule ===
									`${current_date.getFullYear()}-${
										current_date.getMonth() + 1
									}-${current_date.getDate()}`
										? "On-Going"
										: hearing.status}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UpcomingHearings;
