import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const {showMessage, MessageDialog} = useMessageDialog();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);

  async function OnPressLogout() {
        ContextLogout();
        router.navigate("/login");
    }

  async function handleStatusSearch() {
    const response = await StApi.statusSearch(); 
    if (response.success) {
      setDb(response.dbProcessed);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setDb([]);
      //console.log(response);
      showMessage( {message: response.message,
        msgType: response.msgType,
  });}}

  useEffect( () => { handleStatusSearch() }, []);

  return (
    <>
    <AppBackground>
      {!isLoading && <StatusList database={database}
      refresh={handleStatusSearch}/>}
      <View style={!isLoading? styles.buttonRow:styles.buttonColumn}>
        {isLoading && (
          <Text selectable={false} style={styles.welcomeMsg}>
            Carregando...
          </Text>)}
    <Pressable
      style={styles.button} 
      onPress={handleStatusSearch}
    >
      <Text selectable={false} style={styles.buttonText}>
        Atualizar
      </Text>
    </Pressable>
  <Pressable
    style={styles.button}
    onPress={() => {setUploadVisible(true); 
        }}> 
    <Text selectable={false} style={styles.buttonText}>
      Nova planilha
    </Text>
  </Pressable>
  <Pressable style={styles.button} onPress={() => {setUsersVisible(true);}}>
        <Text selectable={false} style={styles.buttonText} > Usuários </Text>
      </Pressable>
  <Pressable style={styles.cancelButton} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.cancelBText} > Sair </Text>
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


