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
	} = useAppSelector((state) => state.dataState);

	console.log("New cluster: ", newCluster);

	// const [showCommonModal, setShowCommonModal] = useState(false);

	const { viewModal, setViewModal } = useCrudModals();
	const { selectedObject, setSelectedObject } = useModalIDs();
	const [filteredCrimeList, setFilteredCrimeList] = useState({});

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
		dispatch(newClusterList());
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
								tick={false}
								// allowDuplicatedCategory={false}
								// hide
							/>
							<YAxis
								dataKey="y"
								strokeWidth={0.5}
								axisLine={true}
								tickLine={false}
								domain={["dataMin", "dataMax"]}
							/>
							<Legend payload={clusteringLegends} />
							<Tooltip
								cursor={{ strokeDasharray: "3 3" }}
								content={<CustomToolTip />}
							/>
							<Scatter
								// name="Custom Name"
								data={newCluster}
								fill="#8884d8"
								// onClick={(data: any) => onClickCluster(data.payload.y)}
								onClick={(data: any) => onClickCluster(data.payload)}
							>
								{newCluster.map((cluster: any) => (
									<Cell
										key={cluster.case_no}
										fill={getScatterFill(cluster.x)}
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
