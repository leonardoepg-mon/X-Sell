import { FlatList, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/styles";
import { useState } from "react";


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
  onPressRating: (id: number, rated: boolean) => void;
  onPressDownload: (id: number) => void;
};

export function StatusList({
  database,
  onPressReupload,
  onPressRating,
  onPressDownload
}: StatusListProps)  {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const filteredDatabase =
    selectedIcon === null
      ? database
      : database.filter(item => item.icon === selectedIcon);

  const filters = [
  { icon: "upload", material: "file-upload" },      // status 0
  { icon: "alert", material: "warning" },           // status -1
  { icon: "waiting", material: "hourglass-empty" }, // status 1
  { icon: "ok", material: "check-circle" },         // status 2
  { icon: "download", material: "file-download" },  // status 3
  { icon: "star", material: "star" },               // status 4
] as const;


  
  return (
    <View style={{flex:1}}>
      <View style={styles.filterRow}>
  <Pressable onPress={() => setSelectedIcon(null)}>
    <MaterialIcons name="list" 
                   size={22} 
                   color={!selectedIcon ? "#d35cd3" : "#e1e1e1"} />
  </Pressable>

  {filters.map(filter => (
    <Pressable
      key={filter.icon}
      onPress={() => setSelectedIcon(filter.icon)}
    >
      <MaterialIcons
        name={filter.material}
        size={22}
        color={selectedIcon == filter.icon ? "#d35cd3" : "#e1e1e1"}

      />
    </Pressable>
  ))}
</View>
    <FlatList
      data={filteredDatabase}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.left}>
            <View style={styles.titleRow}>
              <Text style={styles.id}>{item.id}</Text>
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
              color="#d35cd3"
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
              <Pressable style={styles.smallButton}  onPress={ () => {onPressRating(item.id, item.icon=="star");
              } }>
                <Text style={styles.buttonText}>{(item.icon == "star") ? "Mudar avaliação": "Avaliar"}</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    />
    </View>       
  );
}
