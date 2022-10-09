import { Pressable, Image, TabBarIOSItem, FlatList, Linking, ImageStore, Platform, Switch, Settings, ActivityIndicator } from 'react-native';
import { Text, View } from './Themed';
import { HorizontalLine, VerticalLine } from './Lines'
import { styles, MARGIN, BUTTON_HEIGHT } from '../Styles';
import { pockets, user } from '../dummy';
import Hyphenated from 'react-hyphen';
import { colors } from '../constants/Colors';
import { useQuery } from '@apollo/client';
import ChangeBalanceQueries from '../hooks-apollo/ChangeBalance/queries'
import PocketQueries from '../hooks-apollo/Pocket/queries'

import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { color } from '@rneui/base';
import { usePocketQuery, useBusinessQuery, useUserQuery } from '../hooks-apollo/index';

import businessImages from '../assets/images/businessImages';

import { isNilOrEmpty } from 'ramda-adjunct';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from 'react';
import { AuthContextData, Role, RoleType } from '../contexts/Auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const R = require('ramda');

async function getImageURL(entityType: string, entityID: string, fileName: string, setImageURL) {
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


export function BusinessCard({ navigation, business, changeBalance }: { navigation: any, business: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Business", business.businessID, "businessProfile.jpg", setImageURL);
  }, []);

  const { data: pocketData, loading: pocketLoading, error: pocketError } = useQuery(PocketQueries.getBusinessPockets, { variables: { businessID: business.businessID } });
  if (pocketError) return <Text>{pocketError}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />

  return (
    <View style={styles.card}>
      <View style={styles.businessHeaderImageContainer}>
        {imageURL ?
          <Image
            style={styles.businessHeaderImage}
            source={{ uri: imageURL }}
          /> :
          <Image
            style={styles.businessListImage}
            source={require('../assets/images/defaults/businessProfile.png')}
          />
        }

      </View>
      <View style={styles.businessModalInfo}>
        <Text style={styles.businessNameLg}>{business.businessName}</Text>
        <Text style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
        <Text style={styles.pocket}>{pocketData.getBusinessPockets[0].pocketName}</Text>

        {(changeBalance.length > 0) ?
          <Pressable style={styles.payButton}
            onPress={() => (
              navigation.navigate('PaymentModalStack', {
                screen: "PayAmount",
                params: {
                  // navigation: navigation,
                  business: business,
                  pocket: pocketData.getBusinessPockets[0]
                }
              }))}>
            <Text style={styles.payButtonText}>Redeem Change</Text>
          </Pressable> :
          <Pressable style={[styles.payButton, { backgroundColor: colors.subtle }]}
            onPress={() => (
              alert(`You have no ${pocketData.getBusinessPockets[0].pocketName} Change to redeem!`))}>
            <Text style={styles.payButtonText}>Redeem Change</Text>
          </Pressable>
        }

        <View style={{ flexDirection: 'row', marginTop: MARGIN }}>

          <Pressable style={[styles.buttonBordered, { flex: 1, marginRight: MARGIN }]}
            onPress={() => Linking.openURL(`tel:${business.phoneNumber}`)}>
            <Text style={[styles.cardHeaderText, styles.buttonBorderedText]}>CALL</Text>
          </Pressable>

          <Pressable style={[styles.buttonBordered, { flex: 1 }]}
            onPress={() => {
              const destination = encodeURIComponent(`${business.address}, $Toronto, Canada`);
              const provider = Platform.OS === 'ios' ? 'apple' : 'google'
              const link = `http://maps.${provider}.com/?q=${destination}`

              Linking.openURL(link)
            }
            }>
            <Text style={[styles.cardHeaderText, styles.buttonBorderedText]}>Open Maps</Text>
          </Pressable>
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

  const { data: pocketData, loading: pocketLoading, error: pocketError } = useQuery(PocketQueries.getBusinessPockets, { variables: { businessID: business.businessID } });
  if (pocketError) return <Text>{pocketError}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />

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
          <Text style={styles.pocket}>{pocketData.getBusinessPockets[0]}</Text>

        </View>
      </View>
    </Pressable>
  );

}

export function BusinessCardSm({ navigation, business, showPocket = true }: { navigation: any, business: any, showPocket: boolean }) {
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Business", business.businessID, "businessProfile.jpg", setImageURL);
  }, []);

  const { data: pocketData, loading: pocketLoading, error: pocketError } = useQuery(PocketQueries.getBusinessPockets, { variables: { businessID: business.businessID } });
  if (pocketError) return <Text>{pocketError}</Text>;
  if (pocketLoading) return <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />

  return (
    <Pressable
      onPress={() => navigation.navigate('Business', {
        // navigation: navigation,
        business: business,
        pocket: pocketData.getBusinessPockets[0]

      })}
    >
      <View style={[styles.card, styles.businessListItemCard]}>

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

        <View style={styles.businessListInfo}>
          <Text numberOfLines={1} style={styles.businessNameSm}>{business.businessName}</Text>
          <Text numberOfLines={1} style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
          {showPocket ? <Text style={styles.pocket}>{pocketData.getBusinessPockets[0].pocketName}</Text> : null}
        </View>

      </View>

    </Pressable>
  )
}

