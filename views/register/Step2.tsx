import MyInputField from "../../components/MyInputField"
import PrimaryButton from "../../components/PrimaryButton"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { onPrevStep } from "../../redux/authSlice"
import SecondaryButton from "../../components/SecondaryButton"
import { fieldRules } from "../../components/authHelper"
import { useForm } from "react-hook-form"
import { onSubmitRegisterStep2 } from "../../redux/authSlice"

const Step2 = () => {

    const dispatch = useDispatch()
    const { registerMobile, registerEmail } = useSelector((state: any) => state.authState)
    const { control, handleSubmit } = useForm()
    
    const onSubmitStep2 = (formData: any) => {
        console.log('Step 2 data: ', formData)
        dispatch(onSubmitRegisterStep2(formData))
    }

    return (
        <form
            noValidate
            autoComplete="off"
            className="flex flex-col justify-center items-center gap-y-8"
        >
            <MyInputField 
                control={ control }
                fieldLabel="Mobile Number"
                fieldType="text"
                fieldName="registerMobile"
                fieldRules={ fieldRules.requiredMobileNumberRule }
                defaultValue={ registerMobile }
                placeHolder="09123456789"
            />
            <MyInputField 
                control={ control }
                fieldLabel="Email"
                fieldType="text"
                fieldName="registerEmail"
                fieldRules={ fieldRules.requiredUniqueEmailRule }
                defaultValue={ registerEmail }
                placeHolder="dummy@gmail.com"
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
                    onClickButton={ handleSubmit(onSubmitStep2) }
                />
                <SecondaryButton 
                    btnText="Previous"
                    onClickButton={ () => dispatch(onPrevStep()) }
                />
            </div>
        </form>
    )
}

export default Step2