import { API_URL } from "../utils/constants";
import axios from "axios";

export async function GetTasks(auth) {
    try {
        const url = `${API_URL}/tasks`;
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

export async function CreateTask(auth, formData) {
    const { title, description } = formData;
    try {
        data = {
            title,
            description
        }
        const url = `${API_URL}/tasks`;
        const response = await axios.post(url, data, {
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

export async function GetTask(auth, id) {
    try {
        const url = `${API_URL}/tasks/${id}`;
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

export async function UpdateTask(auth, formData, id) {
    const { title, description } = formData;
    try {
        data = {
            title,
            description
        }
        const url = `${API_URL}/tasks/${id}`;
        const response = await axios.put(url, data, {
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

export async function DeleteTask(auth, id) {
    try {
        const url = `${API_URL}/tasks/${id}`;
        const response = await axios.delete(url, {
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