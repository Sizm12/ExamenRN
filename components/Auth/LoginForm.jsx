import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { LoginApi } from "../../api/Auth";
import useAuth from "../../hooks/useAuth"

export default function LoginForm(props) {
    const { changeForm } = props;

    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await LoginApi(formData);
                console.log(response.token);
                setLoading(false);
                login(response.token)
                
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
                setLoading(false);
            }
        },
    });

    return (
        <View>
            <RootSiblingParent>

                <TextInput
                    label="Correo Electronico"
                    style={Style.input}
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <TextInput
                    label="Contraseña"
                    style={Style.input}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    error={formik.errors.password}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    style={Style.btnSuccess}
                    onPress={formik.handleSubmit}
                    loading={loading}
                >
                    Entrar
                </Button>
                <Button
                    mode="contained"
                    style={Style.btnAlter}
                    onPress={changeForm}
                >
                    Registrarse
                </Button>
            </RootSiblingParent>
        </View>
    );
}

const Style = StyleSheet.create({
    input: {
        marginBottom: 20,
        color: "#000000",
        backgroundColor: "#ffffff"
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: "#0098d3",
    },
    btnAlter: {
        marginTop: 10,
    }
})

function initialValues() {
    return {
        email: "",
        password: "",
    };
}

function validationSchema() {
    return {
        email: Yup.string().required(true),
        password: Yup.string().required(true),
    };
}
