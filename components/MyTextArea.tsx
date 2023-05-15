import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface MyTextAreaFieldProps {
	control: any;
	fieldLabel: string;
	fieldName: string;
	fieldRules: any;
	defaultValue?: string;
	placeHolder?: string;
	readOnly?: boolean;
	setFieldValue?: any;
}

const MyTextAreaField = ({
	control,
	fieldLabel,
	fieldName,
	fieldRules,
	defaultValue,
	placeHolder,
	setFieldValue,
}: MyTextAreaFieldProps) => {
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
					<textarea
						name={fieldName}
						id={fieldName}
						className="bg-gray-100 px-3 py-1 w-full focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
						placeholder={placeHolder}
						onChange={onChange}
						defaultValue={defaultValue ?? ""}
						rows={3}
					></textarea>
					{error && <p className="text-xs text-rose-500">{error.message}</p>}
				</div>
			)}
		/>
	);
};

export default MyTextAreaField;
