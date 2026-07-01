import { handleRating } from "@/services/statusApi";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

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

  async function submitRating() {
    if (rating === 0) return;

    await handleRating(id_item, rating);
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 280,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 18,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#ab0fab",
    padding: 10,
    borderRadius: 5,
  },
  sendText: {
    color: "#fff",
  },
});