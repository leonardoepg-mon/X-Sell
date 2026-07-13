import { useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native";

import { useAuth } from "@/contexts/authContext";
import { useMessageDialog } from "@/hooks/useMessageDialog";
import { handleLogout } from "@/services/userAuth";

import { styles } from "@/styles/styles";

//Explicações

export default function Index() {
  const router = useRouter();
  const {ContextLogout, username} = useAuth();

  const {showMessage, MessageDialog} = useMessageDialog();


  async function OnPressLogout() {
    const response = await handleLogout();
    if(!response.success) {showMessage({message: response.message,
      msgType: response.msgType,
      afterDialog: () => {
        ContextLogout();
        router.replace("/login");
      }
    })}
    else {
        ContextLogout();
        router.replace("/login");
    }
  }

  return (
    <>
    <View style={styles.container}>
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
    <MessageDialog/>
    </>
  );
}


