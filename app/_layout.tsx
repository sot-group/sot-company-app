import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerStyle:{ backgroundColor:"#111" }, headerTintColor:"#fff" }}>
      <Tabs.Screen name="spirits/index" options={{ title: "Spirits" }} />
      <Tabs.Screen name="sweets/index"  options={{ title: "Sweets" }} />
      <Tabs.Screen name="sausages/index" options={{ title: "Sausages" }} />
      <Tabs.Screen name="streets/index" options={{ title: "Streets" }} />
    </Tabs>
  );
}
