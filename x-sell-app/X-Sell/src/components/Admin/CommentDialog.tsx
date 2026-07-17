import { statusSet } from "@/services/adminTasks";
import { styles} from "@/styles/styles";
import {  useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type CommentDialogProps = {
  visible: boolean;
  id_item: number;
  onClose: () => void;
  onSend: () => void;
};

export function CommentDialog({
  visible,
  id_item,
  onClose,
  onSend,
}: CommentDialogProps) {
  const [comment, setComment] = useState("");
  
  async function submitComment() {
    await statusSet(id_item,-1, comment); //incluir review
    onSend();
    onClose();
    setComment("");
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}> Explique a rejeição</Text>
          <View style={styles.formField}>
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical={"top"}
                  onChangeText={setComment}
                  style={[styles.registerInput, styles.registerTextArea]}
                />
              </View>
          <View style={styles.buttonRow}>
            <Pressable style={styles.sendButton} onPress={submitComment} disabled={comment==""}> 
              <Text style={styles.sendText}>Enviar</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelBText}>Cancelar</Text>
            </Pressable>
          </View>
          </View>
        </View>
    </Modal>
  );
}
