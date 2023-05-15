import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import AddNewButton from "../../../components/AddNewButton";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BuCorTable from "./BuCorTable";
import { deleteDetainee, getBuCorDetainees } from "../../../redux/dataSlice";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import AddRecord from "../../../components/admin/AddRecord";
import ViewRecord from "../../../components/admin/ViewRecord";
import UpdateRecord from "../../../components/admin/UpdateRecord";
import _ from "lodash";

const BuCorView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, bucorRecords } = useAppSelector(
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
	const [filteredBuCor, setFilteredBuCor] = useState([]);

	const onViewRecord = (criminal_record: any) => {
		setSelectedObject(criminal_record);
		setViewModal(true);
	};

	const onShowUpdateModal = (record_id: number) => {
		setSelectedID(record_id);
		const record = bucorRecords.find(
			(bjmp_record: any) => bjmp_record.id === record_id
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
		});
		setShowEditModal(true);
	};

	const onUpdateHearing = () => {
		dispatch(getBuCorDetainees()).then((res: any) =>
			setFilteredBuCor(res.payload)
		);
		setSuccessText("Updating of Bucor record is successful");
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
		setSuccessText("Deletion of Bucor record is successful");
		dispatch(deleteDetainee(selectedID)).then(() => {
			dispatch(getBuCorDetainees()).then((res: any) =>
				setFilteredBuCor(res.payload)
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
		if (e.target.value.length) {
			let filtered_values: any = _.filter(bucorRecords, function (bucor: any) {
				return bucor.name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setFilteredBuCor(filtered_values);
		} else {
			setFilteredBuCor(bucorRecords);
		}
	};

	useEffect(() => {
		dispatch(getBuCorDetainees()).then((res: any) => {
			setFilteredBuCor(res.payload);
		});
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewRecord
				isShow={viewModal}
				viewTitle="Bucor Custody"
				viewText="View BuCor record details"
				onClose={() => setViewModal(false)}
				selectedRecord={selectedObject}
			/>
			<UpdateRecord
				isShow={showEditModal}
				editTitle="BuCor Custody"
				editText="Update BuCor record"
				onConfirm={() => onUpdateHearing()}
				onCancel={() => setShowEditModal(false)}
				selectedRecord={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="BuCor Custody"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="BuCor record"
				onConfirm={() => onDeleteRecord()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="BuCor Custody"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="BuCor" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="flex  justify-between">
					<h4 className="text-xl font-black tracking-wider">BuCor Custody</h4>
					<input
						type="text"
						placeholder="Search Name"
						className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						onChange={handleChange}
						value={searchInput}
					/>
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
					<BuCorTable
						bucorRecords={filteredBuCor}
						onViewRecord={(record: any) => onViewRecord(record)}
						onShowWarning={(record_id: number) => onShowWarningModal(record_id)}
						onShowEdit={(record_id: number) => onShowUpdateModal(record_id)}
					/>
				)}
			</div>
		</div>
	);
};

export default BuCorView;
