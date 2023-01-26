import { Pressable, Image, Linking, Platform, Switch, Settings, ActivityIndicator, StyleProp, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { Text, View } from './Themed';
import { HorizontalLine, VerticalLine } from './Lines'
import { styles, MARGIN, MARGIN_SM } from '../Styles';
import { contestsData } from '../dummy';
import Hyphenated from 'react-hyphen';
import { colors } from '../constants/Colors';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { usePocketQuery, useBusinessQuery, useUserQuery, useGetAllTransactionsQuery } from '../hooks-apollo/index';


import { isNilOrEmpty } from 'ramda-adjunct';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect, useContext, ReactElement } from 'react';
import { AuthContext, AuthContextData, Role, RoleType } from '../contexts/Auth';

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import useGetBusinessPocketsQuery from '../hooks-apollo/Pocket/useGetBusinessPocketsQuery';
import { QueryResult } from './QueryResult';
import useGetAllQRScansQuery from '../hooks-apollo/QRScan/useGetAllQRScansQuery';
import { BusinessName } from './BusinessName';
import useGetAllChangeBalances from '../hooks-apollo/ChangeBalance/useGetAllChangeBalancesQuery';

const R = require('ramda');

async function getImageURL(entityType: string, entityID: string, fileName: string, setImageURL: any) {
  const storage = getStorage();
  await getDownloadURL(ref(storage, entityType.concat("/", entityID, "/", fileName))).then(
    function (url) {
      //console.log(url);
      setImageURL(url);
    },
    function (error) {
      console.log("ERROR: getDownloadURL: ", error);
    }
  );
}

export function BusinessCard({ navigation, businessID, pocketID }: { navigation: any, businessID: string, pocketID: string }) {

  const authContext = useContext(AuthContext); 

  const pocketsQuery = useGetBusinessPocketsQuery(businessID)
  const { data: pocketsData, loading: pocketsLoading, error: pocketsError, refetch: refetchPockets } = pocketsQuery

  const businessQuery = useBusinessQuery(businessID)
  const { data: businessData, loading: businessLoading, error: businessError } = businessQuery

  const changeBalancesQuery = useGetAllChangeBalances(authContext.userFirebase.uid, pocketID);
  const { data: changeBalancesData, loading: changeBalancesLoading, error: changeBalancesError, refetch: refetchChangeBalances } = changeBalancesQuery

  const [imageURL, setImageURL] = useState();

  // TODO: make this dependent on change balance in pocket
  const hasChange = true

  useEffect(() => {
    getImageURL("Business", businessID, "businessProfile.jpg", setImageURL);
  }, []);



  // Return query errors
  if (pocketsError) return (<Text>Pocket error: {pocketsError.message}</Text>)
  if (businessError) return (<Text>Business error: {businessError.message}</Text>)
  if (changeBalancesError) return (<Text>Business error: {changeBalancesError.message}</Text>)

  return (
    <View style={styles.card}>
      <View style={styles.businessHeaderImageContainer}>
        {imageURL
          ? (
            <Image
              style={styles.businessHeaderImage}
              source={{ uri: imageURL }}
            />
          ) : (
            <Image
              style={styles.businessListImage}
              source={require('../assets/images/defaults/businessProfile.png')}
            />
          )
        }

      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: MARGIN }} >
          <Text style={styles.businessNameLg}>{businessData?.business?.businessName}</Text>
          <Text style={styles.address}>{businessData?.business?.address.buildingNumber} {businessData?.business?.address.streetName}</Text>
          <QueryResult loading={pocketsLoading} error={pocketsError} data={pocketsData}>
            <Text style={styles.pocket}>
              {pocketsData?.getBusinessPockets[0]?.pocketName}
            </Text>
          </QueryResult>
        </View>


        <ButtonWithText
          text="Redeem Change"
          textTransform={'none'}
          textStyle={styles.payButtonText}
          color={hasChange ? colors.gold : colors.subtle}
          onPress={() => {
            if (hasChange) {
              navigation.navigate('PaymentStack', {
                screen: "PayAmount",
                params: {
                  // navigation: navigation,
                  businessID: businessID,
                  pocketID: pocketID,
                }
              })
            } else {
              alert(`You have no ${pocketsData?.getBusinessPockets[0]?.pocketName} Change to redeem!`)
            }
          }}
        />

        <View style={{ flexDirection: 'row', marginTop: MARGIN }}>

          <ButtonWithText
            text='Call'
            negativeStyle
            viewStyle={{ flex: 1, marginRight: MARGIN }}
            onPress={() => Linking.openURL(`tel:${businessData?.business?.phoneNumber}`)}
          />

          <ButtonWithText
            text='Open Maps'
            negativeStyle
            viewStyle={{ flex: 1 }}
            onPress={() => {
              const dString =
                `${businessData?.business?.address.buildingNumber}`
                + ` ${businessData?.business?.address.streetName}`
                + (businessData?.business?.address.unitName ? ` ${businessData?.business?.address.unitName}` : '')
                + ` ${businessData?.business?.address.city}`
                + ` ${businessData?.business?.address.region},`
                + ` ${businessData?.business?.address.postalCode}`

              const destination = encodeURIComponent(dString);
              const provider = Platform.OS === 'ios' ? 'apple' : 'google'
              const link = `http://maps.${provider}.com/?q=${destination}`

              // console.log(`${Object.values(business.address)}`);
              // console.log(dString);

              Linking.openURL(link)
            }}
          />
        </View>
      </View>
    </View>
  );

}

