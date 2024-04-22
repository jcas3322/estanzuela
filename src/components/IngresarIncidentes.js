import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert
} from 'react-native'
import axios from 'axios'
import { API_BASE_URL } from '../constants/constantes'
import { Picker } from '@react-native-picker/picker'
import GlobalContext from '../../GlobalContextProvider'

const IngresarIncidentes = ({route}) => {

  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [referenciaDeDireccion, setReferenciaDeDireccion] = useState('')
  const [latitud, setLatitud] = useState('latitud')
  const [longitud, SetLongitud] = useState('longitud')
  const [documentoA, setDocumentoA] = useState('')
  const [documentoB, setDocumentoB] = useState('')
  const [categoria, setCategoria] = useState([])
  const [categoriaId, setCategoriaId] = useState('')

  const { ciudadanoLogueado, setIsAuthenticated } = useContext(GlobalContext)
  const inputRef = useRef(null)

  useEffect(() => {
    const cargarCategorias = async() =>{
      try{       
            const headers = {
              Authorization: `Bearer ${ciudadanoLogueado.usuario.tokenDeAcceso}`
            };
        
            const response = await fetch(`${API_BASE_URL}/categorias/all`, {
              method: 'GET',
              headers: headers
            });
        
            const statusCode = response.status

            if(statusCode === 403){
              Alert.alert('Su sesion ha caducado, loguese nuevamente')
              setIsAuthenticated(false)
              return
            }

            if (!response.ok) {
              throw new Error('Error interno');
            }
        
            const data = await response.json()
        setCategoria(data)
      }catch(e){
        console.log('Error', e)
      }
    }
    cargarCategorias()
  }, [])

  const devolverFoco = () => {
      inputRef.current.focus()
    }

    const subirIncidente = async () => {
      if ([direccion, descripcion, referenciaDeDireccion].includes('')) {
        Alert.alert('Error', 'Todos los campos son obligatorios')
        return false
      }
      if(categoriaId === ''){
        Alert.alert('Seleccione categoria')
      }
      //console.log('OBJETO', objetoIncidente)
/*
      try{
        const response = await fetch(`${API_BASE_URL}/incidente/nuevo`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ciudadanoLogueado.usuario.tokenDeAcceso}`,
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(objetoIncidente)
        })

        if(!response.ok){
          console.log('Respuesta', response)
          console.log('La data de error', response.json())
          throw new Error('Error interno')
        }
        const data = await response.json()
        console.log('DATA RECIBIDA',data)
      }catch(e){
        console.log('Error', e)
      }
*/
      
          try{
              const response = await axios.post(`${API_BASE_URL}/incidente/nuevo`, objetoIncidente, {
                  headers: {
                    Authorization: `Bearer ${ciudadanoLogueado.usuario.tokenDeAcceso}`,
                      'Content-Type': 'application/json'
                  }
              })
              console.log(response)
              Alert.alert('Queja ingresada correctamente')
              limpiarFormulario()
            }catch(e){
              Alert.alert('Error', e)
          }
          
    }
  
    const objetoIncidente = {
      descripcion: descripcion,
      direccion: direccion,
      referenciaDeDireccion: referenciaDeDireccion,
      latitud: latitud,
      longitud: longitud,
      documentoA: documentoA,
      documentoB: documentoB,
      idCategoria: {
        id: categoriaId
      },
      idCiudadano: {
        id: ciudadanoLogueado.usuario.id
      }
    }
  
    const limpiarFormulario = () => {
      setDescripcion('')
      setDireccion('')
      setReferenciaDeDireccion('')
      setDocumentoA('')
      setDocumentoB('')
      devolverFoco()
    }

  return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView>
        <View style={styles.titulo}>
          <Text style={styles.tituloText1}>Registro de {''}<Text style={[styles.tituloText1, styles.tituloText2]}>Quejas</Text></Text>
        </View>
        <View>
          <Text style={styles.labelCategorias}>Listado de {''}<Text style={styles.txtTitulo2} >Categorias</Text></Text>
          <Picker
            onValueChange={(id, indice) => setCategoriaId(id)}
            selectedValue={categoriaId}
          >
          <Picker.Item label='- Seleccione -' value="" />
            {categoria.map((item, index) => (
              <Picker.Item label={item.nombre} value={item.id} key={index} />
            )
          )}
          </Picker>
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Descripcion</Text>
          <TextInput
            ref={inputRef}
            style={styles.campoInputs}
            placeholder='Ingrese motivo de queja'
            placeholderTextColor={'#666'}
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Direccion</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Lugar de la situacion'
            placeholderTextColor={'#666'}
            value={direccion}
            onChangeText={setDireccion}
          />
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Referencia de lugar</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Ingrese referencia de lugar'
            placeholderTextColor={'#666'}
            value={referenciaDeDireccion}
            onChangeText={setReferenciaDeDireccion}
          />
        </View>
        <View style={styles.btnGuardar}>
          <Button
            title='Registrar Queja'
            onPress={() => subirIncidente()}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
contenedor: {
  flex: 1,
  backgroundColor: '#D9F0FF',
  paddingHorizontal: 24,
},
labelCategorias:{
  textAlign: 'center',
  marginTop:10,
  fontSize:18
},
titulo: {
  marginTop: 20
},
tituloText1: {
  textAlign: 'center',
  fontSize: 25
},
tituloText2: {
  color: '#751693',
  fontWeight: '700'
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
  marginVertical:15
}
});

export default IngresarIncidentes