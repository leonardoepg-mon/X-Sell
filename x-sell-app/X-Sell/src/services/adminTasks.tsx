import { authFetch } from "./jwtHandling";
import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker"
import { File, Paths} from "expo-file-system";
import * as Sharing from "expo-sharing";
import { MsgType } from "@/hooks/useMessageDialog";

const localIP = process.env.EXPO_PUBLIC_XSELL_SERVER_URL;

type StatusCode = -1 | 0 | 1 | 2 | 3 | 4;

type Avaliacao = -1 | 0 | 1 | 2 | 3 | 4 | 5;

type StatusItem = { 
  id: number;
  status: StatusCode;
  avaliacao: Avaliacao;
  inputName: string;
  outputName: string;
  data_envio: string;
  data_aceito: string;
  data_concluido: string;
  data_avaliado: string;
};

type StandardResponse = {
  success: boolean;
  message: string | "";
  msgType: MsgType;
}

export type FormattedStatusItem = {
  id: number;
  message: string;
  icon: "upload" | "ok" | "alert" | "waiting" | "download" | "star";
  showUploadButton: boolean;
  showDownloadButton: boolean;
  showAcceptButton: boolean;
  showSubmitButton: boolean,
  showRatingButton: boolean,
  showStartButton: boolean,
  rating?: number;
  stamps: string[];
};

export function formatItem(item: StatusItem): FormattedStatusItem {
  switch (item.status) {
    case 0:
      return {
        id: item.id,
        message: "Enviado",
        icon: "upload",
        showUploadButton: false,
        showDownloadButton: true,
        showAcceptButton: true,
        showSubmitButton: false,
        showRatingButton: false,
        showStartButton: false,
        stamps: [item.data_envio]
      };

    case 1:
      return {
        id: item.id,
        message: "Aprovado",
        icon: "ok",
        showUploadButton: false,
        showDownloadButton: true,
        showSubmitButton: false,
        showStartButton: true,
        showAcceptButton: false,
        showRatingButton: false,
        stamps: [item.data_envio, item.data_aceito]
      };

    case -1:
      return {
        id: item.id,
        message: "Reprovado",
        icon: "alert",
        showUploadButton: false,
        showDownloadButton: false,
        showSubmitButton: false,
        showAcceptButton: false,
        showStartButton: false,
        showRatingButton: false,
        stamps: [item.data_envio]
      };

    case 2:
      return {
        id: item.id,
        message: "Em análise",
        icon: "waiting",
        showUploadButton: true,
        showDownloadButton: true,
        showSubmitButton: true,
        showAcceptButton: false,
        showStartButton: false,
        showRatingButton: false,
        stamps: [item.data_envio, item.data_aceito],
      };

    case 3:
      return {
        id: item.id,
        message: "Concluído",
        icon: "download",
        showUploadButton: false,
        showDownloadButton: false,
        showSubmitButton: false,
        showStartButton: false,
        showAcceptButton: false,
        showRatingButton: false,
        stamps: [item.data_envio, item.data_aceito, item.data_concluido]
      };

    case 4:
      return {
        id: item.id,
        message: "Avaliado",
        icon: "star",
        showUploadButton: false,
        showDownloadButton: false,
        showAcceptButton: false,
        showStartButton: false,
        showSubmitButton: false,
        showRatingButton: true,
        stamps: [item.data_envio, item.data_aceito, item.data_concluido, item.data_avaliado],
      };
      default:
  return {
    id: item.id,
    message: "Status desconhecido",
    icon: "alert",
    showUploadButton: false,
    showDownloadButton: false,
    showStartButton: false,
    showAcceptButton: true,
    showSubmitButton: false,
    showRatingButton: true,
    stamps: [],
  };
  }
}

export async function statusSearch() {
  try {
    const response = await authFetch(localIP + '/status', {
      method: "GET",
    });
    //console.log("requisição de status por ", username);

    const {success, message, msgType, database} = await response.json();
    //console.log(database);
    const dbProcessed = database.map((item: any) =>
    formatItem({
    id: Number(item.id_item),
    status: Number(item.status) as StatusCode,
    avaliacao: Number(item.avaliacao) as Avaliacao,
    inputName: item.inputName,
    outputName: item.outputName,
    data_envio: item.data_envio,
    data_aceito: item.data_aceito,
    data_concluido: item.data_concluido,
    data_avaliado: item.data_avaliado,
    }));
    //console.log(dbProcessed);
    if (success) {
      return { success, message, msgType, dbProcessed };
    }

    return { success, message, msgType };
  } catch (err) {
    //console.log("error aqui", err); ///// Está saindo aqui
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error" };
  }
}

export async function handleAdminUpload(document: DocumentPicker.DocumentPickerAsset | null, id_item: string, isReport: boolean=false) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado.", msgType: "info" };
  }
  
  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);
    formData.append("id_item", id_item ?? "-1");
    if (isReport) {formData.append("isReport", "true");}

    const response = await authFetch(localIP + '/admin/upload', {
      method: "POST",
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

type pickerResult = {
  document?: DocumentPicker.DocumentPickerAsset;
  success: boolean;
  message: string;
}

export async function pickDocumentFree(): Promise<pickerResult> { 
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        const document = result.assets[0];
        return {document, success: true, message: ""}
      }
    } catch (err) {
      console.log("Erro escolhendo arquivo:", err);
    }
    return { success: false, message: "Nenhum arquivo selecionado."}
}

type HandlerResults = {
  success: boolean;
  message: string;
  msgType: MsgType;
  fileName?: string;
}

export async function handleDownload(id_item?: number): Promise<HandlerResults> {
  try {
    const response = await authFetch(localIP + '/admin/download', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_item: id_item }),
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

export async function statusSet(id_item: number, statusTo: number, comment?:  string) {
  try {
    const response = await authFetch(localIP + '/admin/status', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_item: id_item , statusTo: statusTo, comment}),
    });
    //console.log("requisição de status por ", username);

    const {success, message, msgType} = await response.json();
    //console.log(database);
    //console.log(dbProcessed);
    if (success) {
      return { success, message, msgType };
    }

    return { success, message, msgType };
  } catch (err) {
    //console.log("error aqui", err); ///// Está saindo aqui
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error" };
  }
}

export async function setAdmin(id: Number, setTo: boolean): Promise<StandardResponse> {

  try {
    const response = await authFetch(localIP + '/admin/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, setTo }),
    });

    const data = await response.json();
    return data;

  } catch (err) {
    console.log(err);
    return { success: false, message: String(err instanceof Error ? err.message : err), msgType: "error" };
  }
}

export type UserDetails = {
  id: number;
  nomeContato: string;
  admin: boolean;
};

type seeUsersRes = {
  success: boolean;
  message?: string | "";
  msgType?: MsgType;
  data?: UserDetails[];
}

export async function seeUsers() : Promise<seeUsersRes> {
  try {
    const response = await authFetch(localIP + '/admin/users', {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    return {success: true, data};

  } catch (err) {
    console.log(err);
    return { success: false, message: String(err instanceof Error ? err.message : err ), msgType: "error" };
  }
}


