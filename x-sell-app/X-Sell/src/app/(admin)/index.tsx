import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import { useAuth } from "@/contexts/authContext";

import { useMessageDialog, MsgType } from "@/hooks/useMessageDialog";

import * as StApi from "@/services/adminTasks";

import { StatusList } from "@/components/AdminStatusList";
import { RatingDialog } from "@/components/RatingDialog";
import { UploadDialog } from "@/components/UploadDialog";
import { DownloadDialog } from "@/components/DownloadDialog";

import { styles } from "@/styles/styles";
import { AppBackground } from "@/components/AppBackground";

//Explicações

export default function AdminStatusList() {
  const router = useRouter();
  const {ContextLogout} = useAuth();
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [ratingVisible, setRatingVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const {showMessage, MessageDialog} = useMessageDialog();

  async function confirmDownload() {   
        const response = await StApi.handleDownload(selectedId ?? 0);
              showMessage({message : response.message,
                msgType: response.msgType as MsgType})
  }

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

  async function handleStatusSet(id: number, statusTo: number) {
    const response = await StApi.statusSet(id ?? 0, statusTo);
                showMessage({message : response.message,
                msgType: response.msgType as MsgType});
                await handleStatusSearch();
  }

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
                                  onPressRating={(id) => { //funçoes simples, deixar como arrow?
                                                  setSelectedId(id);
                                                  setRatingVisible(true); }}
                                  onPressUpload={(id) => {
                                                    setSelectedId(id);
                                                    setUploadVisible(true);  //OK
                                                    }}
                                  onPressDownload= {(id) => {
                                                      setSelectedId(id);
                                                      setDownloadVisible(true);  //OK
                                                    }}
                                  onPressSubmit={(id) => {
                                                    handleStatusSet(id, 3);  //direto submit, refresh, sem dialog
                                                    }}
                                  onPressAccept={(id) => {
                                                    handleStatusSet(id, 1); /* direto submit, refresh, sem dialog, 
                                                                                mesma função que o submit e reject*/
                                                    }}
                                  onPressReject={ (id) => {
                                                    handleStatusSet(id, -1)
                                                    }}
                                  onPressStart={(id)=> {
                                                    handleStatusSet(id, 2)
                                                    }}
        />}
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
  <Pressable style={styles.button} onPress={OnPressLogout}>
        <Text selectable={false} style={styles.cancelBText} > Fechar sessão </Text>
      </Pressable>
</View>
    </AppBackground>
     
          <RatingDialog
  rated={true}
  admin={true}
  visible={ratingVisible}
  id_item={selectedId ?? 0}
  onClose={() => setRatingVisible(false)}
  onRated={() => {handleStatusSearch();
    setRatingVisible(false);//showmessage?
   }}
/>
      <UploadDialog
      admin={true}
  visible={uploadVisible}
  id_item={selectedId ? String(selectedId) : undefined}
  onClose={() => setUploadVisible(false)}
  onUploaded={() => {handleStatusSearch(); //
    setUploadVisible(false);
   }}
/>
      <DownloadDialog
  visible={downloadVisible}
  id_item={selectedId || 0}
  onClose={() => setDownloadVisible(false)}
  onDownloaded={() => {setDownloadVisible(false);}}
  onPressDownload={confirmDownload}/>

  <MessageDialog/>
</>
  );
}


