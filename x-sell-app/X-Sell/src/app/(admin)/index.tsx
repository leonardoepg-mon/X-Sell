import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import { useAuth } from "@/contexts/authContext";

import { useMessageDialog } from "@/hooks/useMessageDialog";

import * as StApi from "@/services/adminTasks";

import { StatusList } from "@/components/Admin/AdminStatusList";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";
import { UserDetailsBox } from "@/components/Admin/UserDetails";

//Explicações

export default function AdminStatusList() {
  const router = useRouter();
  const {ContextLogout} = useAuth();
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const {showMessage, MessageDialog} = useMessageDialog();
  const [usersVisible, setUsersVisible] = useState(false);

  async function OnPressLogout() {
        ContextLogout();
        router.replace("/login");
    }

  async function handleStatusSearch() {
    const response = await StApi.statusSearch(); 
    if (response.success) {
      setDb(response.dbProcessed);
      setShowStatus(true);
    } else {
      setShowStatus(false);
      setDb([]);
      //console.log(response);
      showMessage( {message: response.message,
        msgType: response.msgType,
  });}}

  return (
    <>
    <AppBackground>
      {!showStatus && (
        <Pressable style={styles.button} onPress={handleStatusSearch}>
          <Text selectable={false} style={styles.buttonText}>
            Ver solicitações
          </Text>
        </Pressable>
      )}
      {showStatus && <StatusList database={database}
      refresh={handleStatusSearch}/>}
      <View style={styles.buttonRow}>
  {showStatus && (
    <Pressable
      style={styles.button}
      onPress={handleStatusSearch}
    >
      <Text selectable={false} style={styles.buttonText}>
        Atualizar
      </Text>
    </Pressable>
  )}
  
  <Pressable style={styles.button} onPress={() => {setUsersVisible(true);}}>
        <Text selectable={false} style={styles.buttonText} > Gerenciar usuários </Text>
      </Pressable>
  <Pressable style={styles.cancelButton} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.cancelBText} > Fechar sessão </Text>
      </Pressable>
</View>
    </AppBackground>
  <UserDetailsBox
  visible={usersVisible}
  onClose={() => setUsersVisible(false)}/>
  <MessageDialog/>
</>
  );
}


