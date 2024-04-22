import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VerPedidos from '../VerPedidos'

const StackPedidos = () => {
    const stackPedidos = createNativeStackNavigator()
    return (
        <stackPedidos.Navigator>
            <stackPedidos.Screen name='Ver Pedidos' component={VerPedidos} />
        </stackPedidos.Navigator>
    )
}

export default StackPedidos