import { useAuth } from "@/contexts/AuthContext";
import { handleReupload, handleUpload, pickDocument } from "@/services/fileMgmt";
import { styles } from "@/styles/styles";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { MessageDialog } from "./MessageDialog";

type UploadDialogProps = {
  visible: boolean;
  id_item?: string;
  onClose: () => void;
  onUploaded: () => void;
};

export function UploadDialog({
  visible,
  id_item,
  onClose,
  onUploaded,
}: UploadDialogProps) {
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isMsgVisible, setMsgVisible] = useState(false);
  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
   const [afterDialog, setAfterDialog] = useState<(() => void) | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { token } = useAuth();
  const isReupload = !!id_item;

  async function submitUpload() {
    if (!document) return;

    setIsUploading(true);
    
    const response = isReupload
      ? await handleReupload(document, id_item, token)
      : await handleUpload(document,token);

    setIsUploading(false);

    setMessage(String(response.message));
    setMsgType(String(response.msgType));

    if (response.success) {
      setDocument(null);
      setAfterDialog(() => () => {
        onUploaded();
        });
        setMsgVisible(true);
    } else {
      setMsgVisible(true);
      setAfterDialog(null);
    }
    }
  
  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>
            {isReupload ? "Reenviar tabela" : "Subir tabela"}
          </Text>

          <Pressable
            style={styles.button}
            onPress={async () => {
              setMessage("");
              const result = await pickDocument();
              setDocument(result);
            }}
          >
            <Text style={styles.buttonText}>
              {isReupload ? "Selecionar novo documento" : "Selecionar documento"}
            </Text>
          </Pressable>

          {document && (
            <>
              <Text style={styles.fileName}>{document.name}</Text>

              <Pressable style={styles.button} onPress={() => setDocument(null)}>
                <Text style={styles.buttonText}>
                  {isReupload ? "Cancelar Reenvio" : "Cancelar Envio"}
                </Text>
              </Pressable>

              <Pressable style={styles.button} onPress={submitUpload}
              disabled={isUploading}>
                <Text style={styles.buttonText}>
                  {isUploading ? "Enviando..." : isReupload ? "Fazer Reupload" : "Fazer Upload"}
                </Text>
              </Pressable>
            </>
          )}

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
