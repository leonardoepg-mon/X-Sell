import {
  Image,
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { aboutStyles, styles, theme } from "@/styles/styles";

const images: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/images/fractals-logo.png")
};

type AboutProps = {
  onStart?: () => void;
  visible: boolean;
};

export default function Welcome({ onStart, visible }: AboutProps) {
  return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onStart}>
      <View style={styles.overlay}>
      <View style={aboutStyles.welcomeCard}>
        <View style={aboutStyles.aboutLogoRow}>
          <Image source={images.logo} style={aboutStyles.aboutLogo} 
    resizeMode="contain" />
          <View style={aboutStyles.aboutBadge}>
            <Feather name="zap" size={14} color={theme.colors.background} />
            <Text style={aboutStyles.aboutBadgeText}>Inteligência comercial</Text>
          </View>
        </View>

        <Text style={aboutStyles.aboutHeroTitle}>
          X-Sell: Experimente um jeito novo de direcionar seu esforço de vendas.
        </Text>

        <Text style={aboutStyles.aboutHeroSubtitle}>
          Uma solução da FV para organizar dados comerciais, encontrar oportunidades de cross-selling e up-selling, e orientar a equipe para vender mais dentro da carteira atual.
        </Text>

        <View style={aboutStyles.aboutCtaRow}>
          <TouchableOpacity activeOpacity={0.85} style={aboutStyles.aboutPrimaryButton} onPress={onStart}>
            <Text style={aboutStyles.aboutPrimaryButtonText}> Começar a usar </Text>
            <Feather name="arrow-right" size={18} color={theme.colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </Modal>
  );
}
