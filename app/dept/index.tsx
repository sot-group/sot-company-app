import React from 'react';
import { ScrollView, Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

const Item = ({ href, title, subtitle }: { href: string; title: string; subtitle?: string }) => (
  <Link href={href} asChild>
    <Pressable style={s.card}>
      <Text style={s.title}>{title}</Text>
      {subtitle ? <Text style={s.sub}>{subtitle}</Text> : null}
    </Pressable>
  </Link>
);

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0c0c0c' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.header}>S.O.T. Departments</Text>
      <Item href="/dept/sweets"   title="S.O.T. – Sweets of Timor"   subtitle="Chocolate & QC workflows" />
      <Item href="/dept/spirits"  title="S.O.T. – Spirits of Timor"  subtitle="Coming soon" />
      <Item href="/dept/sausages" title="S.O.T. – Sausages of Timor" subtitle="Coming soon" />
      <Item href="/dept/streets"  title="S.O.T. – Streets of Timor"  subtitle="Coming soon" />
      <Item href="/dept/scents"   title="S.O.T. – Scents of Timor"   subtitle="Coming soon" />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { color: '#f6c453', fontSize: 22, fontWeight: '800', marginBottom: 16 },
  card:   { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 12, marginBottom: 12, borderColor: '#2a2a2a', borderWidth: 1 },
  title:  { color: '#fff', fontSize: 16, fontWeight: '800' },
  sub:    { color: '#bbb', marginTop: 4 },
});
