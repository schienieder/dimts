import { useState } from "react";
import Link from "next/link";
import { fieldRules } from "../components/authHelper";
import MyInputField from "../components/MyInputField";
import PrimaryButton from "../components/PrimaryButton";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginAccount, getAccountDetails } from "../redux/authSlice";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import ErrorModal from "../components/ErrorModal";

const LoginView = () => {
	const { control, handleSubmit } = useForm();
	const dispatch = useAppDispatch();
	const { authLoading } = useAppSelector((state) => state.authState);

	const router = useRouter();
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorTitle, setErrorTitle] = useState("");
	const [errorDescription, setErrorDescription] = useState("");

	const onLoginUser = (formData: any) => {
		dispatch(loginAccount(formData))
			.then((res: any) => {
				if (res.payload) {
					const decoded: any = jwt_decode(res.payload.access);
					dispatch(getAccountDetails(decoded.user_id)).then((res) => {
						const userRole = res.payload?.role ?? "";
						if (userRole.includes("citizen") || userRole.includes("office")) {
							router.push(`/${userRole}`);
						} else {
							router.push(`/admin`);
						}
					});
				} else {
					setErrorTitle("Login Error");
					setErrorDescription(
						"Please check account credentials and login again."
					);
					setShowErrorModal(true);
					setTimeout(() => {
						setShowErrorModal(false);
					}, 3000);
				}
			})
			.catch((err) => {
				console.log("This is the error: ", err);
				setErrorTitle("Server Error");
				setErrorDescription(
					"There seems to be an error in our servers or your internet connection"
				);
				setShowErrorModal(true);
				setTimeout(() => {
					setShowErrorModal(false);
				}, 3000);
			});
	};

	if (authLoading) {
		return (
			<div className="w-full h-screen flex justify-center items-center font-mont">
				<div className="relative flex flex-col mb-5">
					<span className="absolute flex h-20 w-20">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-75"></span>
						<span className="relative flex justify-center items-center rounded-full h-20 w-20 bg-gradient-to-bl from-indigo-600 via-purple-500 to-purple-300 text-2xl lg:text-4xl text-white font-mont font-black tracking-wider">
							D
						</span>
					</span>
				</div>
				<h4 className="absolute top-[60%] left-[50%] text-base font-medium">
					Loading . . .
				</h4>
			</div>
		);
	}

	return (
		<div className="relative flexCenteredContainer overflow-hidden bg-login bg-cover bg-center">
			<ErrorModal
				isShow={showErrorModal}
				errorTitle={errorTitle}
				errorText={errorDescription}
				onConfirm={() => setShowErrorModal(false)}
			/>
			{/*  */}
			<div className="absolute w-full h-screen bg-indigo-300 opacity-70"></div>
			{/*  */}
			<div className="z-10 relative card bg-white w-[950px] h-[650px] grid grid-cols-2 rounded-xl">
				<div className="absolute left-5 flex gap-x-1 pt-10 pb-5 px-5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 48 48"
						className="w-5 h-5 text-purple-600"
					>
						<g fill="none">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="4"
								d="M11.075 37.08c-3.386 1.46-5.039 3.444-5.71 4.83c-.266.548.181 1.09.79 1.09h21.232c.742 0 1.212-.776.779-1.38c-1.75-2.438-4.384-3.977-5.777-4.552a.933.933 0 0 0-.357-.068h-10.57a.98.98 0 0 0-.387.08Z"
							/>
							<path
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="4"
								d="m14.732 18.856l5-8.66l8.66 5l-5 8.66z"
							/>
							<path
								fill="currentColor"
								d="m27.392 16.928l1-1.732a2 2 0 0 0-2.732.732l1.732 1Zm-3 5.196l-1.732-1a2 2 0 0 0 .732 2.732l1-1.732Zm2-3.464l12.99 7.5l2-3.464l-12.99-7.5l-2 3.464Zm11.99 9.232l-12.99-7.5l-2 3.464l12.99 7.5l2-3.464Zm-12.258-4.768l3-5.196l-3.464-2l-3 5.196l3.464 2Zm13.625 4.402a1 1 0 0 1-1.367.366l-2 3.464a5 5 0 0 0 6.83-1.83l-3.464-2Zm-.367-1.366a1 1 0 0 1 .367 1.366l3.464 2a5 5 0 0 0-1.83-6.83l-2 3.464Z"
							/>
							<rect
								width="14"
								height="6"
								x="21"
								y="4"
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="4"
								rx="3"
								transform="rotate(30 21 4)"
							/>
							<rect
								width="14"
								height="6"
								x="13"
								y="17.856"
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="4"
								rx="3"
								transform="rotate(30 13 17.856)"
							/>
						</g>
					</svg>
					<h4 className="text-xl text-purple-600 font-black tracking-widest">
						Dimts
					</h4>
				</div>
				{/*  */}
				<div className="flex flex-col justify-center items-center gap-y-8">
					<div className="flex flex-col gap-y-1 items-center">
						<h4 className="text-3xl font-black text-center">What&apos;s Up?</h4>
						<p className="text-sm">Sign in your account to proceed</p>
					</div>
					<MyInputField
						control={control}
						fieldLabel="Username"
						fieldType="text"
						fieldName="loginUsername"
						fieldRules={fieldRules.requiredRule}
						placeHolder="john_doe_123"
					/>
					<div className="flex flex-col gap-y-3">
						<MyInputField
							control={control}
							fieldLabel="Password"
							fieldType="password"
							fieldName="loginPassword"
							fieldRules={fieldRules.requiredRule}
							placeHolder="************"
						/>
						<div className="border-b border-gray-300"></div>
						<div className="flex text-sm gap-x-1">
							<p>Not registered?</p>
							<Link href="/register">
								<span className="text-purple-600 font-medium cursor-pointer">
									Create Account
								</span>
							</Link>
						</div>
					</div>
					<PrimaryButton
						btnText="Sign In"
						onClickButton={handleSubmit(onLoginUser)}
					/>
				</div>
				{/*  */}
				<div className="bg-login bg-cover bg-center rounded-tr-xl rounded-br-xl"></div>
			</div>
			{/*  */}
		</div>
	);
};

export default LoginView;
