import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {LogBox, ToastAndroid} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import {Button} from 'react-native-elements';

//
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App = () => {
  const [device, setDevice] = useState(null);
  const [message, setMessage] = useState('ativar');
  const [isConnected, setIsConnected] = useState(false);

  /**
   * Enable bluetooth.
   * @return {void}
   */
  function requestEnable() {
    try {
      BluetoothSerial.requestEnable();
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
  }
  requestEnable();

  /**
   * List paired devices.
   * @return {void}
   */
  async function listDevices() {
    const list = await BluetoothSerial.list();
    if (device == null) {
      setDevice(list.find(device => device.name === 'HC-05'));
    }
  }
  listDevices();

  /**
   * Set device when list is ok
   * @return {void}
   */
  useEffect(() => {
    connect();
  }, [device]);

  /**
   * Connect to bluetooth device.
   * @return {void}
   */
  async function connect() {
    try {
      const connected = await BluetoothSerial.device(device.id).connect();
      if (connected) {
        console.log('Conectado');
        setIsConnected(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Send data to device.
   * @return {void}
   */
  async function send() {
    try {
      await BluetoothSerial.device(device.id).write(message);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.textLogo}>Roborbo smart</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Enviar"
          disabled={!isConnected}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            send();
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textLogo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white', // Cor do texto
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {

  },
  buttonStyle: {
    padding: 15,
    borderRadius: 50,
    height: 200,
    width: 200,
    backgroundColor: 'red', // Cor do botão
    opacity: 0.8, // Opacidade do botão
  },
});

export default App;
