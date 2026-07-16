// funções de upload e download
import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker"
import { File, Paths} from "expo-file-system";
import * as Sharing from "expo-sharing";

import { authFetch } from "./jwtHandling";

const localIP = process.env.EXPO_PUBLIC_XSELL_SERVER_URL;

export async function handleUpload(document: DocumentPicker.DocumentPickerAsset | null, token?: string) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado.", msgType: "info" };
  }
  
  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);
  
    const response = await authFetch(localIP + '/upload', {
      method: "POST",
      headers: token ? { Authorization: token } : undefined,
      body: formData,
    });

    return response.json();

  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err instanceof Error ? err.message: err,
      msgType: "error"
    };
  }
    }

export async function handleReupload(document: DocumentPicker.DocumentPickerAsset | null, id_item: string, token?: string) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado.", msgType: "info" };
  }

  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);
    formData.append("id_item", id_item ?? "-1");

    const response = await authFetch(localIP + '/reupload', {
      method: "POST",
      headers: token ? { Authorization: token } : undefined,
      body: formData,
    });

    return response.json();
  } catch (err) {
    //console.log(err);
    return {
      success: false,
      message: err instanceof Error ? err.message: err,
      msgType: "error"
    };
  }
    }

type pickerResult = {
  document?: DocumentPicker.DocumentPickerAsset;
  success: boolean;
  message: string;
}
    
export async function pickDocument(): Promise<pickerResult> { 
  const typesAllowed = [
        "text/csv",
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      ]
  const allowedExtensions = [".csv", ".xls", ".xlsx"];
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: typesAllowed, // all files
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        const document = result.assets[0];

    const hasAllowedExtension = allowedExtensions.some((extension) =>
      document.name.toLowerCase().endsWith(extension)
    );

    const hasAllowedMimeType =
      !document.mimeType || typesAllowed.includes(document.mimeType);

    if (!hasAllowedExtension || !hasAllowedMimeType) {return {success: false, message: "Selecione uma planilha"}}
        return {document, success: true, message: ""}
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
    return { success: false, message: "Nenhuma planilha selecionada."}
}

export async function handleDownload(protocol: number, token?: string) {
  try {
    const response = await authFetch(localIP + '/download', {
      method: "POST",
      headers: token? { "Content-Type": "application/json" , "Authorization":  token} : { "Content-Type": "application/json" },
      body: JSON.stringify({ id_item: protocol }),
    });

    if (!response.ok) { return {success: false, message: "Erro ao acessar o arquivo.", msgType: "error", fileName:""}}
    //console.log(`Headers: ${[...response.headers.entries()]}`);

   if (Platform.OS === "web") {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const disposition = response.headers.get("Content-Disposition");

let fileName = "";

if (disposition) {
  const utf8 = disposition.match(/filename\*=UTF-8''([^;]+)/);

  if (utf8) {
    fileName = decodeURIComponent(utf8[1]);
  } else {
    const ascii = disposition.match(/filename="?([^"]+)"?/);
    if (ascii) fileName = ascii[1];
  }
}
  
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName||`untitled`;
    a.click();

    URL.revokeObjectURL(url);
    return {success: true, message: "Download teve sucesso.", msgType: "success", fileName};
  }
  const disposition = response.headers.get("Content-Disposition");
  let fileName = "";

if (disposition) {
  const utf8 = disposition.match(/filename\*=UTF-8''([^;]+)/);

  if (utf8) {
    fileName = decodeURIComponent(utf8[1]);
  } else {
    const ascii = disposition.match(/filename="?([^"]+)"?/);
    if (ascii) fileName = ascii[1];
  }
}
  const bytes = await response.bytes();
   

  const file = new File(Paths.cache, fileName||`untitled`);

    file.create({
  intermediates: true,
  overwrite: true,
    });

    file.write(bytes);

    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri);
        }
  return {success: true, message: "Download teve sucesso.", msgType: "success", fileName};
} catch (err) {
    //console.log(err);
    return {
      success: false,
      message: err instanceof Error ? err.message : String(err),
      msgType: "error"
    };
  }
}
