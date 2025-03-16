import {StyleSheet, View, Text, TouchableOpacity,StatusBar} from 'react-native';
import React, { useState } from 'react';
import Arrow from '../assets/leftArrow.svg';
import FilePlus from '../assets/filePlus.svg';
import DocumentPicker from 'react-native-document-picker';

const UploadFiles = () => {
  const [pickedFile, setPickedFile] = useState([]);
  
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // You can specify the types of files to allow
      });
      console.log(result[0].name)
      console.log(
        'URI: ' + result[0].uri,
        'Type: ' + result[0].type, // MIME type
        'Name: ' + result[0].name,
        'Size: ' + result[0].size
      );

      setPickedFile([...pickedFile, result[0]]);
      console.log(pickedFile)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EFEEFA" barStyle="dark-content" />
      <View style={styles.arrow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Arrow />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <View>
          <Text style={styles.text1}>Upload your files</Text>
          <Text style={styles.text2}>Select the files to be printed</Text>
        </View>
        <View style={styles.box2}>
          <FilePlus />
          <View style={styles.upload}>
            <TouchableOpacity onPress={pickDocument}>
              <Text style={styles.text3}>Browse files</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.filesBox}>
      {pickedFile.map((item, URI) => (
          <Text key={URI} style={styles.text1} >{item.name}</Text>
        ))}
      </View>

      <View style={styles.nav}>{/* <NavBar active="Food"/> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EFEEFA',
    flexDirection: 'column',
  },
  arrow: {
    marginLeft: '9.5%',
    marginTop: 72,
  },
  box: {
    backgroundColor: 'white',
    height: 201,
    width: '93%',
    marginTop: 33,
    borderRadius: 16,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filesBox:{
    backgroundColor: 'white',
    color:'black',
    width: '93%',
    height:100,
    marginTop: 33,
    borderRadius: 16,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text1: {
    color: '#6F6F6F',
    fontWeight: 500,
    fontSize: 16,
    alignSelf: 'center',
  },
  text2: {
    color: '#999999',
    fontWeight: 400,
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 6,
  },
  box2: {
    height: 115,
    width: '90%',
    borderRadius: 16,
    borderColor: '#D7D2E9',
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  upload: {
    backgroundColor: '#5736B5',
    borderRadius: 16,
    height: 35,
    width: '89%',
    justifyContent: 'center',
  },
  text3: {
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 68,
  },
});

export default UploadFiles;
