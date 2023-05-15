import React, { Component, MouseEventHandler, ReactNode } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PulseLoader } from "react-spinners";

type CommonModalProps = {
	isShow: boolean;
	commonText: string;
	commonTitle: string;
	submitButtonText: string;
	onSubmitModal: MouseEventHandler;
	onCloseModal: VoidFunction;
	children: ReactNode;
	loadingState?: boolean;
};

const CommonModal = ({
	isShow,
	commonText,
	commonTitle,
	submitButtonText,
	onSubmitModal,
	onCloseModal,
	children,
	loadingState,
}: CommonModalProps) => {
	const RenderedButton = () => {
		if (typeof loadingState !== undefined) {
			return (
				<button
					type="button"
					className="bg-purple-600 hover:bg-purple-500 focus:outline-none px-5 py-2 rounded-lg flex justify-center items-center"
					onClick={onSubmitModal}
					disabled={loadingState}
				>
					{loadingState ? (
						<PulseLoader
							loading={loadingState}
							color="#ffffff"
							speedMultiplier={1}
							size={10}
						/>
					) : (
						<p className="text-white font-medium tracking-wider text-sm">
							Submit
						</p>
					)}
				</button>
			);
		}
		return (
			<button
				type="button"
				className="bg-purple-600 hover:bg-purple-500 focus:outline-none px-5 py-2 rounded-lg text-white font-medium tracking-wider text-sm"
				onClick={onSubmitModal}
			>
				Submit
			</button>
		);
	};

	return (
		<Transition
			appear
			show={isShow}
			as={Fragment}
		>
			<Dialog
				as="div"
				className="relative z-10 font-mont"
				onClose={onCloseModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-700 bg-opacity-30" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-max transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-y-3">
								<div className="w-full flex justify-between">
									<div className="flex flex-col">
										<Dialog.Title
											as="h3"
											className="text-lg font-bold leading-6 text-gray-700 capitalize"
										>
											{commonTitle}
										</Dialog.Title>
										<p className="text-sm text-gray-500">{commonText}</p>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-600"
										onClick={onCloseModal}
									>
										<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
									</svg>
								</div>
								{children}
								<div className="self-end flex gap-x-5 mt-5">
									{submitButtonText.length ? <RenderedButton /> : null}
									<button
										className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2"
										onClick={onCloseModal}
									>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CommonModal;
