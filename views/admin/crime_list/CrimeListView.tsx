import React, { useState, useEffect, useMemo } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import AddNewButton from "../../../components/AddNewButton";
import CrimeListTable from "./CrimeListTable";
import Paginator from "../../../components/Paginator";
import { MoonLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCrimeList } from "../../../redux/dataSlice";
import AddCrime from "../../../components/admin/AddCrime";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

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

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	useEffect(() => {
		dispatch(getCrimeList()).then((res) => {
			setFilteredCrimeList(res.payload);
		});
	}, []);

	const [currentPage, setCurrentPage] = useState(1);

	const lastLogIndex = currentPage * 10;
	const firstLogIndex = lastLogIndex - 10;

	const currentCrimeList = useMemo(() => {
		return filteredCrimeList.slice(firstLogIndex, lastLogIndex);
	}, [filteredCrimeList, firstLogIndex, lastLogIndex]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AddCrime
				isShow={showAddModal}
				onConfirm={() => console.log("Justine Gwapo")}
				onCancel={() => setShowAddModal(false)}
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
					<CrimeListTable
						crimeList={currentCrimeList}
						// civilCases={currentDataLogs}
						// onShowWarning={(civil_id: number) => onShowWarningModal(civil_id)}
						// onShowEdit={(civild_id: number) => onShowUpdateModal(civild_id)}
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
