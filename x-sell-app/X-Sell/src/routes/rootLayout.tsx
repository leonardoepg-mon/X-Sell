import { useAuth } from "@/contexts/authContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { isLogged } = useAuth();

  return <Stack>
          <Stack.Protected guard={!isLogged}>
            <Stack.Screen name="login" options={{headerShown: false}}/>
            <Stack.Screen name="register" options={{headerShown: false}}/>
          </Stack.Protected>
          
          <Stack.Protected guard={isLogged}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          </Stack.Protected>

          <Stack.Screen name="about" options={{headerShown: false}}/>
        </Stack>
}

