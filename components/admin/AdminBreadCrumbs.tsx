import React from "react";

interface AdminBreadCrumbsParams {
	activeText: any;
}

const AdminBreadCrumbs = ({ activeText }: AdminBreadCrumbsParams) => {
	return (
		<div className="flex items-center gap-x-1">
			<p className="text-sm tracking-wider">Admin</p>
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
			<p className="text-sm text-purple-600 tracking-wider">{activeText}</p>
		</div>
	);
};

export default AdminBreadCrumbs;
