import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import axios from 'axios'

const IngresarPedidos = ({ route }) => {

  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [montoTotal, setMontoTotal] = useState(0)
  const [abono, setAbono] = useState(0)
  const [saldoRestante, setSaldoRestante] = useState(0)
  const [fechaAlta, setFechaAlta] = useState(new Date())
  const [fechaCompromiso, setFechaCompromiso] = useState(new Date())
  const setFocus = useRef(null)

  const limpiarFormulario = () => {
    setDescripcion('')
    setMontoTotal(0)
    setAbono(0)
    setSaldoRestante(0)
    let fechaActual = new Date()
    setFechaCompromiso(fechaActual)
    setFocus.current.focus()
  }

  useEffect(() => {
    cargarCliente()
  }, [])

  const cargarCliente = () => {
    const { cliente } = route.params
    const { nombre, apellidos, id } = cliente
    setNombre(nombre)
    setApellidos(apellidos)
    setId(id)
  }

  const validarCampos = () => {
    if (descripcion === '' || montoTotal === 0 || saldoRestante < 0 || fechaCompromiso <= fechaAlta) {
      Alert.alert('ATENCION', 'Uno o mas campos son incorrectos')
      return false
    }
    return true
  }

  useEffect(() => {
    calculoRestante()
  }, [abono, montoTotal])

  const formatDate = (date) => {
    date.setDate(date.getDate() + 1)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const calculoRestante = () => {
    setSaldoRestante(montoTotal - abono)
  }

  const abonoAnumero = valor => {
    var conversion = Number(valor)
    setAbono(conversion)
  }
  const montoAnumero = valor => {
    var conversion = Number(valor)
    setMontoTotal(conversion)
  }

  const montoAstring = () => {
    const valor = montoTotal.toString()
    return valor
  }
  const abonoAstring = () => {
    const valor = abono.toString()
    return valor
  }

  const guardarPedido = async () => {
    if (!validarCampos()) return
    const clienteObjeto = {
      idCliente: id,
      descripcionCompleta: descripcion,
      montoTotal: montoTotal,
      abono: abono,
      saldoRestante: saldoRestante,
      fechaAlta: formatDate(fechaAlta),
      fechaCompromiso: fechaCompromiso,
      estado: true,
      idUsuario: 1,
      idUsuarioQueEntrega: 1
    }
    try {
      const respuesta = await axios.post('http://192.168.1.126:8080/App/pedido/addPedido', clienteObjeto)
      const res = `Pedido ingresado, ${respuesta.status}`
      Alert.alert('Exito', res)
      limpiarFormulario()
    } catch (e) {
      Alert.alert('ERROR', `Error: ${e}`)
    }
  }

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.encabezado}>Ingreso de {''}<Text style={styles.encabezado2}>Pedidos</Text></Text>
      <View style={styles.vistaCliente}>
        <Text style={
          {
            fontSize: 15,
            fontWeight: '600',
            textAlign: 'center'
          }
        }>Cliente: {''}<Text style={
          {
            color: 'blue',
            fontSize: 17
          }
        }>{nombre}{' '}{apellidos}</Text></Text>
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        <View>
          <View style={styles.campos}>
            <Text style={styles.campoLabels}>Descripcion</Text>
            <TextInput
              ref={setFocus}
              style={styles.campoInputs}
              placeholder='Descripcion completa'
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={3}
              maxLength={250}
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>
          <View style={styles.campos}>
            <Text style={styles.campoLabels}>Monto total</Text>
            <TextInput
              style={styles.campoInputs}
              placeholder='Total del pedido'
              placeholderTextColor={'#666'}
              keyboardType='numeric'
              value={montoTotal}
              onChangeText={setMontoTotal}
            />
          </View>
          <View style={styles.campos}>
            <Text style={styles.campoLabels}>Abono</Text>
            <TextInput
              style={styles.campoInputs}
              placeholder='Anticipo'
              placeholderTextColor={'#666'}
              keyboardType='numeric'
              value={abono}
              onChangeText={setAbono}
            />
          </View>
          <View style={styles.campos}>
            <Text style={styles.campoLabels}>Saldo restante</Text>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 26,
                color: 'red',
                fontWeight: '600'
              }}
            >{saldoRestante}</Text>
          </View>
          <View style={styles.contenedorFecha}>
            <Text style={styles.textoFecha}>Fecha de entrega</Text>
            <DatePicker
              date={fechaCompromiso}
              onDateChange={setFechaCompromiso}
              mode='date'
              locale='es'
            />
          </View>
          <View style={styles.btnGuardar}>
            <Button title='Guardar Pedido' onPress={guardarPedido} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#D9F0FF',
    //    paddingHorizontal: 24
  },
  vistaCliente: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#BB1914",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 10,
  },
  encabezado: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24
  },
  encabezado2: {
    color: '#751693',
    fontWeight: '700'
  },
  contenedorFecha: {
    alignItems: 'center'
  },
  textoFecha: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10
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
  btnGuardar: {
    margin: 20
  }
})

export default IngresarPedidos