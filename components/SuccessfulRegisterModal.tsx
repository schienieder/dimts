interface RegisterModalParams {
	isShow: boolean;
	onClickBtn(): void;
}

const RegisterModal = ({ isShow, onClickBtn }: RegisterModalParams) => {
	return (
		<div
			className={`${
				isShow ? "block" : "hidden"
			} z-20 absolute h-screen w-full backdrop-brightness-75`}
		>
			<div className="h-screen w-full flex justify-center items-center">
				<div className="bg-white px-20 py-10 rounded-lg flex flex-col items-center gap-y-5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-20 h-20 text-purple-600"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div className="flex flex-col">
						<h1 className="text-xl font-bold tracking-wider text-center">
							Successful
						</h1>
						<p className="text-sm">Your account was registered successfully</p>
					</div>
					<button
						className="bg-purple-600 hover:bg-purple-500 px-10 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 tracking-wider"
						onClick={onClickBtn}
					>
						Got it
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterModal;
