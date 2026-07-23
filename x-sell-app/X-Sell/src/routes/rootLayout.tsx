import { useAuth } from "@/contexts/authContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { isLogged, isAdmin } = useAuth();

  return <Stack>
          <Stack.Protected guard={!isLogged}>
            <Stack.Screen name="login" options={{headerShown: false, title: "Entrar"}}/>
            <Stack.Screen name="register" options={{headerShown: false, title: "Registro"}}/>
          </Stack.Protected>
          
          <Stack.Protected guard={isLogged && !isAdmin}>
            <Stack.Screen name="(tabs)" options={{headerShown: false, title: "Home"}} />
          </Stack.Protected>

          <Stack.Protected guard={isLogged && isAdmin}>
            <Stack.Screen name="(admin)" options={{headerShown: false, title: "Área do administrador"}} />
          </Stack.Protected>

          <Stack.Screen name="about" options={{headerShown: false, title: "Sobre"}}/>
        </Stack>
}

