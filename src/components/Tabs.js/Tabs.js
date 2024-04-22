import React, { useState, useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StackClientes from '../NavigationStacks/StackClientes'
import StackCreditos from '../NavigationStacks/StackCreditos'
import StackPedidos from '../NavigationStacks/StackPedidos'
import StackIncidentes from '../NavigationStacks/StackIncidentes'
import StackVentaDiara from '../NavigationStacks/StackVentaDiara'
import LogIn from '../LogIn/LogIn'
import GlobalContext from '../../../GlobalContextProvider'

const Tabs = () => {
    const tabs = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext)
    const [ciudadanoLogueado, setCiudadanoLogueado] = useState({})

    return (
        <NavigationContainer>
            {isAuthenticated ? ( <tabs.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName = ''
                        switch (route.name) {
                            case 'Clientes':
                                iconName = 'card-account-details-star'
                                break
                            case 'Creditos':
                                iconName = 'card-multiple'
                                break
                            case 'Pedidos':
                                iconName = 'wallet'
                                break
                            case 'Incidentes':
                                iconName = 'note-alert'
                                break
                            case 'Ventas':
                                iconName = 'sale'
                                break
                        }
                        return <Icon name={iconName} size={size} color={color} />
                    }
                })}
            >
                <tabs.Screen name='Clientes' component={StackClientes} />
                <tabs.Screen name='Creditos' component={StackCreditos} />
                <tabs.Screen name='Pedidos' component={StackPedidos} />
                <tabs.Screen
                    name='Incidentes'
                    component={StackIncidentes}
                />
                <tabs.Screen name='Ventas' component={StackVentaDiara} />
            </tabs.Navigator>) : (
                <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerShown:false}}>
                    <Stack.Screen
                        name='LogIn'
                        component={LogIn}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default Tabs