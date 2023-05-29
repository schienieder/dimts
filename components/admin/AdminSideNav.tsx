import { useState } from "react";
import { useRouter } from "next/router";

const AdminSideNav = () => {
	const router = useRouter();
	const [accountsDropDown, setAccountsDropDown] = useState(false);
	const [casesDropDown, setCasesDropDown] = useState(false);
	const [custodiesDropDown, setCustodiesDropDown] = useState(false);

	const isItemClicked = (path: string) => {
		router.push(path);
	};

	const accountsClicked = () => {
		setAccountsDropDown(!accountsDropDown);
	};

	const casesClicked = () => {
		setCasesDropDown(!casesDropDown);
	};

	const custodiesClicked = () => {
		setCustodiesDropDown(!custodiesDropDown);
	};

	return (
		<div className="w-full min-h-screen bg-white shadow flex flex-col items-center font-mont gap-y-4 px-5 select-none">
			{/*  */}
			<div className="w-full flex gap-x-1 pt-10 pb-5 px-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 48 48"
					className="w-6 h-6 text-purple-600"
				>
					<g fill="none">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="4"
							d="M11.075 37.08c-3.386 1.46-5.039 3.444-5.71 4.83c-.266.548.181 1.09.79 1.09h21.232c.742 0 1.212-.776.779-1.38c-1.75-2.438-4.384-3.977-5.777-4.552a.933.933 0 0 0-.357-.068h-10.57a.98.98 0 0 0-.387.08Z"
						/>
						<path
							stroke="currentColor"
							strokeLinejoin="round"
							strokeWidth="4"
							d="m14.732 18.856l5-8.66l8.66 5l-5 8.66z"
						/>
						<path
							fill="currentColor"
							d="m27.392 16.928l1-1.732a2 2 0 0 0-2.732.732l1.732 1Zm-3 5.196l-1.732-1a2 2 0 0 0 .732 2.732l1-1.732Zm2-3.464l12.99 7.5l2-3.464l-12.99-7.5l-2 3.464Zm11.99 9.232l-12.99-7.5l-2 3.464l12.99 7.5l2-3.464Zm-12.258-4.768l3-5.196l-3.464-2l-3 5.196l3.464 2Zm13.625 4.402a1 1 0 0 1-1.367.366l-2 3.464a5 5 0 0 0 6.83-1.83l-3.464-2Zm-.367-1.366a1 1 0 0 1 .367 1.366l3.464 2a5 5 0 0 0-1.83-6.83l-2 3.464Z"
						/>
						<rect
							width="14"
							height="6"
							x="21"
							y="4"
							stroke="currentColor"
							strokeLinejoin="round"
							strokeWidth="4"
							rx="3"
							transform="rotate(30 21 4)"
						/>
						<rect
							width="14"
							height="6"
							x="13"
							y="17.856"
							stroke="currentColor"
							strokeLinejoin="round"
							strokeWidth="4"
							rx="3"
							transform="rotate(30 13 17.856)"
						/>
					</g>
				</svg>
				<h4 className="text-2xl text-purple-600 font-black tracking-widest">
					Dimts
				</h4>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin" ? "bg-purple-50" : "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/admin" ? "text-purple-600" : "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin" ? "text-purple-600" : "text-gray-700"
					} text-sm`}
				>
					Dashboard
				</p>
			</div>
			{/* ACCOUNT LIST */}
			<div className="w-full flex flex-col gap-y-3">
				{/*  */}
				<div
					className={`w-full flex justify-between items-center px-5 py-3 ${
						router.pathname.includes("accounts")
							? "bg-purple-50"
							: "bg-transparent"
					} rounded-lg hover:cursor-pointer`}
					onClick={accountsClicked}
				>
					<div className="w-full flex gap-x-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`w-5 h-5 ${
								router.pathname.includes("accounts")
									? "text-purple-600"
									: "text-gray-700"
							}`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
							/>
						</svg>
						<p
							className={`font-medium ${
								router.pathname.includes("accounts")
									? "text-purple-600"
									: "text-gray-700"
							} text-sm`}
						>
							Account List
						</p>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`text-right w-4 h-4 ${
							router.pathname.includes("accounts")
								? "text-purple-600"
								: "text-gray-700"
						} ${accountsDropDown ? "rotate-180" : "rotate-0"}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
				{/* ACCOUNT LIST DROPDOWN ITEMS */}
				{accountsDropDown ? (
					<div className="flex flex-col gap-y-1">
						<div
							className={`w-full pl-[60px] py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/staff_accounts")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/staff_accounts"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Staff Accounts
							</p>
						</div>
						{/*  */}
						<div
							className={`w-full pl-[60px] py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/citizen_accounts")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/citizen_accounts"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Citizen Accounts
							</p>
						</div>
						{/*  */}
						<div
							className={`w-full pl-[60px] py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/office_accounts")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/office_accounts"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Offices Accounts
							</p>
						</div>
					</div>
				) : null}
				{/*  */}
			</div>
			{/* CRIME LIST */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname.includes("crimes") ? "bg-purple-50" : "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => router.push("/admin/crimes")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname.includes("crimes")
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname.includes("crime")
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Crime List
				</p>
			</div>
			{/* CASE LIST */}
			<div className="w-full flex flex-col gap-y-3">
				{/*  */}
				<div
					className={`w-full flex justify-between items-center px-5 py-3 ${
						router.pathname.includes("cases")
							? "bg-purple-50"
							: "bg-transparent"
					} rounded-lg hover:cursor-pointer`}
					onClick={casesClicked}
				>
					<div className="w-full flex gap-x-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`w-5 h-5 ${
								router.pathname.includes("cases")
									? "text-purple-600"
									: "text-gray-700"
							}`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
							/>
						</svg>
						<p
							className={`font-medium ${
								router.pathname.includes("cases")
									? "text-purple-600"
									: "text-gray-700"
							} text-sm`}
						>
							Case List
						</p>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`text-right w-4 h-4 ${
							router.pathname.includes("cases")
								? "text-purple-600"
								: "text-gray-700"
						} ${casesDropDown ? "rotate-180" : "rotate-0"}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
				{/* CASE LIST DROPDOWN ITEMS */}
				{casesDropDown ? (
					<div className="flex flex-col gap-y-1">
						<div
							className={`w-full pl-16 py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/docket_cases")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/docket_cases"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Docket Cases
							</p>
						</div>
						{/*  */}
						<div
							className={`w-full pl-[60px] py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/criminal_cases")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/criminal_cases"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Criminal Cases
							</p>
						</div>
						<div
							className={`w-full pl-[60px] py-3 bg-transparent rounded-lg hover:cursor-pointer`}
							onClick={() => isItemClicked("/admin/civil_cases")}
						>
							<p
								className={`font-medium ${
									router.pathname === "/admin/civil_cases"
										? "text-purple-600"
										: "text-gray-700"
								} text-xs`}
							>
								Civil Cases
							</p>
						</div>
					</div>
				) : null}
				{/*  */}
			</div>
			{/* COURT HEARINGS */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/court_hearings"
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/court_hearings")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/admin/court_hearings"
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/court_hearings"
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Court Hearings
				</p>
			</div>
			{/* COURT PROCEEDINGS */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/court_proceedings"
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/court_proceedings")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/admin/court_proceedings"
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/court_proceedings"
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Proceedings
				</p>
			</div>
			{/* DOCUMENTS */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/transfered_documents"
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => router.push("/admin/transfered_documents")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/admin/transfered_documents"
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/transfered_documents"
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Documents
				</p>
			</div>
			{/* CUSTODIES */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname.includes("custodies")
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => router.push("/admin/custodies")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					className={`w-5 h-5 ${
						router.pathname.includes("custodies")
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M18 4v16M14 4v16M6 4v5m0 6v5m4-16v5m1 0H5v6h6zm-1 6v5m-2-8h-.01"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname.includes("custodies")
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Custodies
				</p>
			</div>
			{/* CLUSTERING */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname.includes("clustering")
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => router.push("/admin/clustering")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/admin/clustering"
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/clustering"
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Clustering
				</p>
			</div>
		</div>
	);
};

export default AdminSideNav;
