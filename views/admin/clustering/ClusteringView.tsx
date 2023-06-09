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
	newClusterList,
	getCrimeList,
} from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import chroma from "chroma-js";
import ViewCluster from "../../../components/admin/ViewCluster";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import _ from "lodash";

const clusteringLegends: any = [
	{
		value: "Level 1",
		type: "line",
		color: "#ea580c",
	},
	{
		value: "Level 2",
		type: "line",
		color: "#facc15",
	},
	{
		value: "Level 3",
		type: "line",
		color: "#14b8a6",
	},
	{
		value: "Level 4",
		type: "line",
		color: "#2563eb",
	},
	{
		value: "Level 5",
		type: "line",
		color: "#db2777",
	},
	{
		value: "Life Imprisonment",
		type: "line",
		color: "#86198f",
	},
];

const getScatterFill = (level: number) => {
	if (level === 1) {
		return "#ea580c";
	} else if (level === 2) {
		return "#facc15";
	} else if (level === 3) {
		return "#14b8a6";
	} else if (level === 4) {
		return "#2563eb";
	} else if (level === 5) {
		return "#db2777";
	} else if (level === 6) {
		return "#86198f";
	}
};

const ClusteringView = () => {
	const dispatch = useAppDispatch();
	const {
		dataLoading,
		// clusterList,
		// clusterYears,
		crimeTypesSummaryList,
		// clusterCases,
		// clusterCrimes,
		newCluster,
		crimeList,
		activeCount,
		closedCount,
	} = useAppSelector((state) => state.dataState);

	// const [showCommonModal, setShowCommonModal] = useState(false);

	const { viewModal, setViewModal } = useCrudModals();
	const { selectedObject, setSelectedObject } = useModalIDs();
	const [filteredCrimeList, setFilteredCrimeList] = useState({});
	const [filteredCluster, setFilteredCluster] = useState([]);

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
		dispatch(newClusterList()).then((res: any) => {
			setFilteredCluster(res.payload?.newCluster ?? []);
		});
		dispatch(getCrimeList());
		// .then((res: any) =>
		// 	console.log("Crime types: ", res.payload)
		// );
	}, []);

	// const onClickCluster = (years: number) => {
	// 	if (years !== 0) {
	// 		dispatch(getClusterCases(years)).then(() => {
	// 			setShowCommonModal(true);
	// 		});
	// 	}
	// };

	const onClickCluster = (payload: any) => {
		const selectedCrime = payload?.crime_type.includes("[")
			? payload.crime_type.slice(1, -1).replace(/['"]+/g, "")
			: payload.crime_type;
		const filteredValue = crimeList.find(
			(crime: any) => crime.crime_type === selectedCrime
		);
		console.log("Filtered crime: ", filteredValue);
		setFilteredCrimeList(filteredValue);
		setSelectedObject(payload);
		setViewModal(true);
	};

	// const onClickAccordion = (crime: string, isClosed: any) => {
	// 	if (!isClosed) {
	// 		dispatch(getClusterCrimes(crime));
	// 	}
	// };

	// const CustomAxisTick = (props: any) => {
	// 	const { x, y, stroke, payload } = props;
	// 	console.log("Custom tick value: ", payload.value);
	// 	return (
	// 		<g transform={`translate(${x},${y})`}>
	// 			<text
	// 				x={0}
	// 				y={0}
	// 				dy={16}
	// 				textAnchor="end"
	// 				fill="#666"
	// 				// transform="rotate(-35)"
	// 			>
	// 				{payload.value !== 6 ? `Lvl ${payload.value}` : "LF"}
	// 			</text>
	// 		</g>
	// 	);
	// };

	const onChangeLevels = (level: string) => {
		if (level === "all") {
			setFilteredCluster(newCluster);
		} else {
			let filtered_cluster: any = _.filter(newCluster, function (o) {
				return o.y === Number(level);
			});
			console.log("Filtered: ", filtered_cluster);
			setFilteredCluster(filtered_cluster);
		}
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewCluster
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
				viewTitle="Cluster Data"
				viewText="View cluster case data"
				selectedCrime={filteredCrimeList}
			/>
			<AdminBreadCrumbs activeText="Descriptive Clustering" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Descriptive Clustering
					</h4>
					{/*  */}
					<div className="flex flex-row gap-x-5">
						<StatusIndicator
							statusType="Active Cases"
							totalCount={activeCount}
						/>
						<StatusIndicator
							statusType="Closed Cases"
							totalCount={closedCount}
						/>
					</div>
					{/*  */}
					<select
						className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
						onChange={(e: any) => onChangeLevels(e.target.value)}
					>
						<option value="all">All Cases</option>
						<option value="1">Level 1</option>
						<option value="2">Level 2</option>
						<option value="3">Level 3</option>
						<option value="4">Level 4</option>
						<option value="5">Level 5</option>
						<option value="6">Life Imprisonment</option>
					</select>
				</div>
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
								dataKey="x"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								// allowDuplicatedCategory={false}
								hide
							/>
							<YAxis
								dataKey="x"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								// interval={6}
								// tickCount={6}
								// tick={<CustomAxisTick />}
								domain={[0, "dataMax"]}
							/>
							<Legend payload={clusteringLegends} />
							<Tooltip
								cursor={{ strokeDasharray: "3 3" }}
								content={<CustomToolTip />}
							/>
							<Scatter
								// name="Custom Name"
								data={filteredCluster}
								// fill="#8884d8"
								// onClick={(data: any) => onClickCluster(data.payload.y)}
								onClick={(data: any) => onClickCluster(data.payload)}
							>
								{filteredCluster.map((cluster: any) => (
									<Cell
										key={cluster.case_no}
										fill={getScatterFill(Number(cluster.y))}
									/>
								))}
							</Scatter>
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

type StatusIndicatorParams = {
	statusType: string;
	totalCount: number;
};

const StatusIndicator = ({ statusType, totalCount }: StatusIndicatorParams) => {
	return (
		<div className="flex gap-x-1 items-center">
			<div
				className={`h-4 w-4 ${
					statusType.toLocaleLowerCase() === "active cases"
						? "bg-purple-600"
						: "bg-purple-300"
				}`}
			></div>
			<p className="text-xs font-medium">{statusType}</p>
			<p className="text-sm font-bold">{totalCount}</p>
		</div>
	);
};

function getPayloadText(payload: any) {
	const { case_no, crime_type, imprisonment_span } = payload;
	const crimeType = crime_type.includes("[")
		? crime_type.slice(1, -1).replace(/['"]+/g, "")
		: crime_type;
	return `${case_no} - ${crimeType} - ${imprisonment_span}`;
}

function CustomToolTip({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-row gap-x-1 shadow border-b border-gray-300 text-gray-700 font-bold font-mont">
				{/* <p className="capitalize">
					<span className="font-medium">Value: </span>
					{payload[0]?.payload.y ?? ""}
				</p> */}
				<p>
					{payload[0]?.payload !== undefined
						? getPayloadText(payload[0]?.payload)
						: ""}
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