export function BusinessCardSuggested({ navigation, business }: { navigation: any, business: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Business", business.businessID, "businessProfile.jpg", setImageURL);
  }, []);

  const { data: pocketData, loading: pocketLoading, error: pocketError } = useGetBusinessPocketsQuery(business?.businessID);
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  return (
    <Pressable
      onPress={() => navigation.navigate('Business', {
        // navigation: navigation,
        business: business,
        pocket: pocketData.getBusinessPockets[0]
      })}
    >
      <View style={styles.card}>
        <View style={styles.businessHeaderImageContainer}>
          {imageURL ?
            <Image
              style={styles.businessHeaderImage}
              source={{ uri: imageURL }}
            /> : <></>
          }
        </View>
        <View style={styles.businessModalInfo}>
          <Text style={styles.businessNameLg}>{business.businessName}</Text>
          <Text style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
          <QueryResult loading={pocketLoading} error={pocketError} data={pocketData}><Text style={styles.pocket}>{pocketData?.getBusinessPockets[0]?.pocketName}</Text></QueryResult>

        </View>
      </View>
    </Pressable>
  );

}

export function BusinessInfo({ navigation, businessID, showPocket = true, wrapText = false }: { navigation?: any, businessID: string, showPocket?: boolean, wrapText?: boolean }) {

  const { data: businessData, loading: businessLoading, error: businessError } = useBusinessQuery(businessID)
  const { data: pocketData, loading: pocketLoading, error: pocketError } = useGetBusinessPocketsQuery(businessID);

  if (businessError) return (<Text>{businessError.message}</Text>)

  return (
    <Pressable
      disabled={!navigation}
      onPress={() => {
        navigation.navigate('Business', {
          businessID: businessID,
          pocketID: pocketData?.getBusinessPockets[0]?.pocketID
        })
      }}
    >
      <Text numberOfLines={wrapText ? undefined : 1} style={styles.businessNameSm}>{businessData?.business?.businessName}</Text>
      <Text numberOfLines={wrapText ? undefined : 1} style={styles.address}>{businessData?.business?.address.buildingNumber} {businessData?.business?.address.streetName}</Text>
      {showPocket ? <QueryResult loading={pocketLoading} error={pocketError} data={pocketData}><Text style={styles.pocket}>{pocketData?.getBusinessPockets[0]?.pocketName}</Text></QueryResult> : null}
    </Pressable>
  )
}

export function BusinessCardSm({ navigation, businessID, showPocket = true, wrapText = false, hideImage = false }: { navigation?: any, businessID: string, showPocket?: boolean, wrapText?: boolean, hideImage?: boolean }) {
  const [imageURL, setImageURL] = useState();

  // console.log(business)

  useEffect(() => {
    getImageURL("Business", businessID, "businessProfile.jpg", setImageURL);
  }, []);


  // const { data: businessData, loading: businessLoading, error: businessError } = useBusinessQuery(businessID)
  const { data: pocketData, loading: pocketLoading, error: pocketError } = useGetBusinessPocketsQuery(businessID);

  // Return query errors AFTER ALL query calls
  // this avoids Error: 'Rendered fewer hooks than expected'

  if (pocketError) return (<Text>{pocketError.message}</Text>)

  return (
    <Pressable
      disabled={!navigation}
      onPress={() => {
        navigation.navigate('Business', {
          // navigation: navigation,
          businessID: businessID,
          pocketID: pocketData?.getBusinessPockets[0]?.pocketID
        })
      }
      }>
      <View style={[styles.card, styles.businessListItemCard]}>
        {hideImage ?
          (
            null
          ) : (
            <View style={styles.businessListImageContainer}>
              {imageURL ?
                <Image
                  style={styles.businessListImage}
                  source={{ uri: imageURL }}
                /> :
                <Image
                  style={styles.businessListImage}
                  source={require('../assets/images/defaults/businessProfile.png')}
                />
              }
            </View>
          )
        }
        <View style={styles.businessListInfo}>
          <BusinessInfo businessID={businessID} showPocket={showPocket} wrapText={wrapText} />
        </View>
      </View>

    </Pressable>
  )
}

