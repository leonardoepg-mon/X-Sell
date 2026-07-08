import { useState } from "react";
import { Text, View, Pressable } from "react-native";

import * as StApi from "@/services/statusApi";

import { StatusList } from "@/components/StatusList";
import { RatingDialog } from "@/components/RatingDialog";
import { UploadDialog } from "@/components/UploadDialog";
import { DownloadDialog } from "@/components/DownloadDialog";

import { useMessageDialog } from "@/hooks/useMessageDialog";

import { styles } from "@/styles/styles";

export default function StatusScreen() {
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [ratingVisible, setRatingVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
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
    <View style={styles.container}>
      {!showStatus && (
        <Pressable style={styles.button} onPress={handleStatusSearch }>
          <Text selectable={false} style={styles.buttonText}>
            Ver solicitações
          </Text>
        </Pressable>
      )}
      {showStatus && <StatusList database={database}
                                  onPressRating={(id) => { //funçoes simples, deixar como arrow?
                                                  setSelectedId(id);
                                                  setRatingVisible(true); }}
                                  onPressReupload={(id) => {
                                                    setSelectedId(id);
                                                    setUploadVisible(true); 
                                                    }}
                                  onPressDownload= {(id) => {
                                                      setSelectedId(id);
                                                      setDownloadVisible(true);
                                                    }}
        />}
      <View style={styles.buttonRow}>
  <Pressable
    style={styles.button}
    onPress={() => {setSelectedId(null);
      setUploadVisible(true);
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
    </View>
     
          <RatingDialog
  visible={ratingVisible}
  id_item={selectedId ?? 0}
  onClose={() => setRatingVisible(false)}
  onRated={() => {handleStatusSearch();
    setRatingVisible(false);//showmessage?
   }}
/>
      <UploadDialog
  visible={uploadVisible}
  id_item={selectedId ? String(selectedId) : undefined}
  onClose={() => setUploadVisible(false)}
  onUploaded={() => {handleStatusSearch();
    setUploadVisible(false);
   }}
/>
      <DownloadDialog
  visible={downloadVisible}
  id_item={selectedId || 0}
  onClose={() => setDownloadVisible(false)}
  onDownloaded={() => {setDownloadVisible(false);}}/>
  <MessageDialog/>
</>
  );
}


