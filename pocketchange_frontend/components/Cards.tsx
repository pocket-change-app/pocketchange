import { Pressable, Image, TabBarIOSItem, FlatList, Linking, ImageStore, Platform, Switch } from 'react-native';
import { Text, View } from './Themed';
import { HorizontalLine, VerticalLine } from './Lines'
import { styles, MARGIN, BUTTON_HEIGHT } from '../Styles';
import { user } from '../dummy';
import Hyphenated from 'react-hyphen';
import { colors } from '../constants/Colors';

import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';
import { FontAwesome5 } from '@expo/vector-icons';
import { color } from '@rneui/base';
import { usePocketQuery, useBusinessQuery, useUserQuery } from '../hooks-apollo/index';

import businessImages from '../assets/images/businessImages';

import { isNilOrEmpty } from 'ramda-adjunct';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { AuthContextData, Role, RoleType } from '../contexts/Auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';

const R = require('ramda');

async function getBusinessImageURL(businessID: string, setImageURL) {
  const storage = getStorage();
  await getDownloadURL(ref(storage, "Business/".concat(businessID, "/businessProfile.jpg"))).then(
    function (url) {
      console.log(url);
      setImageURL(url);
    },
    function (error) {
      console.log(error);
    }
  );
}


export function BusinessCard({ navigation, business, pocket }: { navigation: any, business: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getBusinessImageURL(business.businessID, setImageURL);
  }, []);

  return (
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
        <Text style={styles.pocket}>{pocket}</Text>

        <Pressable style={styles.payButton}
          onPress={() => (navigation.navigate('PaymentModalStack', {
            screen: "PayAmount",
            params: {
              // navigation: navigation,
              business: business,
            }
            // businessID: business.businessID,
            // name: business.name,
            // address: business.address,
            // pocket: business.pocket,
            // imageURL: business.imageURL,
          }))}
        >
          <Text style={styles.payButtonText}>PAY</Text>
        </Pressable>

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

export function BusinessCardSuggested({ navigation, business, pocket }: { navigation: any, business: any, pocket: any }) {

  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getBusinessImageURL(business.businessID, setImageURL);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('Business', {
        // navigation: navigation,
        business: business,
        pocket: pocket
      })}
    >
      <View style={styles.card}>
        <View style={styles.businessHeaderImageContainer}>
          <Image
            style={styles.businessHeaderImage}
            source={{ uri: imageURL }}
          />
        </View>
        <View style={styles.businessModalInfo}>
          <Text style={styles.businessNameLg}>{business.businessName}</Text>
          <Text style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
          <Text style={styles.pocket}>{pocket}</Text>

        </View>
      </View>
    </Pressable>
  );

}

export function BusinessCardSm({ navigation, business, pocket, showPocket = true }: { navigation: any, business: any, pocket: any, showPocket: boolean }) {
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    getBusinessImageURL(business.businessID, setImageURL);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate('Business', {
        // navigation: navigation,
        business: business,
        pocket: pocket
      })}
    >
      <View style={[styles.card, styles.businessListItemCard]}>

        <View style={styles.businessListImageContainer}>
          <Image
            style={styles.businessListImage}
            source={{ uri: imageURL }}
          />
        </View>

        <View style={styles.businessListInfo}>
          <Text numberOfLines={1} style={styles.businessNameSm}>{business.businessName}</Text>
          <Text numberOfLines={1} style={styles.address}>{business.address.buildingNumber} {business.address.streetName}</Text>
          {showPocket ? <Text style={styles.pocket}>{pocket}</Text> : null}
        </View>

      </View>

    </Pressable>
  )
}


export function PocketListCard({ navigation, pocket }: { navigation: any, pocket: any }) {
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
            <Image
              style={styles.pocketListImage}
              source={pocket.imageURL}
            />
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
        {pocket.name}
      </Text>
    </Pressable>
  )
}

export function PocketDetailCard({ navigation, pocket }: { navigation: any, pocket: any }) {
  return (
    <>

      <View style={styles.card}>
        <View style={[styles.pocketHeaderImageContainer]}>
          <Image
            style={[styles.image, styles.pocketHeaderImage]}
            source={pocket.bannerURL}
          />

        </View>
        <View style={styles.container}>
          <Text style={styles.pocketTitle}>{pocket.name}</Text>
          <Hyphenated>
            <Text style={styles.prose}>
              {pocket.description}
            </Text>
          </Hyphenated>
        </View>
      </View>

      <View style={[styles.card, styles.pocketChangeBalanceCard]}>
        <Text style={styles.pocketBig}>{pocket.name} Change</Text>
        <Text style={styles.changeLg}>$8.94</Text>
      </View>
    </>
  );
}

