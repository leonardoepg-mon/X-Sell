import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker"

import { handleReupload, handleUpload, pickDocument } from "@/services/fileMgmt";
import { handleAdminUpload, seeUsers, UserDetails, pickDocumentFree } from "@/services/adminTasks";
import { styles } from "@/styles/styles";
import { useMessageDialog } from "@/hooks/useMessageDialog";

type UploadDialogProps = {
  admin?: boolean;
  visible: boolean;
  id_item?: string;
  selectUser?: boolean;
  isReport?: boolean;
  onClose: () => void;
  onUploaded: () => void;
};

  type UserPickerItem = {
  label: string;
  value: number;
  disabled?: boolean;
};


export function UploadDialog({
  admin,
  visible,
  id_item,
  selectUser,
  isReport,
  onClose,
  onUploaded,
}: UploadDialogProps) {

  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const isReupload = !!id_item;

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [userItems, setUserItems] = useState<UserPickerItem[]>([]);
  const [open, setOpen] = useState(false);

  const {showMessage, MessageDialog} = useMessageDialog();

  useEffect(() => {
  if (!visible || !selectUser) return;

  async function loadUsers() {
    const response = await seeUsers();

    if (!response.success || !response.data) {
      showMessage({
        message: "Não foi possível carregar usuários",
        msgType: "error",
      });
      return;
    }

    setUserItems(
      response.data.map((user: UserDetails) => ({
        label: user.nomeContato,
        value: user.id,
        disabled: user.admin,
      }))
    );
  }

  loadUsers();
}, [visible, selectUser]);

  async function submitUpload() {
    if (!document) return;

    setIsUploading(true);
    let response;
    if (!admin) {
    response = isReupload
      ? await handleReupload(document, id_item)
      : await handleUpload(document);
    } else if (id_item) {
    response = await handleAdminUpload(document, id_item, isReport);
    } else if (selectUser) {
      response = await handleUpload(document, selectedUserId);
    }
    setIsUploading(false);
    setDocument(null);
    if (response) {
    showMessage({message : response.message,
            msgType: response.msgType,
            afterDialog: response.success ? onUploaded: undefined });
    }}
  
  return (
    <>
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>
            {!admin ? isReupload ? "Reenviar documento" : "Subir documento": "Subir documento"}
          </Text>

          <Pressable
            style={styles.button}
            onPress={async () => {
              const result = isReport? await pickDocumentFree() : await pickDocument(); // message?
              if (result.document) setDocument(result.document);
              if (!result.success) showMessage({message: result.message, msgType: "warning"});
            }}
          >
            <Text style={styles.buttonText}>
              { !admin ? isReupload ? "Selecionar novo documento" : "Selecionar documento": "Selecionar documento"}
            </Text>
          </Pressable>

          {document && (
            <>
              <Text style={styles.fileName}>{document.name}</Text>

              <Pressable style={styles.button} onPress={() => setDocument(null)}>
                <Text style={styles.buttonText}>
                  {!admin ? isReupload ? "Cancelar Reenvio" : "Cancelar Envio": "Cancelar Envio"}
                </Text>
              </Pressable>

              <Pressable style={styles.button} onPress={submitUpload}
              disabled={isUploading  ||
                (selectUser === true && selectedUserId === null)
              }>
                <Text style={styles.buttonText}>
                  {isUploading ? "Enviando..." : !admin ? isReupload ? "Fazer Reupload" : "Fazer Upload": "Fazer Upload"}
                </Text>
              </Pressable>
            </> 
          )}
          {selectUser && (<>
    <Text style={styles.detailsText}>Escolha o usuário:</Text>
    <DropDownPicker<number>
      open={open}
      value={selectedUserId}
      items={userItems}
      setOpen={setOpen}
      setValue={setSelectedUserId}
      setItems={setUserItems}
      placeholder="Selecione um usuário"
      listMode="SCROLLVIEW"
      maxHeight={200}
      disabledItemLabelStyle={{
         color: "#999",
         opacity: 0.6,
      }}
      disabledItemContainerStyle={{
         backgroundColor: "#eeeeee",
      }}
    />
  </>
  )}

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelBText}>Fechar</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
    <MessageDialog/>
    </>
  );
}