export function ChangeBalanceCard({ pocketID }: { pocketID: string }) {

  const authContext = useContext(AuthContext)

  const changeBalancesQuery = useGetAllChangeBalances(authContext.userFirebase.uid, pocketID);
  const { data: changeBalancesData, loading: changeBalancesLoading, error: changeBalancesError, refetch: refetchChangeBalances } = changeBalancesQuery
  if (changeBalancesError) return (<Text>{changeBalancesError.message}</Text>)

  const pocketQuery = usePocketQuery(pocketID)
  const { data: pocketData, loading: pocketLoading, error: pocketError } = pocketQuery
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  if (!changeBalancesData?.changeBalance) return (<></>)

  return (
    <View style={[styles.card, styles.pocketChangeBalanceCard]}>
      <Text style={styles.pocketBig}>Your {pocketData?.pocket?.pocketName} Change</Text>
      <Text style={styles.changeLg}>
        {changeBalancesData?.changeBalance?.value}
      </Text>
    </View>
  );
}

export function PocketCarouselCard({ navigation, pocket }: { navigation: any, pocket: any }) {

  // TODO: take ID and use query

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Pocket", pocket.pocketID, "pocketCard.png", setImageURL);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('Pocket', {
        // navigation: navigation,
        pocketID: pocket.pocketID,
      })}
    >
      {/* <View> */}
      <View style={styles.pocketListCardContainer}>
        <View style={[styles.card, styles.pocketListCard]}>
          {/* <View style={styles.pocketListNameContainer}>
            <Text style={styles.pocketListName}>{pocket.name}</Text>
          </View> */}

          <View style={styles.pocketListImageContainer}>
            {imageURL ?
              <Image
                style={[styles.image, styles.pocketListImage]}
                source={{ uri: imageURL }}
              /> : <></>
            }
          </View>
        </View>

      </View>

      {/* </View> */}
    </Pressable>

  )
}

export function PocketSearchResult({ navigation, pocket }: { navigation: any, pocket: any }) {
  return (
    <Pressable
      style={styles.pocketSearchResultContainer}
      onPress={() => navigation.navigate('Pocket', {
        // navigation: navigation,
        pocketID: pocket.pocketID,
      })}
    >
      <Text style={[styles.navigationHeaderTitle, { color: colors.medium }]}>
        {pocket.pocketName}
      </Text>
    </Pressable>
  )
}

export function PocketDetailCard({ navigation, pocketID }: { navigation: any, pocketID: string }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Pocket", pocketID, "pocketBanner.jpg", setImageURL);
  }, []);

  const { data: pocketData, loading: pocketLoading, error: pocketError, refetch: refetchPocket } = usePocketQuery(pocketID)
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  return (
    <View style={styles.card}>
      <View style={[styles.pocketHeaderImageContainer]}>

        {imageURL
          ? (
            <Image
              style={[styles.image, styles.pocketHeaderImage]}
              source={{ uri: imageURL }}
            />
          ) : (
            <Image
              style={[styles.image, styles.pocketHeaderImage]}
              source={require('../assets/images/defaults/businessProfile.png')}
            />
          )
        }

      </View>
      <View style={styles.container}>
        <Text style={styles.pocketTitle}>{pocketData?.pocket?.pocketName}</Text>
        <Hyphenated>
          <Text style={styles.prose}>
            {pocketData?.pocket?.description}
          </Text>
        </Hyphenated>
      </View>
    </View>
  );
}

export function PocketCarouselSeparator() {
  return (
    <View style={{ width: MARGIN }} />
  )
}

