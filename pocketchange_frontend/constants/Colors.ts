

export const colors = {
  bg: '#F2F2F2',
  bgLight: '#f8f8f8',
  gold: '#D9A300',
  green: '#71A77B',
  blue: '#7C90DB',
  light: '#D9D9D9',
  tomato: '#FF6542',
  subtle: '#A8A8A8',
  purple: '#6F4A92',
  medium: '#808080',
  dark: '#555',
  card: '#fff',
  imageBorder: 'rgba(0,0,0,0.1)',
  transluscentWhite: 'rgba(255,255,255,0.5)'
}

export const colorScale = [colors.gold, colors.green, colors.blue, colors.tomato, colors.purple]

export default {
  light: {
    text: colors.dark,
    background: colors.bg,
    tint: colors.dark,
    tabIconDefault: colors.subtle,
    tabIconSelected: colors.dark,
  },
  dark: {
    text: colors.dark,
    background: colors.bg,
    tint: colors.dark,
    tabIconDefault: colors.subtle,
    tabIconSelected: colors.dark,
  }
};

const tintColorLight = colors.gold;
const tintColorDark = colors.gold;
const darkSubtle = '#A8A8A8';
const darkMedium = '7F7F7F';
const darkDark = '#000';