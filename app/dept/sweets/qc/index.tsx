import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function QCHub() {
  return (
    <View style={s.c}>
      <Text style={s.h}>Quality Control</Text>
      <Link href="/dept/sweets/qc/new">New Entry</Link>
      <Link href="/dept/sweets/qc/search" style={{ marginTop: 10 }}>Search / Sync</Link>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#0c0c0c', padding: 16 },
  h: { color: '#f6c453', fontSize: 20, fontWeight: '800', marginBottom: 12 },
});
