import { FlatList, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/styles";
import * as StApi from "@/services/adminTasks"
import { useState } from "react";
import {
  ItemDetails,
  ItemDetailsDialog,
} from "@/components//StatusScreen/ItemDetailsDialog";
import { getDetails } from "@/services/statusApi";

const buttonColor = "#2d4941";

type StatusListProps = {
  database: StApi.FormattedStatusItem[];
  onPressUpload?: (id: number) => void ;
  onPressDownload?: (id: number) => void;
  onPressSubmit?: (id: number) => void;
  onPressAccept?: (id: number) => void;
  onPressStart?: (id: number) => void;
  onPressReject?: (id: number) => void;
  refresh?: () => void;
};

export function StatusList({
  database,
  onPressUpload,
  onPressSubmit,
  onPressAccept,
  onPressReject,
  onPressStart,
  onPressDownload,
  refresh
}: StatusListProps)  {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

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

  const filteredDatabase =
    selectedIcon === null
      ? database
      : database.filter(item => item.icon === selectedIcon);

  const filters = [
  { icon: "upload", material: "file-upload", },      
  { icon: "alert", material: "warning", },
  { icon: "ok", material: "check-circle",},       
  { icon: "waiting", material: "hourglass-empty", }, 
  { icon: "download", material: "file-download", },  
  { icon: "star", material: "star",},              
] as const;
  
  return (<>
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
            <Pressable
                style={styles.smallButton}
                onPress={() => handleDetailsPress(item.id)}>
             <MaterialIcons
               name="search"
              size={18}
               color={buttonColor}
             />
            </Pressable>
          </View>
          </View>
        
      )}
    />
    </View>
    <ItemDetailsDialog
  isAdmin={true}
  visible={detailsVisible}
  item={selectedItem}
  loading={loadingDetails}
  onClose={() => {
    setDetailsVisible(false);
    setSelectedItem(null);
    refresh?.();
  }}
  refresh={() => {handleDetailsPress(Number(selectedItem?.id_item))}}
/>
</>       
  );
}