import React from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { aboutStyles, styles, theme } from "@/styles/styles";

const images: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/images/fractals-logo.png"),
};

type IconName = React.ComponentProps<typeof Feather>["name"];

type InstructionsProps = {
  onPressClose: () => void;
  onPressStart?: () => void;
  visible: boolean;
};

type InstructionCard = {
  icon: IconName;
  title: string;
  text: string;
};

const preparationCards: InstructionCard[] = [
  {
    icon: "file-text",
    title: "Use uma planilha",
    text: "Envie o arquivo em um formato de planilha compatível, como XLSX, XLS ou CSV.",
  },
  {
    icon: "columns",
    title: "Uma informação por coluna",
    text: "Separe cliente, produto, quantidade, valor e data em colunas diferentes.",
  },
  {
    icon: "type",
    title: "Mantenha os cabeçalhos",
    text: "A primeira linha deve conter nomes claros para identificar cada coluna da planilha.",
  },
  {
    icon: "check-square",
    title: "Revise antes de enviar",
    text: "Verifique dados ausentes, linhas duplicadas, valores inválidos e fórmulas com erro.",
  },
];

const requiredColumns = [
  {
    title: "Identificação do cliente",
    text: "Nome, código, CNPJ, CPF ou outro identificador consistente que permita reconhecer o cliente.",
  },
  {
    title: "Produto ou serviço",
    text: "Nome, descrição, categoria ou código do produto vendido.",
  },
  {
    title: "Data da venda",
    text: "Data em que a venda, pedido ou faturamento foi registrado.",
  },
  {
    title: "Quantidade",
    text: "Número de unidades, itens ou serviços incluídos na venda.",
  },
  {
    title: "Valor",
    text: "Valor unitário ou valor total da transação, claramente identificado no cabeçalho.",
  },
];

const recommendations = [
  "Coloque os nomes das colunas na primeira linha da planilha.",
  "Use apenas uma linha para cada item, venda ou transação.",
  "Mantenha o mesmo padrão de data em toda a planilha.",
  "Não misture texto e números na mesma coluna.",
  "Evite células mescladas, títulos decorativos e linhas em branco.",
  "Remova totais, subtotais e observações inseridas entre os dados.",
  "Informe valores monetários sempre no mesmo formato.",
  "Confira se os clientes possuem uma identificação consistente.",
];

const workflow = [
  {
    title: "Prepare os dados",
    text: "Organize as vendas em formato de tabela, com cabeçalhos na primeira linha.",
  },
  {
    title: "Revise a planilha",
    text: "Verifique se as colunas estão preenchidas corretamente e se não existem linhas duplicadas.",
  },
  {
    title: "Selecione o arquivo",
    text: "Na tela inicial, pressione o botão de nova requisição e escolha a planilha desejada.",
  },
  {
    title: "Confirme o envio",
    text: "Confira o nome do arquivo selecionado e confirme para iniciar o upload.",
  },
  {
    title: "Acompanhe a solicitação",
    text: "Consulte a tela de solicitações para acompanhar a análise, possíveis correções e a conclusão.",
  },
];

const avoidItems = [
  "Imagens, gráficos ou tabelas dinâmicas no lugar dos dados originais.",
  "Várias tabelas diferentes dentro da mesma aba.",
  "Cabeçalhos repetidos no meio da planilha.",
  "Linhas ou colunas ocultas com informações importantes.",
  "Células com erros como #N/A, #VALOR! ou #REF!.",
  "Arquivos protegidos por senha ou bloqueados para leitura.",
];

function InstructionCard({
  icon,
  title,
  text,
}: InstructionCard) {
  return (
    <View style={aboutStyles.aboutValueCard}>
      <View style={aboutStyles.aboutValueIcon}>
        <Feather
          name={icon}
          size={22}
          color={theme.colors.accent}
        />
      </View>

      <Text style={aboutStyles.aboutCardTitle}>
        {title}
      </Text>

      <Text style={aboutStyles.aboutCardText}>
        {text}
      </Text>
    </View>
  );
}

