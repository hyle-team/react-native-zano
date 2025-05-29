import { PlatformUtils, Zano } from '@hyle-team/react-native-zano';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function App() {
  const [result, setResult] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Button title="init" onPress={() => setResult(Zano.init('', '', PlatformUtils.get_working_directory(), 1))} />
      <Button
        title="call test"
        onPress={async () => {
          const [a, b] = await Promise.all([Zano.call('', 0, ''), Zano.call('', 0, '')]);
          setResult(JSON.stringify({ a, b }, undefined, 2));
        }}
      />
      <ScrollView style={styles.result}>
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
