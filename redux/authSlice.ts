import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import AuthRepository from '../repositories/AuthRepository'
import jwt_decode from 'jwt-decode'

interface AuthShape {
    authLoading: boolean;
    currentStep: number;
    loginUsername: string;
    loginPassword: string;
    registerFirstName: string;
    registerLastName: string;
    registerMobile: string;
    registerEmail: string;
    registerUsername: string;
    registerPassword: string;
    authToken: {
        access : string;
        refresh : string;
    },
    userProfile: any;
}

const initialState: AuthShape = {
    authLoading : false,
    currentStep : 0,
    loginUsername : '',
    loginPassword : '',
    registerFirstName : '',
    registerLastName : '',
    registerMobile : '',
    registerEmail : '',
    registerUsername : '',
    registerPassword : '',
    authToken : {
        access : "",
        refresh : ""
    },
    userProfile : {}
}

interface LoginAccountParams {
    loginUsername: string;
    loginPassword: string;
}

export const loginAccount = createAsyncThunk(
    'auth/loginAccount', 
    async (args: LoginAccountParams) => {
        const authRepo = new AuthRepository()
        const formData = new FormData()
        formData.append("username", args.loginUsername)
        formData.append("password", args.loginPassword)
        const loginRes = await authRepo.LoginAccount(formData)
        localStorage.jwt_token =  loginRes.access
        return loginRes
    }
)

export const registerAccount = createAsyncThunk(
    'auth/registerAccount',
    async (account_role: string, { getState }) => {
        const state: any = getState()
        const authRepo = new AuthRepository()
        const formData = {
            first_name : state.authState.registerFirstName,
            last_name : state.authState.registerLastName,
            contact_number : state.authState.registerMobile,
            email : state.authState.registerEmail,
            username : state.authState.registerUsername,
            password : state.authState.registerPassword,
            role : account_role
        }
        return await authRepo.RegisterAccount(formData)
    }
)

export const registerFromAdmin = createAsyncThunk(
    'auth/registerStaffAccount',
    async (formData: any) => {
        const authRepo = new AuthRepository()
        return await authRepo.RegisterAccount(formData)
    }
)

export const getAccountDetails = createAsyncThunk(
    'auth/getAccountDetails',
    async (user_id: number, { getState }) => {
        const authRepo = new AuthRepository()
        return await authRepo.GetAccountDetails(localStorage.jwt_token, user_id)
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        onPrevStep : (state) => {
            const step = state.currentStep
            return {
                ...state,
                currentStep : step - 1
            }
        },
        onSubmitRegisterStep1 : (state, action: PayloadAction<any>) => {
            const { payload } = action
            return {
                ...state,
                registerFirstName : payload.registerFirstName,
                registerLastName : payload.registerLastName,
                currentStep : 1
            }
        },
        onSubmitRegisterStep2 : (state, action: PayloadAction<any>) => {
            const { payload } = action
            return {
                ...state,
                registerMobile : payload.registerMobile,
                registerEmail : payload.registerEmail,
                currentStep : 2
            }
        },
        onSubmitRegisterStep3 : (state, action: PayloadAction<any>) => {
            const { payload } = action
            return {
                ...state,
                registerUsername : payload.registerUsername,
                registerPassword : payload.registerPassword
            }
        },
        clearRegisterState : (state) => {
            return {
                ...state, 
                registerFirstName : "",
                registerLastName : "",
                registerMobile : "",
                registerEmail : "",
                registerUsername : "",
                registerPassword : "",
                currentStep : 0
            }
        }
    },
    extraReducers : builder => {
        // LOGIN ACCOUNT
        builder.addCase(loginAccount.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            return { ...state, authLoading : false, authToken : action.payload }
        })
        builder.addCase(loginAccount.rejected, (state) => {
            return { ...state, authLoading : false }
        })
        // REGISTER ACCOUNT
        builder.addCase(registerAccount.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(registerAccount.fulfilled, (state) => {
            return { ...state, authLoading : false }
        })
        builder.addCase(registerAccount.rejected, (state) => {
            return { ...state, authLoading : false }
        })
        // GET ACCOUNT DETAILS 
        builder.addCase(getAccountDetails.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(getAccountDetails.fulfilled, (state, action) => {
            return { ...state, authLoading : false, userProfile : action.payload }
        })
        builder.addCase(getAccountDetails.rejected, (state) => {
            return { ...state, authLoading : false }
        })
    }
})

export const {
    onPrevStep,
    onSubmitRegisterStep1,
    onSubmitRegisterStep2,
    onSubmitRegisterStep3,
    clearRegisterState
} = authSlice.actions

export default authSlice.reducer