export function ChangeBalanceCard({ changeBalance, pocket }: { changeBalance: any }) {

  return (
    <View style={[styles.card, styles.pocketChangeBalanceCard]}>
      <Text style={styles.pocketBig}>{pocket.pocketName} Change</Text>
      <Text style={styles.changeLg}>
        {(changeBalance.length == 0) ?
          "$0.00" :
          changeBalance.value
        }
      </Text>
    </View>
  );
}

export function PocketListCard({ navigation, pocket }: { navigation: any, pocket: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Pocket", pocket.pocketID, "pocketCard.png", setImageURL);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('Pocket', {
        // navigation: navigation,
        pocket: pocket
      })}
    >
      {/* <View> */}
      <View style={styles.pocketListCardContainer}>
        <View style={[styles.card, styles.pocketListCard, { marginTop: MARGIN, marginBottom: MARGIN }]}>
          {/* <View style={styles.pocketListNameContainer}>
            <Text style={styles.pocketListName}>{pocket.name}</Text>
          </View> */}

          <View style={styles.pocketListImageContainer}>
            {imageURL ?
              <Image
                style={styles.pocketListImage}
                source={{ uri: imageURL }}
              /> : <></>
            }
          </View>
        </View>

        {/* <View style={{ height: MARGIN }} /> */}

        {/* <View style={[styles.card, styles.container, { flexShrink: 1 }]}>
          <Hyphenated>
            <Text
              style={styles.prose}
              numberOfLines={100}
              ellipsizeMode='tail'
            >
              {pocket.description}
            </Text>
          </Hyphenated>
        </View> */}

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
        pocket: pocket,
      })}
    >
      <Text style={[styles.navigationHeaderTitle, { color: colors.medium }]}>
        {pocket.pocketName}
      </Text>
    </Pressable>
  )
}

export function PocketDetailCard({ navigation, pocket }: { navigation: any, pocket: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getImageURL("Pocket", pocket.pocketID, "pocketBanner.jpg", setImageURL);
  }, []);

  return (
    <>

      <View style={styles.card}>
        <View style={[styles.pocketHeaderImageContainer]}>

          {imageURL ?
            <Image
              style={[styles.image, styles.pocketHeaderImage]}
              source={{ uri: imageURL }} /> : <></>
          }

        </View>
        <View style={styles.container}>
          <Text style={styles.pocketTitle}>{pocket.pocketName}</Text>
          <Hyphenated>
            <Text style={styles.prose}>
              {console.log(pocket)}
            </Text>
          </Hyphenated>
        </View>
      </View>
    </>
  );
}

export function PocketListSeparator() {
  return (
    <View style={{ width: MARGIN }} />
  )
}

export function IdCard({ user }: { user: any }) {

  //console.log(user)

  const { userID, firstName, lastName, birthDate, totalChange } = user;

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
            source={require('../assets/images/defaults/userProfile.jpg')}
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

  // TODO: get pocket names from ID


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
                  pocket={pocketID}
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

export function TransactionHistoryCard({ navigation, transactions, loading }: { navigation: any, transactions: { [key: string]: any }[], loading: boolean }) {

  const renderTransactions = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <TransactionListed
      key={item.key}
      navigation={navigation}
      transaction={item}
    />
  )

  return (
    <View style={[styles.card]}>
      <CardHeader text='Transaction History' />
      <FlatList
        // contentContainerStyle={styles.businessFlatList}
        scrollEnabled={false}
        ItemSeparatorComponent={HorizontalLine}
        data={transactions}
        renderItem={renderTransactions}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} /> : <></>}
      />
    </View>
  )
}

export function TransactionListed({ navigation, transaction }: any) {
  const businessID = transaction.businessID
  const { business, loading } = useBusinessQuery(businessID)

  if (loading) {
    return null
  }
  return (
    // TODO: make pressable and navigatte to its own page
    <Pressable
      onPress={() => (navigation.navigate("Receipt", {
        navigation: navigation,
        transaction: transaction
      }))}
    >
      <View style={styles.transactionListed}>
        <Text style={styles.transactionListedMerchantText}>
          {business.businessName}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.transactionListedAmountText}>
            ${transaction.value}
          </Text>
          <Pressable
            style={{ aspectRatio: 1 }}
            onPress={() => navigation.navigate('PayConfirmation', {
              business: business,
              subtotal: transaction.value,
              date: transaction.date,
              time: transaction.time,
            })}
          >
            <Image
              style={{ flex: 1, width: undefined, height: undefined }}
              source={require("../assets/images/icon.png")}
            />
          </Pressable>
        </View>
      </View>
      {/* <HorizontalLine /> */}
    </Pressable >
  )
}

