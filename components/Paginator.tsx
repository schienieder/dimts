import React from "react";

const Pagination = ({
	totalLogs,
	logsPerPage,
	currentPage,
	setCurrentPage,
}: {
	totalLogs: number;
	logsPerPage: number;
	currentPage: number;
	setCurrentPage: CallableFunction;
}) => {
	let pages = [];
	for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
		pages.push(i);
	}

	const onPrev = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const onNext = () => {
		if (currentPage < pages.length) {
			setCurrentPage(currentPage + 1);
		}
	};

	const buttonClass = "px-4 py-2  border border-gray-200 hover:bg-gray-100";

	return (
		<div className="w-full  flex justify-center font-noto text-sm font-medium">
			<div className="w-full">
				<button
					className={`${buttonClass} rounded-tl-lg rounded-bl-lg ${
						currentPage === 1
							? "cursor-not-allowed bg-gray-100"
							: "bg-white text-current"
					}`}
					onClick={onPrev}
				>
					Prev
				</button>
				<button
					className={`${buttonClass} rounded-tr-lg rounded-br-lg ${
						currentPage === pages.length
							? "cursor-not-allowed bg-gray-100"
							: "bg-white text-current"
					}`}
					onClick={onNext}
				>
					Next
				</button>
			</div>
		</div>
		// <div className="w-full flex justify-center gap-x-3">

		// 	{pages.map((page: any, index: number) => {
		// 		return (
		// 			<button
		// 				key={index}
		// 				className={`px-4 py-2  border border-gray-200 rounded ${
		// 					currentPage === page
		// 						? "bg-[#89644e] text-white"
		// 						: "bg-white text-current"
		// 				}`}
		// 				onClick={() => setCurrentPage(page)}
		// 			>
		// 				{page}
		// 			</button>
		// 		);
		// 	})}
		// </div>
	);
};

export default Pagination;
