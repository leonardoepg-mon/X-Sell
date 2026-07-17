import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import * as StApi from "@/services/statusApi";

import { StatusList } from "@/components/StatusScreen/StatusList";
import { UploadDialog } from "@/components/StatusScreen/UploadDialog";

import { useMessageDialog } from "@/hooks/useMessageDialog";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";

export default function StatusScreen() {
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);

  const [uploadVisible, setUploadVisible] = useState(false);
  const {showMessage, MessageDialog} = useMessageDialog();


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
        afterDialog: undefined, 
    });}}

  return (
    <>
    <AppBackground>
      {!showStatus && (
        <Pressable style={styles.button} onPress={handleStatusSearch }>
          <Text selectable={false} style={styles.buttonText}>
            Ver solicitações
          </Text>
        </Pressable>
      )}
      {showStatus && <StatusList database={database} refresh={handleStatusSearch}/>}
      <View style={styles.buttonRow}>
  <Pressable
    style={styles.button}
    onPress={() => {setUploadVisible(true);
        }}
  > 
    <Text selectable={false} style={styles.buttonText}>
      Nova solicitação
    </Text>
  </Pressable>
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
      </View>
    </AppBackground>
  <UploadDialog
  visible={uploadVisible}
  onClose={() => {handleStatusSearch();setUploadVisible(false);}}
  onUploaded={() => {handleStatusSearch();setUploadVisible(false);}}
  />
  <MessageDialog/>
</>
  );
}


