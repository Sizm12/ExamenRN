import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterApi } from "../../api/Auth";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await RegisterApi(formData);
                console.log(response);
                setLoading(false);
                changeForm();
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
                    label="Nombre de Usuario"
                    style={Style.input}
                    onChangeText={(text) => formik.setFieldValue("name", text)}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
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
                    Registrarse
                </Button>
                <Button
                    mode="contained"
                    style={Style.btnAlter}
                    onPress={changeForm}
                >
                    Loguearse
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
        name: "",
        email: "",
        password: "",
    };
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        email: Yup.string().required(true),
        password: Yup.string().required(true),
    };
}