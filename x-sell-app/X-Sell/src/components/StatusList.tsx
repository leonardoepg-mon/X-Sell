import { FlatList, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/styles";
import { useAuth } from "@/contexts/AuthContext";


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

type StatusListProps = {
  database: FormattedStatusItem[];
  onPressReupload: (id: number) => void;
  onPressRating: (id: number) => void;
  onPressDownload: (id: number) => void;
};

export function StatusList({
  database,
  onPressReupload,
  onPressRating,
  onPressDownload
}: StatusListProps)  {
  const {token} = useAuth();
  return (
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
              <Pressable style={styles.smallButton} onPress={ () => onPressReupload(item.id) }> 
                <Text style={styles.buttonText}>Reenviar</Text>
              </Pressable>
            )}

            {item.showDownloadButton && (
              <Pressable style={styles.smallButton} onPress={ async () => onPressDownload(item.id) }>
                <Text style={styles.buttonText}>Download</Text>
              </Pressable>
            )}

            {item.showRatingButton && (
              <Pressable style={styles.smallButton}  onPress={ () => onPressRating(item.id) }>
                <Text style={styles.buttonText}>Avaliar</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    />       
  );
}
