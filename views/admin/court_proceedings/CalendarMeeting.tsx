import moment from "moment";

interface CalendarMeetingProps {
	caseProceeding: any;
}

const CalendarMeeting = ({ caseProceeding }: CalendarMeetingProps) => {
	return (
		<li className="">
			{caseProceeding && (
				<div className="flex items-center py-2 space-x-4 group rounded-xl">
					<div className="flex-auto">
						<p className="text-gray-700 font-bold">{caseProceeding.status}</p>
						<p className="mt-0.5">
							<time dateTime={caseProceeding.start_time}>
								{moment(caseProceeding.start_time, "HH:mm").format("hh:mm A")}
							</time>{" "}
							-{" "}
							<time dateTime={caseProceeding.end_time}>
								{moment(caseProceeding.end_time, "HH:mm").format("hh:mm A")}
							</time>
						</p>
						<p className="text-xs mt-3">{caseProceeding.remarks}</p>
					</div>
				</div>
			)}
		</li>
	);
};

export default CalendarMeeting;
