import { Zano } from '@hyle-team/react-native-zano';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text } from 'react-native';

export default function App() {
  const [result, setResult] = useState('')

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Button title="init" onPress={() => setResult(Zano.init("", "", 1))} />
      <Button title="call test" onPress={async () => {
        const [a,b] = await Promise.all([Zano.call("", 0, ""),Zano.call("", 0, "")])
        setResult(JSON.stringify({a,b}, undefined, 2))
      }} />
      <ScrollView style={{flex: 1}}>
        <Text>Result: {result}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
