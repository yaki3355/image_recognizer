import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Alert } from 'react-native';
import {Header} from 'react-native-elements';
import Clarifai from 'clarifai';
import AnimatedLoader from "react-native-animated-loader";

import ImagePickerWrap from './components/ImagePickerWrap';
import {API_KEY} from '@env';

export default function App() {
  const [cla, setCla] = useState(new Clarifai.App({apiKey: API_KEY}));
  const [loaderVisibility, setLoaderVisibility] = useState(false);

  function recognize(base64) {
    setLoaderVisibility(true);

    cla.models.predict(Clarifai.GENERAL_MODEL, {base64})
    .then(response => Alert.alert('Result', response.outputs[0].data.concepts[0].name))
    .catch(err => Alert.alert('Error', err.toJSON().message))
    .finally(() => setLoaderVisibility(false));
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Header
          placement="center"
          centerComponent={{ text: 'IMAGE RECOGNIZER', style: { color: '#fff', fontSize: 20 } }}
        />
      </View>
      <ImagePickerWrap recognize={recognize} />
      <AnimatedLoader
        visible={loaderVisibility}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      ></AnimatedLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfee9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: StatusBar.currentHeight,
  },
  lottie: {
    width: 100,
    height: 100
  }
});
