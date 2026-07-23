import About from "@/components/AboutScreen"
import { AppBackground } from "@/components/AppBackground";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router"

export default function AboutScreen() {
const router = useRouter();
const { isLogged, isAdmin } = useAuth();
  function navigate() {
    if (!isLogged) {
      router.replace("/login");
      return;
    }

    router.replace(isAdmin ? "/(admin)" : "/(tabs)");
  }

  return <AppBackground>
  <About onStart={navigate}/>
  </AppBackground>
}
