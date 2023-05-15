import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface MySelectFieldProps {
	myControl: any;
	myOptions: any;
	fieldName: string;
	fieldLabel: string;
	fieldRules: any;
	defaultValue?: string;
	setFieldValue?: any;
}

const MySelectField = ({
	myControl,
	myOptions,
	fieldName,
	fieldLabel,
	fieldRules,
	defaultValue,
	setFieldValue,
}: MySelectFieldProps) => {
	useEffect(() => {
		setFieldValue ? setFieldValue(fieldName, defaultValue) : null;
	}, []);

	return (
		<Controller
			control={myControl}
			name={fieldName}
			rules={fieldRules}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<div className="flex flex-col gap-y-1">
					<label className="text-sm font-semibold tracking-wider">
						{fieldLabel}
					</label>
					<select
						id={fieldName}
						className="w-full bg-gray-100 px-3 py-1 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
						onChange={onChange}
						defaultValue={defaultValue ?? ""}
					>
						<option
							disabled
							value=""
						>
							Select Option
						</option>
						{myOptions.map((option: any) => {
							return (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							);
						})}
					</select>
					{error && <p className="text-xs text-rose-500">{error.message}</p>}
				</div>
			)}
		/>
	);
};

export default MySelectField;
