import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import db from "../../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeIsNewData, updateActivityLogs } from "../../redux/dataSlice";

const AdminTopNav = () => {
	const dispatch = useAppDispatch();
	const { isNewData, activityLogs } = useAppSelector(
		(state) => state.dataState
	);
	const collectionRef = collection(db, "activity-logs");
	const router = useRouter();
	const onLogout = () => {
		localStorage.clear();
		router.push("/");
	};

	useEffect(() => {
		const unsub = onSnapshot(collectionRef, (querySnapshot) => {
			const items: any = [];
			querySnapshot.forEach((doc) => {
				items.push(doc.data());
			});
			if (localStorage.previousActivities !== undefined) {
				if (JSON.stringify(items) !== localStorage.previousActivities) {
					localStorage.previousActivities = JSON.stringify(items);
					dispatch(updateActivityLogs(items));
					dispatch(changeIsNewData(true));
				} else {
					dispatch(changeIsNewData(false));
				}
			} else {
				localStorage.previousActivities = JSON.stringify(items);
				dispatch(changeIsNewData(true));
			}
		});
		return () => {
			unsub();
		};
	}, [db]);

	const goToNotifLink = (activityType: string) => {
		let linkHref: any = "";
		if (activityType === "hearing") {
			linkHref = "/admin/court_hearings";
		} else if (activityType === "document") {
			linkHref = "/admin/transfered_documents";
		} else if (activityType === "case") {
			linkHref = "/admin/docket_cases";
		}
		router.replace(linkHref);
	};

	return (
		<div className="w-full h-full shadow border-b border-gray-200 flex justify-between items-center px-10 font-mont text-gray-700">
			{/*  */}
			<div></div>
			{/*  */}
			<div className="flex items-center gap-x-5">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className="p-3 rounded-full bg-purple-100"
								onClick={() => dispatch(changeIsNewData(false))}
							>
								<div className="flex items-center gap-x-1">
									{isNewData ? (
										<div className="relative">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 text-purple-600"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
												/>
											</svg>
											<span className="absolute -top-4 left-4 flex h-5 w-5">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-75"></span>
												<span className="relative flex justify-center items-center rounded-full h-5 w-5 bg-purple-500 text-[10px] text-white font-bold tracking-wider">
													{activityLogs.length}
												</span>
											</span>
										</div>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5 "
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
											/>
										</svg>
									)}
								</div>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute z-10 mt-3 right-1 bg-white p-5 rounded-lg shadow border-b-200 w-96 flex flex-col gap-y-5">
									{activityLogs !== undefined && activityLogs.length ? (
										activityLogs
											.slice(0, 5)
											.map((activity: any, index: number) => {
												return (
													<div
														className={`flex items-center gap-x-3 cursor-pointer  ${
															index === activityLogs.length - 1
																? ""
																: "border-b border-gray-200 pb-3"
														}`}
														key={index}
														onClick={() =>
															goToNotifLink(activity.activity_type)
														}
													>
														<div className="bg-purple-100 p-3 rounded-full">
															{activity.activity_type === "hearing" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="w-6 h-6 text-purple-600"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
																	/>
																</svg>
															) : null}
															{activity.activity_type === "document" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="w-6 h-6 text-purple-600"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
																	/>
																</svg>
															) : null}
															{activity.activity_type === "case" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="w-6 h-6 text-purple-600"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
																	/>
																</svg>
															) : null}
														</div>
														<div className="flex flex-wrap flex-col">
															<h4 className="text-sm font-bold">
																{activity.activity_name}
															</h4>
															<p className="text-xs">
																{activity.activity_description}
															</p>
														</div>
													</div>
												);
											})
									) : (
										<p className="text-base text-center">
											No available notifications
										</p>
									)}
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button className="p-3 rounded-full bg-purple-100">
								<div className="flex items-center gap-x-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-purple-60"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-purple-60"
									>
										<path
											fillRule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clipRule="evenodd"
										/>
									</svg>{" "}
								</div>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute z-10 mt-3 right-1 bg-white p-5 rounded-lg shadow border-b-200">
									<button
										onClick={onLogout}
										className="flex items-center gap-x-3 text-gray-400 hover:text-gray-700"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-current"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
											/>
										</svg>
										<p className="text-sm">Logout</p>
									</button>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
			</div>
			{/*  */}
		</div>
	);
};

export default AdminTopNav;
