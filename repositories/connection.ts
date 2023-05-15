import axios from 'axios'

export const backendConn = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_URL
})

export const placesConn = axios.create({
    baseURL : "https://psgc.gitlab.io/api/"
})

export const emailConn = axios.create({
    baseURL : process.env.NEXT_PUBLIC_EMAIL_URL
})