import { useRouter } from "expo-router";

import RegisterExpanded from "@/components/RegisterExpanded";
import { AppBackground } from "@/components/AppBackground";
//Botão para mostrar expandido

export default function Register() {

  const router = useRouter();

  return (
    <AppBackground>
      <RegisterExpanded
      onSuccess={() => {router.navigate("/login")}} 
      onCancel={() => {router.navigate("/login")}}/>
    </AppBackground>
    
  );
}
