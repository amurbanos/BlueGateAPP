/**
 * Urbano
 *
 *
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {LogBox} from 'react-native';
import BluetoothSerial, {
  withSubscription,
} from 'react-native-bluetooth-serial-next';
import {Button} from 'react-native-elements';

//
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App: () => Node = () => {
  const [device, setDevice] = useState(null);
  const [message, setMessage] = useState('ACESSO');

  /**
   * Enable bluetooth.
   * @return {void}
   */
  function requestEnable() {
    try {
      BluetoothSerial.requestEnable();
    } catch (e) {
      Toast.showShortBottom(e.message);
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
    <>
      <View style={styles.logoContainer}>
        <Text style={styles.logoContainer.textLogo}>BlueGate</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="OK"
          containerStyle={{
            borderRadius: 100,
            height: 200,
            width: 200,
          }}
          buttonStyle={{
            padding: 15,
            borderRadius: 100,
            height: 200,
            width: 200,
          }}
          onPress={() => {
            send();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 3,
    textLogo: {
      fontSize: 60,
      fontWeight: 'bold',
    },
  },
  btnContainer: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 9,
  },
});

export default App;
