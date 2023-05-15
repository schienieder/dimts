import { backendConn } from "./connection";

interface RegisterParams {
    first_name: string;
    last_name: string;
    contact_number: string;
    email: string;
    username: string;
    password: string;
    role: string;
}

export default class AuthRepository {
    // Login Account
    async LoginAccount (formData: FormData) {
        const res = await backendConn.post('api/token/', formData, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })
        return res.data
    }
    // Register Account
    async RegisterAccount(formData: RegisterParams) {
        const res = await backendConn.post('register/', formData, {
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return res.data
    }
    // GET REQUESTS
    // Get Account Details
    async GetAccountDetails (jwt_token: string, user_id: number) {
        const res = await backendConn.get(`account/${ user_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return res.data
    }
}