import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteAccount, getCitizenList } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import CitizenListTable from "./CitizenListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewCitizen from "../../../components/admin/ViewCitizen";
import RegisterCitizen from "../../../components/admin/RegisterCitizen";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import _ from "lodash";

const CitizenListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, citizenList } = useAppSelector(
		(state: any) => state.dataState
	);
	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		setShowSuccessModal,
		showDeleteModal,
		setShowDeleteModal,
	} = useCrudModals();
	const { selectedID, setSelectedID, selectedObject, setSelectedObject } =
		useModalIDs();
	const [searchInput, setSearchInput] = useState("");
	const [filteredCitizen, setFilteredCitizen] = useState([]);

	useEffect(() => {
		dispatch(getCitizenList()).then((res: any) => {
			setFilteredCitizen(res.payload);
		});
	}, []);

	const onViewCitizen = useCallback(
		(selectedCitizen: any) => {
			setSelectedObject(selectedCitizen);
			setViewModal(true);
		},
		[selectedObject, viewModal]
	);

	const onSubmitNewAccount = useCallback(() => {
		dispatch(getCitizenList()).then((res: any) => {
			setFilteredCitizen(res.payload);
		});
		setFilteredCitizen(citizenList);
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 2000);
	}, [showAddModal]);

	const onShowDeleteModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowDeleteModal(true);
	};

	const onDeleteAccount = () => {
		dispatch(deleteAccount(selectedID)).then(() => {
			dispatch(getCitizenList()).then((res: any) => {
				setFilteredCitizen(res.payload);
			});
			setShowDeleteModal(false);
		});
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length) {
			let filtered_values: any = _.filter(citizenList, function (citizen: any) {
				const citizen_name = `${citizen.first_name} ${citizen.last_name}`;
				return citizen_name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setFilteredCitizen(filtered_values);
		} else {
			setFilteredCitizen(citizenList);
		}
	};

	return (
		<div className="relative flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewCitizen
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedCitizen={selectedObject}
			/>
			<RegisterCitizen
				isShow={showAddModal}
				onConfirm={() => onSubmitNewAccount()}
				onCancel={() => setShowAddModal(false)}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Citizen Account"
				successText="New citizen account registered successfully"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="citizen account"
				onConfirm={() => onDeleteAccount()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Citizen Accounts" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Citizen Accounts
					</h4>
					<div className="flex flex-row gap-x-3">
						<AddNewButton
							btnText="New Citizen"
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
					<CitizenListTable
						citizenList={filteredCitizen}
						onViewCitizen={(selectedCitizen: any) =>
							onViewCitizen(selectedCitizen)
						}
						onShowWarning={(e: number) => onShowDeleteModal(e)}
					/>
				)}
			</div>
		</div>
	);
};

export default CitizenListView;
