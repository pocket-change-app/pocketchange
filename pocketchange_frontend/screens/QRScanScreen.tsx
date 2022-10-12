import React, { useState, useEffect, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/base';

import { styles } from '../Styles';
import { colors } from '../constants/Colors';
import { AuthContext } from '../contexts/Auth';

import * as Location from 'expo-location';
import { useMutation } from '@apollo/client';
import QRScanMutations from '../hooks-apollo/QRScan/mutations'
import { authService } from '../services/authService';
import { LocationSubscriber } from 'expo-location/build/LocationSubscribers';
import { isNull } from 'ramda-adjunct';
import { ButtonWithText } from '../components/Cards';
import { ScreenContainer } from '../components/Themed';

export default function PayTabScreen({ navigation }: { navigation: any }) {

    const authContext = useContext(AuthContext); 

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [location, setLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationErrorMsg, setLocationErrorMsg] = useState(null);

    const [useProcessQRScanMutation, {loading, error}] = useMutation(
        QRScanMutations.processQRScan, {
          onCompleted(data) {
            navigation.navigate('ScanConfirmation', {
                QRScan: data.processQRScan
            })
        },
          onError(error) { 
            //alert(error.message)
            alert("You are not located at this business.")
        }
    },

    )

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

        let locationTemp = await Location.getCurrentPositionAsync({});
        setLocation(locationTemp);
        setLocationLoading(false)
        })();
      }, []);
    
    const handleBarCodeScanned = async ({ type, data }) => {
        console.log("QR FOUND")
        setLocationLoading(true);
        if (!isNull(location)) {
            setLocationLoading(false);
            console.log("LOCATION SCAN:", location)
            console.log("DATA RECEIVED: ", data)
            setScanned(true);
            useProcessQRScanMutation({ 
                variables: {
                    userID: authContext.userFirebase.uid,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    businessID: data,
                    
            }})
        }
        
    };
    //setScanned(false);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
      // <ScreenContainer>
      <>
            
            {locationLoading ? 
                <ActivityIndicator size="large" color={colors.subtle} style={{ marginTop: 300 }} /> : 
                scanned ?
                    <View style={[styles.container,{marginTop:400}]}>
                        <ButtonWithText text="Scan Again" onPress={() => setScanned(false)}/>
                    </View> :
                    <BarCodeScanner
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                        />

            }
      </>
        // </ScreenContainer>
    );
}