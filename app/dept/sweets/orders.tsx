import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Orders() {
  return (
    <View style={s.v}>
      <Text style={s.t}>Order List — coming soon</Text>
    </View>
  );
}

const s = StyleSheet.create({
  v: { flex: 1, backgroundColor: '#0c0c0c', alignItems: 'center', justifyContent: 'center' },
  t: { color: '#fff' },
});
