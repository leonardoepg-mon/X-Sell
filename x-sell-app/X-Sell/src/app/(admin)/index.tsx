import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import { useAuth } from "@/contexts/authContext";

import { useMessageDialog } from "@/hooks/useMessageDialog";
import { UploadDialog } from "@/components/StatusScreen/UploadDialog";
import { StatusList } from "@/components/Admin/AdminStatusList";
import { UserDetailsBox } from "@/components/Admin/UserDetails";

import * as StApi from "@/services/adminTasks";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";

//Explicações

export default function AdminStatusList() {
  const router = useRouter();
  const {ContextLogout} = useAuth();
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const {showMessage, MessageDialog} = useMessageDialog();
  const [uploadVisible, setUploadVisible] = useState(false);
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
      <View style={showStatus? {...styles.buttonRow, justifyContent:  "flex-end"}:{...styles.buttonColumn, justifyContent: "center"}}>
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
  <Pressable
    style={styles.button}
    onPress={() => {setUploadVisible(true); 
        }}> 
    <Text selectable={false} style={styles.buttonText}>
      Nova solicitação
    </Text>
  </Pressable>
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
  <UploadDialog
    admin
    visible={uploadVisible}
    onClose={() => {handleStatusSearch();setUploadVisible(false);}}
    onUploaded={() => {handleStatusSearch();setUploadVisible(false);}}
    selectUser
    />
  <MessageDialog/>
</>
  );
}


