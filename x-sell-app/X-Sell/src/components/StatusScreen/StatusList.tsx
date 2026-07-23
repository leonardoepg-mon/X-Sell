import { FlatList, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, theme } from "@/styles/styles";
import { useState } from "react";
import {
  ItemDetails,
  ItemDetailsDialog,
} from "@/components/StatusScreen/ItemDetailsDialog";
import { getDetails } from "@/services/statusApi";
 

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
  onPressReupload?: (id: number) => void;
  onPressRating?: (id: number, rated: boolean) => void;
  onPressDownload?: (id: number) => void;
  refresh?: () => void;
};

export function StatusList({
  database,
  onPressReupload,
  onPressRating,
  onPressDownload,
  refresh
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

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  async function handleDetailsPress(id: number) {
  setSelectedItem(null);
  setLoadingDetails(true);
  setDetailsVisible(true);
  const response = await getDetails(id);

  if (response.success && response.item) {
    setSelectedItem(response.item);
  }
  setLoadingDetails(false);
}

  return <>
    <View style={styles.container}> 
      <View style={styles.filterRow}>
  <Pressable onPress={() => setSelectedIcon(null)}>
    <MaterialIcons name="list" 
                   size={theme.icons.lg}
                   color={!selectedIcon ? theme.colors.filterButtonInactive : theme.colors.filterButtonActive} />
  </Pressable>

  {filters.map(filter => (
    <Pressable
      key={filter.icon}
      onPress={() => setSelectedIcon(filter.icon)}
    >
      <MaterialIcons
        name={filter.material}
        size={theme.icons.lg}
        color={selectedIcon == filter.icon ? theme.colors.filterButtonInactive : theme.colors.filterButtonActive}
      />
    </Pressable>
  ))}
    </View>
    <FlatList
      data={filteredDatabase}
      style={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.left}>
            <View style={styles.titleRow}>
              <MaterialIcons
              name={getStatusIcon(item.icon)}
              size={theme.icons.lg}
              color={theme.colors.accent}
            />
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.status}>{item.message} {item.rating !== undefined && (
              <Text style={styles.message}>  {item.rating}/5</Text>
            )}</Text>
            </View>
          </View>

          <View style={styles.right}>
            <View style={styles.buttonColumn}>
            <View style={{...styles.buttonRow, justifyContent:"space-evenly"}}>
            
            <Pressable
                            style={styles.smallButton}
                            onPress={() => handleDetailsPress(item.id)}>
                         <MaterialIcons
                           name="search"
                           size={theme.icons.md}
                           color={theme.colors.iconButtonColor}
                         />
                        </Pressable>            
            </View>

            </View>
          </View>
        </View>
        
      )}
      
    />
    </View> 
    <ItemDetailsDialog
  visible={detailsVisible}
  item={selectedItem}
  loading={loadingDetails}
  onClose={() => {
    setDetailsVisible(false);
    refresh?.();
  }}
  refresh={() => {handleDetailsPress(Number(selectedItem?.id_item));
  }}
/> </>     
  
}
