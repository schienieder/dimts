import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getCriminalCases,
	getCourtProceedings,
	deleteDocket,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import PrintButton from "../../../components/PrintButton";
import MoonLoader from "react-spinners/MoonLoader";
import CriminalCaseTable from "./CriminalCaseTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewCase from "../../../components/admin/ViewCase";
import AddCriminalCase from "../../../components/admin/AddCriminalCases";
import UpdateCase from "../../../components/admin/UpdateCase";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";
import _ from "lodash";
import { Router, useRouter } from "next/router";
import Paginator from "../../../components/Paginator";

const CriminalCaseListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, criminalCaseList, courtProceedingsList } =
		useAppSelector((state: any) => state.dataState);
	const router = useRouter();

	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		showEditModal,
		setShowEditModal,
		setShowSuccessModal,
		showWarningModal,
		setShowWarningModal,
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
	const [filteredCase, setFilteredCase] = useState([]);

	useEffect(() => {
		dispatch(getCriminalCases()).then((res: any) =>
			setFilteredCase(res.payload)
		);
		dispatch(getCourtProceedings());
	}, []);

	const onViewCriminalCase = (criminal_record: any) => {
		setSelectedObject(criminal_record);
		setViewModal(true);
	};

	const onSubmitNewCase = useCallback(() => {
		dispatch(getCriminalCases()).then((res: any) =>
			setFilteredCase(res.payload)
		);
		setSuccessText("Creation of new criminal record is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (crime_id: number) => {
		setSelectedID(crime_id);
		const crime = criminalCaseList.find((crime: any) => crime.id === crime_id);
		setSelectedObject({
			caseType: crime.type_of_case,
			caseNo: crime.case_no,
			caseDocTitle: crime.document_title,
			caseTitle: crime.case_title,
			caseCrimeType: crime.crime_type,
			caseReceived: crime.received_date,
			caseRaffled: crime.raffled_court,
			caseJudge: crime.judge_assigned,
		});
		setShowEditModal(true);
	};

	const onUpdateHearing = () => {
		dispatch(getCriminalCases()).then((res: any) =>
			setFilteredCase(res.payload)
		);
		setSuccessText("Updating of criminal record is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteCase = useCallback(() => {
		setSuccessText("Deletion of criminal record is successful");
		dispatch(deleteDocket(selectedID)).then(() => {
			dispatch(getCriminalCases()).then((res: any) =>
				setFilteredCase(res.payload)
			);
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	const onExportCases = () => {
		const csvCases = criminalCaseList.map((crime: any) => {
			return {
				case_no: crime.case_no,
				document_title: crime.document_title,
				case_title: crime.case_title,
				crime_type: crime.crime_type,
				received_date: moment(crime.received_date).format("ll"),
				raffled_court: crime.raffled_court,
				judge_assigned: crime.judge_assigned,
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Criminal Cases",
		});
		csvCases.length ? csvExporter.generateCsv(csvCases) : null;
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length) {
			let filtered_values: any = _.filter(
				criminalCaseList,
				function (case_: any) {
					return case_.case_no
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				}
			);
			setFilteredCase(filtered_values);
		} else {
			setFilteredCase(criminalCaseList);
		}
	};

	const [currentPage, setCurrentPage] = useState(1);

	const lastLogIndex = currentPage * 10;
	const firstLogIndex = lastLogIndex - 10;

	const currentDataLogs = useMemo(() => {
		return filteredCase.slice(firstLogIndex, lastLogIndex);
	}, [filteredCase, firstLogIndex, lastLogIndex]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewCase
				isShow={viewModal}
				viewTitle="Criminal Case"
				viewText="View criminal record details"
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
			/>
			<AddCriminalCase
				isShow={showAddModal}
				addTitle="Criminal Case"
				addText="Create new criminal record"
				onConfirm={() => onSubmitNewCase()}
				onCancel={() => setShowAddModal(false)}
			/>
			<UpdateCase
				isShow={showEditModal}
				updateTitle="Criminal Case"
				updateText="Update criminal record"
				onConfirm={() => onUpdateHearing()}
				onCancel={() => setShowEditModal(false)}
				caseType="Criminal"
				selectedID={selectedID}
				selectedCase={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Criminal Case"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="criminal case"
				onConfirm={() => onDeleteCase()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Criminal Case"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Criminal Cases" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Criminal Cases</h4>
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportCases()} />
						<AddNewButton
							btnText="New Case"
							onClickAdd={() => router.push(`/admin/add_case?type=Criminal`)}
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
					<CriminalCaseTable
						courtProceedings={courtProceedingsList}
						criminalCases={currentDataLogs}
						onShowWarning={(e: number) => onShowWarningModal(e)}
						onShowEdit={(crime_id: number) => onShowUpdateModal(crime_id)}
					/>
				)}
				<Paginator
					totalLogs={criminalCaseList.length}
					logsPerPage={10}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default CriminalCaseListView;
