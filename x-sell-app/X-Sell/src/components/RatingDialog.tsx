import { useAuth } from "@/contexts/AuthContext";
import { handleRating } from "@/services/statusApi";
import { styles } from "@/styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type RatingDialogProps = {
  visible: boolean;
  id_item: number;
  onClose: () => void;
  onRated: () => void;
};

export function RatingDialog({
  visible,
  id_item,
  onClose,
  onRated,
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const {token} = useAuth();
  
  async function submitRating() {
    if (rating === 0) return;

    await handleRating(id_item, rating, token);
    onRated();
    onClose();
    setRating(0);
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Avalie o resultado</Text>

          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={38}
                  color="#FFD700"
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.buttons}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.sendButton} onPress={submitRating}>
              <Text style={styles.sendText}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
