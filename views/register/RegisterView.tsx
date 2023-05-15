import { useState } from "react";
import { useSelector } from "react-redux";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import RegisterModal from "../../components/SuccessfulRegisterModal";

const RegisterView = () => {
	const { currentStep } = useSelector((state: any) => state.authState);
	const [showModal, setShowModal] = useState(false);

	const stepContent = (step: number) => {
		switch (step) {
			case 0:
				return <Step1 />;
			case 1:
				return <Step2 />;
			case 2:
				return <Step3 isShowModal={() => setShowModal(!showModal)} />;
			default:
				return "Unknown Step";
		}
	};

	return (
		<div className="relative flexCenteredContainer overflow-hidden bg-register bg-cover bg-center">
			{/*  */}
			<RegisterModal
				isShow={showModal}
				onClickBtn={() => setShowModal(false)}
			/>
			{/*  */}
			<div className="absolute w-full h-screen bg-indigo-300 opacity-70"></div>
			{/*  */}
			<div className="z-10 card bg-white w-[950px] h-[650px] grid grid-cols-2 rounded-xl">
				{/*  */}
				<div className="relative bg-register bg-cover bg-center rounded-tl-xl rounded-bl-xl">
					<div className="absolute left-5 flex gap-x-1 pt-10 pb-5 px-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 48 48"
							className="w-5 h-5 text-white drop-shadow"
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
						<h4 className="text-xl text-white font-black tracking-widest drop-shadow">
							Dimts
						</h4>
					</div>
				</div>
				{/*  */}
				<div className="flex flex-col justify-center items-center gap-y-8">
					<div className="flex flex-col gap-y-1 items-center">
						{/*  */}
						<h4 className="text-3xl font-black text-center">Create Account</h4>
						<p className="text-sm">Complete steps to register for an account</p>
						{/*  */}
						<div className="mt-3 w-64 flex justify-between">
							{/*  */}
							<div className="flex flex-col items-center gap-y-1">
								<div className="bg-purple-600 w-8 h-8 rounded-full flex justify-center items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-white "
									>
										<path
											fillRule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<p className="text-xs">Name</p>
							</div>
							{/*  */}
							<div className="flex flex-col items-center gap-y-1">
								<div
									className={`${
										currentStep > 0 ? "bg-purple-600" : "bg-gray-300"
									} w-8 h-8 rounded-full flex justify-center items-center`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-white "
									>
										<path
											fillRule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<p className="text-xs">Contact</p>
							</div>
							{/*  */}
							<div className="flex flex-col items-center gap-y-1">
								<div
									className={`${
										currentStep > 1 ? "bg-purple-600" : "bg-gray-300"
									} w-8 h-8 rounded-full flex justify-center items-center`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-white "
									>
										<path
											fillRule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<p className="text-xs">Account</p>
							</div>
							{/*  */}
						</div>
					</div>
					{stepContent(currentStep)}
					<div className="flex gap-x-1">
						<p className="text-sm">Step</p>
						<p className="text-sm font-semibold text-purple-500">
							{currentStep + 1}
						</p>
						<p className="text-sm">of 3</p>
					</div>
				</div>
				{/*  */}
			</div>
			{/*  */}
		</div>
	);
};

export default RegisterView;