export function IdCard() {

  const authContext = useContext(AuthContext)
  // const user = authContext.userGQL
  //console.log(user)

  const { userID, firstName, lastName, birthDate, totalChange } = authContext.userGQL;

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("User", userID, "userProfile.png", setImageURL);
  }, []);

  return (
    <View style={[styles.card, styles.idCard]}>
      <View style={[styles.idHeader, { alignItems: 'flex-start' }]}>
        <Text style={styles.idAppName}> pocketchange</Text>
        <Text style={[styles.idText, styles.alignRight]}>USER ID</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {imageURL ?

          <Image
            style={styles.idImage}
            source={{ uri: imageURL }}
          /> :
          <Image
            style={styles.idImage}
            source={require('../assets/images/defaults/userProfile.png')}
          />
        }
        <View style={styles.idContent}>
          <Text style={styles.idLastName}>{lastName}</Text>
          <Text style={styles.idFirstName}>{firstName}</Text>
          <View style={[styles.horizontalLine, {
            width: 130,
            marginHorizontal: 0,
            marginVertical: 5,
          }]} />
          <Text style={styles.idLifeTimeChange}>{pad(totalChange * 100, 12)}</Text>
        </View>
      </View>
      <View style={[styles.idHeader, { alignItems: 'flex-end' }]}>
        <Text style={styles.idText}>USER ID</Text>
        <Text style={[styles.idDateOfBirth, styles.alignRight]}>{birthDate.split("T")[0]}</Text>
      </View>
    </View>
  )
}

export function BalancesCard({ allChangeBalances }: { changeTotal: string, allChangeBalances: any }) {

  // order change balances by decreasing value
  const allChangeBalancesSorted = allChangeBalances.slice().sort((a, b) => (parseFloat(a.value) < parseFloat(b.value)) ? 1 : -1);

  // sum up to get users total change value
  const changeTotal = allChangeBalancesSorted.reduce((accumulator, object) => {
    return accumulator + parseFloat(object.value);
  }, 0).toFixed(2);

  return (
    <View style={[styles.card, styles.balanceCard]}>
      <View style={{ flexDirection: 'row', height: '100%' }}>

        <View style={styles.balanceCardColumn}>
          <CardHeader
            text='All Change'
          />
          <View style={{ margin: MARGIN, marginBottom: MARGIN / 3 }}>
            <Text style={[styles.changeLg, { textAlign: 'center' }]}>${changeTotal}</Text>
          </View>

          <View style={{
            // backgroundColor: 'rgba(0,0,0,0.1)',
            flexGrow: 1,
            marginBottom: MARGIN,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
              style={{ aspectRatio: 1, flex: 1 }}
              source={require('../assets/images/icon.png')}
            />
          </View>
        </View>

        <VerticalLine />

        <View style={styles.balanceCardColumn}>
          <CardHeader
            text='Top Pockets'
          />
          <View style={{ margin: MARGIN, flex: 1 }}>
            {R.map(
              ({ pocketID, value }: { pocketID: string, value: string }) => (
                <TopPocket
                  key={pocketID}
                  pocketID={pocketID}
                  change={value}
                />
              ), allChangeBalancesSorted
            )}
          </View>

        </View>

      </View>
    </View >
  )
}

export function SettingPressable({ settingText, iconName, onPress = null }: { settingText: string, iconName: string, onPress?: any }) {
  return (
    <Pressable
      onPress={onPress}
    >
      <View style={styles.setting}>
        <View style={styles.settingIconContainer}>
          <FontAwesome5
            // style={styles.settingIcon}
            name={iconName}
            size={25}
            color={colors.medium}
            style={styles.settingIcon}
          />
        </View>
        <Text style={styles.settingText}>{settingText}</Text>
      </View>
      {/* <HorizontalLine /> */}
    </Pressable>
  )
}

export function SettingSwitch({ settingText, value, onToggle }: { settingText: string, value: boolean, onToggle: any }) {
  return (
    <View style={styles.setting}>
      <View style={{ flex: 1 }}>
        {/* <View style={styles.settingIconContainer}>
          <FontAwesome5
            // style={styles.settingIcon}
            name={iconName}
            size={25}
            color={colors.medium}
            style={styles.settingIcon}
          />
        </View> */}
        <Text style={styles.settingText}>{settingText}</Text>
      </View>
      <Switch
        trackColor={{ false: colors.subtle, true: colors.gold }}
        thumbColor={colors.card}
        ios_backgroundColor={colors.subtle}
        value={value}
        onValueChange={onToggle}
      />
    </View>
  )
}



export function TransactionListed({ navigation, transaction }: any) {
  const businessID = transaction.businessID

  return (
    // TODO: make pressable and navigatte to its own page
    <Pressable
      onPress={() => (navigation.navigate("Receipt", {
        navigation: navigation,
        transaction: transaction
      }))}>

      <View style={[styles.transactionListed, styles.card]}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{ width: 3 * MARGIN, height: 3 * MARGIN, alignItems: 'center', marginRight: MARGIN }}
            onPress={() => navigation.navigate('PayConfirmation', {
              business: business,
              subtotal: transaction.value,
              date: transaction.date,
            })}
          >
            <Image
              style={{ aspectRatio: 1, height: 3 * MARGIN, width: undefined, }}
              source={require("../assets/images/icon.png")}
            />
          </Pressable>
          <BusinessName businessID={businessID} style={styles.transactionListedMerchantText}/>
        </View>
        <Text style={styles.transactionListedAmountText}>
          ${transaction.value}
        </Text>
      </View>

    </Pressable >
  )
}

export function QRScanListed({ navigation, QRScan }: any) {

  console.log(QRScan);


  return (
    <Pressable
      style={{ zIndex: 10, elevation: 10 }}
      onPress={() => navigation.navigate('ScanConfirmation', {
        QRScan: QRScan
      })}>

      <View style={[styles.card, styles.transactionListed]}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{ width: 3 * MARGIN, height: 3 * MARGIN, alignItems: 'center', marginRight: MARGIN }}
          >
            <FontAwesome
              style={[styles.transactionListedAmountText, { fontSize: 3 * MARGIN, marginRight: 0 }]}
              name='qrcode'
            />
          </View>
          <BusinessName businessID={QRScan.businessID} style={styles.transactionListedMerchantText} />
        </View>
        <Text style={styles.transactionListedAmountText}>
          Snap it UP!
        </Text>
      </View>

    </Pressable >
  )
}

