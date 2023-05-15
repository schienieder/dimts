import { useEffect } from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

interface MyCreatableSelectProps {
	myControl: any;
	myOptions: any;
	fieldName: string;
	fieldLabel: string;
	fieldRules: any;
	defaultValue?: string;
	setFieldValue?: any;
}

const selectStyles = {
	control: (styles: any, state: any) => {
		return {
			...styles,
			backgroundColor: "rgb(243 244 246)",
			borderRadius: "0.5rem",
			borderColor: state.isFocused ? "#9333ea" : "#e5e7eb",
			boxShadow: state.isFocused ? null : null,
			"&:hover": {
				borderColor: state.isFocused ? "#9333ea" : "#e5e7eb",
			},
		};
	},
	menuList: (styles: any) => {
		return {
			...styles,
			maxHeight: 250,
		};
	},
	valueContainer: (styles: any) => {
		return {
			...styles,
			maxHeight: "100px",
			overflowY: "auto",
		};
	},
	multiValue: (styles: any, { data }: any) => {
		return {
			...styles,
			backgroundColor: "rgba(147, 51, 234, 0.1)",
		};
	},
	multiValueLabel: (styles: any, { data }: any) => ({
		...styles,
		color: "#9333ea",
		fontWeight: 500,
		fontSize: 12,
	}),
	multiValueRemove: (styles: any, { data }: any) => ({
		...styles,
		color: "#9333ea",
		":hover": {
			backgroundColor: "#9333ea",
			color: "white",
		},
	}),
};

const MyCreatableSelect = ({
	myControl,
	myOptions,
	fieldName,
	fieldLabel,
	fieldRules,
	defaultValue,
	setFieldValue,
}: MyCreatableSelectProps) => {
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
					<CreatableSelect
						styles={selectStyles}
						defaultValue={defaultValue ?? ""}
						// isMulti
						isClearable
						name={fieldName}
						options={myOptions}
						id={fieldName}
						onChange={onChange}
						className="w-full"
					/>
					{error && <p className="text-xs text-rose-500">{error.message}</p>}
				</div>
			)}
		/>
	);
};

export default MyCreatableSelect;
