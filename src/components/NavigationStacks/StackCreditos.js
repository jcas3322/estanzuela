import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VerCredito from '../VerCredito'
import MostrarCreditos from '../MostrarCreditos'

const StackCreditos = () => {
    const stackCreditos = createNativeStackNavigator()

    return (
        <stackCreditos.Navigator>
            <stackCreditos.Screen name='Ver Creditos' component={VerCredito} />
            <stackCreditos.Screen name='Resultados' component={MostrarCreditos} />
        </stackCreditos.Navigator>
    )
}

export default StackCreditos