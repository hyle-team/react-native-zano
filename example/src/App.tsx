import { Zano } from '@hyle-team/react-native-zano';
import { useEffect, useMemo, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function App() {
  const [result, setResult] = useState('');
  const [time, setTime] = useState(0);

  const api = useMemo(() => new Zano('https://node.zano.org:443'), []);
  useEffect(() => () => api.dispose(), [api]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="empty"
        onPress={async () => {
          let time = performance.now();
          const result = 'empty';
          time = performance.now() - time;
          setTime(time);
          setResult(result);
          console.log('RESULT:', result);
        }}
      />
      <ScrollView style={styles.result}>
        <Text>Version: {api.lib_version}</Text>
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
