import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "@/styles/styles";

type DownloadDialogProps = {
  visible: boolean;
  id_item?: number;
  onPressDownload: () => void;
  onClose: () => void;
  onDownloaded?: () => void;
};

export function DownloadDialog({
  visible,
  id_item,
  onPressDownload,
  onClose,
  onDownloaded,
}: DownloadDialogProps) {

  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          

              <Pressable style={styles.button} onPress={onPressDownload}>
                <Text style={styles.buttonText}>
                  Baixar
                </Text>
              </Pressable>
          

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelBText}>Fechar</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
    </>
  );
}
