// funções de upload e download
import * as DocumentPicker from "expo-document-picker"
import { Platform } from "react-native";
import { File, Paths} from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Int32 } from "react-native/Libraries/Types/CodegenTypesNamespace";

export async function handleUpload(document: DocumentPicker.DocumentPickerAsset | null, username: string | null) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado." };
  }

  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);
    formData.append("username", username ?? "none");

    const response = await fetch("http://192.168.15.89:3000/upload", {
      method: "POST",

      body: formData,
    });

    const text = await response.text();

    return {
      success: response.ok,
      message: text,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Erro ao conectar com o servidor.",
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

export async function handleDownload(protocol: Int32) {
    const response = await fetch("http://192.168.15.89:3000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ protocol: protocol }),
    });

    if (!response.ok) { return {success: false, message: "Erro ao acessar o arquivo."}}

    const fileName = "output.csv";   

   if (Platform.OS === "web") {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
    return {success: true, message: "Download teve sucesso."};
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
  return {success: true, message: "Download teve sucesso."};
}
