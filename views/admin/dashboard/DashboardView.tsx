import { useState, useEffect } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import DashboardCalendar from "./DashboardCalendar";
import UpcomingHearings from "./UpcomingHearings";
import RecentDocuments from "./RecentDocuments";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getCourtHearings,
	getUpcomingHearings,
	getRecentDocuments,
	fetchCasesSummary,
} from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import CasesSummary from "./CasesSummary";

const DashboardView = () => {
	const dispatch = useAppDispatch();
	const {
		dataLoading,
		courtHearingList,
		upcomingHearingList,
		recentDocuments,
		casesSummaryList,
	} = useAppSelector((state) => state.dataState);
	const [hasRecentEmail, setHasRecentEmail] = useState(false);
	const [hearingActivity, setHearingActivity] = useState(false);

	useEffect(() => {
		dispatch(fetchCasesSummary()).then((res) => console.log("Payload: ", res));
		dispatch(getCourtHearings()).then((res: any) => {
			setHearingActivity(
				res.payload.find((hearing: any) => {
					const current_date = new Date();
					if (
						hearing.updated_at ===
						`${current_date.getFullYear()}-${
							current_date.getMonth() + 1
						}-${current_date.getDate()}`
					) {
						return true;
					}
					return false;
				})
			);
		});
		dispatch(getUpcomingHearings());
		dispatch(getRecentDocuments()).then((res: any) => {
			setHasRecentEmail(
				res.payload.find((doc: any) => {
					const current_date = new Date();
					if (
						doc.date_created ===
						`${current_date.getFullYear()}-${
							current_date.getMonth() + 1
						}-${current_date.getDate()}`
					) {
						return true;
					}
					return false;
				})
			);
		});
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="Dashboard" />
			{/*  */}
			{hasRecentEmail && (
				<div className="w-full bg-purple-100 text-purple-600 font-medium flex justify-center items-center p-5 gap-x-5 rounded-lg">
					<p className="text-base">
						You have recently emailed a document, check recent documents section
					</p>
					<svg
						onClick={() => setHasRecentEmail(false)}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 hover:cursor-pointer"
					>
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>
				</div>
			)}
			{hearingActivity && (
				<div className="w-full bg-purple-100 text-purple-600 font-medium flex justify-center items-center p-5 gap-x-5 rounded-lg">
					<p className="text-base">
						A new court hearing activity has been added/modified, check upcoming
						hearings section
					</p>
					<svg
						onClick={() => setHearingActivity(false)}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 hover:cursor-pointer"
					>
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>
				</div>
			)}
			{/* CASES SUMMARY */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex flex-col justify-between items-center gap-y-5">
					<h4 className="self-start text-xl font-black tracking-wider">
						Cases Summary
					</h4>
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
					{!dataLoading && <CasesSummary caseList={casesSummaryList} />}
				</div>
			</div>
			{/* CALENDAR OF EVENTS */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex flex-col justify-between items-center gap-y-5">
					<h4 className="self-start text-xl font-black tracking-wider">
						Calendar of Events
					</h4>
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
					{!dataLoading && <DashboardCalendar hearingList={courtHearingList} />}
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
			</div>
			{/*  */}
			<div className="grid grid-cols-2 items-start gap-x-5">
				{/* UPCOMING HEARINGS */}
				<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
					<div className="w-full flex flex-col justify-between items-center gap-y-5">
						<div className="w-full flex justify-between items-center">
							<h4 className="self-start text-xl font-black tracking-wider">
								Upcoming Hearings
							</h4>
							<Link href="/admin/court_hearings">
								<p className="text-sm text-purple-500 hover:cursor-pointer">
									View All
								</p>
							</Link>
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
							<UpcomingHearings upcomingHearings={upcomingHearingList} />
						)}
					</div>
				</div>

				{/* RECENT DOCUMENTS */}
				<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
					<div className="w-full flex flex-col justify-between items-center gap-y-5">
						<div className="w-full flex justify-between items-center">
							<h4 className="self-start text-xl font-black tracking-wider">
								Recent Documents
							</h4>
							<Link href="/admin/transfered_documents">
								<p className="text-sm text-purple-500 hover:cursor-pointer">
									View All
								</p>
							</Link>
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
							<RecentDocuments recentDocuments={recentDocuments} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardView;
