import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteHearing,
	getCourtHearings,
	getCurrentDockets,
	getAllDockets,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import PrintButton from "../../../components/PrintButton";
import MoonLoader from "react-spinners/MoonLoader";
import CourtHearingsTable from "./CourtHearingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewHearing from "../../../components/admin/ViewHearing";
import AddHearing from "../../../components/admin/AddHearing";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import UpdateHearing from "../../../components/admin/UpdateHearing";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";
import _ from "lodash";
import db from "../../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import FilterButton from "../../../components/FilterButton";
import { DateRange } from "react-date-range";
import HigherCourtModal from "../../../components/admin/HigherCourtModal";

const CourtHearingsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtHearingList, currentDocketList, allDocketList } =
		useAppSelector((state: any) => state.dataState);

	const collectionRef = collection(db, "activity-logs");

	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showEditModal,
		setShowEditModal,
		showSuccessModal,
		setShowSuccessModal,
		showDeleteModal,
		setShowDeleteModal,
	} = useCrudModals();
	const {
		selectedID,
		setSelectedID,
		selectedObject,
		setSelectedObject,
		successText,
		setSuccessText,
	} = useModalIDs();
	const [searchInput, setSearchInput] = useState("");
	const [filteredHearings, setFilteredHearings] = useState([]);
	const [showHigherCourt, setShowHigherCourt] = useState(false);

	const [selection, setSelection] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [hasFilter, setHasFilter] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getCurrentDockets());
		dispatch(getCourtHearings()).then((res: any) =>
			setFilteredHearings(res.payload)
		);
		dispatch(getAllDockets());
	}, []);

	const onSubmitNewHearing = useCallback(() => {
		const newActivity = {
			activity_description: "New court hearing is created",
			activity_name: "Hearing Schedule",
			activity_type: "hearing",
			is_viewed: false,
		};
		const activityRef = doc(collectionRef);
		dispatch(getCourtHearings()).then((res: any) =>
			setFilteredHearings(res.payload)
		);
		setShowAddModal(false);
		setSuccessText("Creation of new court hearing is successful");
		try {
			setDoc(activityRef, newActivity);
		} catch (error) {
			console.log(error);
		}
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, []);

	const onViewCourtHearing = (hearing: any) => {
		setSelectedObject(hearing);
		setViewModal(true);
	};

	const onShowUpdateModal = (hearing_id: number) => {
		setSelectedID(hearing_id);
		const hearing = courtHearingList.find(
			(hearing: any) => hearing.id === hearing_id
		);
		setSelectedObject({
			hearingID: hearing.id,
			hearingSchedule: hearing.hearing_schedule,
			hearingType: hearing.hearing_type,
			hearingStartTime: hearing.start_time,
			hearingEndTime: hearing.end_time,
			hearingStatus: hearing.status,
			hearingCaseNo: hearing.case__case_no,
			hearingRemarks: hearing.remarks,
			hearingAllowedTypes: hearing.allowed_hearing_types,
		});
		setShowEditModal(true);
	};

	const onUpdateHearing = () => {
		dispatch(getCourtHearings()).then((res: any) =>
			setFilteredHearings(res.payload)
		);
		setSuccessText("Updating of court hearing schedule is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setShowHigherCourt(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowDeleteModal = (hearing_id: number) => {
		setSelectedID(hearing_id);
		setShowDeleteModal(true);
	};

	const onDeleteHearing = () => {
		setSuccessText("Deletion of court hearing is successful");
		dispatch(deleteHearing(selectedID)).then(() => {
			dispatch(getCourtHearings()).then((res: any) =>
				setFilteredHearings(res.payload)
			);
			setShowDeleteModal(false);
		});
	};

	const onExportHearings = () => {
		const csvHearings = courtHearingList.map((hearing: any) => {
			return {
				type_of_case: hearing.case__type_of_case,
				crime_type: hearing.case__crime_type,
				case_no: hearing.case__case_no,
				document_title: hearing.case__document_title,
				case_title: hearing.case__case_title,
				hearing_schedule: moment(hearing.hearing_schedule).format("ll"),
				hearing_type: hearing.hearing_type,
				start_time: moment(hearing.start_time, "HH:mm").format("hh:mm A"),
				end_time: moment(hearing.end_time, "HH:mm").format("hh:mm A"),
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Court Hearings",
		});
		csvHearings.length ? csvExporter.generateCsv(csvHearings) : null;
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (searchInput.length > 0) {
			setFilteredHearings(
				courtHearingList.filter((hearings: any) => {
					return hearings.case__case_no.includes(searchInput);
				})
			);
		} else {
			setFilteredHearings(courtHearingList);
		}
	};

	const onDateFilter = (item: any) => {
		const { selection } = item;
		setSelection([selection]);
		if (
			moment(selection.startDate).format("MM-DD-YYYY") !==
			moment(selection.endDate).format("MM-DD-YYYY")
		) {
			setShowDatePicker(false);
		} else if (selection.startDate === "" && selection.endDate === "") {
			setShowDatePicker(false);
		}
		const filteredValues: any = _.filter(courtHearingList, (heraing) => {
			return (
				_.gte(
					moment(heraing.hearing_schedule).format("MM-DD-YYYY"),
					moment(selection.beginDate).format("MM-DD-YYYY")
				) &&
				_.lte(
					moment(heraing.hearing_schedule).format("MM-DD-YYYY"),
					moment(selection.endDate).format("MM-DD-YYYY")
				)
			);
		});
		setHasFilter(true);
		setFilteredHearings(filteredValues);
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewHearing
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedHearing={selectedObject}
				allDockets={allDocketList}
			/>
			<AddHearing
				isShow={showAddModal}
				onConfirm={() => onSubmitNewHearing()}
				onCancel={() => setShowAddModal(false)}
				selectOptions={currentDocketList}
			/>
			<UpdateHearing
				isShow={showEditModal}
				onConfirm={() => onUpdateHearing()}
				onCancel={() => setShowEditModal(false)}
				selectedHearing={selectedObject}
				docketList={currentDocketList}
				showCourtHearing={() => {
					setShowEditModal(false);
					setShowHigherCourt(true);
				}}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Court Hearing"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="hearing"
				onConfirm={() => onDeleteHearing()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<HigherCourtModal
				isShow={showHigherCourt}
				onConfirm={() => {
					onSubmitNewHearing();
					setShowHigherCourt(false);
				}}
				onCancel={() => setShowHigherCourt(false)}
			/>
			<AdminBreadCrumbs activeText="Court Hearings" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Court Hearings</h4>
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportHearings()} />
						<div className="relative">
							<FilterButton
								onClickFilter={() => setShowDatePicker(!showDatePicker)}
							/>
							{showDatePicker && (
								<DateRange
									// editableDateInputs={true}
									onChange={(item: any) => onDateFilter(item)}
									moveRangeOnFirstSelection={false}
									ranges={selection}
									className="absolute -left-56 mt-2"
									rangeColors={["#9333ea"]}
								/>
							)}
						</div>
						<AddNewButton
							btnText="New Hearing"
							onClickAdd={() => setShowAddModal(true)}
						/>
						<input
							type="text"
							placeholder="Search Case No."
							className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							onChange={handleChange}
							value={searchInput}
						/>
					</div>
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{/*  */}
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
					<div className="flex flex-col gap-y-5">
						<CourtHearingsTable
							courtHearings={filteredHearings}
							onViewHearing={(hearing: any) => onViewCourtHearing(hearing)}
							onShowWarning={(hearing_id: number) =>
								onShowDeleteModal(hearing_id)
							}
							onShowEdit={(hearing_id: number) => onShowUpdateModal(hearing_id)}
						/>

						<div className="self-end flex justify-between items-center">
							{/* <div className="self-end flex gap-x-2 items-center">
								<p className="text-sm font-medium">Sort by: </p>
								<select
									className="w-40 px-3 py-1 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
									defaultValue=""
									onChange={(e: any) => {
										setFilteredHearings((oldFilteredHearings) =>
											_.orderBy(
												oldFilteredHearings,
												["hearing_schedule"],
												[e.target.value]
											)
										);
									}}
								>
									<option
										disabled
										value=""
									>
										Select Option
									</option>
									<option value="desc">Ascending</option>
									<option value="asc">Descending</option>
								</select>
							</div> */}
							{hasFilter && (
								<button
									className="text-sm text-purple-400 hover:text-purple-600 hover:underline"
									onClick={() => {
										setFilteredHearings(courtHearingList);
										setHasFilter(false);
									}}
								>
									Clear Filter
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourtHearingsView;
