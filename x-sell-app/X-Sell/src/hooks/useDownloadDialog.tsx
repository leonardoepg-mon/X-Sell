import { useRef, useState } from "react";
import { DownloadDialog } from "@/components/StatusScreen/DownloadDialog";
import { MsgType, useMessageDialog } from "./useMessageDialog";

type HandlerResults = {
  success: boolean;
  message: string;
  msgType: MsgType;
  fileName?: string;
}

type DownloadHandler = (
  id_item?: number
) => Promise<HandlerResults>;

type ShowDownloadParams = {
  processId: number;
  fileName: string;
  downloadHandler: DownloadHandler;
};


export function useDownloadDialog() {
  const [processId, setProcessId] = useState(0);
  const [fileName, setFileName] = useState("");
  const [visible, setVisible] = useState(false);
  const downloadHandlerRef = useRef<DownloadHandler | null>(null);
  const {showMessage, MessageDialog} = useMessageDialog();

  function showDownloadDialog({
    processId,
    fileName,
    downloadHandler
  }: ShowDownloadParams) {
    setProcessId(processId);
    setFileName(fileName);
    downloadHandlerRef.current = downloadHandler;
    setVisible(true);
  }

  function handleOK() {
    setVisible(false);
  }

  async function confirmDownload() { 
    const handler = downloadHandlerRef.current;
    if (!handler) {
      showMessage({
        message: "Função de download não encontrada.",
        msgType: "error",
      });
      return;
    }

    try {
            const response = await handler(processId);
                  if (!response.success) {showMessage({message : response.message,
                    msgType: response.msgType as MsgType});
        return;}
      setVisible(false);
    } catch (error) {
      console.error("Erro ao realizar download:", error);

      showMessage({
        message: "Não foi possível realizar o download.",
        msgType: "error",
      });
    }}
  
  const Dialog = () => (
    <><DownloadDialog
      visible={visible}
      fileName={fileName}
      processId={processId}
      onPressDownload={confirmDownload}
      onClose={handleOK}
    />
    <MessageDialog/>
    </>
  );

 return {
    showDownloadDialog,
    HookDownloadDialog: Dialog,
  };
}
