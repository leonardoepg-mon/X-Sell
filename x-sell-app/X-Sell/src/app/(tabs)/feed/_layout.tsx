import { Stack } from "expo-router";

export default function Layout() {
  return <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="download" options={{headerShown: false}} />
          <Stack.Screen name="upload" options={{headerShown: false}} />
        </Stack>
}
