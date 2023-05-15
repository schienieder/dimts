import { useRouter } from "next/router";

const CitizenSideNav = () => {
	const router = useRouter();

	const isItemClicked = (path: string) => {
		router.push(path);
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
					router.pathname === "/citizen" ? "bg-purple-50" : "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/citizen")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/citizen" ? "text-purple-600" : "text-gray-700"
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
						router.pathname === "/citizen" ? "text-purple-600" : "text-gray-700"
					} text-sm`}
				>
					Dashboard
				</p>
			</div>
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/citizen/profile"
						? "bg-purple-50"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/citizen/profile")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-5 h-5 ${
						router.pathname === "/citizen/profile"
							? "text-purple-600"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/citizen/profile"
							? "text-purple-600"
							: "text-gray-700"
					} text-sm`}
				>
					Identification
				</p>
			</div>
		</div>
	);
};

export default CitizenSideNav;
