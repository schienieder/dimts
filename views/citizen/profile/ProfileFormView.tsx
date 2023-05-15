import { useState, useEffect, useCallback } from "react";
import { fieldRules } from "../../../components/authHelper";
import MyInputField from "../../../components/MyInputFieldFull";
import MyTextAreaField from "../../../components/MyTextArea";
import ImageUploader from "../../../components/ImageUploader";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { updateAccount } from "../../../redux/dataSlice";

const ProfileFormView = ({ userInfo, onSubmitForm }: any) => {
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		control,
		setValue,
		formState: { isSubmitted, submitCount },
	} = useForm<any>({
		defaultValues: {
			citizenIDName: "",
			citizenIDContent: "",
		},
	});

	const [imageName, setImageName] = useState<any>("");
	const [imageContent, setImageContent] = useState<any>("");
	const [hasImageError, setHasImageErorr] = useState(false);

	const getImageBase64 = (file: any) => {
		var reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = function () {
			setValue("citizenIDContent", reader.result);
			setImageContent(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	const onDropFrontId = useCallback(
		(files: any) => {
			setImageName(files[0].path);
			setValue("citizenIDName", files[0].path);
			getImageBase64(files);
			setHasImageErorr(false);
		},
		[imageName, hasImageError]
	);

	const handleFrontFileRemove = () => {
		setImageName("");
		setImageContent("");
		setHasImageErorr(true);
	};

	const onSubmitProfile = (formData: any) => {
		if (!formData.citizenIDName.length || !formData.citizenIDContent.length) {
			return;
		}
		const data = {
			first_name: formData.citizenFirstName,
			last_name: formData.citizenLastName,
			email: formData.citizenEmail,
			contact_number: formData.citizenMobile,
			address: formData.citizenAddress,
			valid_id_name: formData.citizenIDName,
			valid_id_content: formData.citizenIDContent,
		};
		dispatch(updateAccount({ formData: data, account_id: userInfo.id })).then(
			() => onSubmitForm()
		);
	};

	useEffect(() => {
		setImageName(userInfo.valid_id_name);
		setImageContent(userInfo.valid_id_content);
	}, []);

	useEffect(() => {
		if (!imageName.length && submitCount > 0) {
			setHasImageErorr(true);
			console.log("Submit count: ", submitCount);
		}
	}, [isSubmitted]);

	return (
		<div className="w-[600px] grid grid-cols-2 gap-x-5 gap-y-8">
			<MyInputField
				control={control}
				fieldLabel="First Name"
				fieldType="text"
				fieldName="citizenFirstName"
				fieldRules={fieldRules.requiredStringRule}
				defaultValue={userInfo.first_name}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Last Name"
				fieldType="text"
				fieldName="citizenLastName"
				fieldRules={fieldRules.requiredStringRule}
				defaultValue={userInfo.last_name}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Email"
				fieldType="email"
				fieldName="citizenEmail"
				fieldRules={fieldRules.requiredUniqueEmailRule}
				defaultValue={userInfo.email}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Mobile Number"
				fieldType="text"
				fieldName="citizenMobile"
				fieldRules={fieldRules.requiredMobileNumberRule}
				defaultValue={userInfo.contact_number}
				setFieldValue={setValue}
			/>
			<div className="col-span-2">
				<MyTextAreaField
					control={control}
					fieldLabel="Address"
					fieldName="citizenAddress"
					fieldRules={fieldRules.requiredRule}
					defaultValue={userInfo.address}
					setFieldValue={setValue}
				/>
			</div>
			<div className="cols-span-2 w-[600px]">
				<ImageUploader
					state={imageName}
					title="Valid ID"
					errorState={hasImageError}
					onDrop={onDropFrontId}
					onClickFileRemove={handleFrontFileRemove}
				/>
			</div>
			<div className="col-span-2 w-[600px] flex flex-col gap-y-1">
				<p className="font-bold text-sm text-gray-700">Preview</p>
				<div className="max-w-full min-h-[176px] flex justify-center items-start overflow-hidden border-2 border-dashed border-gray-400 rounded-lg">
					<img
						src={imageContent}
						className="w-full h-auto"
						alt="ID Preview"
					/>
				</div>
			</div>
			<div className="mt-5 w-full col-span-2 flex justify-between">
				<div></div>
				<button
					type="button"
					className="bg-purple-600 hover:bg-purple-500 w-48 focus:outline-none px-5 py-2 text-white font-medium tracking-wider rounded-lg text-sm"
					onClick={handleSubmit(onSubmitProfile)}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default ProfileFormView;
