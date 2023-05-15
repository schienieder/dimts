import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface InputWithSubmitProps {
	control: any;
	fieldType: string;
	fieldName: string;
	fieldRules: any;
	defaultValue?: string;
	placeHolder?: string;
	readOnly?: boolean;
	setFieldValue?: any;
	onClickSubmit: any;
}

const InputWithSubmit = ({
	control,
	fieldType,
	fieldName,
	fieldRules,
	defaultValue,
	placeHolder,
	readOnly,
	setFieldValue,
	onClickSubmit,
}: InputWithSubmitProps) => {
	useEffect(() => {
		setFieldValue ? setFieldValue(fieldName, defaultValue) : null;
	}, []);

	return (
		<Controller
			control={control}
			name={fieldName}
			rules={fieldRules}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<div className="flex flex-col gap-y-1">
					<div className="w-96 bg-gray-100 border border-gray-200 focus:border-purple-400 px-3 py-1 flex items-center gap-x-3 rounded-lg">
						<input
							type={fieldType}
							id={fieldName}
							className="grow h-full bg-transparent focus:outline-none appearance-none py-2"
							placeholder={placeHolder}
							onChange={onChange}
							defaultValue={defaultValue ?? ""}
							readOnly={readOnly}
						/>
						<button
							className="bg-purple-600 hover:bg-purple-500 w-24 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 flex justify-center items-center gap-x-2 text-sm tracking-wider"
							onClick={() => onClickSubmit()}
						>
							Submit
						</button>
					</div>
					{error && (
						<p className="text-xs text-rose-500">
							{error.type !== "validate"
								? error.message
								: "Email already used in another account"}
						</p>
					)}
				</div>
			)}
		/>
	);
};

export default InputWithSubmit;
