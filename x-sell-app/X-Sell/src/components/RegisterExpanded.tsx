import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles, theme } from "@/styles/styles";

export type XSellLeadFormData = {
  companyName: string;
  tradeName: string;
  cnpj: string;
  segment: string;
  website: string;
  city: string;
  state: string;

  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  whatsapp: string;

  companySize: string;
  salesTeamSize: string;
  averageTicket: string;
  monthlyLeads: string;
  salesCycle: string;
  currentCRM: string;
  currentTools: string;

  goals: string;
  painPoints: string;
  dataSources: string;
  integrationNeeds: string;
  expectedUsers: string;
  urgency: string;
  budgetRange: string;
  notes: string;

  consentContact: boolean;
  consentLgpd: boolean;
};

type RegisterExpandedProps = {
  initialValues?: Partial<XSellLeadFormData>;
  loading?: boolean;
  onSubmit?: (data: XSellLeadFormData) => void | Promise<void>;
  onCancel?: () => void;
};

type FieldName = keyof XSellLeadFormData;

type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "url";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onChangeText: (value: string) => void;
};

const emptyForm: XSellLeadFormData = {
  companyName: "",
  tradeName: "",
  cnpj: "",
  segment: "",
  website: "",
  city: "",
  state: "",

  contactName: "",
  contactRole: "",
  email: "",
  phone: "",
  whatsapp: "",

  companySize: "",
  salesTeamSize: "",
  averageTicket: "",
  monthlyLeads: "",
  salesCycle: "",
  currentCRM: "",
  currentTools: "",

  goals: "",
  painPoints: "",
  dataSources: "",
  integrationNeeds: "",
  expectedUsers: "",
  urgency: "",
  budgetRange: "",
  notes: "",

  consentContact: true,
  consentLgpd: false,
};

function InputField({
  label,
  value,
  placeholder,
  required,
  multiline,
  keyboardType = "default",
  autoCapitalize = "sentences",
  onChangeText,
}: InputProps) {
  return (
    <View style={styles.formField}>
      <Text style={styles.formLabel}>
        {label}
        {required ? <Text style={styles.formRequiredMark}> *</Text> : null}
      </Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"}
        onChangeText={onChangeText}
        style={[styles.registerInput, multiline && styles.registerTextArea]}
      />
    </View>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.formSectionTitle}>{title}</Text>
      {description ? <Text style={styles.formSectionDescription}>{description}</Text> : null}
      {children}
    </View>
  );
}

