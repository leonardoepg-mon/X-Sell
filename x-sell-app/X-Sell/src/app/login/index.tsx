import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { handleLogin } from "../../services/userAuth"
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "@/styles/styles";
import { MessageDialog } from "@/components/MessageDialog";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {ContextLogin} = useAuth()
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const [isMsgVisible, setMsgVisible] = useState(false);
  const [afterDialog, setAfterDialog] = useState<(() => void) | null>(null);

async function OnPressLogin() {
                  const response = await handleLogin(username, password);
                  setMessage(response.message);
                  setMsgType(response.msgType);
                  if (response.success) {
                  setAfterDialog(() => () => {
                  ContextLogin(username, response.token);
                  router.replace("/(tabs)");
                  });
                    } else {
                      setAfterDialog(null);
                    }
                    setMsgVisible(true);
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
      <Text > Não tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/register")}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
    </View>
    <MessageDialog visible= {isMsgVisible}
                       messageType={msgType}
                       message={message}
                        onOK={() => {
                              setMsgVisible(false);

                              if (afterDialog) {
                                afterDialog();
                                setAfterDialog(null);
                              }
                            }}
    />
  </>
  );
}
