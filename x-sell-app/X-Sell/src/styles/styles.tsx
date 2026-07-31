import { StyleSheet } from "react-native";

export const theme = {
  colors: {
fv_new_darkest: "#5e306a",
fv_new_dark: "#673e9e",
fv_new_vivid: "#453ec2",
fv_new_light_vivid: "#406cd3",
fv_new_light: "#489dda",
fv_new_vivid_lightest: "#52c6d8",
fv_new_pale: "#7ee6d4",
fv_new_lightest: "#e0f5eb",

    background: "#673e9e", //"#7d3682",// jacarte-color-light?
    backgroundSoft: "#5e306a",//"#3f2b54",// jacarte-color
    logoBackground: "#493b5f",// jacarte-color - variant
    surface: "#331b33",//eerie-black-color
    surfaceAlt: "#673e9e", //"#24324D",
    surfaceLight: "#e0f5eb",//"#F8FAFC",

    primary: "#489dda",//"#00A6D6",
    primaryDark: "#453ec2",//"#116162", // maximum-blue-green-dark?
    primaryLight: "#52c6d8",//"#22c2c5",// maximum-blue-green-color
    accent: "#7ee6d4", //"#45E0C1",

    text: "#e0f5eb",//"#cbd5e1",// columbia-blue-color
    textMinor: "#7ee6d4",//"#32d2d5",// maximum-blue-green-color
    textSecondary: "#673e9e", //"#655576",//black-coral-color
    textOnLight: "#5e306a",//"#172033",
    textOnPrimary: "#e0f5eb",//"#cbd5e1",// columbia-blue-color

    success: "#489dda",//"#116163",// maximum-blue-green-color
    warning: "#cc4322",//smashed-pumpkin-color
    error: "#d90429",//red-color
    info: "#673e9e",//"#7d3682",// jacarte-color-light?

    iconButtonColor: "#453ec2",//"#2d4941",
    filterButtonActive: "#e0f5eb",//"#e1e1e1",
    filterButtonInactive: "#489dda",//"#d35cd3",
    stars: "#489dda",//"#09a8a0",
    starsOld: "#5e306a",//"#045450",
    isAdmin: "#52c6d8",//"#16be2c",
    notAdmin: "#673e9e",//"#3894d1",

    border: "#083031", // maximum-blue-green-darkest?
    borderLight:  "#e0f5eb",//"#cbd5e1",// columbia-blue-color
    overlay: "#5e306a88",//"rgba(61, 43, 84, 0.65)",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 5,
    md: 8,
    lg: 12,
    xl: 20,
    pill: 999,
  },

  icons: {
    sm: 18,
    md: 24,
    lg: 32,
    xs: 10,
  },

  shadows: {
    card: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 10,
      elevation: 4,
    },
  },
};

export const aboutStyles = StyleSheet.create({
  aboutScreen: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "rgba(0,0,0,0,1)"

  },

  aboutContent: {
    width: "100%",
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },

  aboutHeroCard: {
    backgroundColor: theme.colors.logoBackground,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    ...theme.shadows.card,
  },

  welcomeCard: {
    width: "90%",
    height: "70%",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.logoBackground,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    ...theme.shadows.card,
  },

  aboutLogoRow: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },

  aboutLogo: {
    width: 200,
    height: 60,
  },

  aboutBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },

  aboutBadgeText: {
    color: theme.colors.textOnLight,
    fontWeight: "800",
    fontSize: 12,
  },

  aboutHeroTitle: {
    color: theme.colors.textOnPrimary,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
  },

  aboutHeroSubtitle: {
    color: theme.colors.textOnPrimary,
    fontSize: 16,
    lineHeight: 24,
  },

  aboutHeroImage: {
    width: "100%",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceAlt,
  },

  aboutCtaRow: {
    justifyContent: "center",
    alignItems: "stretch",
    gap: theme.spacing.xl,
  },

  aboutPrimaryButton: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },

  aboutPrimaryButtonWide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    width: "100%",
  },

  aboutPrimaryButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },

  aboutSecondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundSoft,
  },

  aboutSecondaryButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  aboutSection: {
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },

  aboutSectionKicker: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  aboutSectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
  },

  aboutSectionText: {
    color: theme.colors.textMinor,
    fontSize: 15,
    lineHeight: 23,
  },

  aboutCardGrid: {
    gap: theme.spacing.md,
  },

  aboutValueCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.card,
  },

  aboutValueIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },

  aboutCardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
  },

  aboutCardText: {
    color: theme.colors.textMinor,
    fontSize: 14,
    lineHeight: 21,
  },

  aboutImageCard: {
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    ...theme.shadows.card,
  },

  aboutImageFull: {
    width: "100%",
    height: 190,
    backgroundColor: theme.colors.surfaceAlt,
  },

  aboutImageTextBox: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  aboutWorkflowBox: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    ...theme.shadows.card,
  },

  aboutStep: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },

  aboutStepNumber: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primaryDark,
    borderColor: theme.colors.primaryLight,
    borderWidth: 1,
  },

  aboutStepNumberText: {
    color: theme.colors.textOnPrimary,
    fontSize: 13,
    fontWeight: "900",
  },

  aboutStepContent: {
    flex: 1,
    gap: theme.spacing.xs,
  },

  aboutStepTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },

  aboutStepText: {
    color: theme.colors.textMinor,
    fontSize: 14,
    lineHeight: 21,
  },

  aboutBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },

  aboutBulletText: {
    flex: 1,
    color: theme.colors.textMinor,
    fontSize: 15,
    lineHeight: 22,
  },

  aboutCtaBox: {
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.primaryDark,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    ...theme.shadows.card,
  },

  aboutCtaTitle: {
    color: theme.colors.textMinor,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
  },

  aboutCtaText: {
    color: theme.colors.textMinor,
    fontSize: 15,
    lineHeight: 23,
  },
});

