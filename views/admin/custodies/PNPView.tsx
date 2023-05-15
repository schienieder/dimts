import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import AddNewButton from "../../../components/AddNewButton";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PNPTable from "./PNPTable";
import {
	deleteDetainee,
	getAllDetainees,
	getPNPDetainees,
	getAllDockets,
} from "../../../redux/dataSlice";
import ViewRecord from "../../../components/admin/ViewRecord";
import AddRecord from "../../../components/admin/AddRecord";
import UpdateRecord from "../../../components/admin/UpdateRecord";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import _ from "lodash";

const PNPView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, allDocketList, allRecords } = useAppSelector(
		(state) => state.dataState
	);

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
	const [filteredCustody, setFilteredCustody] = useState([]);

	useEffect(() => {
		dispatch(getAllDetainees()).then((res: any) => {
			setFilteredCustody(res.payload);
		});
		dispatch(getAllDockets());
	}, []);

	const custodySelection = (detained: string): void => {
		if (detained.toLowerCase() === "all") {
			setFilteredCustody(allRecords);
			return;
		}
		const filteredDetainees = allRecords.filter(
			(record: any) => record.detained_in === detained
		);
		setFilteredCustody(filteredDetainees);
	};

	const onViewRecord = (criminal_record: any) => {
		setSelectedObject(criminal_record);
		setViewModal(true);
	};

	const onSubmitNewRecord = useCallback(() => {
		dispatch(getAllDetainees()).then((res: any) =>
			setFilteredCustody(res.payload)
		);
		setSuccessText("Creation of new pnp record is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (record_id: number) => {
		setSelectedID(record_id);
		const record = allRecords.find(
			(pnp_record: any) => pnp_record.id === record_id
		);
		setSelectedObject({
			recordID: record.id,
			recordName: record.name,
			recordDateArrived: record.date_arrived,
			recordDateReleased: record.date_released,
			recordPersonnel: record.assigned_personnel,
			recordDetained: record.detained_in,
			recordCase: record.case__case_no,
			recordRemarks: record.remarks,
			recordHeight: record.height,
			recordWeight: record.weight,
			recordBirthdate: record.birthdate,
			recordBloodType: record.blood_type,
			recordAddress: record.address,
		});
		setShowEditModal(true);
	};

	const onUpdateHearing = () => {
		dispatch(getAllDetainees()).then((res: any) =>
			setFilteredCustody(res.payload)
		);
		setSuccessText("Updating of pnp record is successful");
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

	const onDeleteRecord = useCallback(() => {
		setSuccessText("Deletion of pnp record is successful");
		dispatch(deleteDetainee(selectedID)).then(() => {
			dispatch(getAllDetainees()).then((res: any) =>
				setFilteredCustody(res.payload)
			);
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length > 0) {
			let filtered_values: any = _.filter(allRecords, function (pnp: any) {
				return pnp.name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setFilteredCustody(filtered_values);
		} else {
			setFilteredCustody(allRecords);
		}
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewRecord
				isShow={viewModal}
				viewTitle="Custody"
				viewText="View pnp record details"
				onClose={() => setViewModal(false)}
				selectedRecord={selectedObject}
			/>
			<AddRecord
				isShow={showAddModal}
				addTitle="Custody"
				addText="Create new custody record"
				detainedIn="pnp"
				onConfirm={() => onSubmitNewRecord()}
				onCancel={() => setShowAddModal(false)}
				selectOptions={allDocketList}
			/>
			<UpdateRecord
				isShow={showEditModal}
				editTitle="Custody"
				editText="Update custody record"
				onConfirm={() => onUpdateHearing()}
				onCancel={() => setShowEditModal(false)}
				selectedRecord={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Custody"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="record"
				onConfirm={() => onDeleteRecord()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Custody"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Custodies" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Custodies</h4>
					<div className="flex flex-row gap-x-3">
						<AddNewButton
							btnText="New Record"
							onClickAdd={() => setShowAddModal(true)}
						/>
						<input
							type="text"
							placeholder="Search Name"
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
					<PNPTable
						detaineeRecords={filteredCustody}
						onViewRecord={(record: any) => onViewRecord(record)}
						onShowWarning={(record_id: number) => onShowWarningModal(record_id)}
						onShowEdit={(record_id: number) => onShowUpdateModal(record_id)}
					/>
				)}
				{allRecords.length > 0 && (
					<div className="w-full flex justify-end">
						<select
							className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
							onChange={(e: any) => custodySelection(e.target.value)}
						>
							<option value="all">Show All</option>
							<option value="pnp">PNP</option>
							<option value="bjmp">BJMP</option>
							<option value="bucor">Bucor</option>
						</select>
					</div>
				)}
			</div>
		</div>
	);
};

export default PNPView;
