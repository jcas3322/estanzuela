import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IngresoProduccionDiario from '../IngresoProduccionDiario'
import IngresarIncidentes from '../IngresarIncidentes'

const StackIncidentes = ({route}) => {
    const stackProduccionDiaria = createNativeStackNavigator()
    const {ciudadanoLogueado, setIsAuthenticated} = route.params

    return (
        <stackProduccionDiaria.Navigator>
            <stackProduccionDiaria.Screen
                name='Ingresar incidente'
                component={IngresarIncidentes}
                initialParams={{
                    ciudadanoLogueado: ciudadanoLogueado,
                    setIsAuthenticated: setIsAuthenticated
                }}
                />
            <stackProduccionDiaria.Screen name='Guardar Produccion Diaria' component={IngresoProduccionDiario} />
        </stackProduccionDiaria.Navigator>
        )
}

export default StackIncidentes