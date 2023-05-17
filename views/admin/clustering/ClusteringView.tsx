import { useEffect, useState, Fragment } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ScatterChart,
	BarChart,
	Scatter,
	Bar,
	Cell,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getClustering,
	fetchCrimeTypesSummary,
	getClusterCases,
	getClusterCrimes,
} from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import chroma from "chroma-js";
import CommonModal from "../../../components/CommonModal";
import { Disclosure } from "@headlessui/react";

const ClusteringView = () => {
	const dispatch = useAppDispatch();
	const {
		dataLoading,
		clusterList,
		// clusterYears,
		crimeTypesSummaryList,
		clusterCases,
		clusterCrimes,
	} = useAppSelector((state) => state.dataState);

	const [showCommonModal, setShowCommonModal] = useState(false);

	const baseColor = "#4c1d95";
	const numberOfColors = crimeTypesSummaryList.length;

	const colorScale = chroma
		.scale(["#fcd34d", baseColor, "#0ea5e9", "#0f766e", "#db2777"])
		.mode("lch")
		.colors(numberOfColors);
	const crimeTypeSummaryListWithColors = crimeTypesSummaryList.map(
		(item: any, index: number) => {
			return {
				...item,
				color: colorScale[index],
			};
		}
	);

	// console.log("Colors: ", crimeTypeSummaryListWithColors);

	useEffect(() => {
		dispatch(getClustering());
		dispatch(fetchCrimeTypesSummary());
		// .then((res: any) =>
		// 	console.log("Crime types: ", res.payload)
		// );
	}, []);

	const onClickCluster = (years: number) => {
		if (years !== 0) {
			dispatch(getClusterCases(years)).then(() => {
				setShowCommonModal(true);
			});
		}
	};

	const onClickAccordion = (crime: string, isClosed: any) => {
		if (!isClosed) {
			dispatch(getClusterCrimes(crime));
		}
	};

	const levelLabels: any = {
		1: "Level 1",
		2: "Level 2",
		3: "Level 3",
		4: "Level 4",
		5: "Level 5",
		6: "Life Imprisonment",
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			{showCommonModal && (
				<CommonModal
					isShow={showCommonModal}
					commonText=""
					commonTitle="Cluster Cases"
					submitButtonText=""
					onSubmitModal={() => console.log("Oten")}
					onCloseModal={() => setShowCommonModal(false)}
				>
					<div className="w-96 flex flex-col gap-y-5 text-gray-700 font-mont py-5 border-t border-gray-200">
						{clusterCases.map((cluster: any, index: number) => {
							return (
								<Disclosure key={cluster.id}>
									{({ open }) => (
										<Fragment>
											<Disclosure.Button
												className="p-2 bg-purple-100 text-purple-700 my-2 rounded-md"
												onClick={() =>
													onClickAccordion(cluster.crime_type, open)
												}
											>
												<div className="w-full flex justify-between items-center">
													<div className="flex flex-col items-start">
														<p className="text-sm font-bold">
															{cluster.crime_type.replaceAll(/["\[\]]+/g, "")}
															{" - "}
															<span>{cluster.imprisonment_span} years</span>
														</p>
														<p className="text-xs font-medium">
															Crime Type & Imprisonment
														</p>
													</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														className={`${
															open ? "rotate-180 transform" : ""
														} h-5 w-5`}
													>
														<path
															fillRule="evenodd"
															d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
											</Disclosure.Button>
											<Disclosure.Panel className="text-sm p-3 text-gray-700 font-medium flex flex-col gap-y-5">
												{clusterCrimes.map((cluster_crimes: any) => {
													return (
														<div
															key={cluster_crimes.no}
															className="w-full col-span-2 flex flex-col gap-y-1"
														>
															<div className="flex gap-x-1">
																<h4 className="font-bold">Case No</h4>
																<p>-</p>
																<p className="">{cluster_crimes.case_no}</p>
															</div>
															<img
																src={cluster_crimes.qr_code}
																className="w-full h-auto"
																alt="QRcode"
															/>
														</div>
													);
												})}
											</Disclosure.Panel>
										</Fragment>
									)}
								</Disclosure>
							);
						})}
					</div>
				</CommonModal>
			)}
			<AdminBreadCrumbs activeText="DBSCAN Clustering" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<h4 className="text-xl font-black tracking-wider">DBSCAN Clustering</h4>
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
					<ResponsiveContainer
						width="100%"
						height={400}
					>
						<ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
							<CartesianGrid
								opacity={0.3}
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								allowDuplicatedCategory={false}
								// hide
							/>
							<YAxis
								dataKey="y"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								domain={["dataMin", "dataMax"]}
							/>
							{/* <Legend
								payload={clusterList.map((cluster: any) => {
									return {
										value: cluster.name,
										type: "line",
										color: "#8b5cf6",
									};
								})}
							/> */}
							<Tooltip
								cursor={{ strokeDasharray: "3 3" }}
								content={<CustomToolTip />}
							/>
							<Scatter
								// name="Custom Name"
								data={clusterList}
								fill="#8884d8"
								onClick={(data: any) => onClickCluster(data.payload.y)}
							/>
						</ScatterChart>
					</ResponsiveContainer>
				)}
			</div>
			{/*  */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<h4 className="text-xl font-black tracking-wider">
					Crime Types Summary
				</h4>
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{!dataLoading && (
					<ResponsiveContainer
						width="100%"
						height={400}
					>
						<BarChart
							data={crimeTypeSummaryListWithColors}
							margin={{
								top: 10,
								bottom: 5,
								left: -35,
							}}
							style={{
								fontSize: "12px",
							}}
						>
							<CartesianGrid
								opacity={0.3}
								vertical={false}
							/>
							<XAxis
								dataKey="crime_type"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								style={{
									fontSize: "12px",
								}}
							/>
							<YAxis
								dataKey="total"
								strokeWidth={0.5}
								tickLine={false}
								style={{
									fontSize: "10px",
								}}
								domain={[0, "dataMax"]}
								interval={1}
								// tick={(value) => {
								// 	if (value.visibleTicksCount % 1 === 0) {
								// 		return value.visibleTicksCount;
								// 	}
								// }}
							/>
							<Tooltip />
							<Bar dataKey="total">
								{crimeTypeSummaryListWithColors.map(
									(entry: any, index: number) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
										/>
									)
								)}
							</Bar>
							{/* <Legend /> */}
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
};

function CustomToolTip({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<p className="capitalize">
					<span className="font-medium">Value: </span>
					{payload[0]?.payload.y ?? ""}
				</p>
			</div>
		);
	}
	return null;
}

function CustomToolTip2({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<p className="capitalize">
					<span className="font-medium">Crime: </span>
					{JSON.stringify(payload[0])}
				</p>
			</div>
		);
	}
	return null;
}

export default ClusteringView;
