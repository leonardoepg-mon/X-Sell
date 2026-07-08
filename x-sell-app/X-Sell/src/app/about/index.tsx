import About from "@/components/AboutScreen"
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router"
import { View, Pressable, Text } from "react-native";

export default function AboutScreen() {
const router = useRouter();
  return <View style={styles.container}>
    <About onContact={() => {router.navigate("/login")}}
                onStart={() => {router.navigate("/login")}}/>
                <Pressable style={styles.button} onPress={() => router.navigate("/login")}>
                        <Text selectable={false} style={styles.buttonText} > Voltar </Text>
                      </Pressable>
         </View>
}