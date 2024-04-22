import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterCiudadado from '../NewCiudadano/Register';
import { API_BASE_URL } from '../../constants/constantes';
import axios from 'axios';
import GlobalContext from '../../../GlobalContextProvider';

const LogIn = ({route}) => {

    const [mostrarModalRegistrarUsuario, setMostrarModalRegistrarUsuario] = useState(false)
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const { setCiudadanoLogueado, setIsAuthenticated } = useContext(GlobalContext)

    const ingresar = async() => {
        if([usuario, password].includes('')){
            Alert.alert('Debe llenar los campos requeridos')
            return
        }
        try{
            const response = await axios.post(`${API_BASE_URL}/user/login`, ciudadano, {
                validateStatus: status => {
                    if(status === 200) return true
                    if(status === 401){
                        Alert.alert('Usuario o contraseña incorrectos')
                    }
                }
            })
            const logedIn = JSON.stringify(response.data)
            const objeto =JSON.parse(logedIn)
            setCiudadanoLogueado(objeto)
            setIsAuthenticated(true)
        }catch(e){
            console.log(e)
        }
    }

    const ciudadano = {
        email: usuario,
        password: password
    }

  return (
    <SafeAreaView style={styles.contenedor}>

        <KeyboardAwareScrollView>
            <Image
                source={require('../../../img/logo.jpeg')}
                style={styles.logo}
            />
            <View style={styles.contenedorTextInputs}>
            <TextInput
                    placeholder='Ingrese su correo electronico'
                    style={styles.textInputs}
                    value={usuario}
                    onChangeText={setUsuario}
                />
            <TextInput
                placeholder='Ingrese su contraseña'
                style={styles.textInputs}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            </View>
            <Pressable
                style={styles.btn}
                onPress={()=>ingresar()}
            >
                <Text style={styles.textoBtn}>Ingresar</Text>
            </Pressable>
            <Pressable
                style={styles.btn}
                onPress={() => setMostrarModalRegistrarUsuario(!mostrarModalRegistrarUsuario)}
            >
                <Text style={styles.textoBtn}>Registrarse</Text>
            </Pressable>
            <Modal
                visible={mostrarModalRegistrarUsuario}
                animationType='slide'
            >
                <RegisterCiudadado
                    setModalVisible={setMostrarModalRegistrarUsuario}
                />
            </Modal>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    contenedor :{
        flex:1
    },
    logo:{
        height:300,
        width:300,
        alignSelf:'center',
        marginTop:20
    },
    contenedorTextInputs:{
        marginTop:15
    },
    textInputs:{
        fontSize:20,
        marginHorizontal:10,
        borderWidth:1,
        borderRadius:10,
        color:'#000',
        marginVertical:15
    },
    btn: {
        marginTop: 35,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 50,
        marginVertical:10,
        backgroundColor: '#E93008',
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
        color: '#000',
        fontWeight: '700',
        textTransform: 'uppercase',
      }
})

export default LogIn