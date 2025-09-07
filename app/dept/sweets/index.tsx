import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Row = ({ href, title, sub }: { href: string; title: string; sub?: string }) => (
  <Link href={href} asChild>
    <Pressable style={s.row}>
      <Text style={s.title}>{title}</Text>
      {sub ? <Text style={s.sub}>{sub}</Text> : null}
    </Pressable>
  </Link>
);

export default function SweetsMenu() {
  return (
    <View style={s.container}>
      <Text style={s.header}>Sweets of Timor</Text>
      <Row href="/dept/sweets/qc"      title="Quality Control"   sub="Arrival → Drying → Roasting → …" />
      <Row href="/dept/sweets/recipes" title="Recipes"           sub="Formulations and BOMs" />
      <Row href="/dept/sweets/orders"  title="Order List"        sub="Production queue" />
      <Row href="/dept/sweets/weekly"  title="Weekly Job List"   sub="Assignments & tasks" />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0c', padding: 16 },
  header:    { color: '#f6c453', fontSize: 20, fontWeight: '800', marginBottom: 12 },
  row:       { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 10, borderColor: '#2a2a2a', borderWidth: 1 },
  title:     { color: '#fff', fontWeight: '800' },
  sub:       { color: '#bbb', marginTop: 4 },
});
