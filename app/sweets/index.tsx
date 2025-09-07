import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function DeptHome() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Department</Text>
      <Link href="./processes" style={{ fontSize: 18, marginVertical: 8 }}>Processes (QC)</Link>
      <Link href="./accounting" style={{ fontSize: 18, marginVertical: 8 }}>Accounting</Link>
      <Link href="./todo" style={{ fontSize: 18, marginVertical: 8 }}>To-Do</Link>
      <Link href="./events" style={{ fontSize: 18, marginVertical: 8 }}>Events</Link>
    </View>
  );
}
