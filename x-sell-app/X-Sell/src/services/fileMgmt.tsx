// funções de upload e download
import * as DocumentPicker from "expo-document-picker"
import { Platform } from "react-native";
import { File, Paths} from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Int32 } from "react-native/Libraries/Types/CodegenTypesNamespace";
const localIP = process.env.EXPO_PUBLIC_SERVER_URL;

export async function handleUpload(document: DocumentPicker.DocumentPickerAsset | null, token: string) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado.", msgType: "info" };
  }

  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);

    const response = await fetch(localIP + ':3000/upload', {
      method: "POST",
      headers: {"Authorization": token},
      body: formData,
    });

    return response.json();

  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Erro ao conectar com o servidor.",
      msgType: "error"
    };
  }
    }

export async function handleReupload(document: DocumentPicker.DocumentPickerAsset | null, id_item: string, token: string) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado.", msgType: "info" };
  }

  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);
    formData.append("id_item", id_item ?? "-1");

    const response = await fetch(localIP + ':3000/reupload', {
      method: "POST",
      headers: {"Authorization": token},
      body: formData,
    });

    return response.json();
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Erro ao conectar com o servidor.",
      msgType: "error"
    };
  }
    }

export async function pickDocument() { 
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        return result.assets[0]
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
    return null
}

export async function handleDownload(protocol: Int32, token: string) {
    const response = await fetch(localIP + ':3000/download', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": token },
      body: JSON.stringify({ protocol: protocol }),
    });

    if (!response.ok) { return {success: false, message: "Erro ao acessar o arquivo.", msgType: "error", fileName:""}}

    const {fileName} = await response.json(); 

   if (Platform.OS === "web") {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
    return {success: true, message: "Download teve sucesso.", msgType: "success", fileName};
  }

  const bytes = await response.bytes();

  const file = new File(Paths.cache, fileName);

    file.create({
  intermediates: true,
  overwrite: true,
    });

    file.write(bytes);

    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri);
        }
  return {success: true, message: "Download teve sucesso.", msgType: "success", fileName};
}
