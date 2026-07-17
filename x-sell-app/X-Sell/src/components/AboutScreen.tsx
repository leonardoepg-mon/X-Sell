import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { aboutStyles, theme } from "@/styles/styles";

const images: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/images/fractals-logo.png")
};

type IconName = React.ComponentProps<typeof Feather>["name"];

type AboutProps = {
  onStart?: () => void;
};

const valueCards: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "target",
    title: "Oportunidades priorizadas",
    text: "O X-Sell ajuda a identificar quais clientes têm maior potencial de compra adicional, reduzindo achismos na abordagem comercial.",
  },
  {
    icon: "database",
    title: "Dados comerciais organizados",
    text: "Centralize informações de clientes, histórico, status e interações para transformar dados dispersos em inteligência acionável.",
  },
  {
    icon: "trending-up",
    title: "Crescimento na base atual",
    text: "Aumente receita explorando melhor os clientes que já confiam na empresa, com ofertas mais aderentes ao perfil de cada conta.",
  },
  {
    icon: "shield",
    title: "Processo com governança",
    text: "Padronize etapas, acompanhe status e dê mais previsibilidade ao funil de relacionamento, expansão e retenção.",
  },
];

const workflow: Array<{ title: string; text: string }> = [
  {
    title: "Diagnóstico do cliente",
    text: "A empresa informa seu perfil, dores comerciais, ferramentas atuais e objetivos de expansão.",
  },
  {
    title: "Organização das informações",
    text: "Dados de clientes, planilhas, CRM ou fontes internas são estruturados para facilitar leitura e priorização.",
  },
  {
    title: "Mapeamento de oportunidades",
    text: "O X-Sell cruza perfil, necessidade, estágio e potencial para destacar contas com chance real de venda adicional.",
  },
  {
    title: "Ação comercial orientada",
    text: "A equipe recebe uma visão clara do que abordar, por que abordar e qual prioridade seguir.",
  },
  {
    title: "Acompanhamento contínuo",
    text: "Status, feedbacks e resultados retroalimentam o processo para melhorar as próximas recomendações.",
  },
];

const benefits = [
  "Menos tempo perdido procurando oportunidades manualmente.",
  "Mais clareza para vendas, CS, gestão e operação.",
  "Melhor aproveitamento da carteira atual de clientes.",
  "Decisões comerciais baseadas em dados e não apenas em feeling.",
  "Processo escalável para empresas que querem vender mais com inteligência.",
];

function ValueCard({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <View style={aboutStyles.aboutValueCard}>
      <View style={aboutStyles.aboutValueIcon}>
        <Feather name={icon} size={22} color={theme.colors.accent} />
      </View>
      <Text style={aboutStyles.aboutCardTitle}>{title}</Text>
      <Text style={aboutStyles.aboutCardText}>{text}</Text>
    </View>
  );
}

export default function About({ onStart }: AboutProps) {
  return (
    <ScrollView
      style={aboutStyles.aboutScreen}
      contentContainerStyle={aboutStyles.aboutContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={aboutStyles.aboutHeroCard}>
        <View style={aboutStyles.aboutLogoRow}>
          <Image source={images.logo} style={aboutStyles.aboutLogo} 
    resizeMode="contain" />
          <View style={aboutStyles.aboutBadge}>
            <Feather name="zap" size={14} color={theme.colors.background} />
            <Text style={aboutStyles.aboutBadgeText}>Inteligência comercial</Text>
          </View>
        </View>

        <Text style={aboutStyles.aboutHeroTitle}>
          X-Sell: transforme sua base de clientes em novas oportunidades de receita.
        </Text>

        <Text style={aboutStyles.aboutHeroSubtitle}>
          Uma solução da Fractals para organizar dados comerciais, encontrar oportunidades de cross-sell e orientar a equipe para vender mais dentro da carteira atual.
        </Text>

        <View style={aboutStyles.aboutCtaRow}>
          <TouchableOpacity activeOpacity={0.85} style={aboutStyles.aboutPrimaryButton} onPress={onStart}>
            <Text style={aboutStyles.aboutPrimaryButtonText}> Começar a usar </Text>
            <Feather name="arrow-right" size={18} color={theme.colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={aboutStyles.aboutSection}>
        <Text style={aboutStyles.aboutSectionKicker}>Por que X-Sell?</Text>
        <Text style={aboutStyles.aboutSectionTitle}>Sua empresa provavelmente já tem oportunidades escondidas nos próprios clientes.</Text>
        <Text style={aboutStyles.aboutSectionText}>
          Em muitas operações, vendas adicionais deixam de acontecer porque os dados ficam espalhados, a equipe não sabe qual conta priorizar e a gestão não tem uma visão simples do potencial de expansão. O X-Sell resolve esse problema criando um fluxo mais inteligente para identificar, qualificar e acompanhar oportunidades comerciais.
        </Text>
      </View>

      <View style={aboutStyles.aboutCardGrid}>
        {valueCards.map((item) => (
          <ValueCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
        ))}
      </View>

      <View style={aboutStyles.aboutSection}>
        <Text style={aboutStyles.aboutSectionKicker}>Como funciona</Text>
        <Text style={aboutStyles.aboutSectionTitle}>Da informação bruta à ação comercial.</Text>
        <Text style={aboutStyles.aboutSectionText}>
          O X-Sell organiza o processo em etapas claras. Isso ajuda o cliente a sair de uma rotina reativa para uma operação comercial mais orientada por dados.
        </Text>
      </View>

      <View style={aboutStyles.aboutWorkflowBox}>
        {workflow.map((step, index) => (
          <View key={step.title} style={aboutStyles.aboutStep}>
            <View style={aboutStyles.aboutStepNumber}>
              <Text style={aboutStyles.aboutStepNumberText}>{String(index + 1).padStart(2, "0")}</Text>
            </View>
            <View style={aboutStyles.aboutStepContent}>
              <Text style={aboutStyles.aboutStepTitle}>{step.title}</Text>
              <Text style={aboutStyles.aboutStepText}>{step.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={aboutStyles.aboutSection}>
        <Text style={aboutStyles.aboutSectionKicker}>Benefícios</Text>
        <Text style={aboutStyles.aboutSectionTitle}>Uma operação comercial mais focada, previsível e mensurável.</Text>

        {benefits.map((benefit) => (
          <View key={benefit} style={aboutStyles.aboutBulletRow}>
            <Feather name="check-circle" size={18} color={theme.colors.success} />
            <Text style={aboutStyles.aboutBulletText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={aboutStyles.aboutCtaBox}>
        <Text style={aboutStyles.aboutCtaTitle}>Pronto para descobrir onde sua empresa pode vender mais?</Text>
        <Text style={aboutStyles.aboutCtaText}>
          Cadastre sua empresa, compartilhe o cenário comercial atual e veja como o X-Sell pode apoiar uma estratégia de expansão dentro da sua própria base.
        </Text>
        <TouchableOpacity activeOpacity={0.85} style={aboutStyles.aboutPrimaryButtonWide} onPress={onStart}>
          <Text style={aboutStyles.aboutPrimaryButtonText}>Começar diagnóstico</Text>
          <Feather name="arrow-right" size={18} color={theme.colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
