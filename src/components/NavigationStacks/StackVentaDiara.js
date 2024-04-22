import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VerVentasDiarias from '../VerVentasDiarias'
import IngresarVentaDiaria from '../IngresarVentaDiaria'

const StackVentaDiara = () => {
    const stackVentaDiaria = createNativeStackNavigator()

    return (
        <stackVentaDiaria.Navigator>
            <stackVentaDiaria.Screen name='Ver Venta Diaria' component={VerVentasDiarias} />
            <stackVentaDiaria.Screen name='Guardar Venta Diaria' component={IngresarVentaDiaria} />
        </stackVentaDiaria.Navigator>
        )
}

export default StackVentaDiara