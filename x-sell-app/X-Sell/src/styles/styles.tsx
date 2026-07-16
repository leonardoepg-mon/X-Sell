import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    background: "#7d3682",// jacarte-color-light?
    backgroundSoft: "#3f2b54",// jacarte-color
    surface: "#18181b",//eerie-black-color
    surfaceAlt: "#24324D",
    surfaceLight: "#F8FAFC",

    primary: "#00A6D6",
    primaryDark: "#116162", // maximum-blue-green-dark?
    primaryLight: "#22c2c5",// maximum-blue-green-color
    accent: "#45E0C1",

    text: "#cbd5e1",// columbia-blue-color
    textSecondary: "#655576",//black-coral-color
    textOnLight: "#172033",
    textOnPrimary: "#cbd5e1",// columbia-blue-color

    success: "#22c2c5",// maximum-blue-green-color
    warning: "#ff6731",//smashed-pumpkin-color
    error: "#d90429",//red-color
    info: "#7d3682",// jacarte-color-light?

    border: "#083031", // maximum-blue-green-darkest?
    borderLight:  "#cbd5e1",// columbia-blue-color
    overlay: "rgba(61, 43, 84, 0.65)",
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    position: "relative",
  },
content: {
  flex: 1,
  zIndex: 1,
},
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    justifyContent: "center",
    minWidth: 50,
    borderWidth: 1,
    backgroundColor: theme.colors.surfaceLight,
    borderColor: theme.colors.borderLight,
    color: theme.colors.textOnLight,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },

  buttonText: {
    color: theme.colors.textOnPrimary,
    fontWeight: "700",
    textAlign: "center",
  },

  button: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 5,
  },
  buttonColumn: {
    flexDirection: "column",
    gap: 2,
  },

  welcomeMsg: {
    fontWeight: "900",
    fontSize: 20,
    fontFamily: "sans-serif",
    color: theme.colors.text,
    textAlign: "center",
  },

  errorMessage: {
    fontWeight: "700",
    color: theme.colors.error,
    fontSize: 20,
    textAlign: "center",
  },

  list: {
    width: "100%",
    paddingHorizontal: theme.spacing.xs,
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    width: "100%",
    minHeight: 20,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    ...theme.shadows.card,
  },

  left: {
    alignItems: "flex-start",
    flex:1
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  id: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.text,
  },

  status: {
    fontSize: 14,
    color: theme.colors.accent,
    fontWeight: "600",
  },

  message: {
    marginTop: theme.spacing.sm,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },

  detailsText: {
    marginTop: theme.spacing.xs,
    fontSize: 10,
    color: theme.colors.textSecondary,
  },

  right: {
    alignItems: "flex-end",
    gap: theme.spacing.xs,
  },

  smallButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    minWidth: 10,
  },

  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: 300,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: theme.colors.borderLight,
    borderWidth: 1,
    ...theme.shadows.card,
  },

  title: {
    fontSize: 18,
    marginBottom: theme.spacing.lg,
    fontWeight: "700",
    color: theme.colors.textOnLight,
    textAlign: "center",
  },

  fileName: {
    color: theme.colors.primaryDark,
    fontStyle: "italic",
    marginVertical: theme.spacing.md,
  },

  cancelButton: {
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.backgroundSoft,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 50,
  },

  cancelBText: {
    color: theme.colors.textOnPrimary,
    fontWeight: "700",
    textAlign: "center",
  }
  ,

  errorText: {
    fontWeight: "700",
    color: theme.colors.error,
    fontSize: 16,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },

  stars: {
    flexDirection: "row",
    marginBottom: theme.spacing.xl,
  },

  buttons: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },

  sendButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },

  sendText: {
    color: theme.colors.textOnPrimary,
    fontWeight: "700",
    textAlign: "center",
  },

  successMessage: {
    color: theme.colors.success,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },

  warningMessage: {
    color: theme.colors.warning,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },

  infoMessage: {
    color: theme.colors.info,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.xs,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  filterButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },

  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryLight,
  }, 
  aboutScreen: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0,1)"
  },

  aboutContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },

  aboutHeroCard: {
    backgroundColor: theme.colors.surface,
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },

  aboutLogo: {
    width: 150,
    height: 46,
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
    color: theme.colors.background,
    fontWeight: "800",
    fontSize: 12,
  },

  aboutHeroTitle: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
  },

  aboutHeroSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },

  aboutHeroImage: {
    width: "100%",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceAlt,
  },

  aboutCtaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },

  aboutPrimaryButton: {
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
    color: theme.colors.text,
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
    color: theme.colors.textSecondary,
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
    color: theme.colors.textSecondary,
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
    color: theme.colors.textSecondary,
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
    color: theme.colors.textSecondary,
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
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
  },

  aboutCtaText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },

  formKeyboardView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  formScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  formContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },

  formHeader: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    ...theme.shadows.card,
  },

  formHeaderIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },

  formTitle: {
    color: theme.colors.text,
    fontSize: 26,
    lineHeight: 33,
    fontWeight: "900",
  },

  formSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },

  formSection: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  formSectionTitle: {
    color: theme.colors.text,
    fontSize: 19,
    fontWeight: "900",
  },

  formSectionDescription: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -theme.spacing.xs,
  },

  formField: {
    width: "100%",
    gap: theme.spacing.xs,
  },

  formLabel: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },

  formRequiredMark: {
    color: theme.colors.accent,
    fontWeight: "900",
  },

  registerInput: {
    width: "100%",
    minHeight: 48,
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: 15,
  },

  registerTextArea: {
    minHeight: 110,
    lineHeight: 22,
  },

  formRow: {
    width: "100%",
    flexDirection: "row",
    gap: theme.spacing.md,
  },

  formHalf: {
    flex: 1,
    minWidth: 130,
  },

  formSwitchRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },

  formSwitchTextBox: {
    flex: 1,
    gap: theme.spacing.xs,
  },

  formSwitchTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  formSwitchDescription: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  formError: {
    color: theme.colors.error,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },

  formSuccess: {
    color: theme.colors.success,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },

  formActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: theme.spacing.md,
  },

  formPrimaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },

  formPrimaryButtonDisabled: {
    opacity: 0.6,
  },

  formButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 15,
    fontWeight: "900",
  },

  formSecondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.backgroundSoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },

  formSecondaryButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  detailsSeparator: {
  width: "100%",
  height: 1,
  backgroundColor: "rgba(63, 43, 84, 0.2)",// jacarte-color
  marginVertical: 12,
},

});
