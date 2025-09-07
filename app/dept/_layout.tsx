import { Stack } from 'expo-router';
import React from 'react';

export default function DeptLayout() {
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
