import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";

import { useMessageDialog } from "@/hooks/useMessageDialog";
import { handleRegister } from "@/services/userAuth";

import { styles } from "@/styles/styles";
import RegisterExpanded from "@/components/RegisterExpanded";
//Botão para mostrar expandido

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const {showMessage, MessageDialog} = useMessageDialog();

  const router = useRouter();

  return (
    <>
    <View style={styles.container}>
      { !visible && <>
      <TextInput style= {styles.input} onChangeText={setUsername}
                 value={username}
                 placeholder="Nome"/>
      <TextInput style= {styles.input} onChangeText={setPassword}
                 value={password}
                 secureTextEntry={true}
                 placeholder="Senha"/>
      <Pressable style={styles.button} onPress= {async () => {
                        const response = await handleRegister(username, password);
                        showMessage({message: response.message,
                          msgType: response.msgType
                        });
                      }}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
      <Pressable style={styles.button} onPress= {async () => { setVisible(true);} }>
        <Text selectable={false} style={styles.buttonText} > Registrar expandido </Text>
      </Pressable> </>}
      { visible && <>
      <RegisterExpanded />
      <Pressable style={styles.button} onPress= {async () => { setVisible(false);} }>
        <Text selectable={false} style={styles.buttonText} > Registrar normal </Text>
      </Pressable> </>}
      <Text style={styles.infoMessage}> Já tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/login")}>
        <Text selectable={false} style={styles.buttonText} > Voltar à tela de login </Text>
      </Pressable>
    </View>
    <MessageDialog/>
    </>
  );
}
