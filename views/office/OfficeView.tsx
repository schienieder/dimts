import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getOfficeDocuments, updateDocument } from "../../redux/dataSlice";
import { fieldRules } from "../../components/authHelper";
import InputWithSubmit from "../../components/InputWithSubmit";
import MoonLoader from "react-spinners/MoonLoader";
import OfficeDocumentsTable from "./OfficeDocumentsTable";
import SuccessModal from "../../components/SuccessModal";
import useCrudModals from "../../hooks/useCrudModals";
import db from "../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import _ from "lodash";

const OfficeView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, officeDocuments } = useAppSelector(
		(state) => state.dataState
	);
	const { userProfile } = useAppSelector((state) => state.authState);
	const { showSuccessModal, setShowSuccessModal } = useCrudModals();

	const collectionRef = collection(db, "activity-logs");

	const [trackerError, setTrackerError] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [filteredDocuments, setFilteredDocuments] = useState([]);

	const { handleSubmit, control } = useForm();

	useEffect(() => {
		dispatch(getOfficeDocuments()).then((res) => {
			setFilteredDocuments(res.payload);
		});
	}, []);

	const afterSubmission = useCallback(() => {
		dispatch(getOfficeDocuments()).then((res: any) =>
			setFilteredDocuments(res.payload)
		);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showSuccessModal]);

	const onSubmitQrTracker = (formData: any) => {
		const selectedDocument = officeDocuments.find(
			(doc: any) => doc.case__qr_code_tracker === formData.officeQrTracker
		);
		if (!selectedDocument) {
			setTrackerError(true);
			return;
		}
		setTrackerError(false);
		const data = {
			status: "Acknowledged",
		};
		dispatch(
			updateDocument({ formData: data, document_id: selectedDocument.id })
		).then(() => {
			const newActivity = {
				activity_description: `Mailed document has been acknowledged by the Office of ${userProfile?.first_name}`,
				activity_name: "Mailed Documents",
				activity_type: "document",
			};
			const activityRef = doc(collectionRef);
			try {
				setDoc(activityRef, newActivity);
			} catch (error) {
				console.log(error);
			}
			afterSubmission();
		});
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length) {
			let filtered_values: any = _.filter(
				officeDocuments,
				function (case_: any) {
					return case_.case__case_no
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				}
			);
			setFilteredDocuments(filtered_values);
		} else {
			setFilteredDocuments(officeDocuments);
		}
	};

	return (
		<div className="relative min-h-screen flex flex-col items-center gap-y-20 font-mont text-gray-700">
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Transfered Documents"
				successText="Document has been acknowledged"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<div className="w-[80%] bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg mt-10">
				<h4 className="text-xl font-black tracking-wider">
					{userProfile.first_name}
				</h4>
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				<div className="w-full flex flex-col items-center gap-y-5 py-5">
					<div className="flex items-center gap-x-5">
						<div className="w-20 border-b border-gray-400"></div>
						<p className="text-sm">Enter QR Code Tracker</p>
						<div className="w-20 border-b border-gray-400"></div>
					</div>
					<InputWithSubmit
						control={control}
						fieldType="text"
						fieldName="officeQrTracker"
						fieldRules={fieldRules.requiredRule}
						placeHolder="QR Code Tracker"
						onClickSubmit={handleSubmit(onSubmitQrTracker)}
					/>
					{trackerError && (
						<p className="w-96 text-xs text-rose-500 -mt-4">
							Invalid QR Code Tracker
						</p>
					)}
				</div>
			</div>
			<div className="w-[80%] bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="flex flex-row justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Transfered Documents
					</h4>
					<input
						type="text"
						placeholder="Search Case No."
						className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						onChange={handleChange}
						value={searchInput}
					/>
				</div>

				<div className="w-full border-b border-gray-200 -mt-3"></div>
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
					<OfficeDocumentsTable officeDocuments={filteredDocuments} />
				)}
			</div>
		</div>
	);
};

export default OfficeView;
