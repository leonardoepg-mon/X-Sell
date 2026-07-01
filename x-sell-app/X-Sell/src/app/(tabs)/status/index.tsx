import { useAuth } from "@/contexts/AuthContext";
import * as StApi from "@/services/statusApi";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { StatusList } from "@/components/status";
//Explicações

export default function Index() {
  const { username } = useAuth();
  const [showStatus, setShowStatus] = useState(false);
  const [database, setDb] = useState<StApi.FormattedStatusItem[]>([]);
  const router = useRouter();

  async function handleStatusSearch() {
    const response = await StApi.statusSearch(username);
        if (response.success) {
          setDb(response.dbProcessed);
          setShowStatus(true);
        }
        else {
      console.log(response.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text> Status de requisições </Text>
      {!showStatus && (
        <Pressable style={styles.button} onPress={handleStatusSearch }>
        <Text selectable={false} style={styles.buttonText}>
            Ver requisição
          </Text>
        </Pressable>
      )}
      {showStatus && <StatusList database={database} />}
      <View style={styles.buttonRow}>
  <Pressable
    style={styles.button}
    onPress={() => router.navigate("/(tabs)/feed/upload")}
  >
    <Text selectable={false} style={styles.buttonText}>
      Nova requisição
    </Text>
  </Pressable>

  {showStatus && (
    <Pressable
      style={styles.button}
      onPress={handleStatusSearch}
    >
      <Text selectable={false} style={styles.buttonText}>
        Atualizar
      </Text>
    </Pressable>
  )}
</View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404080",
  },
  input: {
    borderWidth: 2,
    backgroundColor: "#FFF",
    borderColor: "#abcfdf"
  },
  buttonText: {
    fontStyle: "italic",
    color: "#11a1b3"
  },
  button: {
    backgroundColor: '#ab0fab',
    borderWidth: 1,
    borderRadius:5,
  },
  buttonRow: {
  flexDirection: "row",
  gap: 10,          // Se não funcionar na sua versão do React Native, use marginHorizontal nos botões
  marginTop: 20,
},
});