export function HistoryEntry({ navigation, item }: any) {

  let Icon // TODO: Type Icon properly
  let textAtRight: null | string
  let onPress: null | ((event: GestureResponderEvent) => void) | undefined

  switch (item.__typename) {

    case 'QRScan':
      Icon = (
        <FontAwesome
          style={[styles.transactionListedAmountText, { fontSize: 3 * MARGIN, marginRight: 0 }]}
          name='qrcode'
        />
      )
      textAtRight = null
      onPress = (() => navigation.navigate('ScanConfirmation', {
        QRScan: item
      }))
      break

    case 'transaction':
      Icon = (
        <Pressable
          style={{ width: 3 * MARGIN, height: 3 * MARGIN, alignItems: 'center', marginRight: MARGIN }}
          onPress={() => navigation.navigate('PayConfirmation', {
            business: item,
            subtotal: item.value,
            date: item.date,
          })}
        >
          <Image
            style={{ aspectRatio: 1, height: 3 * MARGIN, width: undefined, }}
            source={require("../assets/images/icon.png")}
          />
        </Pressable>
      )
      textAtRight = `${item.value}`
      onPress = (() => (navigation.navigate("Receipt", {
        navigation: navigation,
        transaction: item
      })))
      break

    default:
      Icon = (
        <Text>
          Err:
        </Text>
      )
      textAtRight = 'Invalid History object'
      onPress = null
      break
  }

  return (
    <Pressable
      style={{ zIndex: 10, elevation: 10 }}
      onPress={onPress}
    >

      <View style={[styles.card, styles.historyItem]}>

        <View style={{ flexDirection: 'row', flexShrink: 1 }}>

          <View
            style={{
              width: 3 * MARGIN,
              height: 3 * MARGIN,
              alignItems: 'center',
              marginRight: MARGIN,
            }}
          >
            {Icon}
          </View>

          <BusinessName businessID={item.businessID} style={styles.transactionListedMerchantText} />

        </View>

        {/* TEXT AT RIGHT */}
        <Text style={styles.transactionListedAmountText}>
          {textAtRight}
        </Text>

      </View>

    </Pressable >
  )
}

