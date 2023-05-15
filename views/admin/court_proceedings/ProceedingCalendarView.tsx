import React, { useEffect } from "react";
import ProceedingCalendar from "./ProceedingCalendar";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCaseProceedings } from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";

const ProceedingCalendarView = () => {
	const router = useRouter();
	const { id } = router.query;

	const { dataLoading, caseProceedingsList } = useAppSelector(
		(state) => state.dataState
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCaseProceedings(id));
	}, []);

	return (
		<div className="w-full flex flex-col bg-white p-5 shadow border-b border-gray-200 rounded-lg gap-y-5 text-gray-700 font-mont">
			<div className="w-full flex justify-between">
				<h4 className="text-xl font-black tracking-wider">{id ?? ""}</h4>
				<div
					className="flex justify-center items-center gap-x-1 hover:cursor-pointer"
					onClick={() => router.back()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 text-purple-500"
					>
						<path
							fillRule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-purple-500 text-sm">Back</p>
				</div>
			</div>
			<div className="w-full border-b border-gray-200 -mt-3"></div>
			{dataLoading && (
				<div className="w-full flex justify-center items-center">
					<MoonLoader
						loading={dataLoading}
						color="#9333ea"
						speedMultiplier={1}
						size={70}
					/>
				</div>
			)}
			{!dataLoading && (
				<ProceedingCalendar caseProceedings={caseProceedingsList} />
			)}
		</div>
	);
};

export default ProceedingCalendarView;
