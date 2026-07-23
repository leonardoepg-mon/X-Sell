import { getDetails, handleRating } from "@/services/statusApi";
import { styles, theme } from "@/styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type RatingDialogProps = {
  rated? : boolean;
  admin? : boolean;
  visible: boolean;
  id_item: number;
  onClose: () => void;
  onRated: () => void;
};

export function RatingDialog({
  admin,
  rated,
  visible,
  id_item,
  onClose,
  onRated,
}: RatingDialogProps) {
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReview] = useState("");
  const [reviewedText, setReviewed] = useState("");
  const [oldRating, setOldRating] = useState(0);
  
  async function submitRating() {
    if (rating === 0) return;

    await handleRating(id_item, rating, reviewText); //incluir review
    onRated();
    onClose();
    setRating(0);
  }

  useEffect( () => {
    async function getItemDetails(id_item:number) {
      const response = await getDetails(id_item);
      if (response.success) {
      setReviewed(response.item.texto_avaliacao);
      setOldRating(Number(response.item.avaliacao));
    } }
    if (id_item == 0 || !visible) return
    getItemDetails(id_item);
  }, [id_item, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.boxContainer}>
          { !rated && !admin &&
          <>
          <Text style={styles.title}>Avalie o resultado</Text>
          <View style={styles.formField}>
                <TextInput
                  placeholder={"Sua opinião é sempre bem-vinda!"}
                  placeholderTextColor={theme.colors.textOnPrimary}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical={"top"}
                  onChangeText={setReview}
                  style={[styles.registerInput, styles.registerTextArea]}
                />
              </View>
              <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable disabled= {admin} key={star} onPress={() => setRating(star)}>
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={theme.icons.md}
                  color={theme.colors.stars}
                />
              </Pressable>
            ))}
          </View>
            </>}
          
          { rated &&  !admin &&
            <>
            <Text style={styles.title}> Mude sua avaliação </Text>
            <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={theme.icons.md}
                  color={theme.colors.stars}
                />
              </Pressable>
            ))}
          </View>
          <View style={styles.formField}>
            <TextInput
                  placeholder={"Sua opinião é sempre bem-vinda!"}
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical={"top"}
                  onChangeText={setReview}
                  style={[styles.registerInput, styles.registerTextArea]}
                />
          </View> 
          <View style={styles.formField}>
            <Text
                  selectable={false}
                  style={[styles.oldTextInput, styles.oldTextArea]}>
                    {reviewedText}
              </Text>
              </View>
              <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
                <MaterialIcons
                  key={star}
                  name={star <= oldRating ? "star" : "star-border"}
                  size={theme.icons.md}
                  color={theme.colors.starsOld}
                />
            ))}
          </View>
          </>
          }

          <View style={styles.buttonRow}>          
            { !admin && rated &&
          <Pressable style={styles.sendButton} onPress={submitRating}>
              <Text style={styles.sendText}> Mudar Avaliação </Text>
              
            </Pressable>
          }
          { !admin && !rated &&<>
            <Pressable style={styles.sendButton} onPress={submitRating} disabled={rating <0  || rating>5}> 
              <Text style={styles.sendText}>Enviar</Text>
            </Pressable>
          </>
          }
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelBText}>Fechar</Text>
            </Pressable>
          </View>
          
        
        </View>
        </View>
    </Modal>
  );
}