export function PocketListSeparator() {
  return (
    <View style={{ width: MARGIN }} />
  )
}

export function IdCard(
  { name, imageURL, lifetimeChange, dateOfBirth }:
    {
      name: { [key: string]: string },
      imageURL?: string,
      lifetimeChange: number,
      dateOfBirth: string
    }) {
  return (
    <View style={[styles.card, styles.idCard]}>
      <View style={[styles.idHeader, { alignItems: 'flex-start' }]}>
        <Text style={styles.idAppName}> pocketchange</Text>
        <Text style={[styles.idText, styles.alignRight]}>USER ID</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.idImage}
          source={imageURL}
        />
        <View style={styles.idContent}>
          <Text style={styles.idLastName}>{name.last}</Text>
          <Text style={styles.idFirstName}>{name.first + ' ' + name.middle}</Text>
          <View style={[styles.horizontalLine, {
            width: 130,
            marginHorizontal: 0,
            marginVertical: 5,
          }]} />
          <Text style={styles.idLifeTimeChange}>{pad(lifetimeChange, 14)}</Text>
        </View>
      </View>
      <View style={[styles.idHeader, { alignItems: 'flex-end' }]}>
        <Text style={styles.idText}>USER ID</Text>
        <Text style={[styles.idDateOfBirth, styles.alignRight]}>{user.dateOfBirth}</Text>
      </View>
    </View>
  )
}

export function BalancesCard({ changeTotal, topPockets }: { changeTotal: string, topPockets: any }) {
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
              ({ key, pocket, change }: { key: string, pocket: string, change: string }) => (
                <TopPocket
                  key={key}
                  pocket={pocket}
                  change={change}
                />
              ), topPockets
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

export function TransactionHistoryCard({ navigation, transactions }: { navigation: any, transactions: { [key: string]: any }[] }) {

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

export function PayAmountCard({ name, address, pocket, imageURL, navigation }) {

  // const { name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.card}>
      {/* <CardHeader text='Pay' /> */}

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>
      </View>

      <HorizontalLine />

      <View style={styles.container}>
        <Text>$ dollar amt editable</Text>
      </View>
    </View>
  )
}

export function PayAmountCardSm({ name, address, pocket, imageURL, amount }: any) {

  // const { name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.card}>
      {/* <CardHeader text='Pay' /> */}

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>
      </View>

      <HorizontalLine />

      <View style={styles.container}>
        <Text style={[styles.changeSm, { textAlign: 'center' }]}>${amount}</Text>
      </View>
    </View>
  )
}

export function PayTipCard({ amount }: { amount: any }) {

  // const { name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.card}>
      <CardHeader text='Tip' />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.container}>
          <Text style={[styles.changeSm, { textAlign: 'center' }]}>10%</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.changeSm, { textAlign: 'center' }]}>$6.20</Text>
        </View>
      </View>

      {/* <HorizontalLine /> */}
    </View>
  )
}

export function PaySummaryCard({ name, address, pocket, imageURL, amount, tip }: any) {

  // const { name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.card}>
      {/* <CardHeader text='Summary' /> */}

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>
      </View>

      <HorizontalLine />

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left' }}>Subtotal</Text>
          <Text style={{ textAlign: 'right' }}>${'12.50'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left' }}>Tip</Text>
          <Text style={{ textAlign: 'right' }}>${'2.00'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left' }}>Change Used</Text>
          <Text style={{ textAlign: 'right' }}>-${'2.63'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left' }}>Total</Text>
          <Text style={{ textAlign: 'right' }}>${'11.87'}</Text>
        </View>
      </View>
    </View>
  )
}

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

export function SwitchAccountDropdown({ authContext, roles_list }: { authContext: AuthContextData, roles_list: Role[] }) {

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
    console.log(authContext.activeRole)
  }

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(authContext.activeRole);
  const [items, setItems] = useState(roles_list.map(r => ({ label: makeLabel(r), value: r })));

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

