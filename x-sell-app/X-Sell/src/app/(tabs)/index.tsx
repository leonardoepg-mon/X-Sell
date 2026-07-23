import { useRouter } from "expo-router";
import { Text, Pressable, View } from "react-native";

import { useAuth } from "@/contexts/authContext";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";

//Explicações

export default function Index() {
  const router = useRouter();
  const {ContextLogout, username} = useAuth();

  async function OnPressLogout() {
        await ContextLogout();
  }//good

  return ( 
    <>
    <AppBackground>  
      <View style={{flexDirection:"column", alignContent: "center",}}>
      <Text style={styles.welcomeMsg} > Bem-vindo de volta, {username}! </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/about")}>
        <Text selectable={false} style={styles.buttonText} > Sobre </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {router.navigate('/(tabs)/status');}}>
        <Text selectable={false} style={styles.buttonText} > Ver requisições </Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.cancelBText} > Fechar sessão </Text>
      </Pressable>
      </View>
    </AppBackground>
    </>
  );
}