export default function Instructions({
  onPressClose,
  onPressStart,
  visible,
}: InstructionsProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onPressClose}
    >
      <View style={styles.overlay}>
        <ScrollView
          style={aboutStyles.aboutScreen}
          contentContainerStyle={aboutStyles.aboutContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={aboutStyles.aboutHeroCard}>
            <View style={aboutStyles.aboutLogoRow}>
              <Image
                source={images.logo}
                style={aboutStyles.aboutLogo}
                resizeMode="contain"
              />

              <View style={aboutStyles.aboutBadge}>
                <Feather
                  name="upload-cloud"
                  size={14}
                  color={theme.colors.background}
                />

                <Text style={aboutStyles.aboutBadgeText}>
                  Instruções de envio
                </Text>
              </View>
            </View>

            <Text style={aboutStyles.aboutHeroTitle}>
              Aumente suas vendas sem mudar seus preços ou seu menu de ofertas.
            </Text>

            <Text style={aboutStyles.aboutHeroSubtitle}>
              Deixe a IA compor sugestões de cross-selling e upselling personalizadas para cada um dos seus clientes.
            </Text>

            <View style={aboutStyles.aboutCtaRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={aboutStyles.aboutPrimaryButton}
                onPress={onPressClose}
              >
                <Text style={aboutStyles.aboutPrimaryButtonText}>
                  Já entendi
                </Text>

                <Feather
                  name="check"
                  size={18}
                  color={theme.colors.textOnPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Antes de começar
            </Text>

            <Text style={aboutStyles.aboutSectionTitle}>
              Organize os dados em uma tabela simples e consistente.
            </Text>

            <Text style={aboutStyles.aboutSectionText}>
              Cada linha deve representar uma venda, item ou transação. Cada
              coluna deve armazenar apenas um tipo de informação. Quanto mais
              padronizados estiverem os dados, mais confiável será o resultado
              da análise.
            </Text>
          </View>

          <View style={aboutStyles.aboutCardGrid}>
            {preparationCards.map((item) => (
              <InstructionCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            ))}
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Informações importantes
            </Text>

            <Text style={aboutStyles.aboutSectionTitle}>
              Quais colunas devem aparecer na planilha?
            </Text>

            <Text style={aboutStyles.aboutSectionText}>
              Os nomes exatos podem variar de acordo com o sistema utilizado
              pela sua empresa, mas a planilha deve permitir identificar pelo
              menos o cliente, o produto e os dados da venda.
            </Text>
          </View>

          <View style={aboutStyles.aboutWorkflowBox}>
            {requiredColumns.map((column, index) => (
              <View
                key={column.title}
                style={aboutStyles.aboutStep}
              >
                <View style={aboutStyles.aboutStepNumber}>
                  <Text style={aboutStyles.aboutStepNumberText}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>

                <View style={aboutStyles.aboutStepContent}>
                  <Text style={aboutStyles.aboutStepTitle}>
                    {column.title}
                  </Text>

                  <Text style={aboutStyles.aboutStepText}>
                    {column.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Boas práticas
            </Text>

            <Text style={aboutStyles.aboutSectionTitle}>
              Faça estas verificações antes do envio.
            </Text>

            {recommendations.map((recommendation) => (
              <View
                key={recommendation}
                style={aboutStyles.aboutBulletRow}
              >
                <Feather
                  name="check-circle"
                  size={18}
                  color={theme.colors.success}
                />

                <Text style={aboutStyles.aboutBulletText}>
                  {recommendation}
                </Text>
              </View>
            ))}
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              O que evitar
            </Text>

            <Text style={aboutStyles.aboutSectionTitle}>
              Alguns formatos podem impedir ou prejudicar a análise.
            </Text>

            {avoidItems.map((item) => (
              <View
                key={item}
                style={aboutStyles.aboutBulletRow}
              >
                <Feather
                  name="alert-circle"
                  size={18}
                  color={theme.colors.warning}
                />

                <Text style={aboutStyles.aboutBulletText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Envio da planilha
            </Text>

            <Text style={aboutStyles.aboutSectionTitle}>
              Da preparação ao acompanhamento da solicitação.
            </Text>
          </View>

          <View style={aboutStyles.aboutWorkflowBox}>
            {workflow.map((step, index) => (
              <View
                key={step.title}
                style={aboutStyles.aboutStep}
              >
                <View style={aboutStyles.aboutStepNumber}>
                  <Text style={aboutStyles.aboutStepNumberText}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>

                <View style={aboutStyles.aboutStepContent}>
                  <Text style={aboutStyles.aboutStepTitle}>
                    {step.title}
                  </Text>

                  <Text style={aboutStyles.aboutStepText}>
                    {step.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={aboutStyles.aboutCtaBox}>
            <Text style={aboutStyles.aboutCtaTitle}>
              Sua planilha está pronta?
            </Text>

            <Text style={aboutStyles.aboutCtaText}>
              Selecione o arquivo e acompanhe o
              processamento pela tela de solicitações.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={aboutStyles.aboutPrimaryButtonWide}
              onPress={onPressStart}
            >
              <Text style={aboutStyles.aboutPrimaryButtonText}>
                Selecionar planilha
              </Text>

              <Feather
                name="upload"
                size={18}
                color={theme.colors.textOnPrimary}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}