export const styles = StyleSheet.create({
 
  // ─── Estrutura geral de tela ───────────────────────────────────────────────
  statusContainer: {flex: 1, alignItems: "stretch", width: "100%", justifyContent: "center", padding: theme.spacing.lg, position: "relative"},
  container: { flex: 1, alignSelf: "stretch", alignItems: "center",width: "92%", justifyContent: "center", padding: theme.spacing.lg, position: "relative" },
  content: { flex: 1, zIndex: 1, alignSelf: "stretch", justifyContent: "center"  },
  formKeyboardView: { flex: 1, backgroundColor: theme.colors.background },
  formScreen: { flex: 1, backgroundColor: theme.colors.background },

  // ─── Inputs ───────────────────────────────────────────────────────────────
  input: { height: 50, margin: 12, padding: 10, justifyContent: "center", alignSelf: "center",
     minWidth: 130, maxWidth: "60%", borderWidth: 1, backgroundColor: theme.colors.surfaceLight,
      borderColor: theme.colors.borderLight, color: theme.colors.textOnLight,
       borderRadius: theme.radius.md, paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm },
  registerInput: { width: "100%", minHeight: 16, backgroundColor: theme.colors.backgroundSoft,
     borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.md,
      paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg,
       color: theme.colors.text, fontSize: 15 },
  registerTextArea: { minHeight: 110, lineHeight: 22 },
  oldTextInput: { width: "100%", minHeight: 16, backgroundColor: theme.colors.backgroundSoft,
     borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.md,
      paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg, marginTop: 5,
       color: theme.colors.accent, fontSize: 12 },
  oldTextArea: { minHeight: 48, lineHeight: 16, textAlign: "center" },

  // ─── Textos genéricos e mensagens ─────────────────────────────────────────
  welcomeMsg: { fontWeight: "900", fontSize: 20, fontFamily: "sans-serif", 
    color: theme.colors.text, textAlign: "center" },
  errorMessage: { fontWeight: "700", color: theme.colors.error, fontSize: 20, 
    textAlign: "center" },
  errorText: { fontWeight: "700", color: theme.colors.error, fontSize: 16, marginTop: theme.spacing.sm, textAlign: "center" },
  successMessage: { color: theme.colors.success, fontWeight: "700", fontSize: 18, textAlign: "center" },
  warningMessage: { color: theme.colors.warning, fontWeight: "700", fontSize: 18, textAlign: "center" },
  infoMessage: { color: theme.colors.textOnLight, fontWeight: "700", fontSize: 18, textAlign: "center" },
  title: { fontSize: 18, marginBottom: theme.spacing.lg, fontWeight: "700", color: theme.colors.textOnLight, textAlign: "center" },
  fileName: { alignSelf: "center", color: theme.colors.primaryDark, fontStyle: "italic", marginVertical: theme.spacing.md },
  usernameText: {color: theme.colors.textOnLight, fontWeight: "700", textAlign: "center",},

  // ─── Botões genéricos ──────────────────────────────────────────────────────
  button: { backgroundColor: theme.colors.primary, borderWidth: 1, alignSelf: "center", 
    borderColor: theme.colors.primaryDark, borderRadius: theme.radius.md,
     paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.md, margin: theme.spacing.sm,},
  buttonText: { color: theme.colors.textOnPrimary, fontWeight: "700", textAlign: "center" },
  cancelButton: { alignSelf: "center",padding: theme.spacing.md,  marginTop: theme.spacing.sm, backgroundColor: theme.colors.backgroundSoft, borderRadius: theme.radius.md, paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, minWidth: 50 },
  cancelBText: { color: theme.colors.textOnPrimary, fontWeight: "700", textAlign: "center" },
  logoutButton: {
  position: "absolute",
  right: theme.spacing.lg,
  bottom: theme.spacing.lg,
  zIndex: 10,

  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.sm,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.backgroundSoft,
},
  logoutBText: { color: theme.colors.textOnPrimary, fontWeight: "700", textAlign: "center" },
  sendButton: { backgroundColor: theme.colors.primary, padding: theme.spacing.md, borderRadius: theme.radius.md },
  sendText: { color: theme.colors.textOnPrimary, fontWeight: "700", textAlign: "center" },
  smallButton: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm,
     paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs, margin: 1, minWidth: "5%" },
  buttonRow: { flexDirection: "row", alignSelf: "center", paddingRight: 60, flexWrap: "wrap" },
  buttonColumn: { flexDirection: "column", gap: theme.spacing.md, margin: theme.spacing.sm, },
  buttons: { flexDirection: "row", gap: theme.spacing.md },

  // ─── Cards e listas de status ──────────────────────────────────────────────
  list: { width: "100%", justifyContent: "flex-start", paddingHorizontal: theme.spacing.xs },
  card: {backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.lg,
    padding: theme.spacing.sm, marginVertical: theme.spacing.xs, width: "100%", minHeight: 20,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    ...theme.shadows.card,},
  id: { fontSize: 12, fontWeight: "700", color: theme.colors.text },
  status: { fontSize: 14, color: theme.colors.accent, fontWeight: "600" },
  message: { marginTop: theme.spacing.sm, fontSize: 13, color: theme.colors.textSecondary },
  detailsText: { marginTop: theme.spacing.xs, fontSize: 10, color: theme.colors.textSecondary },
  stars: { flexDirection: "row", marginBottom: theme.spacing.xl, justifyContent: "center" },
  listContainer: {alignSelf: "stretch" },

  // ─────────────────────── listas ───────────────────────
  userDetails: { flexDirection: "row", padding: theme.spacing.xs, width: "100%",  minHeight: 12,
    justifyContent: "space-between",  alignItems: "stretch", borderBottomWidth: 1, borderEndWidth: 0,
    borderColor: theme.colors.border,},
  left: {  justifyContent: "center", marginRight: 10, gap: theme.spacing.xs, },
  right: {    justifyContent: "center",   marginLeft: 10,   gap: theme.spacing.xs,  },
  titleRow: { flexDirection: "row", gap: theme.spacing.sm },
  detailsSeparator: { width: "100%", height: 1, backgroundColor: "rgba(63, 43, 84, 0.2)", marginVertical: 12 },
  detailCategory: { flexDirection: "row", justifyContent: "space-between"},

  // ─── Filtros ───────────────────────────────────────────────────────────────
  filterRow: { flexDirection: "row", alignSelf: "center", alignItems: "center", paddingHorizontal: theme.spacing.xs, gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  filterButton: { padding: theme.spacing.sm, borderRadius: theme.radius.pill, backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border, borderWidth: 1 },
  filterButtonActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primaryLight },

  // ─── Modal genérica ────────────────────────────────────────────────────────
  overlay: { flex: 1 , backgroundColor: theme.colors.overlay, alignItems: "center", justifyContent: "center" },
  boxContainer: { width:"60%", backgroundColor: theme.colors.surfaceLight, borderRadius: theme.radius.lg, padding: theme.spacing.md, alignItems: "stretch", borderColor: theme.colors.borderLight, borderWidth: 1, ...theme.shadows.card,},
  boxContent: {flexDirection: 'column',alignItems: "stretch", justifyContent: "space-around",},
  boxContainerLarge: { width:"80%", backgroundColor: theme.colors.surfaceLight, borderRadius: theme.radius.lg, padding: theme.spacing.md, alignItems: "stretch", borderColor: theme.colors.borderLight, borderWidth: 1, ...theme.shadows.card,},
  boxContentLarge: {flexDirection: 'column', alignItems: "stretch", justifyContent: "space-around",},
  boxContainerSmall: { width:"40%", backgroundColor: theme.colors.surfaceLight, borderRadius: theme.radius.lg, padding: theme.spacing.md, alignItems: "stretch", borderColor: theme.colors.borderLight, borderWidth: 1, ...theme.shadows.card,},
  boxContentSmall: {flexDirection: 'column', alignItems: "stretch", justifyContent: "space-around",},

  // ─── Planilha-exemplo ────────────────────────────────────────────────────────
    exContainer: { width: "100%", maxWidth: "100%"},
    exBorder: { borderWidth: 1, borderColor: theme.colors.borderLight, borderTopLeftRadius: theme.radius.lg, borderTopRightRadius: theme.radius.lg},
    exDetails: { backgroundColor: theme.colors.backgroundSoft},
    exDetailsText: { color: theme.colors.primary},
    exHeader: { backgroundColor: theme.colors.background},
    exHeaderText: { color: theme.colors.primaryLight},
    exScrollContent: {flexGrow: 1, justifyContent: "center"},

  // ─── Formulários ───────────────────────────────────────────────────────────
  formContent: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxl, gap: theme.spacing.lg },
  formHeader: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.xl, padding: theme.spacing.xl, gap: theme.spacing.md, ...theme.shadows.card },
  formHeaderIcon: { width: 50, height: 50, borderRadius: theme.radius.lg, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border, borderWidth: 1 },
  formTitle: { color: theme.colors.text, fontSize: 26, lineHeight: 33, fontWeight: "900" },
  formSubtitle: { color: theme.colors.textSecondary, fontSize: 15, lineHeight: 23 },
  formSection: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.xl, padding: theme.spacing.lg, gap: theme.spacing.md },
  formSectionTitle: { color: theme.colors.text, fontSize: 19, fontWeight: "900" },
  formSectionDescription: { color: theme.colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: -theme.spacing.xs },
  formField: { width: "100%", gap: theme.spacing.xs },
  formLabel: { color: theme.colors.text, fontSize: 14, fontWeight: "700" },
  formRequiredMark: { color: theme.colors.accent, fontWeight: "900" },
  formRow: { width: "100%", flexDirection: "row", gap: theme.spacing.md },
  formHalf: { flex: 1, minWidth: 130 },
  formSwitchRow: { flexDirection: "row", alignItems: "flex-start", gap: theme.spacing.md, backgroundColor: theme.colors.backgroundSoft, borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.lg, padding: theme.spacing.md },
  formSwitchTextBox: { flex: 1, gap: theme.spacing.xs },
  formSwitchTitle: { color: theme.colors.text, fontSize: 14, fontWeight: "800" },
  formSwitchDescription: { color: theme.colors.textSecondary, fontSize: 13, lineHeight: 19 },
  formError: { color: theme.colors.error, fontSize: 15, fontWeight: "800", textAlign: "center", backgroundColor: theme.colors.backgroundSoft, borderColor: theme.colors.error, borderWidth: 1, borderRadius: theme.radius.lg, padding: theme.spacing.md },
  formSuccess: { color: theme.colors.success, fontSize: 15, fontWeight: "800", textAlign: "center", backgroundColor: theme.colors.backgroundSoft, borderColor: theme.colors.success, borderWidth: 1, borderRadius: theme.radius.lg, padding: theme.spacing.md },
  formActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: theme.spacing.md },
  formPrimaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: theme.spacing.sm, backgroundColor: theme.colors.primary, borderColor: theme.colors.primaryLight, borderWidth: 1, borderRadius: theme.radius.md, paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl },
  formPrimaryButtonDisabled: { opacity: 0.6 },
  formButtonText: { color: theme.colors.textOnPrimary, fontSize: 15, fontWeight: "900" },
  formSecondaryButton: { alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.backgroundSoft, borderColor: theme.colors.border, borderWidth: 1, borderRadius: theme.radius.md, paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl },
  formSecondaryButtonText: { color: theme.colors.text, fontSize: 15, fontWeight: "800" },
});