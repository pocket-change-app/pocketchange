import React, { useState, useEffect, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { styles } from '../../Styles';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../contexts/Auth';

import * as Location from 'expo-location';
import { useMutation } from '@apollo/client';
import QRScanMutations from '../../hooks-apollo/QRScan/mutations'
import { isNull } from 'ramda-adjunct';
import { ButtonWithText } from '../../components/Cards';
import { ScreenContainer } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function QRScanScreen({ navigation }: { navigation: any }) {

  const authContext = useContext(AuthContext);

  const [hasCameraPermission, setHasCameraPermission]: [boolean, () => void] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  const [useProcessQRScanMutation, { loading, error }] = useMutation(
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
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return;
      }

      let locationTemp = await Location.getCurrentPositionAsync({});
      setLocation(locationTemp);
      setLocationLoading(false)
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("QR FOUND")

    if (location) {
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

        }
      })
    } else {
      setLocationLoading(true)
    }

  };
  //setScanned(false);

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>

      {scanned ? (
        <ScreenContainer>

          <View style={[styles.container, { flex: 1, justifyContent: 'space-between' }]}>
            <View />
            <FontAwesome style={{ fontSize: 200, textAlign: 'center', color: colors.light }} name='qrcode' />
            <ButtonWithText text="Scan Again" onPress={() => setScanned(false)} />

          </View>
          <View style={styles.container}>
            <ButtonWithText
              color={colors.gold}
              text="Pretend We're at This Business"
              onPress={() => {
                const loc1b = {
                  coords: {
                    latitude: 43.6688949,
                    longitude: -79.3307535,
                  }
                }
                setLocation(loc1b)
              }}
            />
          </View>

        </ScreenContainer>
      ) : (
        <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )
      }

      {locationLoading ?
        <View style={[styles.card, { marginTop: 100 }]}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.subtle} />
            <Text style={[styles.cardHeaderText, { margin: 10 }]}>Hold while location is verified...</Text>
          </View>
        </View> : null}

    </>
  );
}