import { useAuth } from "@/contexts/AuthContext";
import * as StApi from "@/services/statusApi";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { StatusList } from "@/components/StatusList";
import { RatingDialog } from "@/components/RatingDialog";
import { UploadDialog } from "@/components/UploadDialog";
import { DownloadDialog } from "@/components/DownloadDialog";
import { styles } from "@/styles/styles";

export default function StatusScreen() {
  const {token} = useAuth(); // token para requisições
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  async function handleStatusSearch() {
    //console.log(token);
    const response = await StApi.statusSearch(token);
    
    if (response.success) {
      setDb(response.dbProcessed);
      setShowStatus(true);
    } else {
      console.log(response.message);
    }
    }
  function showRatingDialog(id: number) {
          setSelectedId(id);
          setRatingVisible(true);
  }
  function showReuploadDialog(id: number) {
    setSelectedId(id);
setUploadVisible(true); 
  }

  function showDownloadDialog(id: number) {
    setSelectedId(id);
          setDownloadVisible(true);
  }


  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}> Tela de Status </Text>
      {!showStatus && (
        <Pressable style={styles.button} onPress={handleStatusSearch }>
        <Text selectable={false} style={styles.buttonText}>
            Ver solicitações
          </Text>
        </Pressable>
      )}
      {showStatus && <StatusList database={database}
                                  onPressRating={showRatingDialog}
                                  onPressReupload={showReuploadDialog}
                                  onPressDownload= {showDownloadDialog}/>}
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
    setRatingVisible(false);
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
</>
  );
}


