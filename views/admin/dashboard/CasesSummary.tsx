import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const CasesSummary = ({ caseList }: { caseList: any }) => {
	return (
		<ResponsiveContainer
			width="100%"
			height={400}
		>
			<BarChart
				data={caseList}
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
					dataKey="month"
					strokeWidth={0.5}
					axisLine={true}
					tickLine={false}
					style={{
						fontSize: "12px",
					}}
				/>
				<YAxis
					strokeWidth={0.5}
					axisLine={false}
					tickLine={false}
					style={{
						fontSize: "10px",
					}}
					domain={[0, "dataMax"]}
					tick={(value) => {
						if (value.visibleTicksCount % 1 === 0) {
							return value.visibleTicksCount;
						}
					}}
				/>
				<Tooltip />
				<Bar
					dataKey="criminal"
					fill="#4c1d95"
				/>
				<Bar
					dataKey="civil"
					fill="#8b5cf6"
				/>
				<Legend />
			</BarChart>
		</ResponsiveContainer>
	);
};

function CustomToolTip({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<h4 className="font-bold">{label}</h4>
				<p className="capitalize">
					<span className="font-medium">Cases: </span>
					{payload[0].value}
				</p>
			</div>
		);
	}
	return null;
}

export default CasesSummary;
