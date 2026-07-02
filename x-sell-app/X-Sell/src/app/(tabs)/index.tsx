import { MessageDialog } from "@/components/MessageDialog";
import { useAuth } from "@/contexts/AuthContext";
import { handleLogout } from "@/services/userAuth";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable} from "react-native";

//Explicações

export default function Index() {
  const router = useRouter();
  const {ContextLogout, username, token} = useAuth();
  const [message, setMessage] = useState('');
    const [msgType, setMsgType] = useState('');
    const [isMsgVisible, setMsgVisible] = useState(false);
    const [afterDialog, setAfterDialog] = useState<(() => void) | null>(null);

  async function OnPressLogout() {
                                   const response = await handleLogout(token||"");
                                   setMessage(response.message);
                                   setMsgType(response.msgType);
                                   setAfterDialog(() => () => {
                                   ContextLogout();
                                   router.replace("/login");
                                  });
                                   setMsgVisible(true);
                                   }

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.welcomeMsg} > Bem-vindo de volta, {username}! </Text>
      <Text > Explicações </Text>
      <Pressable style={styles.button} onPress={() => {router.navigate('/(tabs)/status');}}>
        <Text selectable={false} style={styles.buttonText} > Ver requisições </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.buttonText} > Fechar sessão </Text>
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