export function Receipt({ navigation, transaction }: any) {

  const businessID = transaction.businessID
  const { business, loading } = useBusinessQuery(businessID)

  if (R.isNil(business)) {
    return null
  }

  const address = business.address
  const { pocketID } = transaction
  const { pocket, loadingPockets } = usePocketQuery(pocketID)
  if (R.isEmpty(pocket)) {
    return null
  }
  //const address = business.address
  //console.log(business, pocket)
  return (
    <>
      <View style={[styles.container]}>
        {/* <CardHeader text='Summary' /> */}

        {/* <View style={{ flexDirection: 'row', marginBottom: MARGIN }}> */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.receipt}>{business.businessName}</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.receipt}> X</Text>
            </Pressable>
          </View>
          {/* <Text style={styles.receipt}>{address.buildingNumber}{address.streetName}</Text> */}
          <Text style={styles.receipt}>{pocket.pocketName}</Text>
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
// to use for merchant side
export function SettingsCard({ navigation }: { navigation: any }) {
  <View style={styles.card}>
    <ButtonWithText text={Settings}>

    </ButtonWithText>
    <ButtonWithText text={Account}>

    </ButtonWithText>
  </View>
}

export function ButtonWithText({
  text,
  color = colors.subtle,
  negativeStyle = false,
  // flexing = false,
  onPress
}: {
  text: string,
  color: string,
  negativeStyle: boolean,
  // flexing: boolean,
  onPress: any
}) {
  if (!negativeStyle) {
    return (
      <Pressable
        // style={{ flexing } ? { flex: 1 } : {}}
        onPress={onPress}>
        <View style={[styles.buttonNegative, { backgroundColor: color }]}>
          <Text style={[styles.cardHeaderText, styles.buttonNegativeText]}>{text}</Text>
        </View>
      </Pressable >
    )
  } else {
    return (
      <Pressable
        // style={{ flexing } ? { flex: 1 } : {}}
        onPress={onPress}>
        <View style={[styles.buttonBordered]}>
          <Text style={[styles.cardHeaderText, styles.buttonBorderedText]}>{text}</Text>
        </View>
      </Pressable>
    )
  }
}

export function TranactionCardSm({ navigation, transaction }: { navigation: any, transaction: any }) {

  const { user, loading, refetch } = useUserQuery(transaction.userID)

  if (isNilOrEmpty(user)) {
    return (null)
  }

  return (
    <Pressable
      onPress={() => navigation.navigate('TransactionModal', {
        user,
        transaction
      })}
    >
      <View style={styles.transactionListed}>

        <Text style={styles.transactionListedAmountText}>
          {transaction.date.split("T")[1].split(".")[0]}
        </Text>
        <Text style={styles.transactionListedMerchantText}>
          {!user ? null : user.firstName
          }
        </Text>
        <Text style={styles.transactionListedAmountText}>
          ${transaction.value}
        </Text>

      </View>


    </Pressable>
  )
}

export function CompetitionCard({ navigation, competition }: { navigation: any, competition: any }) {

  const { competitionID, competitionName, description, prizeValue, endDate } = competition

  return (
    <Pressable
      onPress={() => navigation.navigate('Competition', {
        competition: competition
      })}
    >
      <View style={[styles.card]}>
        <View style={styles.container}>
          <Text style={styles.competitionTitle}>
            <FontAwesome name='trophy' style={styles.competitionTitle} />
            {' ' + competitionName}
          </Text>
        </View>

        <HorizontalLine />

        <View style={styles.container}>
          <Text style={styles.prose}>
            {description}
          </Text>
        </View>

        <HorizontalLine />

        <View style={styles.container}>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>Prize:</Text>
            <Text>{'$' + prizeValue}</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text>Competition ends:</Text>
            <Text>{endDate}</Text>
          </View>
        </View>
      </View>
    </Pressable >
  )
}

export const renderParticipant = ({ item, index, separators }: any) => (

  <View style={[styles.card, styles.container]}>
    <Text>{item.name}</Text>
  </View>

)

function TopPocket({ pocket, change }: { pocket: string, change: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pocket}>{pocket}</Text>
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
      label = r.type
    } else if (r.type === RoleType.Merchant) {
      label = r.level + ' at ' + r.entityName
    } else if (r.type === RoleType.Leader) {
      label = r.type + ' of ' + r.entityName
    }
    return label
  }

  const switchAccount = (role: Role) => {
    authContext.switchActiveRole(role);
    console.log("SWITCHED ROLE TO: ", authContext.activeRole)
  }

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(authContext.activeRole);
  const [items, setItems] = useState(rolesList.map(r => ({ label: makeLabel(r), value: r })));

  return (
    <DropDownPicker
      style={styles.card}
      dropDownContainerStyle={styles.card}
      textStyle={styles.settingText}
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
      <View style={styles.divHeaderTextContainer}>
        <Text style={styles.cardHeaderText}>
          {text}
        </Text>
      </View>
    </View>
  )
}

function pad(n: number, size: number) {
  let num = n.toString();
  while (num.length < size)
    num = "0" + num;
  return num;
}

