import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "@/styles/styles";

type DownloadDialogProps = {
  visible: boolean;
  fileName?: string;
  processId?: number;
  onPressDownload: (id?:number) => void;
  onClose: () => void;
};

export function DownloadDialog({
  visible,
  fileName,
  processId,
  onPressDownload,
  onClose,
}: DownloadDialogProps) {

  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.boxContainerSmall}>
          
              <Text style={styles.fileName}>{fileName}</Text>
              
              <Pressable style={styles.button} onPress={ () => onPressDownload(processId)}>
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
