import { Modal, Pressable, Text, View } from "react-native";

import { handleDownload } from "@/services/fileMgmt";
import { MsgType, useMessageDialog } from "@/hooks/useMessageDialog";

import { styles } from "@/styles/styles";

type DownloadDialogProps = {
  visible: boolean;
  id_item?: number;
  onClose: () => void;
  onDownloaded: () => void;
};

export function DownloadDialog({
  visible,
  id_item,
  onClose,
  onDownloaded,
}: DownloadDialogProps) {
  const {showMessage, MessageDialog} = useMessageDialog();

  async function confirmDownload() {   
    const response = await handleDownload(id_item ?? 0);
          showMessage({message : response.message,
            msgType: response.msgType as MsgType,
            afterDialog: response.success 
              ? () => {
                  onDownloaded();
                  onClose();
                  }
              : undefined});
          }
      
  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          

              <Pressable style={styles.button} onPress={confirmDownload}>
                <Text style={styles.buttonText}>
                  Baixar
                </Text>
              </Pressable>
          

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text>Fechar</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
    <MessageDialog/>
    </>
  );
}
