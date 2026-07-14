import About from "@/components/AboutScreen"
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router"

export default function AboutScreen() {
const router = useRouter();
const { isLogged } = useAuth();
  function navigate() {
    if (isLogged) router.navigate("/");
    else router.navigate("/login");
    return
  }

  return <About onStart={navigate}/>
}