import React, { useRef, useState } from 'react'
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
import TakenImages from './TakenImages'
import axios from 'axios'

const IngresarClientes = ({ route }) => {

  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [telefono, setTelefono] = useState('')
  const [foto, setFoto] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAEsJJREFUeJztnXmwXVWVh7+XhCdUJiADIQ5oqgQE0hEIYCQYQYWgIQwKglVd0N10dRShi25L/3G4oOWAAbRExKFEtFBUoAoHoomhpcXqstrYahiTaFBJoHmBjCQkJHn+se713TzvOXftffY++5x711e1S4337L3O+b3fGfawNhiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGMcJA6gCUTAXmAv8AHAO8GpgJTAEmAoPN3+0BtgPPARuBJ4EngN8DvwY2lRhzL2N6JOZgYBFwK3JBhwOVx5t1Lmq2YegwPSrAAHAW8C1gG+FEyCrbmm2dWcbJ1RDToyIcAixB7iaxRci7ky1pxtLvmB4VYRC4BniadEKMLk8DVzPyDt1PmB4VYjGwlvQCZJW1wHnRzr56mB4VYQZwD+kvuLbc04y5VzE9KsQFSLde6ovsWoaA8yNcj9SYHhVhHHAz6S9s0XIjMDbwtUmB6VEhJgM/I/3FDFVWNM+prpgejsQcSZ8JLAeOD1TfDuAhYBUyWLUGeAYZqd3R/M0EZCR3BjLCewxwMjAfGB8ojoeBc5CR4TpRth57gZcBhwNHAq8BTkBG4OcBhwWKo5Z6HAX8geJ3iA3ADcgFHVcgnoOANwJLkQtZNK51zXOsC1XTYwzwBuDTwPoAcdVKj5kUF2M5clcYEyG+scBCir9qrEPujFWn6noMAGcD9xeMsRZ6TEYeeb4nuQw4pcR4T0PE9413NdX+JqmbHicBPykQb6X1GIf/XfnPwIXlh/w3Lgae6hCXpqygmr0pddZjEfCnDnHVWQ9uwu+E7kA+rlMzEbgTv3P4bIJ4u9ELetxOj+hxAe4nsRO4IkGs3bgS2IX7+SxOEWwGvaTH5dRcjxm4j8g+j/QqVZUzgM24ndMQ1ZgG0Yt6zEOubx31cJ7Ls4FwffExmY17l/DdSSI9kF7V4zhqqMdi3O9UdRCjxWzcnySLkkQq9Loer8P9SZJMj0HcpkjvpNqP8SzOwO0deA1p1i/0ix7zqIceXOMQ5DDV/ADUciVu5/r+BDH2kx6XU3E9DsFt5dkdZQcYAZcu4I2Um4SgDD0GgUtDBDuKy5CpQK7cTnX1YIlDcH+iGv3qRZmI22Div5UYW2w9BoH7msc3gkQsfLxZ5724m2QCboOJpekxgNuC/pQjsqG5BP15P15STLH1aDdHqzQCxN0yR6v4mOQ8qqcHZzkEtaysoDyZjoy6usxMXYH+/BeEDDaDmHp0MkcIk4w2RxGT/DSjrlR68C2HgMqc6ObKdOARJM7voJ+pOg/9+Zfx7RVLjzxzFDHJ9V3qdDXJyV3qK1WPg9EnEVseO5gCtJujVb6BfgHZA+iuwVZk0VAsYumhMYePSbqZw9ck2hnAsfVgkTKQYWT9QBXpZI5W+Qo6k5ybcXyn8vaw4R9ADD1czOFikusc63QxyTkO9cbUg1uVQWwgzuKaouSZo1VuUdQzFn236heCnsGBxNDjUmWdLiZxNUervEsZ8xgkMXZqPdSJiys33Rgxh3bx0I2K+rTTyR8LeRKjiKVHQ1mvxiS+5viwY8w3KOuNpsdUZQDDyIdslXAxR6t8skudZzjUNTXo2Qix9Wg41J9lEt86XM0BMm0mpR4sVDa+Hf8F/XOaJSQ+5hgGdiNZUbIYBF5Q1nV24HOCcvRoKNvoZBLfY33MAfLau0XZRgw9+KCycd+xjznIOoZNyMYsIfA1x4vAOxT1a9ezfyDQ+bQTW48WDWU7IcpHCsa6TNmOWg+XD+m8u2k7qxzqbDEHWInsUDQF6UYtapLpzXpcp3PvBi4Cfqz4rfZcj3aMQUNMPdppIN8RsfkoMoBYhJR6sBKdO//Rsd7Wk2N0PUWeJNPwf3IsdGjnCmW9KzzPI49YemTRULbnUz4aKEZtD1wMPXhM2fhpDnVmmaNVhnA3ia85duE+dqMdVX/EsV4NMfToRkPZZgpzAJyqbDOGHjyrbPwoZX3dzOFjkiLm8Plwe7Wy/mc86u5GaD20NJTtlm0OgFcp242hh3oV1+GKurTmaDfJ7C51+ppjJ/A2RcydmKJs4wXP+vMIqYcrDWXbeeVjEeKaoGw7hh7sUzauWd6ofX/WmmQaklXPxxxvUZ19ZwaV7ewt0EYWIfXwoaFsvyxzgHRnB9Uj1XSQS5C9sl2YivRKjTbJtOa/n+BY305kLtNKx+Paqcs+81WjJ69b6Ef6FOB3yjrby7OMmMT3yfEC8GbH8++EdjTbXrH+vjQixJX0FSvGR2ERk5yFnzl2EG7hzGuUbfbSR7rv3KoyTJL0Iz1Wt6KvSXzKdmQOVSj6rZs3pDlimOQ0ZZtqPVy+QbQ7+GhHeFs8h3wou36TuLIDWcfxi4B1as81xu5HsfTI4jrCd8uCfLA3AtU1S/k7tR4uBnlS+TsfQTYR1yTbkRHyhwLXe6zyd+sDtwtx9RjN9cQxR4tQJtFOK1Lr4WKQJ5S/O9mhznZimWQbMkL+y8D1gmz4okF77VyIrUeL6yk+iVBDCJPMVf4uhh7q6dU78EsE1mIq4b5JtiJ74cVgEOkq1sSRcrp7ET2yso90K60/9jK/ScYieqfSw2mBTtGcryFMsoWwH6ijeZMyjv2kXzDlo0cRc7RoeNbR8Ij3dGXdsfQA9AnKlgZoayryuuVzgTcTP+XQzcpYHo0YQyw9fM3R6Tul4VlXwzHmpcp6Y+qhThKwkTD7xPmYZDP6d1FfxiF96Zp4qpC0wUWPy5R1aszRouFZ58XKmMcg+yqm1sMpzYzLuoo8XEzyPMU/SjW8QxnPMNVJ+6PV4yAk5U4oc7RoONb5ffRLhauShskpUdnPArarMclzwIkB28zj511iaZUtVCdxnIseLiZx6eFqKOt0MQfolz7H1gNwS3UZ8iN5Gtkm2QS8PmBbeczPiKFTqVrqURc9NCbx6f5tdKnT1RyndKmvbD040yGg0OlHO5lkE+EzoeShTTs6TDnJkmPqkWcS3+wjkG0SV3OA217wZejhnG5fmx1PS7tJfJbkFsHlA7aq2x+46tHJJEXM0aIxqk4fc1xI9fQA3DZs+Quy+UxIpiHrOLqtMgzJJNx2We22YcsAMuX+c8CvkG+ovUjiiPXAD5Bt1Y5QxBZbj3aThDBHiwb+5phEdTc0ct7y684yg4vEd9Gfb7ctvy5G+uM1de0Bvkq+UcrQ4yDCvw2AXAufxHYu316lb8EGcLVDgMPIRph1xeUOPQxclVHPYbhnTm+VzUi+riz6SQ/XTVWz9IiK67bDuwi7FqMsFiCvPdrzzNp2eCb6p0ZW2Q/8R0ac/aLHfMLoUQoue8S17oJlfjcUZQ76fK+t0ill6UT8Vj9mlX/OiLfX9TgB+VYrqkep3INbwBuphyhzcHuvH0Y+Njvh8r6sKS+SfQ17VY/jCadHqcxAultd71zzUwSrZAHuT44h5FqM5s2O9WhL1vqWXtRjPu5Pjiw9knA+7gLvopofiktwe8dtlcUZ9bkMLLqWrFSpvaTHvxBWj2TciJ/IdxJ+nMSHSbh15baXrB2cZnnWpy1355xPL+jh+2paxR3OGIfbHuLt5SkkmVwqLsNtELC9LCd7Krlr16tryVstWGc9LsRtEFCrR3ImU6y3ZgXlbt92OsVegX6P3OmyuMOhrv9DeqHmAV90OC5vBnPd9DgFt7lVrnpUgpnAOordGR9A5vjHuBOMQ7r+fl4wxrXAkV3aelBZ1/8Dh4469jblse/sEkPV9RjTrFs7Zb2IHpXhKIqLMox0692EDGgVGewZRNaQfw75Yywa1zp0GQtXKev7RodjtZuE/pMijqrpMRZ5ei9FvxIwhB7OxEwiPBP4Ke5JpbPYiXRtrkLStjyBCLa9WQaQj8uJSPfeMUjeqpOQbsJDAsWxGuk9elrx29+im4r/ZaT3rJ25wP8qjv1X4GuK35Wtx35k/tPhyJ19FjKWMRd5bQv1KuSiR+WYjP+HYhXLctyE/a2y3ts6HDtXeaxL12y/6+FM7O0PtiJroW+M3E4ZfBZ5V96WOpACmB4VZjHuI7xVKENI75IPVXuCtNOPejhT5gY6P0Dm/NxTYptF+T4S8w9TBxIB06PCLEKmIae+G2WVNYSZBVrlJ0g7/aJHrRgE3o//CHaMshFZXBNq/UBdDAL9oUctORhZL+ySeCB0ebwZQ+hlmXUySIte1qP2LECmZ2izdBcpW5ttLYh4PnU0SDu9poczPovlY/Jgs7wM2SvkXOCt6DeqyaN1Z1oJLGv+5+4A9fYyfa9H1QzSYjdwf7OApB49CcmBdTSyeeZMZH/DiYykk9yNjOI+h7y/rkdGeFcDv0GSzBnu9K0eVTXIaDYho6ahMzUafvSNHmWOgxhG7ajLE8TIZiEyAXE8kplxCHgY+K/mfzcKYAapP1nrQfYjExOXEnYrir7CXrF6lzHINPAVyNSMymT4qBNmkP5gEbKkN/bWdD2HGaR/mIGMNWj3djcwg/Qbk5BZvNG2Qe41zCD9x8uRtfmGAjNIf/IeytvwtNZYN29/MsDIJMTXIjt27WdkDOUB4C7gyUTxGX1CGbN5Y5V9SCrWWUGuRE2xV6zeYA/wBeB9hFtCOwZJP7oaSS1kGMEp6wly/qhjP+NwrLZUMiG0UW/KMMgfOhw7XXmsa/mI32WoL/aKVX82d/i35yO1dR1wVqS6K4kZxHBhAHna9U3vZ9+cqBGM1wKXI3l5j0Ze5/Yji6geRRJJ9wxmkHi8E0nW3IvkJcveAHwPuAX4YznhxMNeseJwAfAd6nMD2g38jjB5bl8OXIske/siNdjQxiiX85BxCZfeoSK9WL/ucOw4h7Z/xchakfHIvoche77+CLy++2Uz+oG3I3dj1z+ilAYZ/Ro4Edn7MKRJtiOb7tQOe8UKx9nAvdQrTeY+4JFR/7adzmMrRZgA/Bg4LnC90TGDhOEtwH2M5IOqO8MR6pyITIMJtdNXKZhBinMmsubb8sh251hqNhpvBinGmxBz1OqumJhrgSNSB6HFDOLPfOS9enzqQGpGK3t8LTCD+DEPyVM7IXUgFeAh4GrgE3SeF9aJy+KFE5a6DGRViVOBnyAfnf3OD5FB0f3N/30X0u3c7XvsWOCVwF/ihRYGe4K4MZcSth6uETczYg6QLuNlymNrsSbeDKLnRMQck1MHUiGKTLWfHjKQWJhBdByPpPA8LHUgRrmYQbozAHwb2RzGhSHg1vDhGGViBunOqchOSi4MIaPrq8OHY5SJGaQ7rms6zBw9hBmkOy6TD0OaY5fydzs7/Nte4CXPY4u23VOYQcIR+smxFplZ241O090BVimOzfpNVp3tbCH8rN/KYQYJx72Efa3aA3ypwG8+r2gjK4n1rchTKI9bkOnyPY0ZpNp8DNlrsBP7kIyHazP+/7vI70W7CZmi34nHgPdy4CBgOyuAj+fU3TOYQarNi8hCrGuRp9NLyKvNfcAbgW92Of4q4N1IBpJdyDfDfwMXAf/Z5divIRMyf4QkuX4JWbd+DXAu8vTqeWwuVvXZi7wK+e7p8b1m8eF/kDX2fYs9QQwjBzOIYeRgBjGMHMwghpGDGcQwcjCDGEYOZhDDyMEMYhg5mEEMIwcziGHkYAYxjBzMIIaRgxnEMHIwgxhGDmaQuNja7ppjBomLZm23y++MkjGDxOURYGWX3/wZWc9uVBAzSHyuIHu/8K3AJcjSWqOCmEHi8xRwMnADsB5JtvAM8HVgDrINs1FRbE16OWwBPtQsRo2wJ4hh5GAGMYwczCCGkYMZxDByMIMYRg5mEMPIwQxiGDmYQcJxETA7dRBGWMwg4ZiGzLvqd5O8InUAITGDdEc7ZR3MJIcju2xp0GwRZ9SA1wHDjuVZ+tMkV6K/RnMTxWhEYAVmEg3a6/RkoviMSMxC/uDNJNlMQzb70VyXGxLFaERkNmaSPJZgr1d9j5kkmwfQXYue3zq63zGT/D1HIAvBNNfhU4liNErETHIgV6G/BicmitEoGTPJCA+iO/c1qQI00mAmgZnoX68+kShGIyH9bpJr0J9zL5yv4UERkxybIN6Q/BLduT6aKkCjGviaZBUwkCDeELwC2I/uPBtpQjSqhK9JFqYINgD/jv4cj0sUYyFsNm9YViOzWYccj1sQIZYy0P7RP0xNX7HMIOHxMcmhkWKJzVjl7+6OGkVEzCBxcDVJXb9BtGxIHYAvZpB4rAauTx2EUQwzSFz2pg7AKIYZxDByMIMYRg5mEMPIwQxiGDmYQQwjBzOIYeRgBomLNjnanqhRxKPn94E3g8TlMeXvajlPCdsH3ijIGOSPP2+W6zZgSqoACzIemUaSd373J4vOqAWnANvp/MezD7g0XWhBOB0xeafzWwMcmS40oy4cDyznwMVFv0Gf6LnqzAJuR/Z/3wusAz4JTEoZlFE/DgVOQPJIGYZhGIZhGIZhGIZhGIZhGIZhGIZhGFXkr+6vZXUUjw19AAAAAElFTkSuQmCC')
  const [fecha, setFecha] = useState(new Date())
  const [idUsuario, setIdUsuario] = useState('1')
  const inputRef = useRef(null)

  const devolverFoco = () => {
    inputRef.current.focus()
  }

  const formatDate = (date) => {
    date.setDate(date.getDate() + 1)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const subirCliente = async () => {
    if ([nombre, apellidos, telefono].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return false
    }
    try {
      objetoCliente.fechaAlta = formatDate(fecha)
      const response = await axios.post('http://192.168.1.126:8080/App/cliente/addCliente', objetoCliente)
      Alert.alert('Guardado', 'Cliente ingresado')
      limpiarFormulario()
    } catch (e) {
      Alert.alert('Error', `Servidor: ${e}`)
    }

  }

  const objetoCliente = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    foto: foto,
    idUsuario: idUsuario,
  }

  const limpiarFormulario = () => {
    setFoto('data:image/png;base64,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')
    setNombre('')
    setApellidos('')
    setTelefono('')
    devolverFoco()
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView>
        <View style={styles.titulo}>
          <Text style={styles.tituloText1}>Ingreso de {''}<Text style={[styles.tituloText1, styles.tituloText2]}>Clientes</Text></Text>
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Nombre</Text>
          <TextInput
            ref={inputRef}
            style={styles.campoInputs}
            placeholder='Ingrese nombre'
            placeholderTextColor={'#666'}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Apellidos</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Ingrese apellido'
            placeholderTextColor={'#666'}
            value={apellidos}
            onChangeText={setApellidos}
          />
        </View>
        <View style={styles.campos}>
          <Text style={styles.campoLabels}>Telefono</Text>
          <TextInput
            style={styles.campoInputs}
            placeholder='Ingrese telefono'
            placeholderTextColor={'#666'}
            value={telefono}
            onChangeText={setTelefono}
            maxLength={10}
          />
        </View>
        <TakenImages
          foto={foto}
          setFoto={setFoto}
        />
        <View style={styles.btnGuardar}>
          <Button
            title='Guardar Cliente'
            onPress={subirCliente}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#D9F0FF',
    paddingHorizontal: 24,
  },
  titulo: {
    marginTop: 50
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
    marginTop: 10,
  }
});

export default IngresarClientes