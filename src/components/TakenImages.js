import React from "react";
import { Button, Image, PermissionsAndroid, Pressable, StyleSheet, Text, View } from 'react-native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const TakenImages = ({ foto, setFoto, subirFoto }) => {

    const options = {
        title: 'Selecciona una imagen',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1000,
        maxHeight: 1000,
        saveToPhotos: true
    }

    const handleTakePhoto = async () => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = (await launchCamera(options))
            if (result.didCancel) return
            setFoto(result.assets[0].uri)
            subirFoto(true)


/*
            fetch(result.assets[0].uri)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader()
                    reader.onload = () => {
                        setFoto(reader.result)
                        subirFoto(true)
                    }
                    reader.readAsDataURL(blob)
                })
*/
        }
    }
    const handleSelectPhoto = async () => {
        const result = (await launchImageLibrary(options))
        if (result.didCancel) return
        setFoto(result.assets[0].uri)
        subirFoto(true)
/*
        fetch(result.assets[0].uri)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader()
                reader.onload = () => {
                    setFoto(reader.result)
                    subirFoto(true)
                }
                reader.readAsDataURL(blob)
            })
*/            
    }

    return (
        <View>
            <View style={styles.contenedorBtn}>
                <View style={styles.btn}>
                    <Pressable
                        onPress={handleSelectPhoto}
                    ><Text style={styles.btnText}>Selecionar Foto</Text></Pressable>
                </View>
                <View style={styles.btn}>
                    <Pressable
                        onPress={handleTakePhoto}
                    ><Text style={styles.btnText}>Tomar Foto</Text></Pressable>
                </View>
            </View>
            <View style={styles.contenedorImg}>
                <Image
                    style={styles.contenedorImagen}
                    source={{ uri: foto }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorImg: {
        alignItems: 'center'
    },
    contenedorImagen: {
        height: 225,
        width: 225,
    },
    contenedorBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btn: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#43A1DE'
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})

export default TakenImages