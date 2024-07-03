import { API_URL } from "../utils/constants";
import axios from "axios";


export async function TestApi() {
    try {
        const url = `${API_URL}/ping`;
        const response = await axios.get(url)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function LoginApi(formData) {
    const { email, password } = formData
    try {
        const url = `${API_URL}/signin`;
        const response = await axios.post(url, { email, password })
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function RegisterApi(formData) {
    const { name, email, password } = formData
    try {
        const url = `${API_URL}/signup`;
        const response = await axios.post(url, { name, email, password })
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function ProfileApi(auth) {
    try {
        const url = `${API_URL}/profile`;
        const response = await axios.get(url, {
            headers: {
                'token': auth
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}