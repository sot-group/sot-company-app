import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const cards = [
  { title: 'Arrival', route: '/new?type=arrival' },
  { title: 'Drying', route: '/new?type=drying' },
  { title: 'Roasting', route: '/new?type=roasting' },
  { title: 'Winnowing', route: '/new?type=winnowing' },
  { title: 'Pressing', route: '/new?type=pressing' },
  { title: 'Powder Grinding', route: '/new?type=powder_grinding' },
  { title: 'Chocolate Milling', route: '/new?type=choc_milling' },
  { title: 'Tempering & Molding', route: '/new?type=tempering_molding' },
  { title: 'Packaging', route: '/new?type=packaging' },
];

export default function Dashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.h1}>S.O.T. — Sweets of Timor</Text>
      <Text style={styles.sub}>Factory-friendly logging • Offline-first • API sync</Text>
      <View style={styles.grid}>
        {cards.map(c => (
          <Link href={c.route} key={c.title} asChild>
            <Pressable style={styles.card}><Text style={styles.cardText}>{c.title}</Text></Pressable>
          </Link>
        ))}
      </View>
      <Link href="/timeline" asChild><Pressable style={styles.secondary}><Text style={styles.cardText}>Batch Timeline</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0c' },
  h1: { color: '#f6c453', fontWeight: '800', fontSize: 22, marginBottom: 6 },
  sub: { color: '#ddd', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: '#1b1b1b', padding: 18, borderRadius: 16, minWidth: '46%', marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  secondary: { backgroundColor: '#222', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#333' },
  cardText: { color: '#fff', fontWeight: '700' }
});