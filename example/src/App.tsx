import { Zano } from '@hyle-team/react-native-zano';
import { StyleSheet, Text, View } from 'react-native';

const result = Zano.init("", "", "", 1);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
