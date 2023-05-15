import moment from "moment";

const CalendarMeeting = ({ hearing }: any) => {
	return (
		<li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
			<div className="w-10 h-10 rounded-full bg-purple-500 flex justify-center items-center">
				<p className="text-sm text-white font-semibold">
					{hearing.case__type_of_case.substring(0, 2)}
				</p>
			</div>
			<div className="flex-auto">
				<p className="text-gray-700 font-bold">{hearing.case__case_no}</p>
				<p className="mt-0.5">
					<time dateTime={hearing.start_time}>
						{moment(hearing.start_time, "HH:mm").format("hh:mm A")}
					</time>{" "}
					-{" "}
					<time dateTime={hearing.end_time}>
						{moment(hearing.end_time, "HH:mm").format("hh:mm A")}
					</time>
				</p>
			</div>
		</li>
	);
};

export default CalendarMeeting;
