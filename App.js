import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Colors from './constants/Colors';
const ColorTheme = Colors['Theme'];

import List from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={ColorTheme.Blue} />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});
