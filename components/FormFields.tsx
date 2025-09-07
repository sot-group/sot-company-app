import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function LabeledInput({label, value, onChangeText, keyboardType='default'}: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginBottom: 12 },
  label: { color: '#eee', marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#444' }
});