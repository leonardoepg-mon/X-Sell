import { useAuth } from "@/contexts/AuthContext";
import { handleReupload, handleUpload, pickDocument } from "@/services/fileMgmt";
import { styles } from "@/styles/styles";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

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
  const [error, setError] = useState("");
  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const { username } = useAuth();
  const isReupload = !!id_item;

  async function submitUpload() {
    if (!document) return;

    const response = isReupload
      ? await handleReupload(document, id_item)
      : await handleUpload(document, username);

    setError(String(response.message));

    if (response.success) {
      setDocument(null);
      onUploaded();
      onClose();
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>
            {isReupload ? "Reenviar tabela" : "Subir tabela"}
          </Text>

          <Pressable
            style={styles.button}
            onPress={async () => {
              setError("");
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

              <Pressable style={styles.button} onPress={submitUpload}>
                <Text style={styles.buttonText}>
                  {isReupload ? "Fazer Reupload" : "Fazer Upload"}
                </Text>
              </Pressable>
            </>
          )}

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text>Fechar</Text>
          </Pressable>

          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </Modal>
  );
}
