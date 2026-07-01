import { useAuth } from "@/contexts/AuthContext";
import { handleReupload, handleUpload, pickDocument } from "@/services/fileMgmt";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable} from "react-native";

//Explicações
export default function UploadScreen() {
  const [error, setError] = useState("");
  const [document, setDocument] = useState<DocumentPicker.DocumentPickerAsset | null >(null);
  const {username} = useAuth();
  const { id_item } = useLocalSearchParams<{ id_item?: string }>();
  const isReupload = !!id_item;

  
  return (
    <View style={styles.container}>
      <Text> Subir tabela </Text>
      <Pressable style={styles.button} onPress={ async () => { setError("");
          const result = await pickDocument();
          setDocument(result);
          
      }} >
        {!isReupload && (<Text selectable={false} style={styles.buttonText} > Selecionar documento </Text>)}
        {isReupload && (<Text selectable={false} style={styles.buttonText} > Selecionar novo documento </Text>)}
      </Pressable>
      { document && ( <View style={styles.ghostContainer}>
        <Text style= {{color : "blue", fontStyle: "italic"}}> {document.name } </Text>
        <Pressable style={styles.button} onPress={() => {setDocument(null)}}>
        {!isReupload && (<Text selectable={false} style={styles.buttonText} > Cancelar Envio </Text>)}
        {isReupload && (<Text selectable={false} style={styles.buttonText} > Cancelar Reenvio </Text>)}
        </Pressable>
        <Pressable style={styles.button} onPress={async () => { if (!id_item) {const response = await handleUpload(document, username);
            if (response.success) {
              console.log(response.message);
              setError(response.message);
              setDocument(null);
            }
            else setError(response.message);
          }
          else {
            const response = await handleReupload(document, id_item);
            if (response.success) {
              console.log(response.message);
              setError(response.message);
              setDocument(null);
            }
            else setError(response.message);
          }
      }} >
        {!isReupload && (<Text selectable={false} style={styles.buttonText} > Fazer Upload </Text>)}
        {isReupload && (<Text selectable={false} style={styles.buttonText} > Fazer Reupload </Text>)}
      </Pressable>
        </View>
      )
      }
      <Text style={styles.errorText}> {error} </Text>
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
  ghostContainer: {
    alignItems: "center",
    backgroundColor: "#404080",
  },
  input: {
    borderWidth: 2,
    backgroundColor: "#FFF",
    borderColor: "#abcfdf"
  },
  buttonText: {
    fontStyle: "italic",
    color: "#11a1b3",
    justifyContent: "center",
    textAlign: "center"
  },
  errorText: {
    fontWeight: "bold",
    color: "#aa4444",
    fontSize: 20
  },
  button: {
    backgroundColor: '#ab0fab',
    borderWidth: 1,
    borderRadius:5,
    alignItems:"center"
  }
});
