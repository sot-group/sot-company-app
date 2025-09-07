import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { initDb } from '../lib/db';

export default function RootLayout() {
  useEffect(() => { initDb(); }, []);
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0c0c0c' },
        headerTintColor: '#f6c453',
        headerTitleStyle: { fontWeight: '800' },
      }}
    />
  );
}
