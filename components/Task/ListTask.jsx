import { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Button, Dialog, FAB, IconButton, Portal, TextInput } from 'react-native-paper';
import { GetTasks, DeleteTask, UpdateTask, CreateTask } from "../../api/Task"
import ScreenLoading from '../ScreenLoading';
import useAuth from '../../hooks/useAuth';
export default function ListTask() {

    const {auth, logout} = useAuth();
    const [task, setTask] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    useEffect(() => {
        GetListTask();
    }, [])

    const GetListTask = async () => {
        const response = await GetTasks(auth.token)
        console.log(response);
        setTask(response)
    }

    const Delete = async (id) => {
        try {
            const response = await DeleteTask(auth.token, id)
            console.log(response);
            GetListTask();
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            try {
                if (editTask) {
                    const response = await UpdateTask(auth.token, formData, formData.id)
                    console.log(response);
                    GetListTask();
                } else {
                    console.log(formData);
                    const response = await CreateTask(auth.token, formData)
                    console.log(response);
                    GetListTask();
                }
                formik.resetForm();
                setIsDialogVisible(false)
            } catch (error) {
                console.log(error);
            }
        },
    });

    const openDialog = (task = null) => {
        setEditTask(task);
        if (task) {
            formik.setValues(task);
        } else {
            formik.resetForm();
        }
        setIsDialogVisible(true);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button
                icon="plus"
                labelStyle={Style.text}
                onPress={() => openDialog()}>Agregar Nueva Tarea</Button>
            {
                !task.length ? (
                    <ScreenLoading text="Esperando Datos" />
                ) : (
                    <ScrollView style={Style.container}>
                        {
                            task.map((item) => (
                                <Card key={item.id} style={Style.card}>
                                    <Card.Title title={item.title} />
                                    <Card.Content>
                                        <Text>{item.description}</Text>
                                    </Card.Content>
                                    <Card.Actions>
                                        <IconButton icon="pencil" onPress={() => openDialog(item)} />
                                        <IconButton icon="delete" onPress={() => Delete(item.id)} />
                                    </Card.Actions>
                                </Card>
                            ))
                        }
                    </ScrollView>
                )
            }
            <Button
                icon="close"
                labelStyle={Style.text}
                onPress={() => logout() }>Cerrar Sesion</Button>
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>{editTask ? 'Editar Tarea' : 'Crear Tarea'}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Titulo"
                            onChangeText={(text) => formik.setFieldValue("title", text)}
                            value={formik.values.title}
                            error={formik.errors.title}
                        />
                        <TextInput
                            label="Descripcion"
                            onChangeText={(text) => formik.setFieldValue("description", text)}
                            value={formik.values.description}
                            error={formik.errors.description}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={formik.handleSubmit}>Guardar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const Style = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 10,
    },
    card: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 8,
    },
    Button: {
        padding: 5,
        backgroundColor: "#0098d3",
    },
    text: {
        color: "#000"
    }
})

function initialValues() {
    return {
        title: "",
        description: "",
    };
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        description: Yup.string().required(true),
    };
}
