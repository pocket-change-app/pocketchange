import { Pressable, Image, TabBarIOSItem, FlatList, Linking } from 'react-native';
import { Text, View } from './Themed';
import { HorizontalLine, VerticalLine } from './Lines'
import { styles, MARGIN } from '../Styles';
import { user } from '../dummy';

const R = require('ramda');


export function BusinessCard({ navigation, business }: { navigation: any, business: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.businessHeaderImageContainer}>
        <Image
          style={styles.businessHeaderImage}
          source={business.imageURL}
        />
      </View>
      <View style={styles.businessModalInfo}>
        <Text style={styles.businessNameLg}>{business.name}</Text>
        <Text style={styles.address}>{business.address}</Text>
        <Text style={styles.pocket}>{business.pocket}</Text>

        <Pressable style={styles.payButton}
          onPress={() => (navigation.navigate('PaymentModalStack', {
            screen: "PayAmount",
            params: {
              navigation: navigation,
              business: business,
            }
            // busID: business.busID,
            // name: business.name,
            // address: business.address,
            // pocket: business.pocket,
            // imageURL: business.imageURL,
          }))}
        >
          <Text style={styles.payButtonText}>PAY</Text>
        </Pressable>

        <Pressable style={styles.payButton}
          onPress={() => Linking.openURL(`tel:${business.phoneNumber}`)}>
          <Text style={styles.payButtonText}>[CALL]</Text>
        </Pressable>

        <Pressable style={styles.payButton}
          onPress={() => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${business.latitude},${business.longitude}`;
            const label = business.name;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            });
            Linking.openURL(`tel:${business.phoneNumber}`)
          }
          }>
          <Text style={styles.payButtonText}>[DIRECTIONS]</Text>
        </Pressable>
      </View>
    </View>
  );

}

export function BusinessCardSm({ navigation, business }: { navigation: any, business: any }) {

  return (
    <Pressable
      onPress={() => navigation.navigate('Business', {
        navigation: navigation,
        business: business,
      })}
    >
      <View style={[styles.card, styles.businessListItemCard]}>

        <View style={styles.businessListImageContainer}>
          <Image
            style={styles.businessListImage}
            source={business.imageURL}
          />
        </View>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{business.name}</Text>
          <Text style={styles.address}>{business.address}</Text>
          {
            //<Text style={styles.pocket}>{business.pocket}</Text>
          }
        </View>

      </View>

    </Pressable>
  )
}


export function PocketListCard({ navigation, pocket }: { navigation: any, pocket: any }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('Pocket', {
        navigation: navigation,
        pocket: pocket
      })}
    >
      {/* <View> */}
      <View style={[styles.pocketListCardContainer]}>
        <View style={[styles.card, styles.pocketListCard, styles.container]}>
          <View style={styles.pocketListNameContainer}>
            <Text style={styles.pocketListName}>{pocket.name}</Text>
          </View>

          <View style={styles.pocketListImageContainer}>
            <Image
              style={styles.pocketListImage}
              source={pocket.imageURL}
            />
          </View>
        </View>
      </View>

      {/* </View> */}
    </Pressable>

  )
}

export function PocketDetailCard({ navigation, pocket }: { navigation: any, pocket: any }) {
  return (
    <View>
      <View style={styles.pocketHeaderImageContainer}>
        <Image
          style={styles.pocketHeaderImage}
          source={pocket.bannerURL}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.signatureText}>
          {pocket.description}
        </Text>
      </View>
      <View style={[styles.card, styles.pocketChangeBalanceCard]}>
        <Text style={styles.pocketBig}>{pocket.name} Change</Text>
        <Text style={styles.changeLg}>$8.94</Text>
      </View>
    </View>



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
      <View style={styles.idHeader}>
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
      <View style={[styles.idHeader, {}]}>
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
          <View style={styles.balanceCardContent}>
            <Text style={[styles.changeLg, { textAlign: 'center' }]}>${changeTotal}</Text>
          </View>
          <View style={styles.flexFill}>
          </View>
        </View>

        <VerticalLine />

        <View style={styles.balanceCardColumn}>
          <CardHeader
            text='Top Pockets'
          />
          <View style={styles.balanceCardContent}>
            {R.map(
              ({ key, pocket, change }: { key: string, pocket: string, change: string }) => (
                <TopPocket
                  key={key}
                  pocket={pocket}
                  change={change}
                />
              ), topPockets
            )}
            {/* <TopPocket
              pocket={topPockets[0].pocket}
              change={topPockets[0].change}
            />
            <TopPocket
              pocket={topPockets[1].pocket}
              change={topPockets[1].change}
            />
            <TopPocket
              pocket={topPockets[2].pocket}
              change={topPockets[2].change}
            /> */}
          </View>

        </View>

      </View>
    </View >
  )
}

export function Setting({ settingText }: { settingText: string }) {
  return (
    <View style={styles.setting}>
      <Text style={styles.settingText}>{settingText}</Text>
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
        nestedScrollEnabled={false}
        ItemSeparatorComponent={HorizontalLine}
        data={transactions}
        renderItem={renderTransactions}
      />
    </View>
  )
}

function TransactionListed({ navigation, transaction }: { navigation: any, transaction: { [key: string]: string } }) {



  return (
    // TODO: make pressable and navigatte to its own page
    <Pressable
      onPress={() => (navigation.navigate("ConsumerTransaction", {
        navigation: navigation,
        transaction: transaction
      }))}
    >
      <View style={styles.transactionListed}>
        <Text style={styles.transactionListedMerchantText}>
          {transaction.merchant}
        </Text>
        <Text style={styles.transactionListedAmountText}>
          ${transaction.amount}
        </Text>
      </View>
      {/* <HorizontalLine /> */}
    </Pressable >
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

export function ButtonWithText({ text, onPress }: { text: string, onPress: any }) {
  return (
    <Pressable
      onPress={onPress}>
      <View style={styles.buttonNegative}>
        <Text style={[styles.cardHeaderText, styles.buttonNegativeText]}>{text}</Text>
      </View>
    </Pressable>
  )
}

export function TranactionCardSm({ navigation, transaction }: { navigation: any, transaction: any }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('TransactionModal', {
        transaction
      })}
    >
      <View style={[styles.card, styles.businessListItemCard]}>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{transaction.userID}</Text>
          <Text style={styles.address}>{transaction.value}</Text>
          <Text style={styles.pocket}>{transaction.date}</Text>
        </View>

      </View>

    </Pressable>
  )
}

export function PayAmountCard({ name, address, pocket, imageURL, navigation }) {

  // const { name, address, pocket, imageURL } = route.params;

  return (
    <View style={styles.card}>
      <CardHeader text='Pay' />

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
      <CardHeader text='Summary' />

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