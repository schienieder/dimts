import React, { useState, useEffect, useMemo, useCallback } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import AddNewButton from "../../../components/AddNewButton";
import CrimeListTable from "./CrimeListTable";
import Paginator from "../../../components/Paginator";
import { MoonLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteCrime, getCrimeList } from "../../../redux/dataSlice";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import _ from "lodash";
import AddCrime from "../../../components/admin/AddCrime";
import UpdateCrime from "../../../components/admin/UpdateCrime";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";

const CrimeListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, crimeList } = useAppSelector((state) => state.dataState);

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
	const [filteredCrimeList, setFilteredCrimeList] = useState([]);

	const onSubmitNewCrime = useCallback(() => {
		dispatch(getCrimeList()).then((res: any) => {
			setFilteredCrimeList(res.payload);
			setSearchInput("");
		});
		setSuccessText("Creation of new crime record is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (crime_id: number) => {
		setSelectedID(crime_id);
		const crime = crimeList.find((crime: any) => crime.id === crime_id);
		setSelectedObject({
			crimeId: crime.id,
			crimeType: crime.crime_type,
			penaltyItems: JSON.parse(crime.penalty_items),
			penaltySentences: JSON.parse(crime.penalty_sentences),
			caseType: crime.case_type,
		});
		setShowEditModal(true);
	};

	const onUpdateCrime = () => {
		dispatch(getCrimeList()).then((res: any) => {
			setFilteredCrimeList(res.payload);
			setSearchInput("");
		});
		setSuccessText("Updating of crime record is successful");
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

	const onDeleteCrime = useCallback(() => {
		setSuccessText("Deletion of civil record is successful");
		dispatch(deleteCrime(selectedID)).then(() => {
			dispatch(getCrimeList()).then((res: any) => {
				setFilteredCrimeList(res.payload);
				setSearchInput("");
			});
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
			let filtered_values: any = _.filter(crimeList, function (crime: any) {
				return crime.crime_type
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setFilteredCrimeList(filtered_values);
		} else {
			setFilteredCrimeList(crimeList);
		}
	};

	useEffect(() => {
		dispatch(getCrimeList()).then((res: any) => {
			setFilteredCrimeList(res.payload.crimeList);
		});
	}, []);

	const [currentPage, setCurrentPage] = useState(1);

	const lastLogIndex = currentPage * 10;
	const firstLogIndex = lastLogIndex - 10;

	const currentCrimeList = useMemo(() => {
		return !dataLoading
			? filteredCrimeList.slice(firstLogIndex, lastLogIndex)
			: [];
	}, [dataLoading, filteredCrimeList, firstLogIndex, lastLogIndex]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AddCrime
				isShow={showAddModal}
				onConfirm={() => onSubmitNewCrime()}
				onCancel={() => setShowAddModal(false)}
			/>
			<UpdateCrime
				isShow={showEditModal}
				onConfirm={() => onUpdateCrime()}
				onCancel={() => setShowEditModal(false)}
				selectedCrime={selectedObject}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="crime record"
				onConfirm={() => onDeleteCrime()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Crime List"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Crime List"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<AdminBreadCrumbs activeText="Crime List" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Crime List</h4>
					<div className="flex gap-x-5 items-center">
						<AddNewButton
							btnText="New Crime"
							onClickAdd={() => setShowAddModal(true)}
						/>
						<input
							type="text"
							placeholder="Search Crime Type"
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
					<CrimeListTable
						crimeList={currentCrimeList}
						onShowEdit={(civild_id: number) => onShowUpdateModal(civild_id)}
						onShowWarning={(civil_id: number) => onShowWarningModal(civil_id)}
					/>
				)}
				<Paginator
					totalLogs={crimeList.length}
					logsPerPage={10}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default CrimeListView;
