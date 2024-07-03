import * as SecureStore from 'expo-secure-store'

import { TOKEN } from "../utils/constants";

export async function setTokenApi(token) {
    try {
        SecureStore.setItem(TOKEN, token);
        return true;
    } catch (e) {
        return null;
    }
}

export async function getTokenApi() {
    try {
        const token = SecureStore.getItem(TOKEN);
        return token;
    } catch (e) {
        return null;
    }
}

export async function removeTokenApi() {
    try {
        await SecureStore.removeItem(TOKEN);
        return true;
    } catch (e) {
        return null;
    }
}