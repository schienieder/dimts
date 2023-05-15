import React, { MouseEventHandler } from "react";

const ImportButton = ({
	onClickImport,
}: {
	onClickImport: MouseEventHandler;
}) => {
	return (
		<button
			type="button"
			className={`bg-transparent px-3 py-2 border border-purple-500 hover:border-purple-600 text-purple-500 hover:text-purple-600 font-semibold rounded-lg transition-colors ease-out duration-200 flex items-center gap-x-2`}
			onClick={onClickImport}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-4 h-4"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
				/>
			</svg>

			<p className="text-sm tracking-wider">Import</p>
		</button>
	);
};

export default ImportButton;
