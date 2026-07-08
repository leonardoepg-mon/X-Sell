import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    background: "#3f1b41",
    backgroundSoft: "#49324b",
    surface: "#182235",
    surfaceAlt: "#24324D",
    surfaceLight: "#F8FAFC",

    primary: "#00A6D6",
    primaryDark: "#007EA7",
    primaryLight: "#45E0C1",
    accent: "#45E0C1",

    text: "#F4F7FA",
    textSecondary: "#A8B4C8",
    textOnLight: "#172033",
    textOnPrimary: "#FFFFFF",

    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#38BDF8",

    border: "#2F415E",
    borderLight: "#D7E1EA",
    overlay: "rgba(42, 7, 51, 0.65)",
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
    gap: 10,
    marginTop: theme.spacing.xl,
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
    paddingHorizontal: theme.spacing.md,
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    width: "100%",
    minHeight: 70,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    ...theme.shadows.card,
  },

  left: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  id: {
    fontSize: 14,
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

  right: {
    alignItems: "flex-end",
    gap: theme.spacing.sm,
  },

  smallButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 80,
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
    padding: theme.spacing.xl,
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
});
