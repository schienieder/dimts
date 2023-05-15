import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getPastDockets,
	getCitizenList,
	criminalCaseCitizens,
	deleteCaseCitizen,
	getCaseProceedings,
	docketCaseCitizens,
} from "../../../redux/dataSlice";
import { useRouter } from "next/router";
import moment from "moment";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
// import CaseCitizensTable from "./CaseCitizensTable";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import UpdateDocket from "../../../components/admin/UpdateDocket";
import SuccessModal from "../../../components/SuccessModal";
import CaseCitizensTable from "./CaseCitizensTable";
import CaseProceedingsTable from "./CaseProceedingsTable";

const CaseView = () => {
	const dispatch = useAppDispatch();
	const {
		dataLoading,
		pastDocketList,
		docketCaseCitizensList,
		caseProceedingsList,
	} = useAppSelector((state) => state.dataState);
	const [caseDetails, setCaseDetails] = useState<any>({});

	const router = useRouter();
	const { case_id } = router.query;

	const {
		showSuccessModal,
		setShowSuccessModal,
		showEditModal,
		setShowEditModal,
		showWarningModal,
		setShowWarningModal,
		showDeleteModal,
		setShowDeleteModal,
	} = useCrudModals();

	const { selectedID, setSelectedID, successText, setSuccessText } =
		useModalIDs();

	useEffect(() => {
		dispatch(getPastDockets());
		dispatch(getCitizenList());
		dispatch(docketCaseCitizens(Number(case_id)));
		if (case_id) {
			let selectedCase = pastDocketList.find(
				(case_: any) => case_.id === Number(case_id)
			);
			setCaseDetails(selectedCase);
			dispatch(getCaseProceedings(selectedCase.case_no));
		}
	}, []);

	const onUpdate = useCallback(() => {
		dispatch(getPastDockets());
		setCaseDetails(
			pastDocketList.find((case_: any) => case_.id === Number(case_id))
		);
		setSuccessText("New case citizen(s) has been added");
		setShowEditModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
			router.replace("/admin/docket_cases");
		}, 3000);
	}, [showEditModal]);

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteCase = useCallback(() => {
		setSuccessText("Deletion of case citizen is successful");
		dispatch(deleteCaseCitizen(selectedID)).then(() => {
			dispatch(criminalCaseCitizens(Number(case_id)));
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<UpdateDocket
				isShow={showEditModal}
				onConfirm={() => onUpdate()}
				onCancel={() => setShowEditModal(false)}
				selectedID={caseDetails.id}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Docket Case"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<div className="w-full flex justify-between">
				<AdminBreadCrumbs activeText={caseDetails.case_no} />
				{/*  */}
				<div
					className="flex justify-center items-center gap-x-1 hover:cursor-pointer"
					onClick={() => router.back()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 text-purple-500"
					>
						<path
							fillRule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-purple-500 text-sm">Back</p>
				</div>
			</div>
			{/*  */}
			<div className="w-full grid grid-cols-2 gap-x-5 items-start">
				<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg flex flex-col gap-y-5">
					<div className="flex justify-between items-center">
						<h4 className="text-xl font-black tracking-wider">Case Details</h4>
						<button
							type="button"
							className={`bg-purple-600 hover:bg-purple-500 px-3 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 flex items-center gap-x-2`}
							onClick={() => setShowEditModal(true)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m6-6H6"
								/>
							</svg>
							<p className="text-sm tracking-wider">Reopen</p>
						</button>
					</div>
					{/*  */}
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					{/*  */}
					<div className="w-full h-72 flex flex-col justify-center items-center my-5">
						<p className="text-base font-bold my-2">{caseDetails.case_no}</p>
						<img
							src={caseDetails.qr_code}
							className="max-w-full h-full"
							alt="QRcode"
						/>
						<p className="text-sm font-medium my-2">
							{caseDetails.qr_code_tracker}
						</p>
					</div>
					{/*  */}
					<div className="w-full grid grid-cols-2 justify-items-center">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Document Title</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.document_title}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Case Title</h4>
							<p className="text-sm text-gray-500">{caseDetails.case_title}</p>
						</div>
					</div>
					{/*  */}
					<div className="grid grid-cols-2 justify-items-center mb-3">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Crime Type</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.crime_type !== undefined &&
								caseDetails?.crime_type.includes("[")
									? caseDetails.crime_type.slice(1, -1).replace(/['"]+/g, "")
									: caseDetails.crime_type}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Received Date</h4>
							<p className="text-sm text-gray-500">
								{moment(caseDetails.received_date).format("ll")}
							</p>
						</div>
					</div>
					{/*  */}
					<div className="w-full grid grid-cols-2 justify-items-center">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Raffled Court</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.raffled_court}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Judge Assigned</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.judge_assigned}
							</p>
						</div>
					</div>
					{/*  */}
					<div className="w-full grid grid-cols-2 justify-items-center">
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Case Solved</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.is_solved === true ? "Yes" : "No"}
							</p>
						</div>
						<div className="w-[200px] flex flex-col gap-y-1">
							<h4 className="font-bold">Imprisonment</h4>
							<p className="text-sm text-gray-500">
								{caseDetails.imprisonment_span} Year(s)
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg flex flex-col gap-y-5">
					<div className="w-full flex justify-between items-center">
						<h4 className="text-xl font-black tracking-wider">Citizens</h4>
					</div>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					{!dataLoading && (
						<CaseCitizensTable caseCitizensList={docketCaseCitizensList} />
					)}
				</div>
			</div>
			{/*  */}
			<div className="bg-white p-5 shadow border-b border-gray-200 rounded-lg flex flex-col gap-y-5">
				<h4 className="text-xl font-black tracking-wider">Proceedings</h4>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				<CaseProceedingsTable caseProceedingsList={caseProceedingsList} />
			</div>
		</div>
	);
};

export default CaseView;
