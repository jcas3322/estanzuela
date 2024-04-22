import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, FlatList, StyleSheet, Pressable, TextInput, Button, Alert } from 'react-native'
import axios from 'axios'
import DatePicker from 'react-native-date-picker'

const VerCredito = ({ navigation }) => {

  const [creditos, setCreditos] = useState([])
  const [fechaInicio, setFechaInicio] = useState(new Date())
  const [fechaFinal, setFechaFinal] = useState(new Date())

  const stringCargarInfo = cadena => {
    const url = `http://192.168.1.126:8080/App/credito/${cadena}`
    return url
  }

  const buscarFecha = async (capa) => {
    const cadena = `${capa}/${formatDate(fechaInicio)}/${formatDate(fechaFinal)}`
    const url = stringCargarInfo(cadena)
    try {
      const response = await axios.get(url, {
        validateStatus: status => {
          if (status === 302) return true
          if (status === 404) {
            Alert.alert('Response', 'Sin registros en ese rango')
          }
        }
      })
      const respuesta = response.data
      setCreditos(respuesta)
      navigation.navigate('Resultados', { respuesta })
    } catch (e) {
      if (e.response.status != 404) Alert.alert('ERROR', `ERROR: ${e}`)
    }
  }

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <ScrollView style={styles.contenedorPrincipal}>
      <View style={styles.contenedorBuscador}>
        <View style={styles.tituloBuscar}>
          <Text style={styles.textoBuscar}>Buscar por Fechas</Text>
        </View>
        <View style={styles.contenedorFecha}>
          <Text style={styles.textoFecha}>Seleccione fecha inicio</Text>
          <DatePicker
            date={fechaInicio}
            onDateChange={setFechaInicio}
            mode='date'
            locale='es'
          />
        </View>
        <View style={styles.contenedorFecha}>
          <Text style={styles.textoFecha}>Seleccione fecha final</Text>
          <DatePicker
            date={fechaFinal}
            onDateChange={setFechaFinal}
            mode='date'
            locale='es'
          />
        </View>
        <View style={styles.contenedorBotones}>
          <View style={styles.btn}>
            <Pressable
              onPress={() => buscarFecha("fechaAlta")}
            >
              <Text style={styles.textoBtn}>Activos</Text>
            </Pressable>
          </View>
          <View style={styles.btn}>
            <Pressable
              onPress={() => buscarFecha("fechaBaja")}
            >
              <Text style={styles.textoBtn}>No activos</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.contenedorBuscador}>
        <View style={styles.tituloBuscar}>
          <Text style={styles.textoBuscar}>Buscar por estado</Text>
        </View>
        <View style={styles.contenedorBotones}>
          <Pressable
            style={styles.btn}
          >
            <Text style={styles.textoBtn}>Activos</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
          >
            <Text style={styles.textoBtn}>No Activos</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.contenedorBuscador}>
        <View style={styles.tituloBuscar}>
          <Text style={styles.textoBuscar}>Buscar por descripcion</Text>
        </View>
        <View>
          <TextInput
            placeholder='Ingrese descripcion'
            multiline={true}
            maxLength={200}
            style={styles.descripcion}
            placeholderTextColor='blue'
          />
        </View>
        <View style={{
          margin: 10
        }}>
          <Button title='Buscar...' />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#E7E7E7'
  },
  contenedorBuscador: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  contenedorFecha: {
    alignItems: 'center',
    marginTop: 10
  },
  textoFecha: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  tituloBuscar: {
    backgroundColor: '#DBEFFF',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    padding: 6
  },
  textoBuscar: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    padding: 10,
    marginVertical: 10,
    width: '40%',
    backgroundColor: '#128BEB',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 7,
  },
  textoBtn: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  descripcion: {
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    margin: 10,
    color: 'black',
    borderWidth: 0.5,
  }
})

export default VerCredito