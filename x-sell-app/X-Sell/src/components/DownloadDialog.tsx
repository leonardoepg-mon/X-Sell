import { useAuth } from "@/contexts/AuthContext";
import { handleDownload } from "@/services/fileMgmt";
import { styles } from "@/styles/styles";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { MessageDialog } from "./MessageDialog";

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
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isMsgVisible, setMsgVisible] = useState(false);
  const { token } = useAuth();
  const [afterDialog, setAfterDialog] = useState<(() => void) | null>(null);


  async function confirmDownload() {   
    const response = await handleDownload(id_item ?? 0, token);
    
    setMessage(String(response.message));
    setMsgType(String(response.msgType));
    if (response.success) { setAfterDialog(() => () => {
                  onDownloaded();
                  onClose();
                  });
                  } else {
                      setAfterDialog(null);
                    }
                    setMsgVisible(true);
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
