import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'

const MostrarCreditos = ({ route }) => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const cargarClientes = () => {
            const { respuesta } = route.params
            setClientes(respuesta)
            console.log('OBJETO: ', respuesta)
        }
        cargarClientes()
    }, [])

    const Item = ({ item }) => {
        return (
            <View>
                <Text>Nombre</Text>
                <Text>{item.cliente.nombre}</Text>
            </View>
        )
    }

    return (
        <View>
            <View>
                <Text>Mostrar Creditos</Text>
                < FlatList
                    data={clientes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Item item={item} />
                            /*
                                                        <View>
                                                            <Text>{item.cliente.nombre}</Text>
                                                        </View>
                            */
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default MostrarCreditos