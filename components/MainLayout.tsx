import React from "react";
import { useRouter } from "next/router";
import AdminSideNav from "./admin/AdminSideNav";
import AdminTopNav from "./admin/AdminTopNav";
import CitizenSideNav from "./citzen/CitizenSideNav";
import CitizenTopNav from "./citzen/CitizenTopNav";
import OfficeTopNav from "./admin/OfficeTopNav";

const MainLayout = ({ children }: any) => {
	const { pathname } = useRouter();
	const paths = pathname.split("/");

	const Layout = () => {
		if (paths[1] === "admin") {
			return (
				<div
					className="relative h-screen grid grid-cols-layout overflow-y-hidden"
					id="portalHere"
				>
					{/* SIDENAV */}
					<AdminSideNav />
					{/*  */}
					<div className="w-full min-h-screen grid grid-rows-layout">
						{/* TOPNAV */}
						<AdminTopNav />
						{/*  */}
						<div className="w-full h-auto bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
							{children}
						</div>
						{/*  */}
					</div>
					{/*  */}
				</div>
			);
		} else if (paths[1] === "citizen") {
			return (
				<div className="grid grid-cols-layout">
					{/* SIDENAV */}
					<CitizenSideNav />
					{/*  */}
					<div className="w-full h-screen grid grid-rows-layout">
						{/* TOPNAV */}
						<CitizenTopNav />
						{/*  */}
						<div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
							{children}
						</div>
						{/*  */}
					</div>
					{/*  */}
				</div>
			);
		} else if (paths[1] === "staff") {
			return (
				<div className="grid grid-cols-layout">
					{/* SIDENAV */}
					<AdminSideNav />
					{/*  */}
					<div className="w-full h-screen grid grid-rows-layout">
						{/* TOPNAV */}
						<AdminTopNav />
						{/*  */}
						<div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
							{children}
						</div>
						{/*  */}
					</div>
					{/*  */}
				</div>
			);
		} else if (paths[1] === "office") {
			return (
				<div className="w-full grid grid-rows-layout">
					<OfficeTopNav />
					<div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
						{children}
					</div>
				</div>
			);
		}

		return <div>{children}</div>;
	};

	return (
		<div>
			<Layout />
		</div>
	);
};

export default MainLayout;
