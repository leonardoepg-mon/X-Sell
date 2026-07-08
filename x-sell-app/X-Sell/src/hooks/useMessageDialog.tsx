//Não implementado

import { useState } from "react";
import { MessageDialog } from "@/components/MessageDialog";

export type MsgType = "success" | "error" | "warning" | "info" | "";

type ShowMessageParams = {
  message: string;
  msgType: MsgType;
  afterDialog?: () => void;
};

export function useMessageDialog() {
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [visible, setVisible] = useState(false);
  const [afterDialog, setAfterDialog] = useState<(() => void) | undefined>(undefined);

  function showMessage({
    message,
    msgType,
    afterDialog,
  }: ShowMessageParams) {
    setMessage(message);
    setMsgType(msgType);
    setAfterDialog(() => afterDialog ?? null);
    setVisible(true);
  }

  function handleOK() {
    setVisible(false);
      afterDialog?.();
      setAfterDialog(undefined);
  }
  const Dialog = () => (
    <MessageDialog
      visible={visible}
      message={message}
      msgType={msgType}
      onOK={handleOK}
    />
  );

 return {
    showMessage,
    MessageDialog: Dialog,
  };
}

// USO EM UM COMPONENTE
//
//    const { showMessage, MessageDialog } = useMessageDialog();
//
//
//  PARA CHAMAR  
//
//  showMessage({
//      message: response.message,
//      msgType: response.msgType,
//      afterDialog: () => {
//      onUploaded();
//      },
//    });
//  No final de cada JSX basta
//
//  <MessageDialog />
//  