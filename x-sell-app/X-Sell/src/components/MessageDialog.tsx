import { styles } from "@/styles/styles";
import { Modal, Pressable, Text, View } from "react-native";

type MessageDialogProps = {
  visible: boolean;
  messageType: string;
  message: string;
  onOK: () => void;
};

export function MessageDialog({
  visible,
  messageType,
  message,
  onOK,
}: MessageDialogProps) {

function handleMsgStyle() {
  switch (messageType) {
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={handleMsgStyle()}>{message}</Text>

          <View style={styles.button}>
            <Pressable style={styles.cancelButton} onPress={onOK}>
              <Text>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
