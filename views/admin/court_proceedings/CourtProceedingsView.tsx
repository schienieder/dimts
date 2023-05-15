import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteCourtProceeding,
	getCourtProceedings,
	getCurrentDockets,
} from "../../../redux/dataSlice";
import PrintButton from "../../../components/PrintButton";
import MoonLoader from "react-spinners/MoonLoader";
import ProceedingsTable from "./CourtProceedingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import AddProceeding from "../../../components/admin/AddProceeding";
import UpdateProceeding from "../../../components/admin/UpdateProceeding";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import ViewProceeding from "../../../components/admin/ViewProceeding";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";
import { DateRange } from "react-date-range";
import FilterButton from "../../../components/FilterButton";
import _ from "lodash";

const CourtProceedingsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtProceedingsList, currentDocketList } =
		useAppSelector((state) => state.dataState);

	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		setShowSuccessModal,
		showEditModal,
		setShowEditModal,
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
	const [filteredProceedings, setFilteredProceedings] = useState([]);
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
		dispatch(getCourtProceedings()).then((res: any) =>
			setFilteredProceedings(res.payload)
		);
	}, []);

	const onViewCourtProceeding = (proceeding: any) => {
		setSelectedObject(proceeding);
		setViewModal(true);
	};

	const onSubmitNewProceeding = useCallback(() => {
		dispatch(getCourtProceedings()).then((res: any) =>
			setFilteredProceedings(res.payload)
		);
		setSuccessText("Creation of new court proceeding is successful");
		setShowSuccessModal(true);
		setShowAddModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (proceeding_id: number) => {
		setSelectedID(proceeding_id);
		const proceeding = courtProceedingsList.find(
			(proceeding: any) => proceeding.id === proceeding_id
		);
		setSelectedObject({
			proceedingID: proceeding.id,
			proceedingCaseNo: proceeding.case__case_no,
			proceedingSchedule: proceeding.proceeding_schedule,
			proceedingType: proceeding.proceeding_type,
			proceedingStartTime: proceeding.start_time,
			proceedingEndTime: proceeding.end_time,
			proceedingStatus: proceeding.status,
			proceedingRemarks: proceeding.remarks,
		});
		setShowEditModal(true);
	};

	const onUpdateProceeding = () => {
		dispatch(getCourtProceedings()).then((res: any) =>
			setFilteredProceedings(res.payload)
		);
		setSuccessText("Updating of court hearing schedule is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowDeleteModal = (proceeding_id: number) => {
		setSelectedID(proceeding_id);
		setShowDeleteModal(true);
	};

	const onDeleteHearing = () => {
		dispatch(deleteCourtProceeding(selectedID)).then(() => {
			dispatch(getCourtProceedings()).then((res: any) =>
				setFilteredProceedings(res.payload)
			);
			setShowDeleteModal(false);
		});
	};

	const onExportProceedings = () => {
		const csvProocedings = courtProceedingsList.map((proceeding: any) => {
			return {
				case_no: proceeding.case__case_no,
				crime_type: proceeding.case__crime_type,
				proceeding_schedule: moment(proceeding.proceeding_schedule).format(
					"ll"
				),
				start_time: moment(proceeding.start_time, "HH:mm").format("hh:mm A"),
				end_time: moment(proceeding.end_time, "HH:mm").format("hh:mm A"),
				status: proceeding.status,
				proceeding_type: proceeding.proceeding_type,
				remarks: proceeding.remarks,
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Court Hearings",
		});
		csvProocedings.length ? csvExporter.generateCsv(csvProocedings) : null;
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length > 0) {
			let filtered_values: any = _.filter(
				courtProceedingsList,
				function (proceeding: any) {
					return proceeding.case__case_no
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				}
			);
			setFilteredProceedings(filtered_values);
		} else {
			setFilteredProceedings(courtProceedingsList);
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
		const filteredValues: any = _.filter(courtProceedingsList, (proceeding) => {
			return (
				_.gte(
					moment(proceeding.proceeding_schedule).format("MM-DD-YYYY"),
					moment(selection.beginDate).format("MM-DD-YYYY")
				) &&
				_.lte(
					moment(proceeding.proceeding_schedule).format("MM-DD-YYYY"),
					moment(selection.endDate).format("MM-DD-YYYY")
				)
			);
		});
		setHasFilter(true);
		setFilteredProceedings(filteredValues);
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewProceeding
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedProceeding={selectedObject}
			/>
			<AddProceeding
				isShow={showAddModal}
				onConfirm={() => onSubmitNewProceeding()}
				onCancel={() => setShowAddModal(false)}
				selectOptions={currentDocketList}
			/>
			<UpdateProceeding
				isShow={showEditModal}
				onConfirm={() => onUpdateProceeding()}
				onCancel={() => setShowEditModal(false)}
				selectedProceeding={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Court Hearing"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="proceeding"
				onConfirm={() => onDeleteHearing()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Court Proceedings" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Court Proceedings
					</h4>
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportProceedings()} />
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
					<ProceedingsTable
						courtProceedings={filteredProceedings}
						onViewProceeding={(proceeding: any) =>
							onViewCourtProceeding(proceeding)
						}
						// onShowEdit={(proceeding: any) => onShowUpdateModal(proceeding)}
						// onShowWarning={(proceeding_id: number) =>
						// 	onShowDeleteModal(proceeding_id)
						// }
					/>
				)}
				{hasFilter && (
					<button
						className="self-end text-sm text-purple-400 hover:text-purple-600 hover:underline"
						onClick={() => {
							setFilteredProceedings(courtProceedingsList);
							setHasFilter(false);
						}}
					>
						Clear Filter
					</button>
				)}
			</div>
		</div>
	);
};

export default CourtProceedingsView;
