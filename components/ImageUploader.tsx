import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
	state: string;
	title: string;
	errorState: boolean; // local state for error message
	onDrop: any; //useCallback to assign values to redux state
	onClickFileRemove(): void; //function to clear state
}

const ImageUploader = ({
	state,
	title,
	errorState,
	onDrop,
	onClickFileRemove,
}: ImageUploaderProps) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
		},
		onDrop: onDrop,
		maxFiles: 1,
	});

	const handleFileRemove = () => {
		acceptedFiles.pop();
		onClickFileRemove();
	};

	return state?.length ? (
		<div className="w-full flex flex-col gap-y-2">
			<p className="font-semibold text-sm text-gray-700 mb-1">{title}</p>
			<div className="relative bg-gray-100 border-2 border-dashed border-gray-400 h-44 rounded-lg flex justify-center items-center">
				<button
					type="button"
					onClick={handleFileRemove}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="absolute h-6 w-6 top-5 right-5 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
				<div className="flex justify-center items-center gap-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-purple-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<p className="font-int text-xs text-purple-500 w-40 text-ellipsis overflow-hidden text-center">
						{state}
					</p>
				</div>
			</div>
			{errorState ? (
				<p className="text-red-500 text-xs mt-1">This field is required</p>
			) : null}
		</div>
	) : (
		<div className="w-full">
			<p className="font-semibold text-sm text-gray-700 mb-1">{title}</p>
			<div
				className={`relative bg-gray-100 border-2 border-dashed ${
					errorState ? "border-red-500" : "border-gray-400"
				} h-44 rounded-lg flex justify-center items-center`}
				{...getRootProps()}
			>
				<input
					{...getInputProps()}
					className="w-full h-full"
				/>
				<p className="font-int text-sm text-gray-600 font-light">
					Drop files here or{" "}
					<span className="text-purple-500 font-medium cursor-pointer">
						browse
					</span>
				</p>
			</div>
			{errorState ? (
				<p className="text-red-500 text-xs mt-1">This field is required</p>
			) : null}
		</div>
	);
};

export default ImageUploader;
