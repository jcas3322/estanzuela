import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IngresoProduccionDiario from '../IngresoProduccionDiario'
import IngresarIncidentes from '../IngresarIncidentes'

const StackIncidentes = ({route}) => {
    const stackProduccionDiaria = createNativeStackNavigator()

    return (
        <stackProduccionDiaria.Navigator>
            <stackProduccionDiaria.Screen
                name='Ingresar incidente'
                component={IngresarIncidentes}
                />
            <stackProduccionDiaria.Screen name='Guardar Produccion Diaria' component={IngresoProduccionDiario} />
        </stackProduccionDiaria.Navigator>
        )
}

export default StackIncidentes