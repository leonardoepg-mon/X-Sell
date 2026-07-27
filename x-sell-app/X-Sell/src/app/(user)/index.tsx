import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import * as StApi from "@/services/statusApi";

import { StatusList } from "@/components/StatusScreen/StatusList";
import { UploadDialog } from "@/components/StatusScreen/UploadDialog";

import { useMessageDialog } from "@/hooks/useMessageDialog";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";
import { useAuth } from "@/contexts/authContext";
import Instructions from "@/components/Instructions";
import { useRouter } from "expo-router";

export default function StatusScreen() {
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const {ContextLogout} = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const {showMessage, MessageDialog} = useMessageDialog();
  const router = useRouter();

  function OnPressLogout() {
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
      showMessage({message: response.message,
        msgType: response.msgType});}}
  return (
    <>
    <AppBackground>
      {showStatus && <StatusList database={database} refresh={handleStatusSearch}/>}
      <View style={showStatus? {...styles.buttonRow, alignSelf:  "center"}:{...styles.buttonColumn, alignSelf: "center"}}>
      <Pressable style={styles.button} onPress={() => setInstructionsVisible(true)}>
        <Text selectable={false} style={styles.buttonText} > Como funciona? </Text>
      </Pressable>
      <Pressable
      style={styles.button}
      onPress={handleStatusSearch}>
      <Text selectable={false} style={styles.buttonText}>
        {showStatus ? "Atualizar": "Ver processos"}
      </Text>
    </Pressable>
  <Pressable
    style={styles.button}
    onPress={() => {setUploadVisible(true); }}> 
    <Text selectable={false} style={styles.buttonText}>
      Nova planilha
    </Text>
  </Pressable>
      <Pressable style={styles.cancelButton} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.cancelBText} > Sair </Text>
      </Pressable>
      </View>
    </AppBackground>
  <UploadDialog
  visible={uploadVisible}
  onClose={() => {handleStatusSearch();setUploadVisible(false);}}
  onUploaded={() => {handleStatusSearch();setUploadVisible(false);}}
  />
  <Instructions visible={instructionsVisible}
  onPressClose={() => setInstructionsVisible(false)}
  onPressStart={() => {setInstructionsVisible(false);setUploadVisible(true);}} />
  <MessageDialog/>
</>
  );
}


