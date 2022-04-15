/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { useKeyboardHeight } from 'react-native-use-keyboard';

export default function App() {
  const [keyboardHeigth] = useKeyboardHeight();

  return (
    <View style={styles.container}>
      <Text>Height: {keyboardHeigth}</Text>

      <TextInput
        placeholder="Username"
        style={{
          height: 40,
          borderColor: '#000000',
          borderBottomWidth: 1,
          marginBottom: 36,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
