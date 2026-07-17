import { XSellLeadFormData } from "@/components/UserAuth/RegisterExpanded";

const localIP = process.env.EXPO_PUBLIC_XSELL_SERVER_URL;

export async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    return { success: false, message: "Preencha todos os campos", msgType: "warning", token: null, isAdmin: false};
  }

  try {
    const response = await fetch(localIP + '/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;

  } catch (err) {
    console.log(err);
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error", token: null, isAdmin: false };
  }
}

export async function handleRegister(formData: XSellLeadFormData) {

try {
    const response = await fetch(localIP + '/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err instanceof Error ? err.message : err, msgType: "error" };
  }
}
