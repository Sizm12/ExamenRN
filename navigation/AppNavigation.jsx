import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListTask from "../components/Task/ListTask";


const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer independent={true}>

            <Stack.Navigator>
                <Stack.Screen
                    name="list"
                    component={ListTask}
                    options={{
                        title: "Lista de Tareas",
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}