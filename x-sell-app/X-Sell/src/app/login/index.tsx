import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { handleLogin } from "../../services/userAuth"
import { useAuth } from "@/contexts/authContext";
import { styles } from "@/styles/styles";
import { useMessageDialog } from "@/hooks/useMessageDialog";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {ContextLogin} = useAuth()
  const {showMessage, MessageDialog} = useMessageDialog();

async function OnPressLogin() {
    const response = await handleLogin(username, password);
    showMessage( {message: response.message,
                  msgType: response.msgType,
                  afterDialog: response.success 
                                ? () => {
                                ContextLogin(username, response.token);
                                router.replace("/(tabs)");
                                } : undefined
                              });
    }

  return (
    <>
    <View style={styles.container}>
      <TextInput style= {styles.input} onChangeText={setUsername}
                 value={username}
                 placeholder="Nome"/>
      <TextInput style= {styles.input} onChangeText={setPassword}
                 value={password}
                 secureTextEntry={true}
                 placeholder="Senha"/>
                  <Pressable
                style={styles.button}
                onPress={OnPressLogin}>
        <Text selectable={false} style={styles.buttonText} > Login </Text>
      </Pressable>
      <Text style={styles.infoMessage}> Não tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/register")}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.navigate("/about")}>
        <Text selectable={false} style={styles.buttonText} > Sobre </Text>
      </Pressable>
    </View>
    <MessageDialog/>
  </>
  );
}
