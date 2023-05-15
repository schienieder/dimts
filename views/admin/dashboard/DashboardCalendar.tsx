import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameDay,
	isSameMonth,
	isToday,
	parse,
	parseISO,
	startOfToday,
} from "date-fns";

import CalendarMeeting from "./CalendarMeeting";

function classNames(...classes: (string | boolean)[]) {
	return classes.filter(Boolean).join(" ");
}

let colStartClasses = [
	"",
	"col-start-2",
	"col-start-3",
	"col-start-4",
	"col-start-5",
	"col-start-6",
	"col-start-7",
];

const DashboardCalendar = ({ hearingList }: any) => {
	let today = startOfToday();
	let [selectedDay, setSelectedDay] = useState(today);
	let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
	let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});

	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	let selectedDayHearings = hearingList.filter((hearing: any) =>
		isSameDay(parseISO(hearing.hearing_schedule), selectedDay)
	);

	return (
		<div className="w-full">
			<div className="md:grid md:grid-cols-calendar md:divide-x md:divide-gray-200 gap-x-8">
				<div className="">
					<div className="flex items-center">
						<h2 className="flex-auto font-semibold text-gray-700">
							{format(firstDayCurrentMonth, "MMMM yyyy")}
						</h2>
						<button
							type="button"
							onClick={previousMonth}
							className={`-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 ${
								isSameMonth(new Date(), new Date(firstDayCurrentMonth))
									? "cursor-not-allowed"
									: "cursor-pointer hover:text-gray-500"
							}`}
							disabled={isSameMonth(new Date(), new Date(firstDayCurrentMonth))}
						>
							<span className="sr-only">Previous month</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<button
							onClick={nextMonth}
							type="button"
							className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Next month</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path
									fillRule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
						<div>SUN</div>
						<div>MON</div>
						<div>TUE</div>
						<div>WED</div>
						<div>THU</div>
						<div>FRI</div>
						<div>SAT</div>
					</div>
					<div className="grid grid-cols-7 mt-2 text-sm">
						{days.map((day, dayIdx) => (
							<div
								key={day.toString()}
								className={classNames(
									dayIdx === 0 && colStartClasses[getDay(day)],
									"py-1.5"
								)}
							>
								<button
									type="button"
									onClick={() => setSelectedDay(day)}
									className={classNames(
										isEqual(day, selectedDay) && "text-white",
										!isEqual(day, selectedDay) &&
											isToday(day) &&
											"text-purple-500",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-700",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											!isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-400",
										isEqual(day, selectedDay) &&
											isToday(day) &&
											"bg-purple-500",
										isEqual(day, selectedDay) &&
											!isToday(day) &&
											"bg-purple-500",
										!isEqual(day, selectedDay) && "hover:bg-gray-200",
										(isEqual(day, selectedDay) || isToday(day)) &&
											"font-semibold",
										"mx-auto flex h-8 w-8 items-center justify-center rounded-full"
									)}
								>
									<time dateTime={format(day, "yyyy-MM-dd")}>
										{format(day, "d")}
									</time>
								</button>

								<div className="w-1 h-1 mx-auto mt-1">
									{hearingList.some((hearing: any) =>
										isSameDay(parseISO(hearing.hearing_schedule), day)
									) && (
										<div className="w-1 h-1 rounded-full bg-purple-500"></div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				<section className="pl-8">
					<h2 className="font-semibold text-gray-700">
						Hearings for{" "}
						<time dateTime={format(selectedDay, "yyyy-MM-dd")}>
							{format(selectedDay, "MMM dd, yyy")}
						</time>
					</h2>
					<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
						{selectedDayHearings.length > 0 ? (
							selectedDayHearings.map((hearing: any) => (
								<CalendarMeeting
									hearing={hearing}
									key={hearing.id}
								/>
							))
						) : (
							<p>No hearings for this date.</p>
						)}
					</ol>
				</section>
			</div>
		</div>
	);
};

export default DashboardCalendar;
