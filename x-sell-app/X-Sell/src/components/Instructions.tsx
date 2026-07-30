import React from "react";
import { Row, Rows, StickyTable, Table } from 'react-native-tabeller';
import * as examples from "@/assets/examples/exemplo.json"
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
  logo: require("@/assets/images/splash-icon.png"),
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
    icon: "check-square",
    title: "Revise antes de enviar",
    text: "Verifique dados ausentes, valores inválidos e fórmulas com erro.",
  },
];

const requiredColumns = [
  {
    title: "Linhas: Identificação do cliente",
    text: "Para efeito de preservação de sigilo comercial, a identificação dos clientes deve ser feita por meio de informações não-reconhecíveis, como um número interno, sem usar  CNPJ, nome da empresa ou razão social.",
  },
  {
    title: "Colunas: Produto ou serviço",
    text: "Os nomes de produtos nas colunas devem ser informados por  denominações genéricas, como “Produto 1”, “Produto 2” e assim por diante.",
  },
  {
    title: "Células",
    text: "Na interseção entre linha e coluna, deve constar o total de vendas daquele produto ou serviço para aquele cliente em um determinado período, que pode ser de 6 meses, 1 ano, 2 anos ou outro intervalo definido pelo usuário",
  },
];

const workflow = [
  {
    title: "Prepare os dados",
    text: "Organize as vendas em formato de tabela.",
  },
  {
    title: "Selecione o arquivo",
    text: "Na tela inicial, pressione o botão de nova planilha e escolha a planilha desejada.",
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
                  Como funciona
                </Text>
              </View>
            </View>

            <Text style={aboutStyles.aboutHeroTitle}>
              Aumente suas vendas sem mudar seus preços ou seu menu de ofertas.
            </Text>

            <Text style={aboutStyles.aboutHeroSubtitle}>
              Este assistente de inteligência artificial auxilia, de forma gratuita, na definição de estratégias de cross-selling e upselling.
            </Text>

            <View style={aboutStyles.aboutCtaRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={aboutStyles.aboutPrimaryButton}
                onPress={onPressClose}
              >
                <Text style={aboutStyles.aboutPrimaryButtonText}>
                  Já entendi - Voltar
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
              Seu funcionamento é simples: o usuário deve fornecer uma planilha em que cada linha represente um cliente e cada coluna represente um produto. Em cada célula, na interseção entre linha e coluna, deve constar o total de vendas daquele produto ou serviço para aquele cliente em um determinado período, que pode ser de 6 meses, 1 ano, 2 anos ou outro intervalo definido pelo usuário.
            </Text>
          </View>

          <View style={aboutStyles.aboutCardGrid}>
            {preparationCards.map((item) => ( // colocar planilha exemplo aqui
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
              Quais dados devem aparecer na planilha?
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

          <View style={aboutStyles.aboutWorkflowBox}>
            <View style={styles.exContainer}>
              <Table borderStyle={styles.exBorder}>
                <Row data={examples.inputData[0]} style={styles.exHeader} textStyle={styles.exHeaderText} />
                <Rows data={examples.inputData.slice(1)} style={styles.exDetails} textStyle={styles.exDetailsText} />
              </Table>
            </View>
          </View>

          <View style={aboutStyles.aboutSection}>
                <Text style={aboutStyles.aboutBulletText}>
                  Em geral, quanto mais abrangente for o período avaliado— especialmente se contemplar efeitos de sazonalidade — mais consistentes tenderão a ser os resultados.
                </Text>
          </View>

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Após o envio
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

          <View style={aboutStyles.aboutSection}>
            <Text style={aboutStyles.aboutSectionKicker}>
              Após o recebimento da planilha de entrada
            </Text>

            <Text style={aboutStyles.aboutSectionText}>
              A entrada é verificada, e, se for compatível, inicia-se o processo de análise.
              Ao final do processamento, é gerada uma nova planilha baseada no arquivo original,
              com a inclusão de uma coluna adicional indicando a qual cluster
              cada cliente pertence.
            </Text>
            <Text style={aboutStyles.aboutSectionText}>

              Em seguida, são acrescentadas três novas colunas, 
              posicionadas à direita da coluna de cluster, cada uma contendo a 
              sugestão de um produto ou serviço a ser ofertado ao cliente.
              </Text>
            <Text style={aboutStyles.aboutSectionText}>
              Essas recomendações têm como objetivo ampliar o potencial
              de cross-selling, indicando produtos cuja aquisição tenderia
              a aproximar o perfil de compras daquele cliente do perfil 
              predominante no grupo ao qual ele pertence.
              </Text>
            <Text style={aboutStyles.aboutSectionText}>
              Além da planilha enriquecida, o sistema também gera um relatório analítico,
              indicando as melhores recomendações e os bundles mais promissores a serem oferecidos.
            </Text>
          </View>

          <View style={aboutStyles.aboutWorkflowBox}>
            <View style={styles.exContainer}>
              <Table borderStyle={styles.exBorder}>
                <Row data={examples.outputData[0]} style={styles.exHeader} textStyle={styles.exHeaderText} />
                <Rows data={examples.outputData.slice(1)} style={styles.exDetails} textStyle={styles.exDetailsText} />
              </Table>
            </View>
          </View>

          <View style={aboutStyles.aboutCtaBox}>
            <Text style={aboutStyles.aboutCtaTitle}>
              Comece já!
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