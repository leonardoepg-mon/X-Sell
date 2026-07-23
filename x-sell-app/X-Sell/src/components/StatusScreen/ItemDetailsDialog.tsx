import { Modal, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {  useState } from "react";

import { useMessageDialog, MsgType } from "@/hooks/useMessageDialog";

import * as StApiAdmin from "@/services/adminTasks";

import { RatingDialog } from "@/components/StatusScreen/RatingDialog";
import { UploadDialog } from "@/components/StatusScreen/UploadDialog";
import { DownloadDialog } from "@/components/StatusScreen/DownloadDialog";

import { styles } from "@/styles/styles";
import { handleDownload } from "@/services/fileMgmt";
import { CommentDialog } from "@/components/Admin/CommentDialog"
import { getOriginalFileName } from "@/services/statusApi";

export type ItemDetails = {
  id_item: string;
  status: string;
  id_usuario: string;
  inputName: string;
  outputName: string;
  avaliacao: string;
  data_envio: string;
  data_aceito: string;
  data_iniciado: string;
  data_concluido: string;
  data_avaliado: string;
  texto_avaliacao: string;
  motivo_rejeicao: string;
};

const buttonColor = "#2d4941";

type ItemDetailsDialogProps = {
  isAdmin?: boolean;
  visible: boolean;
  item: ItemDetails | null;
  loading: boolean;
  onClose: () => void;
  refresh: () => void;
};

function formatDate(value?: string) {
  if (!value) return "Não registrado";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR");
}

function Separator() {
  return <View style={styles.detailsSeparator} />;
}

export function ItemDetailsDialog({
  isAdmin,
  visible,
  item,
  loading,
  onClose,
  refresh,
}: ItemDetailsDialogProps) {

    const [ratingVisible, setRatingVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [downloadVisible, setDownloadVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [isInputDownload, setInputDownload] = useState(false);
    const [fileName, setFileName] = useState("");
    const {showMessage, MessageDialog} = useMessageDialog();
  
    async function confirmDownload() {   
          const response = await handleDownload(Number(item?.id_item) ?? 0);
                showMessage({message : response.message,
                  msgType: response.msgType as MsgType})
    }

    async function confirmDownloadAdmin() {   
          const response = await StApiAdmin.handleDownload(Number(item?.id_item) ?? 0);
                showMessage({message : response.message,
                  msgType: response.msgType as MsgType})
    }
  
  
    async function handleStatusSet(statusTo: number) {
      const response = await StApiAdmin.statusSet(Number(item?.id_item ) , statusTo);
                  showMessage({message : response.message,
                  msgType: response.msgType as MsgType,
                afterDialog: refresh});
    }
    
    const buttonTasks = {
      admin: {onPressRating: () => { setRatingVisible(true); }, //ok
              onPressUpload: () => { setUploadVisible(true); }, //ok, uploadDialog handles it
              onPressDownloadInput: () => {setFileName(item?.inputName || "");setInputDownload(true);setDownloadVisible(true);},  //OK
              onPressDownload: () => {setFileName(item?.inputName || "");setInputDownload(false);setDownloadVisible(true);},  //OK
              onPressSubmit:() => { handleStatusSet(3);},
              onPressAccept: () => {handleStatusSet(1);},
              onPressReject: () => {setCommentVisible(true);},
              onPressStart: ()=> {handleStatusSet( 2)}},
      user: {onPressRating:() => {setRatingVisible(true); },
              onPressReupload: () => {setUploadVisible(true);},
              onPressDownload:() => {setFileName(item?.outputName || "");setInputDownload(false);setDownloadVisible(true);}}
    }

  return (
    <>
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Detalhes do processo</Text>

          {loading && (
            <Text style={styles.message}>
              Carregando detalhes...
            </Text>
          )}

          {!loading && item && (
            <View >
              <Text style={styles.status}>
                Processo #{item.id_item}
              </Text>
              <Separator/>
              <View style={styles.detailCategory}>
              <View style={styles.left}>
                <View style={styles.formField}>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>Enviado:</Text>{" "}
                    {formatDate(item.data_envio)}
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>Nome:</Text>{" "}
                    {getOriginalFileName(item.inputName) || "Não informado"}
                  </Text>

                  {item.status === "-1" && (<Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>Comentário do analista:</Text>{" "}
                    {item.motivo_rejeicao || "Não informado"}
                  </Text>)} 


                </View>
              </View >
                <View style={styles.right}>
                  <View style={styles.buttonRow}> 
                    {(isAdmin && item.status !== "-1") && (<>
                                  <Pressable style={styles.smallButton} onPress={ async () => buttonTasks.admin.onPressDownloadInput() }>
                                                  <MaterialIcons
                                                name={"file-download"}
                                                size={18}
                                                color={buttonColor}
                                              />
                                  </Pressable>
                    { item.status === "0" &&( <>
                                  <Pressable style={styles.smallButton} onPress={ () => buttonTasks.admin.onPressAccept() }>
                                    <MaterialIcons
                                  name={"thumb-up"}
                                  size={18}
                                  color={buttonColor}
                                />
                                  </Pressable>
                                  <Pressable style={styles.smallButton} onPress={ () => buttonTasks.admin.onPressReject() } accessibilityHint="Rejeitar arquivo"> 
                                    <MaterialIcons
                                  name={"thumb-down"}
                                  size={18}
                                  color={buttonColor}
                                />
                                  </Pressable>
                                  </>)}</>)}
                    {(!isAdmin && item.status === "-1") && (
                        <Pressable style={styles.smallButton} onPress={ () => buttonTasks.user.onPressReupload() }> 
                                        <MaterialIcons
                                                      name={"upload-file"}
                                                      size={18}
                                                      color={buttonColor}
                                                    />
                                      </Pressable>
                    )}
                  </View> 
                </View>
                </View>     

                        
            
              {Boolean(item.data_aceito) && (
                <><Separator/>
                <View style={styles.detailCategory}>
                  <View style={styles.left}>
                    <View style={styles.formField}>
                      <Text style={styles.detailsText}>
                        <Text style={{ fontWeight: "bold" }}>Aprovado:</Text>{" "}
                        {formatDate(item.data_aceito)}
                      </Text>
                    </View>
                  </View >
                  <View style={styles.right}>
                    <View style={styles.buttonRow}>
                      {(item.status === '1' && isAdmin) && (
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.admin.onPressStart() }>
                                <MaterialIcons
                              name={"start"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable> 
                            )}
                </View> 
                </View>
                </View>  

                </>
              )}

              {Boolean(item.data_iniciado) && ( 
                <><Separator/>
                <View style={styles.detailCategory}>
                  <View style={styles.left}>
                    <View style={styles.formField}>
                      <Text style={styles.detailsText}>
                        <Text style={{ fontWeight: "bold" }}>Iniciado:</Text>{" "}
                        {formatDate(item.data_iniciado)}
                      </Text>
                        { isAdmin && item.status === "2" && (
                    <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Saída enviada:
                    </Text>{" "}
                    {getOriginalFileName(item.outputName) || "Não informado"}
                      </Text> )}
                    </View>
               </View >
                  <View style={styles.right}>
                    <View style={styles.buttonRow}>
                      {(item.status === '2' && isAdmin) && ( <>
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.admin.onPressUpload() }>
                                <MaterialIcons
                              name={"file-upload"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable>
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.admin.onPressSubmit() } disabled={item.outputName==""}>
                                <MaterialIcons
                              name={"check-box"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable>
                            </>)}
                </View> 
                </View>
                </View>  

                </>
              )}

              {Boolean(item.data_concluido) && (
                <><Separator/>
                <View style={styles.detailCategory}>
                  <View style={styles.left}>
                <View style={styles.formField}>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>Concluído:</Text>{" "}
                    {formatDate(item.data_concluido)}
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Arquivo de saída:
                    </Text>{" "}
                    { getOriginalFileName(item.outputName) || "Não informado"}
                  </Text>
                                    </View>
               </View >
                  <View style={styles.right}>
                    <View style={styles.buttonRow}>
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.user.onPressDownload() }>
                                <MaterialIcons
                              name={"file-download"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable>
                      {(Number(item.status) == 3 && !isAdmin) && (
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.user.onPressRating() }>
                                <MaterialIcons
                              name={"star"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable>
                              )}
                </View> 
                </View>
                </View>  

                </>
              )}

              {Boolean(item.data_avaliado) && ( 
                <><Separator/>
                <View style={styles.detailCategory}>
                  <View style={styles.left}>
                    <View style={styles.formField}>
                      <Text style={styles.detailsText}>
                        <Text style={{ fontWeight: "bold" }}>Avaliado:</Text>{" "}
                        {formatDate(item.data_avaliado)}
                      </Text>

                      <Text style={styles.detailsText}>
                      <Text style={{ fontWeight: "bold" }}>Nota:</Text>{" "}
                      {item.avaliacao}/5
                      </Text>

                      <Text style={styles.detailsText}>
                      <Text style={{ fontWeight: "bold" }}>Comentário:</Text>{" "}
                      {item.texto_avaliacao || "Nenhum comentário"}
                      </Text>
                    </View>
               </View >
                  <View style={styles.right}>
                    <View style={styles.buttonRow}>
                      {(item.status === '4' && !isAdmin) && ( 
                              <Pressable style={styles.smallButton} onPress={ () => buttonTasks.user.onPressRating() }>
                                <MaterialIcons
                              name={"edit"}
                              size={18}
                              color={buttonColor}
                            />
                              </Pressable>
                              )}
                </View> 
                </View>
                </View>  

                </>
              )}
            </View>
          )}

          {!loading && !item && visible && (
            <Text style={styles.message}>
              Não foi possível obter os detalhes.
            </Text>
          )}

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelBText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <RatingDialog
  rated={item?.status === "4"}
  admin={isAdmin}
  visible={ratingVisible}
  id_item={Number(item?.id_item) ?? 0}
  onClose={() => {setRatingVisible(false); refresh();}}
  onRated={() => {
    setRatingVisible(false); refresh();}
   }
/>
      <UploadDialog
      admin={isAdmin}
  visible={uploadVisible}
  id_item={item?.id_item ?? undefined}
  onClose={() => {setUploadVisible(false); refresh();}}
  onUploaded={() => {//
    setUploadVisible(false);; refresh();
   }}
/>
      <DownloadDialog
  visible={downloadVisible}
  fileName={getOriginalFileName(fileName)}
  onClose={() => setDownloadVisible(false)}
  onPressDownload={isInputDownload? confirmDownloadAdmin: confirmDownload }/>
  <CommentDialog
  visible={commentVisible}
  id_item={Number(item?.id_item)}
  onClose={() => {setCommentVisible(false);refresh()}}
  onSend={() => {setCommentVisible(false);refresh()}}/>
  <MessageDialog/>
  </>
  );
}