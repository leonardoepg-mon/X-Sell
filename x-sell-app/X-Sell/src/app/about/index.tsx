import About from "@/components/AboutScreen"
import { useAuth } from "@/contexts/authContext";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router"
import { View } from "react-native";

export default function AboutScreen() {
const router = useRouter();
const { isLogged } = useAuth();
  function navigate() {
    if (isLogged) router.navigate("/");
    else router.navigate("/login");
    return
  }

  return <View style={styles.container}>
    <About onStart={navigate}/>
          </View>
}