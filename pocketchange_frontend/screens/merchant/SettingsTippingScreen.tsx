import { useState } from "react"
import { SettingSwitch } from "../../components/Cards"
import { ScreenContainer, View } from "../../components/Themed"
import { styles } from "../../Styles"

export default function SettingsTippingScreen() {

  const backend_allowTips = false

  const [allowTips, setAllowTips] = useState(backend_allowTips)

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.card}>
          <SettingSwitch
            settingText="Collect Tips?"
            value={allowTips}
            onToggle={setAllowTips}
          />

          {/* <HorizontalLine /> */}


        </View>
      </View>
    </ScreenContainer>
  )
}