export default function RegisterExpanded({
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: RegisterExpandedProps) {
  const initialForm = useMemo(
    () => ({
      ...emptyForm,
      ...initialValues,
    }),
    [initialValues],
  );

  const [form, setForm] = useState<XSellLeadFormData>(initialForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  function updateField<K extends FieldName>(field: K, value: XSellLeadFormData[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function validate() {
    const requiredFields: Array<[FieldName, string]> = [
      ["companyName", "nome da empresa"],
      ["segment", "segmento"],
      ["contactName", "nome do contato"],
      ["email", "e-mail corporativo"],
      ["phone", "telefone"],
      ["goals", "objetivo com o X-Sell"],
      ["painPoints", "principal desafio comercial"],
    ];

    const missing = requiredFields.find(([field]) => {
      const value = form[field];
      return typeof value === "string" && value.trim().length === 0;
    });

    if (missing) {
      return `Preencha o campo obrigatório: ${missing[1]}.`;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailIsValid) {
      return "Informe um e-mail válido.";
    }

    if (!form.consentLgpd) {
      return "É necessário aceitar o tratamento dos dados para análise comercial.";
    }

    return "";
  }

  async function handleSubmit() {
    const validationError = validate();
    if (validationError) {
      setMessage(validationError);
      setMessageType("error");
      return;
    }

    try {
      await onSubmit?.(form);
      setMessage("Cadastro enviado com sucesso. A equipe Fractals poderá avaliar o melhor caminho para sua empresa.");
      setMessageType("success");
    } catch (error) {
      setMessage("Não foi possível enviar o cadastro agora. Confira os dados e tente novamente.");
      setMessageType("error");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.formKeyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.formScreen}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formHeader}>
          <View style={styles.formHeaderIcon}>
            <Feather name="clipboard" size={24} color={theme.colors.accent} />
          </View>
          <Text style={styles.formTitle}>Cadastro para diagnóstico X-Sell</Text>
          <Text style={styles.formSubtitle}>
            Quanto melhor entendermos sua empresa, mais precisa será a avaliação das oportunidades de cross-sell, retenção e crescimento dentro da sua base de clientes.
          </Text>
        </View>

        <Section
          title="Dados da empresa"
          description="Informações básicas para identificar o perfil do cliente potencial."
        >
          <InputField
            label="Razão social ou nome da empresa"
            required
            value={form.companyName}
            placeholder="Ex.: Empresa ABC Ltda."
            onChangeText={(value) => updateField("companyName", value)}
          />
          <InputField
            label="Nome fantasia"
            value={form.tradeName}
            placeholder="Ex.: ABC Tech"
            onChangeText={(value) => updateField("tradeName", value)}
          />
          <InputField
            label="CNPJ"
            value={form.cnpj}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            onChangeText={(value) => updateField("cnpj", value)}
          />
          <InputField
            label="Segmento de atuação"
            required
            value={form.segment}
            placeholder="Ex.: indústria, SaaS, logística, saúde, varejo B2B"
            onChangeText={(value) => updateField("segment", value)}
          />
          <InputField
            label="Site"
            value={form.website}
            placeholder="https://empresa.com.br"
            keyboardType="url"
            autoCapitalize="none"
            onChangeText={(value) => updateField("website", value)}
          />
          <View style={styles.formRow}>
            <View style={styles.formHalf}>
              <InputField
                label="Cidade"
                value={form.city}
                placeholder="Ex.: São Paulo"
                onChangeText={(value) => updateField("city", value)}
              />
            </View>
            <View style={styles.formHalf}>
              <InputField
                label="UF"
                value={form.state}
                placeholder="SP"
                autoCapitalize="characters"
                onChangeText={(value) => updateField("state", value)}
              />
            </View>
          </View>
        </Section>

        <Section
          title="Contato principal"
          description="Pessoa responsável pela conversa comercial ou pela avaliação da solução."
        >
          <InputField
            label="Nome do contato"
            required
            value={form.contactName}
            placeholder="Nome e sobrenome"
            onChangeText={(value) => updateField("contactName", value)}
          />
          <InputField
            label="Cargo"
            value={form.contactRole}
            placeholder="Ex.: diretor comercial, gerente de vendas, founder"
            onChangeText={(value) => updateField("contactRole", value)}
          />
          <InputField
            label="E-mail corporativo"
            required
            value={form.email}
            placeholder="nome@empresa.com.br"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => updateField("email", value)}
          />
          <InputField
            label="Telefone"
            required
            value={form.phone}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            onChangeText={(value) => updateField("phone", value)}
          />
          <InputField
            label="WhatsApp"
            value={form.whatsapp}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            onChangeText={(value) => updateField("whatsapp", value)}
          />
        </Section>

        <Section
          title="Perfil comercial"
          description="Dados que ajudam a estimar maturidade, volume e potencial de expansão."
        >
          <InputField
            label="Tamanho da empresa"
            value={form.companySize}
            placeholder="Ex.: 11-50, 51-200, 201-500 colaboradores"
            onChangeText={(value) => updateField("companySize", value)}
          />
          <InputField
            label="Tamanho do time comercial"
            value={form.salesTeamSize}
            placeholder="Ex.: 5 vendedores, 2 SDRs, 1 gerente"
            onChangeText={(value) => updateField("salesTeamSize", value)}
          />
          <View style={styles.formRow}>
            <View style={styles.formHalf}>
              <InputField
                label="Ticket médio"
                value={form.averageTicket}
                placeholder="Ex.: R$ 8.000"
                onChangeText={(value) => updateField("averageTicket", value)}
              />
            </View>
            <View style={styles.formHalf}>
              <InputField
                label="Leads/mês"
                value={form.monthlyLeads}
                placeholder="Ex.: 300"
                keyboardType="numeric"
                onChangeText={(value) => updateField("monthlyLeads", value)}
              />
            </View>
          </View>
          <InputField
            label="Ciclo médio de vendas"
            value={form.salesCycle}
            placeholder="Ex.: 30 dias, 90 dias, 6 meses"
            onChangeText={(value) => updateField("salesCycle", value)}
          />
          <InputField
            label="CRM atual"
            value={form.currentCRM}
            placeholder="Ex.: HubSpot, Pipedrive, RD Station, planilhas"
            onChangeText={(value) => updateField("currentCRM", value)}
          />
          <InputField
            label="Ferramentas comerciais usadas hoje"
            value={form.currentTools}
            placeholder="Ex.: WhatsApp, e-mail, ERP, BI, planilhas, automações"
            multiline
            onChangeText={(value) => updateField("currentTools", value)}
          />
        </Section>

        <Section
          title="Objetivo com o X-Sell"
          description="Essas respostas indicam onde o produto pode gerar mais valor."
        >
          <InputField
            label="Principal objetivo"
            required
            value={form.goals}
            placeholder="Ex.: vender mais para clientes atuais, reduzir churn, criar ofertas por perfil"
            multiline
            onChangeText={(value) => updateField("goals", value)}
          />
          <InputField
            label="Principal desafio comercial"
            required
            value={form.painPoints}
            placeholder="Ex.: não sabemos quem abordar, dados estão espalhados, time não prioriza carteira"
            multiline
            onChangeText={(value) => updateField("painPoints", value)}
          />
          <InputField
            label="Fontes de dados disponíveis"
            value={form.dataSources}
            placeholder="Ex.: base de clientes, histórico de vendas, CRM, ERP, NPS, tickets, contratos"
            multiline
            onChangeText={(value) => updateField("dataSources", value)}
          />
          <InputField
            label="Necessidades de integração"
            value={form.integrationNeeds}
            placeholder="Ex.: integrar com CRM, importar planilhas, conectar ERP, exportar relatórios"
            multiline
            onChangeText={(value) => updateField("integrationNeeds", value)}
          />
          <View style={styles.formRow}>
            <View style={styles.formHalf}>
              <InputField
                label="Usuários previstos"
                value={form.expectedUsers}
                placeholder="Ex.: 10"
                keyboardType="numeric"
                onChangeText={(value) => updateField("expectedUsers", value)}
              />
            </View>
            <View style={styles.formHalf}>
              <InputField
                label="Urgência"
                value={form.urgency}
                placeholder="Ex.: imediato, 30 dias"
                onChangeText={(value) => updateField("urgency", value)}
              />
            </View>
          </View>
          <InputField
            label="Faixa de investimento prevista"
            value={form.budgetRange}
            placeholder="Ex.: até R$ 2 mil/mês, R$ 2-5 mil/mês, a definir"
            onChangeText={(value) => updateField("budgetRange", value)}
          />
        </Section>

        <Section title="Observações finais">
          <InputField
            label="Mensagem adicional"
            value={form.notes}
            placeholder="Conte algo importante sobre sua operação, carteira, metas ou prazos."
            multiline
            onChangeText={(value) => updateField("notes", value)}
          />

          <View style={styles.formSwitchRow}>
            <Switch
              value={form.consentContact}
              onValueChange={(value) => updateField("consentContact", value)}
              thumbColor={form.consentContact ? theme.colors.accent : theme.colors.textSecondary}
              trackColor={{ false: theme.colors.border, true: theme.colors.primaryDark }}
            />
            <View style={styles.formSwitchTextBox}>
              <Text style={styles.formSwitchTitle}>Aceito receber contato comercial</Text>
              <Text style={styles.formSwitchDescription}>
                A equipe poderá entrar em contato para entender melhor o cenário e apresentar próximos passos.
              </Text>
            </View>
          </View>

          <View style={styles.formSwitchRow}>
            <Switch
              value={form.consentLgpd}
              onValueChange={(value) => updateField("consentLgpd", value)}
              thumbColor={form.consentLgpd ? theme.colors.accent : theme.colors.textSecondary}
              trackColor={{ false: theme.colors.border, true: theme.colors.primaryDark }}
            />
            <View style={styles.formSwitchTextBox}>
              <Text style={styles.formSwitchTitle}>Autorizo o tratamento dos dados para análise comercial *</Text>
              <Text style={styles.formSwitchDescription}>
                Os dados serão usados para avaliação do potencial de aplicação do X-Sell e para contato sobre a solução.
              </Text>
            </View>
          </View>
        </Section>

        {message ? (
          <Text style={messageType === "success" ? styles.formSuccess : styles.formError}>{message}</Text>
        ) : null}

        <View style={styles.formActions}>
          {onCancel ? (
            <Pressable style={styles.formSecondaryButton} onPress={onCancel} disabled={loading}>
              <Text style={styles.formSecondaryButtonText}>Cancelar</Text>
            </Pressable>
          ) : null}

          <Pressable
            style={[styles.formPrimaryButton, loading && styles.formPrimaryButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.formButtonText}>{loading ? "Enviando..." : "Enviar cadastro"}</Text>
            {!loading ? <Feather name="send" size={18} color={theme.colors.textOnPrimary} /> : null}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
