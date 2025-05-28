import { Zano } from '@hyle-team/react-native-zano';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';

export default function App() {
  const [result, setResult] = useState('')

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Button title="init" onPress={() => setResult(Zano.init_zano("", "", "", 1))} />
      <ScrollView style={{flex: 1}}>
        <Text>Result: {JSON.stringify(result, undefined, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
