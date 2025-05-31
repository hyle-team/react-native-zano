import { PlatformUtils, ZanoLib } from '@hyle-team/react-native-zano';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function App() {
  const [result, setResult] = useState('');
  const [time, setTime] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="init"
        onPress={async () => {
          let time = performance.now();
          const result = await ZanoLib.init('', '', PlatformUtils.get_working_directory(), 1);
          time = performance.now() - time;
          setTime(time);
          setResult(result);
        }}
      />
      <ScrollView style={styles.result}>
        <Text>Time: {time}</Text>
        <Text>Result: {result}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'white',
  },
  result: {
    flex: 1,
  },
});
