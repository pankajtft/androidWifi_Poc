/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import wifi from 'react-native-android-wifi';

const App: () => React$Node = () => {
  const [wifiName, setWifi] = useState("Batra's");
  const [password, setPassword] = useState('12345678');

  useEffect(() => {
    async function request() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Wifi networks',
            'message': 'We need your permission in order to find wifi networks'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Thank you for your permission! :)");
        } else {
          console.log("You will not able to retrieve wifi available networks list");
        }
      } catch (err) {
        console.warn(err)
      }
    }
    request();
  }, [])
  const onSubmit = () => {
    wifi.reScanAndLoadWifiList((wifiStringList) => {
      console.log(wifiStringList)
      wifi.forceWifiUsage(true);
      wifi.findAndConnect(wifiName, password, (found) => {
      });
    }, (err) => {
      console.log({ err })
    })
  }

  const checkConnection = () => {
    wifi.getSSID((ssid) => {
      if (ssid == wifiName) {
        alert('Connected to ' + ssid)
      } else {
        alert('Not Connected');
      }
    });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ alignItems: 'center', marginTop: 40 }}>
        <TextInput value={wifiName} onChangeText={setWifi} style={{ width: '80%', backgroundColor: '#e5dede', marginBottom: 20 }} placeholder="Wifi name" />
        <TextInput value={password} onChangeText={setPassword} onChange={setPassword} style={{ width: '80%', backgroundColor: '#e5dede' }} placeholder="Wifi password" />
        <TouchableOpacity onPress={onSubmit} style={{
          height: 50, width: '80%',
          alignItems: 'center', justifyContent: 'center',
          marginTop: 40,
          backgroundColor: '#1ca5ea', borderRadius: 40
        }}>
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={checkConnection} style={{
          height: 50, width: '80%',
          alignItems: 'center', justifyContent: 'center',
          marginTop: 40,
          backgroundColor: '#1ca5ea', borderRadius: 40
        }}>
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Check</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
