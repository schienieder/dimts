import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteDocket,
	getPastDockets,
	newDockets,
} from "../../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import DocketListTable from "./DocketListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewDocket from "../../../components/admin/ViewDocket";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import PrintButton from "../../../components/PrintButton";
import moment from "moment";
import { ExportToCsv } from "export-to-csv";
import _ from "lodash";
import ImportButton from "../../../components/ImportButton";
import CommonModal from "../../../components/CommonModal";
import { read, utils } from "xlsx";
import { useDropzone } from "react-dropzone";
import Paginator from "../../../components/Paginator";

const CitizenListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, pastDocketList } = useAppSelector(
		(state) => state.dataState
	);

	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showSuccessModal,
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
	const [filteredDocket, setFilteredDocket] = useState<any>([]);
	const [filterWithType, setFilterWithType] = useState<any>([]);
	const [isSolved, setIsSolved] = useState(0);
	const [importedData, setImportedData] = useState<any>([]);
	const [importedFileName, setImportedFileName] = useState<any>("");
	const [showLoading, setShowLoading] = useState(false);

	const onUploadExcel: any = useCallback((uploadedFile: any) => {
		const file = uploadedFile;
		const reader = new FileReader();

		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result);
			const workbook = read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const json = utils.sheet_to_json(worksheet);
			const formattedJson = json.map((data: any) => {
				return {
					type_of_case: data.type_of_case,
					case_no: data.case_no,
					document_title: data.document_title,
					case_title: data.case_title,
					crime_type: data.crime_type,
					received_date: moment(data.received_date).format("YYYY-MM-DD"),
					raffled_court: data.raffled_court,
					judge_assigned: data.judge_assigned,
					qr_code: data.qr_code,
					qr_code_tracker: data.qr_code_tracker,
					is_closed: true,
					is_solved: data.is_solved,
				};
			});

			// Use the json data in your application
			setImportedData(formattedJson);
			console.log("Excel file data: ", formattedJson);
		};

		reader.readAsArrayBuffer(file);
	}, []);

	const onDropDocument = useCallback(
		(files: any) => {
			console.log("Dropped doc: ", files);
			setImportedFileName(files[0].path);
			onUploadExcel(files[0]);
		},
		[onUploadExcel]
	);

	const {
		acceptedFiles: acceptedDocumentFiles,
		getRootProps: getDocumentRootProps,
		getInputProps: getDocumentInputProps,
	} = useDropzone({
		accept: {
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
			"application/vnd.ms-excel": [],
			"text/csv": [],
		},
		onDrop: onDropDocument,
	});

	const handleRemoveDocument = () => {
		acceptedDocumentFiles.pop();
		setImportedData([]);
		setImportedFileName("");
	};

	useEffect(() => {
		dispatch(getPastDockets()).then((res: any) =>
			setFilteredDocket(res.payload)
		);
	}, []);

	const onViewDocketCase = (criminal_record: any) => {
		setSelectedObject(criminal_record);
		setViewModal(true);
	};

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteCase = useCallback(() => {
		setSuccessText("Deletion of docket record is successful");
		dispatch(deleteDocket(selectedID)).then(() => {
			dispatch(getPastDockets()).then((res: any) =>
				setFilteredDocket(res.payload)
			);
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	const onFilterCases = (status: number) => {
		switch (status) {
			case 0:
				setFilterWithType(pastDocketList);
				let noFilterValues = _.filter(filterWithType, function (docket: any) {
					return docket.case_no.includes(searchInput);
				});
				setFilteredDocket(noFilterValues);
				break;
			case 1:
				setFilterWithType(pastDocketList);
				let solvedValues = _.filter(filterWithType, function (docket: any) {
					return docket.is_solved;
				});
				setFilteredDocket(solvedValues);
				break;
			case 2:
				setFilterWithType(pastDocketList);
				let notSolvedValues = _.filter(filterWithType, function (docket: any) {
					return !docket.is_solved;
				});
				setFilteredDocket(notSolvedValues);
				break;
			default:
				console.log("Unknown value");
				break;
		}
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length > 0) {
			let filtered_values: any = _.filter(
				pastDocketList,
				function (docket: any) {
					return docket.case_no
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				}
			);
			setFilteredDocket(filtered_values);
		} else {
			setFilteredDocket(pastDocketList);
		}
	};

	const caseStatusSelection = (status: number): void => {
		setIsSolved(Number(status));
		onFilterCases(Number(status));
	};

	const onExportCases = () => {
		const csvCases = pastDocketList.map((docket: any) => {
			return {
				case_no: docket.case_no,
				type_of_case: docket.type_of_case,
				document_title: docket.document_title,
				case_title: docket.case_title,
				crime_type: docket.crime_type,
				received_date: moment(docket.received_date).format("ll"),
				raffled_court: docket.raffled_court,
				judge_assigned: docket.judge_assigned,
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Docket Cases",
		});
		csvCases.length ? csvExporter.generateCsv(csvCases) : null;
	};

	const onCompleteImport = () => {
		setTimeout(() => {
			setShowLoading(false);
			setShowAddModal(false);
			setImportedData([]);
			setImportedFileName("");
			setTimeout(() => {
				location.reload();
			}, 500);
		}, 1000);
	};

	const onSubmitImport = () => {
		setShowLoading(true);
		dispatch(newDockets(importedData)).then(() => {
			onCompleteImport();
		});
	};

	const [currentPage, setCurrentPage] = useState(1);

	const lastLogIndex = currentPage * 10;
	const firstLogIndex = lastLogIndex - 10;

	const currentDataLogs = useMemo(() => {
		return filteredDocket.slice(firstLogIndex, lastLogIndex);
	}, [filteredDocket, firstLogIndex, lastLogIndex]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<CommonModal
				isShow={showAddModal}
				commonTitle="Docket Case"
				commonText="Import docket data"
				submitButtonText="Submit"
				onSubmitModal={onSubmitImport}
				onCloseModal={() => setShowAddModal(false)}
				loadingState={showLoading}
			>
				<div className="w-96 flex justify-center items-center">
					{/* <div className="flex flex-col gap-y-1">
						<label className="font-semibold text-sm text-gray-700">
							Excel File
						</label>
						<input
							type="file"
							id="docketXlsx"
							name="docketXlsx"
							className="bg-gray-100 px-3 py-1 w-full focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
							onChange={onUploadExcel}
						/>
					</div> */}
					{importedData.length ? (
						<div className="w-full relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center">
							<button
								type="button"
								onClick={handleRemoveDocument}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="absolute h-6 w-6 top-5 right-5 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
							<div className="flex items-center gap-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-purple-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="font-int text-xs text-purple-600">
									{importedFileName}
								</p>
							</div>
						</div>
					) : (
						<div
							className={`w-full relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center`}
							{...getDocumentRootProps()}
						>
							<input
								{...getDocumentInputProps()}
								className="w-full h-full"
							/>
							<p className="font-int text-sm text-gray-600 font-light">
								Drop files here or{" "}
								<span className="text-purple-600 font-medium cursor-pointer">
									browse
								</span>
							</p>
						</div>
					)}
				</div>
			</CommonModal>
			<ViewDocket
				isShow={viewModal}
				viewTitle="Docket Case"
				viewText="View docket record details"
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="docket case"
				onConfirm={() => onDeleteCase()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<AdminBreadCrumbs activeText="Docket Cases" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Docket Cases</h4>
					<div className="flex gap-x-5 items-center">
						<ImportButton onClickImport={() => setShowAddModal(true)} />
						<PrintButton onClickPrint={() => onExportCases()} />
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
					<DocketListTable
						pastDocketList={filteredDocket}
						onViewDocket={(docket_record: any) =>
							onViewDocketCase(docket_record)
						}
						onShowWarning={(e: number) => onShowWarningModal(e)}
					/>
				)}
				<div className="w-full flex justify-between">
					<Paginator
						totalLogs={pastDocketList.length}
						logsPerPage={10}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					<select
						className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
						onChange={(e: any) => caseStatusSelection(e.target.value)}
						defaultValue={isSolved}
					>
						<option value={0}>All Cases</option>
						<option value={1}>Solved Cases</option>
						<option value={2}>Unsolved Cases</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default CitizenListView;
