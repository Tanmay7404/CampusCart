import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [pickedFile, setPickedFile] = useState(null);
  
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

      setPickedFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a File" onPress={pickDocument} />
      {pickedFile && (
        <Text>
          Picked File:
          {'\n'}
          URI: {pickedFile.uri}
          {'\n'}
          Type: {pickedFile.type}
          {'\n'}
          Name: {pickedFile.name}
          {'\n'}
          Size: {pickedFile.size}
        </Text>
      )}
    </View>
  );
};

export default App;
