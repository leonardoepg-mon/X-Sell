import { PropsWithChildren } from "react";
import { View } from "react-native";
import { styles } from "@/styles/styles";
import { BackgroundOverlay } from "@/styles/backgroundOverlay";

export function AppBackground({
  children,
}: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <BackgroundOverlay />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}