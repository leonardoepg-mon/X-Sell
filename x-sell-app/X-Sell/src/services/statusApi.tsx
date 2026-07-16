import { authFetch } from "./jwtHandling";

const localIP = process.env.EXPO_PUBLIC_XSELL_SERVER_URL;

type StatusCode = -1 | 0 | 1 | 2 | 3 | 4;

type Avaliacao = -1 | 0 | 1 | 2 | 3 | 4 | 5;

type StatusItem = {
  id: number;
  status: StatusCode;
  avaliacao: Avaliacao;
  inputName: string;
  outputName: string;
};

export type FormattedStatusItem = {
  id: number;
  message: string;
  icon: "upload" | "ok" | "alert" | "waiting" | "download" | "star";
  showReuploadButton: boolean;
  showDownloadButton: boolean;
  showRatingButton: boolean;
  rating?: number;
};

export function formatStatusItem(item: StatusItem): FormattedStatusItem {
  switch (item.status) {
    case 0:
      return {
        id: item.id,
        message: "Enviado",
        icon: "upload",
        showReuploadButton: false,
        showDownloadButton: false,
        showRatingButton: false,
      };

    case 1:
      return {
        id: item.id,
        message: "Aprovado",
        icon: "ok",
        showReuploadButton: false,
        showDownloadButton: false,
        showRatingButton: false,
      };

    case -1:
      return {
        id: item.id,
        message: "Reprovado",
        icon: "alert",
        showReuploadButton: true,
        showDownloadButton: false,
        showRatingButton: false,
      };

    case 2:
      return {
        id: item.id,
        message: "Em análise",
        icon: "waiting",
        showReuploadButton: false,
        showDownloadButton: false,
        showRatingButton: false,
      };

    case 3:
      return {
        id: item.id,
        message: "Concluído",
        icon: "download",
        showReuploadButton: false,
        showDownloadButton: true,
        showRatingButton: true,
      };

    case 4:
      return {
        id: item.id,
        message: "Avaliado",
        icon: "star",
        showReuploadButton: false,
        showDownloadButton: true,
        showRatingButton: true,
        rating: item.avaliacao,
      };
      default:
  return {
    id: item.id,
    message: "Status desconhecido",
    icon: "alert",
    showReuploadButton: false,
    showDownloadButton: false,
    showRatingButton: false,
  };
  }
}

export async function statusSearch(token?: string) {
  try {
    const response = await authFetch(localIP + '/status', {
      method: "GET",
      headers: token ? { Authorization: token } : undefined,
    });
    //console.log("requisição de status por ", username);

    const {success, message, msgType, database} = await response.json();
    //console.log(database);
    const dbProcessed = database.map((item: any) =>
    formatStatusItem({
    id: Number(item.id_item),
    status: Number(item.status) as StatusCode,
    avaliacao: Number(item.avaliacao) as Avaliacao,
    inputName: item.inputName,
    outputName: item.outputName
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

export async function getDetails(id_item: number) {
  try {
    const response = await authFetch(localIP + '/details', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_item })
    });
    //console.log("requisição de status por ", username);

    const {success, message, msgType, item} = await response.json();
    //console.log(dbProcessed);
    if (success) {
    
      return { success, message, msgType, item };
    }
    return { success, message, msgType, item: null };
  } catch (err) {
    //console.log("error aqui", err); ///// Está saindo aqui
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error" };
  }
}

export async function handleRating(id_item: Number, rating: Number, reviewText: string = "", token?: string) {
  try {
    const response = await authFetch(localIP + '/rating', {
      method: "POST",
      headers: token? { "Content-Type": "application/json" , "Authorization":  token} : { "Content-Type": "application/json" },
      body: JSON.stringify({ id_item, rating , reviewText}),
    });
    //console.log("avaliação no processo ", id_item );

    const {success, message, msgType} = await response.json();
    //console.log(database);
    if (success) {
      return { success, message, msgType };
    }
    return { success, message, msgType };
  } catch (err) {
    console.log(err);
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error" };
  }
}
