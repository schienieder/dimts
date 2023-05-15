import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface MyInputFieldProps {
	control: any;
	fieldLabel: string;
	fieldType: string;
	fieldName: string;
	fieldRules: any;
	defaultValue?: string;
	placeHolder?: string;
	readOnly?: boolean;
	setFieldValue?: any;
}

const getErrorMessage = ({
	error,
	fieldType,
}: {
	error: any;
	fieldType: any;
}): string => {
	let errorMessage = "";
	if (error.type === "validate") {
		if (fieldType === "email") {
			errorMessage = "Email already used in another account";
		} else if (fieldType === "date") {
			errorMessage = "Weekends are not allowed";
		}
	} else {
		errorMessage = error.message;
	}
	return errorMessage;
};

const MyInputField = ({
	control,
	fieldLabel,
	fieldType,
	fieldName,
	fieldRules,
	defaultValue,
	placeHolder,
	readOnly,
	setFieldValue,
}: MyInputFieldProps) => {
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
					<label className="font-semibold text-sm text-gray-700">
						{fieldLabel}
					</label>
					<input
						type={fieldType}
						id={fieldName}
						className="bg-gray-100 px-3 py-1 w-72 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
						placeholder={placeHolder}
						onChange={onChange}
						defaultValue={defaultValue ?? ""}
						readOnly={readOnly}
					/>
					{error && (
						<p className="text-xs text-rose-500">
							{getErrorMessage({ error, fieldType })}
						</p>
					)}
				</div>
			)}
		/>
	);
};

export default MyInputField;
