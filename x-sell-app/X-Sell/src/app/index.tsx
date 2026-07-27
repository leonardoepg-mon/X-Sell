import { useRouter } from "expo-router";
import { AppBackground } from "@/components/AppBackground";
import Welcome from "@/components/WelcomeScreen";

export default function Login() {
  const router = useRouter();
  return <AppBackground>
      <Welcome visible onStart={ () => {router.navigate("/login");}}/>
    </AppBackground>
}
