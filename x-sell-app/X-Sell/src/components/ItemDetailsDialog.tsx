import { Modal, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "@/styles/styles";

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
};

type ItemDetailsDialogProps = {
  visible: boolean;
  item: ItemDetails | null;
  loading: boolean;
  onClose: () => void;
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
  visible,
  item,
  loading,
  onClose,
}: ItemDetailsDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Detalhes do processo</Text>

          {loading && (
            <Text style={styles.message}>
              Carregando detalhes...
            </Text>
          )}

          {!loading && item && (
            <View>
              <Text style={styles.status}>
                Processo #{item.id_item}
              </Text>

              <View style={styles.formField}>
                <Text style={styles.message}>
                  <Text style={{ fontWeight: "bold" }}>Enviado:</Text>{" "}
                  {formatDate(item.data_envio)}
                </Text>

                <Text style={styles.message}>
                  <Text style={{ fontWeight: "bold" }}>Nome:</Text>{" "}
                  {item.inputName || "Não informado"}
                </Text>
              </View>

              {Boolean(item.data_aceito) && (
                <><Separator/>
                <View style={styles.formField}>
                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Aprovado:</Text>{" "}
                    {formatDate(item.data_aceito)}
                  </Text>
                </View>
                </>
              )}

              {Boolean(item.data_iniciado) && (
                <><Separator/>
                <View style={styles.formField}>
                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Iniciado:</Text>{" "}
                    {formatDate(item.data_iniciado)}
                  </Text>
                </View>
                </>
              )}

              {Boolean(item.data_concluido) && (
                <><Separator/>
                <View style={styles.formField}>
                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Concluído:</Text>{" "}
                    {formatDate(item.data_concluido)}
                  </Text>

                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>
                      Arquivo de saída:
                    </Text>{" "}
                    {item.outputName || "Não informado"}
                  </Text>
                </View>
                </>
              )}

              {Boolean(item.data_avaliado) && (
                <><Separator/>
                <View style={styles.formField}>
                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Avaliado:</Text>{" "}
                    {formatDate(item.data_avaliado)}
                  </Text>

                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Nota:</Text>{" "}
                    {item.avaliacao}/5
                  </Text>

                  <Text style={styles.message}>
                    <Text style={{ fontWeight: "bold" }}>Comentário:</Text>{" "}
                    {item.texto_avaliacao || "Nenhum comentário"}
                  </Text>
                </View>
                </>
              )}
            </View>
          )}

          {!loading && !item && (
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
  );
}