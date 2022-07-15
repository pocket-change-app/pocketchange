const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const darkSubtle = '#A8A8A8';
const darkMedium = '7F7F7F';
const darkDark = '#000';

export const colors = {
  bg: '#F2F2F2',
  gold: '#D9AE2B',
  subtle: '#A8A8A8',
  medium: '#7F7F7F',
  dark: '#4C4C4C',
  card: '#fff',
}

export default {
  light: {
    text: colors.dark,
    background: colors.bg,
    tint: colors.dark,
    tabIconDefault: colors.subtle,
    tabIconSelected: colors.dark,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  }
};
