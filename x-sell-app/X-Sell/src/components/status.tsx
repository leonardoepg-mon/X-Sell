import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { handleDownload} from "@/services/fileMgmt";
import { useState } from "react";
import { useRouter } from "expo-router";
import { RatingDialog } from "./RatingDialog";


type FormattedStatusItem = {
  id: number;
  message: string;
  icon: "upload" | "ok" | "alert" | "waiting" | "download" | "star";
  showReuploadButton: boolean;
  showDownloadButton: boolean;
  showRatingButton: boolean;
  rating?: number;
};

function getStatusIcon(icon: string) {
  switch (icon) {
    case "upload":
      return "file-upload";
    case "ok":
      return "check-circle";
    case "alert":
      return "warning";
    case "waiting":
      return "hourglass-empty";
    case "download":
      return "file-download";
    case "star":
      return "star";
    default:
      return "help";
  }
}

export function StatusList({ database }: { database: FormattedStatusItem[] }) {
  const router = useRouter();
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <>
    <FlatList
      data={database}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.left}>
            <View style={styles.titleRow}>
              <Text style={styles.id}>#{item.id}</Text>
              <Text style={styles.status}>{item.message}</Text>
            </View>

            {item.rating !== undefined && (
              <Text style={styles.message}>Avaliação: {item.rating}/5</Text>
            )}
          </View>

          <View style={styles.right}>
            <MaterialIcons
              name={getStatusIcon(item.icon)}
              size={24}
              color="#404080"
            />

            {item.showReuploadButton && (
              <Pressable style={styles.smallButton} onPress={() => {router.navigate({
  pathname: "/(tabs)/feed/upload",
  params: { id_item: item.id },
}); }}> 
                <Text style={styles.buttonText}>Reenviar</Text>
              </Pressable>
            )}

            {item.showDownloadButton && (
              <Pressable style={styles.smallButton} onPress={() => { handleDownload(item.id)}}>
                <Text style={styles.buttonText}>Download</Text>
              </Pressable>
            )}

            {item.showRatingButton && (
              <Pressable style={styles.smallButton}  onPress={()=>{
          setSelectedId(item.id);
          setRatingVisible(true);
            }}>
                <Text style={styles.buttonText}>Avaliar</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    />
 
          <RatingDialog
  visible={ratingVisible}
  id_item={selectedId ?? 0}
  onClose={() => setRatingVisible(false)}
  onRated={() => {}}
/>
</>
        
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    width: "100%",
    minHeight: 70,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  id: {
    fontSize: 14,
    fontWeight: "bold",
  },

  status: {
    fontSize: 14,
  },

  message: {
    marginTop: 6,
    fontSize: 13,
    color: "#555",
  },

  right: {
    alignItems: "flex-end",
    gap: 6,
  },

  smallButton: {
    backgroundColor: "#ab0fab",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 80,
  },

  buttonText: {
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 12,
  },
});