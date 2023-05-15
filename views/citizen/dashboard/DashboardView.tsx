import { useEffect } from "react";
import CitizenBreadCrumbs from "../../../components/citzen/CitizenBreadCrumbs";
import DashboardCalendar from "../../admin/dashboard/DashboardCalendar";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCourtHearings } from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";

const DashboardView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtHearingList } = useAppSelector(
		(state) => state.dataState
	);

	useEffect(() => {
		dispatch(getCourtHearings());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<CitizenBreadCrumbs activeText="Dashboard" />
			{/*  */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex flex-col justify-between items-center gap-y-5">
					<h4 className="self-start text-xl font-black tracking-wider">
						Calendar of Events
					</h4>
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
					{!dataLoading && <DashboardCalendar hearingList={courtHearingList} />}
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
			</div>
			{/*  */}
		</div>
	);
};

export default DashboardView;
