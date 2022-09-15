import { FlatList, Pressable } from "react-native";
import { DivHeader, SettingPressable } from "../components/Cards";
import { HorizontalLine } from "../components/Lines";
import { ScreenContainer, Text, View } from "../components/Themed";
import { styles } from "../Styles";

export default function EditEmployeesScreen({ route, navigation }: { route: any, navigation: any }) {

  const RoleLevels = {
    'owner': 0,
    'manager': 1,
    'cashier': 2,
  }

  // TODO: get employees from backend
  const employees = [
    {
      name: {
        first: 'Cole',
        last: 'Charbonneau',
      },
      role: 'cashier',
    },
    {
      name: {
        first: 'Dewmi',
        last: 'Seneviratna',
      },
      role: 'owner'
    },
    {
      name: {
        first: 'Hugo',
        last: 'Hale',
      },
      role: 'manager',
    },
    {
      name: {
        first: 'Elias',
        last: 'Williams',
      },
      role: 'manager'
    }
  ]

  const renderEmployee = ({ item, index, separators }: { item: any, index: any, separators: any }) => (
    <Pressable
      onPress={() => navigation.navigate('Employee', {
        employee: item
      })}
    >
      <View style={[styles.setting, { justifyContent: 'space-between' }]}>
        <Text style={styles.settingText}>{item.name.first + ' ' + item.name.last}</Text>
        <Text style={styles.settingText}>{item.role}</Text>
      </View>
      {/* <HorizontalLine /> */}
    </Pressable>


    // <SettingPressable
    //   settingText={item.name.first + item.name.last}
    //   onPress={() => navigation.navigate('Employee', {
    //     employee: item
    // })}
    // />
  )

  return (
    <ScreenContainer>
      <View style={styles.container}>

        <DivHeader text="Edit Permissions" />

        <View style={styles.card}>

          <FlatList
            scrollEnabled={false}
            data={employees}
            renderItem={renderEmployee}
            ItemSeparatorComponent={HorizontalLine}
          />

        </View>

        <View style={styles.card}>
          <SettingPressable
            settingText="Invite Employee"
          />
        </View>

      </View>
    </ScreenContainer>
  )
}