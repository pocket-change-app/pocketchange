import { SearchBar as _SearchBar_ } from "@rneui/themed"
import { colors } from "../constants/Colors"
import { styles } from "../Styles"

export default function SearchBar(
  {
    value,
    onChangeText,
    placeholder = 'Search',
  }: {
    value: string,
    onChangeText: (s: string) => void,
    placeholder?: string,
  }) {

  return (
    <_SearchBar_
      selectionColor={colors.gold}
      platform='ios'
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBarInputContainer}
      inputStyle={styles.searchBarInput}
      placeholderTextColor={colors.subtle}
      // showCancel={true}
      // cancelButtonTitle='Cancel'
      cancelButtonProps={{ color: colors.subtle }}

      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  )
}