export function Receipt({ navigation, transaction }: any) {

  const businessID = transaction.businessID
  const { data: businessData, loading: businessLoading, error: businessError } = useBusinessQuery(businessID)
  if (businessError) return (<Text>{businessError.message}</Text>)

  const { pocketID } = transaction
  const { data: pocketData, loading: pocketLoading, error: pocketError } = usePocketQuery(pocketID)
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  // if (R.isNil(business)) {
  //   return null
  // }

  const address = businessData?.business?.address

  // if (R.isEmpty(pocket)) {
  //   return null
  // }
  //const address = business.address
  //console.log(business, pocket)
  return (
    <>
      <View style={[styles.container]}>
        {/* <CardHeader text='Summary' /> */}

        {/* <View style={{ flexDirection: 'row', marginBottom: MARGIN }}> */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.receipt}>{businessData?.business?.businessName}</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.receipt}> X</Text>
            </Pressable>
          </View>
          {/* <Text style={styles.receipt}>{address.buildingNumber}{address.streetName}</Text> */}
          <Text style={styles.receipt}>{pocketData?.pocket?.pocketName}</Text>
        </View>
        {/* </View> */}

        <Text style={[styles.receipt, { textAlign: 'center', marginVertical: MARGIN }]}>
          ----------------
        </Text>

        {/* <View style={{ height: MARGIN }} /> */}
        {/* <HorizontalLine /> */}
        <View style={{ marginBottom: MARGIN }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Subtotal</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{transaction.subtotal}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Tip</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{transaction.tip}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Change Used</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>-{transaction.changeRedeemed}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: MARGIN }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Total</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>${transaction.value}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.receipt}>
            You earned ${transaction.changeEarned} in {transaction.pocket} Change from this purchase.
          </Text>
        </View>

        <Text style={[styles.receipt, { textAlign: 'center', marginVertical: MARGIN }]}>
          ----------------
        </Text>

        <View style={{ alignItems: 'center' }}>
          <View style={{
            alignSelf: 'center',
            aspectRatio: 1,
            width: 50,
            margin: MARGIN,
          }}>
            <Image
              source={require('../assets/images/icon_dark.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <Text style={[styles.receipt, { textAlign: 'center' }]}>
            PocketChange Loyalty Inc.
          </Text>
        </View>
      </View>
    </>
  )
}

export function ReceiptContest({ navigation, transaction }: any) {

  const { pocketID } = transaction
  const { data: pocketData, loading: pocketLoading, error: pocketError } = usePocketQuery(pocketID)
  if (pocketError) return (<Text>{pocketError.message}</Text>)

  const businessID = transaction.businessID
  const { data: businessData, loading: businessLoading, error: businessError } = useBusinessQuery(businessID)
  if (businessError) return (<Text>{businessError.message}</Text>)

  // if (R.isNil(business)) {
  //   return null
  // }

  const address = businessData?.business?.address

  // if (R.isEmpty(pocket)) {
  //   return null
  // }
  //const address = business.address
  //console.log(business, pocket)
  return (
    <>
      <View style={[styles.container]}>
        {/* <CardHeader text='Summary' /> */}

        {/* <View style={{ flexDirection: 'row', marginBottom: MARGIN }}> */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.receipt}>{businessData?.business?.businessName}</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.receipt}> X</Text>
            </Pressable>
          </View>
          {/* <Text style={styles.receipt}>{address.buildingNumber}{address.streetName}</Text> */}
          <Text style={styles.receipt}>{pocketData?.pocket?.pocketName}</Text>
        </View>
        {/* </View> */}

        <Text style={[styles.receipt, { textAlign: 'center', marginVertical: MARGIN }]}>
          ----------------
        </Text>

        {/* <View style={{ height: MARGIN }} /> */}
        {/* <HorizontalLine /> */}
        <View style={{ marginBottom: MARGIN }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Subtotal</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{transaction.subtotal}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Tip</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{transaction.tip}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: MARGIN }}>
            <Text style={[styles.receipt, { textAlign: 'left' }]}>Change Redeemed</Text>
            <Text style={[styles.receipt, { textAlign: 'right' }]}>{transaction.changeRedeemed}</Text>
          </View>
        </View>

        <Text style={[styles.receipt, { textAlign: 'center', marginVertical: MARGIN }]}>
          ----------------
        </Text>

        <View style={{ alignItems: 'center' }}>
          <View style={{
            alignSelf: 'center',
            aspectRatio: 1,
            width: 50,
            margin: MARGIN,
          }}>
            <Image
              source={require('../assets/images/icon_dark.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <Text style={[styles.receipt, { textAlign: 'center' }]}>
            PocketChange Loyalty Inc.
          </Text>
        </View>
      </View>
    </>
  )
}
// to use for merchant side
export function SettingsCard({ navigation }: { navigation: any }) {
  <View style={styles.card}>
    <ButtonWithText text={Settings}>

    </ButtonWithText>
    <ButtonWithText text={Account}>

    </ButtonWithText>
  </View>
}

