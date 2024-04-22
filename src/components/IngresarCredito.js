import React, { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, View, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import axios from 'axios'

const IngresarCredito = ({ route }) => {

  const [cliente, setCliente] = useState({})
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState(0)
  const [fecha, setFecha] = useState(new Date())
  const setFocus = useRef(null)

  useEffect(() => {
    const extraerCliente = () => {
      const { cliente } = route.params
      setCliente(cliente)
    }
    extraerCliente()
  }, [])

  const formatDate = (date) => {
    date.setDate(date.getDate() + 1)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const guardarPedido = async () => {
    if (descripcion === '' || monto <= 0) {
      Alert.alert('ERROR', 'Debe completar todos los campos')
      return
    }
    const pedido = {
      idCliente: cliente.id,
      idUsuarioAlta: 1,
      descripcion: descripcion,
      monto: monto,
      fechaAlta: formatDate(fecha),
      estado: true,
      idUsuarioRecibePago: 1
    }
    try {
      const response = await axios.post('http://192.168.1.126:8080/App/credito/addCredito', pedido)
      Alert.alert('Exito', `Credito ingresado, ${response.status}`)
      setFocus.current.focus()
      setDescripcion('')
      setMonto(0)
    } catch (e) {
      Alert.alert('ERROR', `Error: ${e}`)
    }
  }

  return (
    <ScrollView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.textoEncabezado}>Ingreso de {''}<Text style={styles.textoEncabezado2}>Creditos</Text></Text>
      </View>
      <View style={styles.contenedorCliente}>
        <Text style={styles.textoCliente}>Cliente:{' '}<Text style={styles.textoCliente2}>{cliente.nombre}</Text></Text>
      </View>
      <View style={styles.contendorCampos}>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Descripcion</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Ingrese descripcion'
            placeholderTextColor={'#666'}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline={true}
            maxLength={200}
            ref={setFocus}
          />
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Monto</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Ingrese monto'
            placeholderTextColor={'#666'}
            value={monto}
            onChangeText={setMonto}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Pressable
            style={styles.btn}
            onPress={() => guardarPedido()}
          >
            <Text style={styles.textoBtn}>Ingresar Credito</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#D9F0FF'
  },
  encabezado: {
    marginTop: 70
  },
  textoEncabezado: {
    textAlign: 'center',
    fontSize: 24
  },
  textoEncabezado2: {
    color: '#751693',
    fontWeight: '700'
  },
  contenedorCliente: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 5,
    padding: 20,
    marginTop: 30,
    shadowColor: "#BB1914",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 10,
  },
  textoCliente: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  textoCliente2: {
    color: 'blue',
    fontSize: 17
  },
  contendorCampos: {
    padding: 20
  },
  campos: {
    marginTop: 15
  },
  campoLabels: {
    textTransform: 'uppercase',
    fontSize: 18
  },
  campoInputs: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    fontSize: 16
  },
  btn: {
    marginTop: 55,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 50,
    backgroundColor: '#9C9C9C',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 7
  },
  textoBtn: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  }
})

export default IngresarCredito