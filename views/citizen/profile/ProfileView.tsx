import { useCallback, useEffect, useState } from "react";
import CitizenBreadCrumbs from "../../../components/citzen/CitizenBreadCrumbs";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUserInfo } from "../../../redux/dataSlice";
import ProfileFormView from "./ProfileFormView";
import useCrudModals from "../../../hooks/useCrudModals";
import SuccessModal from "../../../components/SuccessModal";

const ProfileView = () => {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.dataState);

	const { showSuccessModal, setShowSuccessModal } = useCrudModals();

	useEffect(() => {
		const user: any = jwtDecode(localStorage.jwt_token);
		dispatch(getUserInfo(user.user_id));
	}, []);

	const onSubmitForm = () => {
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Citizen Account"
				successText="Updating of citizen account is successful"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<CitizenBreadCrumbs activeText="Identification" />
			{/*  */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 px-5 pt-5 pb-16 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex flex-col justify-between items-center gap-y-5">
					<h4 className="self-start text-xl font-black tracking-wider mb-5">
						Identification
					</h4>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					<ProfileFormView
						userInfo={userInfo}
						onSubmitForm={onSubmitForm}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileView;
