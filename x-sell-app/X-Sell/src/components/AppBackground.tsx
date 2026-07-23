import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "@/styles/styles";
import { BackgroundOverlay } from "@/styles/backgroundOverlay";

export function AppBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.root}>
      <BackgroundOverlay />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignContent: "stretch",

    // É opaco de propósito, para esconder a tela anterior do Stack.
    backgroundColor: theme.colors.background,
  },

  content: {
    flex: 1,
    alignSelf: "center",
    width:"92%",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
});