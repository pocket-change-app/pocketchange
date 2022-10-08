import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';

import * as Location from 'expo-location';

export default function PayTabScreen({ navigation }: { navigation: any }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [location, setLocation] = useState(null);
    const [locationErrorMsg, setLocationErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log("LOCATION:", location)
        })();
      }, []);
    

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>

            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        
        </>
    );
}