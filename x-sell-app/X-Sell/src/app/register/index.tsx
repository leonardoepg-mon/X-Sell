import { MessageDialog } from "@/components/MessageDialog";
import { handleRegister } from "@/services/userAuth";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const [isMsgVisible, setMsgVisible] = useState(false);
  const router = useRouter();
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
      <Pressable style={styles.button} onPress= {async () => {
                        const response = await handleRegister(username, password);
                        console.log(response);
                        setMessage(response.message); 
                        setMsgType(response.msgType);
                        setMsgVisible(true);
                      }}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
      <Text > Já tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/login")}>
        <Text selectable={false} style={styles.buttonText} > Voltar à tela de login </Text>
      </Pressable>
    </View>
    <MessageDialog visible= {isMsgVisible}
                   messageType={msgType}
                   message={message}
                    onOK={() => setMsgVisible(false)}
    />
    </>
  );
}
