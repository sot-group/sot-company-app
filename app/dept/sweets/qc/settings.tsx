import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { saveCreds, getCreds } from '../../../../lib/api';

export default function SettingsScreen() {
  const [baseUrl, setBaseUrl] = useState('https://shop.oftimor.com');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const c = await getCreds();
      if (c) { setBaseUrl(c.baseUrl); setUsername(c.username); setPassword(c.password); }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Settings</Text>
      <TextInput style={styles.input} placeholder="Base URL" value={baseUrl} onChangeText={setBaseUrl} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password / App Password" value={password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry />
      <Pressable style={styles.btn} onPress={async () => { await saveCreds({ baseUrl, username, password }); Alert.alert('Saved'); }}>
        <Text style={{ color: '#000', fontWeight: '700' }}>Save</Text>
      </Pressable>
      <Text style={{ color: '#888', marginTop: 10 }}>Use WordPress Application Passwords or WooCommerce API keys.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0c', padding: 16 },
  title: { color: '#f6c453', fontSize: 20, fontWeight: '800', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  btn: { backgroundColor: '#f6c453', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 }
});