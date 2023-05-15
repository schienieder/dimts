import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const OfficeTopNav = () => {
	const router = useRouter();
	const onLogout = () => {
		localStorage.clear();
		router.push("/");
	};

	return (
		<div className="w-full h-full shadow border-b border-gray-200 flex justify-between items-center px-10 font-mont text-gray-700">
			{/*  */}
			<div className="flex gap-x-1 pl-10">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 48 48"
					className="w-7 h-7 text-purple-600"
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
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button className="p-3 rounded-full bg-purple-50">
							<div className="flex items-center gap-x-1">
								<div className="">
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
								</div>
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
								</svg>
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
			{/*  */}
		</div>
	);
};

export default OfficeTopNav;