export function ButtonWithText(
  {
    text,
    textTransform = 'uppercase',
    viewStyle = undefined,
    textStyle = undefined,
    color = colors.subtle,
    negativeStyle = false,
    onPress,
  }: {
      /** The text to display */
      text: string | ReactElement,

      /** function passed to onPress prop of Pressable */
      onPress: null | ((event: GestureResponderEvent) => void) | undefined,

      /** Capitalization transformation */
      textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined,

      /** If provided, overwrites the ViewStyle for the button. */
      viewStyle?: StyleProp<ViewStyle>,

      /** If provided, overwrites the ViewStyle for the button. */
      textStyle?: StyleProp<TextStyle>,

      /** Highlight color used across the default styles for ButtonWithText */
      color?: string,

      /** Toggles between two preset styles for the button.
       * Defaults to false.
       */
      negativeStyle?: boolean,
    },
) {

  let _viewStyle: StyleProp<ViewStyle>
  let _textStyle: StyleProp<TextStyle>

  //
  if (!negativeStyle) {
    _viewStyle = [styles.button, styles.buttonNegative, { backgroundColor: color }]
    _textStyle = [styles.cardHeaderText, styles.buttonNegativeText, { textTransform: textTransform }]
  } else {
    _viewStyle = [styles.button, styles.buttonBordered, { borderColor: color }]
    _textStyle = [styles.cardHeaderText, styles.buttonBorderedText, { color: color, textTransform: textTransform }]
  }

  /** 
   * Overwrite the default styles with those given
   * on a prop-by-prop basis. 
   */
  _viewStyle = [_viewStyle, viewStyle]
  _textStyle = [_textStyle, textStyle]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [_viewStyle, pressed ? { opacity: 0.7 } : null]}
    >
      {/* <View style={_viewStyle}> */}
        <Text style={_textStyle}>
          {text}
        </Text>
      {/* </View> */}
    </Pressable >
  )

}

export function TranactionCardSm({ navigation, transaction }: { navigation: any, transaction: any }) {

  const { user, loading: userLoading, refetch: refetchUser } = useUserQuery(transaction.userID)

  const theDate = new Date(transaction.date)
  const date = theDate.toLocaleDateString()
  const time = theDate.toLocaleTimeString()

  // if (isNilOrEmpty(user)) {
  //   return (null)
  // }

  return (
    <Pressable
      style={[styles.card]}
      onPress={() => navigation.navigate('Transaction', { transaction: transaction })}
    >
      <View style={[styles.container, styles.transactionListed]}>

        <Text style={styles.transactionListedMerchantText}>
          {time}
        </Text>
        <Text style={styles.transactionListedMerchantText}>
          {user?.firstName}
        </Text>
        <Text style={styles.transactionListedAmountText}>
          ${transaction.value}
        </Text>

      </View>


    </Pressable>
  )
}

export function ContestCard({ navigation, contestID, showDetailedView = false }: { navigation: any, contestID: string, showDetailedView?: boolean }) {
  const authContext = useContext(AuthContext);

  // use dummy data like query will be used
  const c = contestsData?.getAllContests?.find(c => c.contestID === contestID)
  const contestData = { contest: c }

  const { data: scansData, loading: scansLoading, error: scansError } = useGetAllQRScansQuery(authContext.userFirebase.uid);
  if (scansError) return (<Text>{scansError.message}</Text>);

  return (
    <Pressable
      onPress={() => navigation.navigate('Contest', {
        contestID: contestID
      })}
    >
      <View style={[styles.card]}>
        <View style={styles.container}>
          <Text style={styles.contestTitle}>
            <FontAwesome name='trophy' style={styles.contestTitle} />
            {' ' + contestData?.contest?.contestName}
          </Text>
        </View>

        {
          showDetailedView ? (
            <>
              <HorizontalLine />
              <View style={styles.container}>
                <Text style={styles.prose}>
                  {contestData?.contest?.description}
                </Text>
              </View>
            </>
          ) : (
            <></>
          )
        }

        <HorizontalLine />

        <View style={styles.container}>
          {authContext.activeRole.type == RoleType.Consumer
            ? (
              // {/* CONSUMER TEXT */ }
              < Text style={[styles.prose, { lineHeight: 22, fontSize: 16, textAlign: 'center', marginBottom: 5 }]}>
                You have <Text style={{ fontFamily: 'metropolis black' }}>
                  {scansLoading ? (
                    <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
                  ) : (
                    scansData.getAllQRScans.length
                  )} entries
                </Text>
                <Text> ✅ </Text>
                Keep it up!
              </Text>
            ) : authContext.activeRole.type == RoleType.Leader
              ? (
                // {/* LEADER TEXT */}
                <>
                  <Text style={[styles.prose, { lineHeight: 22, fontSize: 16, textAlign: 'center', marginBottom: 5 }]}>
                    {81} participants | {122} entries
                  </Text>
                </>
              ) : null
          }
          <Text style={[styles.prose, { lineHeight: 18, fontSize: 12, textAlign: 'center', }]}>
            Contest ends {contestData?.contest?.endDate}.
          </Text>

          {
            showDetailedView ? (
              <></>
            ) : (
              <Text style={[styles.prose, { lineHeight: 18, fontSize: 12, textAlign: 'center', marginTop: 7, color: colors.subtle }]}>
                See Details <FontAwesome name="angle-right" />
              </Text>
            )
          }

        </View>



        {/* <View style={styles.container}>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>Your entries:</Text>
            <Text>{4}</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>Prize:</Text>
            <Text>{'$' + prizeValue}</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>contest ends:</Text>
            <Text>{endDate}</Text>
          </View>
        </View> */}
      </View>
    </Pressable >
  )
}

