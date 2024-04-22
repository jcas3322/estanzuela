import React from 'react'
import { } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VerClientes from '../VerClientes'
import IngresarClientes from '../IngresarClientes'
import IngresarPedidos from '../IngresarPedidos'
import IngresarCredito from '../IngresarCredito'

const StackClientes = () => {
  const stackClientes = createNativeStackNavigator()

  return (
    <stackClientes.Navigator screenOptions={{ headerTransparent: true }}>
      <stackClientes.Screen name='Ver Clientes' component={VerClientes} />
      <stackClientes.Screen name='Guardar Clientes' component={IngresarClientes} />
      <stackClientes.Screen name='Guardar Pedidos' component={IngresarPedidos} />
      <stackClientes.Screen name='Guardar Creditos' component={IngresarCredito} />
    </stackClientes.Navigator>
  )
}

export default StackClientes