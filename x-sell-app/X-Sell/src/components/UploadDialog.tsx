import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { handleReupload, handleUpload, pickDocument } from "@/services/fileMgmt";
import { handleAdminUpload } from "@/services/adminTasks";
import { styles } from "@/styles/styles";
import { useMessageDialog } from "@/hooks/useMessageDialog";

type UploadDialogProps = {
  admin?: boolean;
  visible: boolean;
  id_item?: string;
  onClose: () => void;
  onUploaded: () => void;
};

export function UploadDialog({
  admin,
  visible,
  id_item,
  onClose,
  onUploaded,
}: UploadDialogProps) {

  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const isReupload = !!id_item;

  const {showMessage, MessageDialog} = useMessageDialog();

  async function submitUpload() {
    if (!document) return;

    setIsUploading(true);
    let response;
    if (!admin) {
    response = isReupload
      ? await handleReupload(document, id_item)
      : await handleUpload(document);
    } else if (id_item) {
    response = await handleAdminUpload(document, id_item);
    }
    setIsUploading(false);
    setDocument(null);
    if (response) {
    showMessage({message : response.message,
            msgType: response.msgType,
            afterDialog: response.success ? onUploaded: undefined });
    }}
  
  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>
            {!admin ? isReupload ? "Reenviar documento" : "Subir documento": "Subir documento"}
          </Text>

          <Pressable
            style={styles.button}
            onPress={async () => {
              const result = await pickDocument(); // message?
              setDocument(result);
            }}
          >
            <Text style={styles.buttonText}>
              { !admin ? isReupload ? "Selecionar novo documento" : "Selecionar documento": "Selecionar documento"}
            </Text>
          </Pressable>

          {document && (
            <>
              <Text style={styles.fileName}>{document.name}</Text>

              <Pressable style={styles.button} onPress={() => setDocument(null)}>
                <Text style={styles.buttonText}>
                  {!admin ? isReupload ? "Cancelar Reenvio" : "Cancelar Envio": "Cancelar Envio"}
                </Text>
              </Pressable>

              <Pressable style={styles.button} onPress={submitUpload}
              disabled={isUploading}>
                <Text style={styles.buttonText}>
                  {isUploading ? "Enviando..." : !admin ? isReupload ? "Fazer Reupload" : "Fazer Upload": "Fazer Upload"}
                </Text>
              </Pressable>
            </>
          )}

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelBText}>Fechar</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
    <MessageDialog/>
    </>
  );
}