export function UserCardSm({ user }: any) {

  const { userID, firstName, lastName, birthDate, totalChange } = user;

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("User", userID, "userProfile.png", setImageURL);
  }, []);

  return (

    <View style={styles.thinContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={[styles.idImage, { width: 30, marginLeft: 0 }]}
          source={imageURL ? { uri: imageURL } : require('../assets/images/defaults/userProfile.png')}
        />
        <View style={{ justifyContent: 'center', marginLeft: MARGIN / 2, }}>
          <Text style={{ fontFamily: 'metropolis bold', color: colors.medium }}>
            {user.firstName} {user.lastName[0]}.
          </Text>
        </View>

      </View>
    </View>

  )
}

function TopPocket({ pocketID, change }: { pocketID: string, change: string }) {

  const { data: pocketData, loading: pocketLoading, error: pocketError } = usePocketQuery(pocketID);
  if (pocketError) return <Text>{pocketError}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pocket}>{pocketData.pocket.pocketName}</Text>
      <Text style={styles.changeSm}>${change}</Text>
    </View >
  )
}

export function CardHeader({ text }: { text: string }) {
  return (
    <>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderTextContainer}>
          <Text style={styles.cardHeaderText}>{text}</Text>
        </View>
      </View>
      <HorizontalLine />
    </>
  )
}

export function SwitchAccountDropdown({ authContext, rolesList }: { authContext: AuthContextData, rolesList: Role[] }) {

  function makeLabel(r: Role): string {
    let label: string = ''
    if (r.type === RoleType.Consumer) {
      label = r.type?.toLowerCase()
    } else if (r.type === RoleType.Merchant) {
      label = r.level?.toLowerCase() + ' of ' + r.entityName?.toLowerCase()
    } else if (r.type === RoleType.Leader) {
      label = r.type?.toLowerCase() + ' of ' + r.entityName?.toLowerCase()
    }
    return label
  }

  const switchAccount = (role: Role) => {
    authContext.switchActiveRole(role);
    // console.log("SWITCHED ROLE TO: ", authContext.activeRole)
  }

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(authContext.activeRole);
  const [items, setItems] = useState(rolesList.map(r => ({ label: makeLabel(r), value: r })));

  return (
    <DropDownPicker
      style={styles.card}
      dropDownContainerStyle={styles.card}
      textStyle={[styles.settingText, { textTransform: 'capitalize' }]}
      itemSeparator
      itemSeparatorStyle={styles.horizontalLine}

      // containerStyle={styles.card}
      open={open}
      value={null}    // set to null to always show placeholder text
      items={items}

      setOpen={setOpen}
      setValue={setRole}
      setItems={setItems}

      onSelectItem={item => switchAccount(item.value)}

      placeholder='Switch Account'
    />
  )
}

export function DivHeader({ text }: { text: string }) {
  return (
    <View style={styles.divHeader}>
      <Text style={styles.cardHeaderText}>
        {text}
      </Text>
    </View>
  )
}

function pad(n: number, size: number) {
  let num = n.toString();
  while (num.length < size)
    num = "0" + num;
  return num;
}

