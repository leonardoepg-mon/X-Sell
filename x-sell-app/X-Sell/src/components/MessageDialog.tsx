import { styles } from "@/styles/styles";
import { Modal, Pressable, Text, View } from "react-native";

type MessageDialogProps = {
  visible: boolean;
  msgType: string;
  message: string;
  onOK: () => void;
};

export function MessageDialog({
  visible,
  msgType,
  message,
  onOK,
}: MessageDialogProps) {

function handleMsgStyle() {
  switch (msgType) {
    case "success":
      return styles.successMessage;

    case "error":
      return styles.errorMessage;

    case "warning":
      return styles.warningMessage;

    case "info":
      return styles.infoMessage;

    default:
      return styles.message;
  }
}
  //console.log(message);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.boxContainer}>
          <Text style={handleMsgStyle()}>{message}</Text>

          <View>
            <Pressable style={styles.cancelButton} onPress={onOK}>
              <Text style={styles.cancelBText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
