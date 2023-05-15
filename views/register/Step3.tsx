import MyInputField from "../../components/MyInputField";
import PrimaryButton from "../../components/PrimaryButton";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onPrevStep } from "../../redux/authSlice";
import SecondaryButton from "../../components/SecondaryButton";
import { fieldRules } from "../../components/authHelper";
import { useForm } from "react-hook-form";
import {
	onSubmitRegisterStep3,
	registerAccount,
	clearRegisterState,
} from "../../redux/authSlice";
import { useRouter } from "next/router";

interface Step3Params {
	isShowModal(): void;
}

const Step3 = ({ isShowModal }: Step3Params) => {
	const dispatch = useAppDispatch();
	const { registerUsername, registerPassword } = useAppSelector(
		(state: any) => state.authState
	);
	const { control, handleSubmit } = useForm();
	const router = useRouter();

	const onSubmitLastStep = (formData: any) => {
		dispatch(onSubmitRegisterStep3(formData));
		dispatch(registerAccount("citizen")).then(() => {
			isShowModal();
			dispatch(clearRegisterState());
			setTimeout(() => {
				isShowModal();
				router.push("/");
			}, 2000);
		});
	};

	return (
		<form
			noValidate
			autoComplete="off"
			className="flex flex-col justify-center items-center gap-y-8"
		>
			<MyInputField
				control={control}
				fieldLabel="Username"
				fieldType="text"
				fieldName="registerUsername"
				fieldRules={fieldRules.requiredRule}
				defaultValue={registerUsername}
				placeHolder="john_doe_123"
			/>
			<MyInputField
				control={control}
				fieldLabel="Password"
				fieldType="password"
				fieldName="registerPassword"
				fieldRules={fieldRules.requiredPasswordRule}
				defaultValue={registerPassword}
				placeHolder="Doe"
			/>
			<div className="w-72 flex flex-col gap-y-3 -mt-5">
				<div className="border-b border-gray-300"></div>
				<div className="flex text-sm gap-x-1">
					<p>Got an account?</p>
					<Link href="/">
						<span className="text-purple-600 font-medium cursor-pointer">
							Login
						</span>
					</Link>
				</div>
			</div>
			<div className="flex flex-col gap-y-5">
				<PrimaryButton
					btnText="Submit"
					onClickButton={handleSubmit(onSubmitLastStep)}
				/>
				<SecondaryButton
					btnText="Previous"
					onClickButton={() => dispatch(onPrevStep())}
				/>
			</div>
		</form>
	);
};

export default Step3;
