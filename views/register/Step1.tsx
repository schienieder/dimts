import MyInputField from "../../components/MyInputField"
import PrimaryButton from "../../components/PrimaryButton"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { onSubmitRegisterStep1 } from "../../redux/authSlice"
import { fieldRules } from "../../components/authHelper"
import { useForm } from 'react-hook-form'

const Step1 = () => {

    const dispatch = useDispatch()
    const { registerFirstName, registerLastName } = useSelector((state: any) => state.authState)
    const { handleSubmit, control } = useForm()

    const onSubmitStep1 = (formData: any) => {
        console.log('Step 1 data: ', formData)
        dispatch(onSubmitRegisterStep1(formData))
    }

    return (
        <form
            noValidate
            autoComplete="off"
            className="flex flex-col justify-center items-center gap-y-8"
        >
            <MyInputField 
                control={ control }
                fieldLabel="First Name"
                fieldType="text"
                fieldName="registerFirstName"
                fieldRules={ fieldRules.requiredStringRule }
                defaultValue={ registerFirstName }
                placeHolder="John"
            />
            <MyInputField 
                control={ control }
                fieldLabel="Last Name"
                fieldType="text"
                fieldName="registerLastName"
                fieldRules={ fieldRules.requiredStringRule }
                defaultValue={ registerLastName }
                placeHolder="Doe"
            />
            <div className="w-72 flex flex-col gap-y-3 -mt-5">
                <div className="border-b border-gray-300"></div>
                <div className="flex text-sm gap-x-1">
                    <p>Got an account?</p> 
                    <Link href="/">
                        <span className="text-purple-600 font-medium cursor-pointer">Login</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-y-5">
                <PrimaryButton 
                    btnText="Next"
                    onClickButton={ handleSubmit(onSubmitStep1) }
                />
            </div>
        </form>
    )
}

export default Step1