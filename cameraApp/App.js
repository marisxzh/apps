import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



export default function App() {

  const [foto, setFoto] = useState(null);

function openAlbum(){

  const options = {
    mediaType: "photo",
    quality: 1,
    selectionLimit: 1,
  }

  launchImageLibrary (options, (response) => {

    if(response.didCancel){
      console.log("IMAGE PICKER CANCELADO")
      return;
    } else if (response.error){
      console.log("GEROU ERRO", response.errorMessage)
      return;
    }

    console.log (response.assets)
    setFoto(response.assets[0].uri)
  
  })

}

async function openCamera(){

  const options = {
    mediaType: "photo",
    quality: 1,
    saveToPhotos: true,
  }

  const response = await launchCamera(options)

  setFoto(response.assets[0].uri)

}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoAlbum} onPress={openAlbum}>
          <Text style={styles.botaoTexto}> Abrir Album </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCamera} onPress={openCamera}>
          <Text style={styles.botaoTexto}> Abrir Câmera </Text>
        </TouchableOpacity>




      </View>
      {foto !== null && (
      <Image source={{uri:foto}} style={styles.foto} />
    )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  botoes:{
    marginTop: 144,
    flexDirection: 'row',
    gap: 42,
    marginBottom: 25
  },
  botaoAlbum:{
    backgroundColor: '#1c2a57',
    padding: 4,
    paddingHorizontal: 15,
    borderRadius: 4
  },
  botaoCamera:{
    backgroundColor: '#b3175a',
    padding: 4,
    paddingHorizontal: 15,
    borderRadius: 4
  },
  botaoTexto:{
    color: '#fff',
    fontWeight: 'bold'
  },
  foto:{
    width: '90%',
    height: 300,
    borderWidth: 1,
    borderColor: '#bbd2ec'
  }

});
