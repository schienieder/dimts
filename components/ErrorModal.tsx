import { Fragment } from "react";
import { Transition } from "@headlessui/react";

interface ErrorModalParams {
	isShow: boolean;
	errorTitle: string;
	errorText: string;
	onConfirm(): void;
}

const ErrorModal = ({
	isShow,
	errorTitle,
	errorText,
	onConfirm,
}: ErrorModalParams) => {
	return (
		<Transition
			appear
			show={isShow}
			as={Fragment}
		>
			<div
				className="absolute z-20 font-mont"
				// onClose={onConfirm}
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
					<div className="fixed inset-0" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="min-h-full flex justify-end items-end pb-4 pr-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-rose-100 p-6 text-left align-middle shadow-md transition-all">
								<div className="w-full flex justify-between items-center">
									<div className="flex flex-col justify-center gap-y-1">
										<h1 className="text-base font-bold leading-6 text-rose-600 capitalize">
											{errorTitle}
										</h1>
										<p className="text-sm text-rose-600">{errorText}</p>
									</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-rose-600 cursor-pointer"
										onClick={onConfirm}
									>
										<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
									</svg>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default ErrorModal;
