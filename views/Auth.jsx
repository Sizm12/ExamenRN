import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView,
} from "react-native";
import Logo from "../assets/icon.png"
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);
    const changeForm = () => setShowLogin(!showLogin);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Logo}></Image>
            <KeyboardAvoidingView
            >
                {showLogin ? (
                    <LoginForm changeForm={changeForm} />
                ) : (
                    <RegisterForm changeForm={changeForm} />
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 160,
        resizeMode: "contain",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
});
