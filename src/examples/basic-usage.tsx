import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useKeyboard } from '@wecraftapps/react-native-use-keyboard';

const BasicUsage = (): JSX.Element => {
  const [keyboard] = useKeyboard();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>keyboard</Text>
      <Text style={{ fontSize: 18, marginBottom: 48, fontWeight: '700' }}>
        {JSON.stringify(keyboard)}
      </Text>

      <TextInput
        placeholder="Input"
        style={{
          height: 40,
          borderColor: '#000000',
          borderBottomWidth: 1,
          marginBottom: 36,
          width: '80%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BasicUsage;
