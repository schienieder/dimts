import React from "react";

interface AddNewButtoonParams {
	btnText: string;
	onClickAdd?(): void;
}

const AddNewButton = ({ btnText, onClickAdd }: AddNewButtoonParams) => {
	return (
		<button
			type="button"
			className={`bg-purple-600 hover:bg-purple-500 px-3 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 flex items-center gap-x-2`}
			onClick={onClickAdd ? onClickAdd : undefined}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				className="w-4 h-4"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 6v12m6-6H6"
				/>
			</svg>
			<p className="text-sm tracking-wider">{btnText}</p>
		</button>
	);
};

export default AddNewButton;
