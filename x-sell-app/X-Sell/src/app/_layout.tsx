import { AuthProvider } from "@/contexts/authContext";
import RootLayout from "@/routes/rootLayout"; 

export default function Layout() {
  return <AuthProvider>
    <RootLayout/>
  </AuthProvider>
}

