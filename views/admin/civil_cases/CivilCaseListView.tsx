import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteDocket,
	getCivilCases,
	getCourtProceedings,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import PrintButton from "../../../components/PrintButton";
import MoonLoader from "react-spinners/MoonLoader";
import CivilCaseTable from "./CivilCaseTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
// import ViewCase from "../../../components/admin/ViewCase";
import UpdateCase from "../../../components/admin/UpdateCase";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import moment from "moment";
import { ExportToCsv } from "export-to-csv";
import AddCivilCase from "../../../components/admin/AddCivilCases";
import _ from "lodash";
import { useRouter } from "next/router";
import Paginator from "../../../components/Paginator";

const CivilCaseListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, civilCaseList, courtProceedingsList } = useAppSelector(
		(state: any) => state.dataState
	);
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
	const [filteredCivilCase, setFilteredCivilCase] = useState([]);

	const onViewCivilCase = (civil_record: any) => {
		setSelectedObject(civil_record);
		console.log("Civil record: ", civil_record);
		console.log("Selected object: ", selectedObject);
		setViewModal(true);
	};

	const onSubmitNewCase = useCallback(() => {
		dispatch(getCivilCases()).then((res: any) =>
			setFilteredCivilCase(res.payload)
		);
		setSuccessText("Creation of new civil record is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (crime_id: number) => {
		setSelectedID(crime_id);
		const crime = civilCaseList.find((crime: any) => crime.id === crime_id);
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

	const onUpdateCase = () => {
		dispatch(getCivilCases()).then((res: any) =>
			setFilteredCivilCase(res.payload)
		);
		setSuccessText("Updating of civil record is successful");
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
		setSuccessText("Deletion of civil record is successful");
		dispatch(deleteDocket(selectedID)).then(() => {
			dispatch(getCivilCases()).then((res: any) =>
				setFilteredCivilCase(res.payload)
			);
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	useEffect(() => {
		dispatch(getCivilCases()).then((res: any) =>
			setFilteredCivilCase(res.payload)
		);
		dispatch(getCourtProceedings());
	}, []);

	const onExportCases = () => {
		const csvCases = civilCaseList.map((crime: any) => {
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
			filename: "Civil Cases",
		});
		csvCases.length ? csvExporter.generateCsv(csvCases) : null;
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length) {
			let filtered_values: any = _.filter(civilCaseList, function (case_: any) {
				return case_.case_no
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setFilteredCivilCase(filtered_values);
		} else {
			setFilteredCivilCase(civilCaseList);
		}
	};

	const [currentPage, setCurrentPage] = useState(1);

	const lastLogIndex = currentPage * 10;
	const firstLogIndex = lastLogIndex - 10;

	const currentDataLogs = useMemo(() => {
		return filteredCivilCase.slice(firstLogIndex, lastLogIndex);
	}, [filteredCivilCase, firstLogIndex, lastLogIndex]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			{/* <ViewCase
				isShow={viewModal}
				viewTitle="Civil Case"
				viewText="View civil record details"
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
			/> */}
			<AddCivilCase
				isShow={showAddModal}
				addTitle="Civil Case"
				addText="Create new civil record"
				onConfirm={() => onSubmitNewCase()}
				onCancel={() => setShowAddModal(false)}
			/>
			<UpdateCase
				isShow={showEditModal}
				updateTitle="Civil Case"
				updateText="Update civil record"
				onConfirm={() => onUpdateCase()}
				onCancel={() => setShowEditModal(false)}
				caseType="Civil"
				selectedID={selectedID}
				selectedCase={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Civil Case"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="civil case"
				onConfirm={() => onDeleteCase()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Civil Case"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Civil Cases" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Civil Cases</h4>
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportCases()} />
						<AddNewButton
							btnText="New Case"
							onClickAdd={() => router.push(`/admin/add_case?type=Civil`)}
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
					<CivilCaseTable
						courtProceedings={courtProceedingsList}
						civilCases={currentDataLogs}
						onShowWarning={(civil_id: number) => onShowWarningModal(civil_id)}
						onShowEdit={(civild_id: number) => onShowUpdateModal(civild_id)}
					/>
				)}
				<Paginator
					totalLogs={civilCaseList.length}
					logsPerPage={10}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default CivilCaseListView;
