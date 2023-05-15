import { Controller } from 'react-hook-form'

interface MyInputFieldProps {
    control: any;
    fieldLabel: string; 
    fieldName: string;
    fieldRules: any;
    defaultValue?: string; 
    placeHolder?: string;
}

const RegisterTextInput = ({ control, fieldLabel, fieldName, fieldRules, defaultValue, placeHolder }: MyInputFieldProps) => {
    return (
        <Controller 
            control={ control }
            name={ fieldName }
            rules={ fieldRules }
            defaultValue={ defaultValue ?? "" }
            render={({
                field: { onChange },
                fieldState: { error }
            }) => (
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm text-gray-500 font-semibold">{ fieldLabel }</label>
                    <input 
                        type="text"
                        id={ fieldName }
                        className="bg-gray-700 px-4 py-2 w-52 focus:outline-none border-2 border-gray-700 focus:border-cyan-700 rounded-lg" 
                        placeholder={ placeHolder }
                        onChange={ onChange }
                        defaultValue={ defaultValue ?? "" }
                    />
                    { error && <p className="text-xs text-rose-500">{ error.type !== 'validate' ? error.message : 'Email already used in another account' }</p> }
                </div>
            )}
        />
    )
}

export default RegisterTextInput