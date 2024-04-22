import React, { useState } from "react";
import { Button, Image, PermissionsAndroid, StyleSheet, View } from 'react-native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export type ImageType = {
    uri:string;
    type:string;
    name:string;
}
const ImageScreen = () =>{


    const [image, setImage] = useState('https://placehold.co/600x400?text=Hello+World')

    const options = {
        title: 'Selecciona una imagen',
        mediaType:'photo',
        quality:0.8,
        maxWidth:2000,
        maxHeight:2000,
    }

    const handleTakePhoto = async () =>{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
            const result = (await launchCamera(options as any)) as {assets:ImageType[]}
        }
    }

    const handleSelectPhoto = async () =>{
        const result = (await launchImageLibrary(options as any))as {assets:ImageType[]}
    }

    return (
        <View>
            <Button 
                title="Seleccionar Imagen"
                onPress={handleSelectPhoto}
            />
            <Button 
                title="Tomar Foto"
                onPress={handleTakePhoto}
            />
            <Image
                style={styles.contenedorImagen}
                source={{uri:image}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorImagen:{

        height:200,
        width:200
    }
})

export default ImageScreen