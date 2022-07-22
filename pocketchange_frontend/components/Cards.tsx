import { Pressable, Image } from 'react-native';
import { Text, View } from './Themed';
import { styles } from '../Styles';
import { user } from '../dummy';

const R = require('ramda');

export function BusinessCardSm({ navigation, name, address, pocket, imageURL }: { navigation: any, name: string, address: string, pocket: string, imageURL?: string }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('BusinessModal', {
        name: name,
        address: address,
        pocket: pocket,
        imageURL: imageURL,
      })}
    >
      <View style={[styles.card, styles.businessListItemCard]}>

        <View style={styles.businessListImageContainer}>
          <Image
            style={styles.businessListImage}
            source={imageURL}
          />
        </View>

        <View style={styles.businessListInfo}>
          <Text style={styles.businessNameSm}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.pocket}>{pocket}</Text>
        </View>

      </View>

    </Pressable>
  )
}

export function PocketListCard({ navigation, name, imageURL }: { navigation: any, name: string, imageURL: string }) {
  return (
    // <Pressable>
    //   onPress={() => navigation.navigate('Pocket')}
    // </Pressable>
    // 
    // Enable above after making individual pocket screen
    <View>
      <View style={[styles.pocketListCardContainer, styles.container]}>
        <View style={[styles.card, styles.pocketListCard, styles.container]}>
          <View style={styles.pocketListNameContainer}>
            <Text style={styles.pocketListName}>{name}</Text>
          </View>

          <View style={styles.pocketListImageContainer}>
            <Image
              style={styles.pocketListImage}
              source={imageURL}
            />
          </View>
        </View>
      </View>

    </View>

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
            <Text style={[styles.changeLg, { textAlign: 'center' }]}>{changeTotal}</Text>
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
              ({ pocket, change }) => (
                <TopPocket
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

function TopPocket({ pocket, change }: { pocket: string, change: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pocket}>{pocket}</Text>
      <Text style={styles.changeSm}>{change}</Text>
    </View >
  )
}

function CardHeader({ text }: { text: string }) {
  return (
    <View style={styles.cardHeader}>
      <View style={styles.cardHeaderTextContainer}>
        <Text style={styles.cardHeaderText}>{text}</Text>
      </View>
      <HorizontalLine />
    </View>
  )
}

function HorizontalLine() {
  return (
    <View style={[styles.horizontalLine]}>
    </View>
  )
}

function VerticalLine() {
  return (
    <View style={styles.verticalLine}>
    </View>
  )
}

function pad(n: number, size: number) {
  let num = n.toString();
  while (num.length < size)
    num = "0" + num;
  return num;
}