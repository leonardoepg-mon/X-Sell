import { authFetch } from "./jwtHandling";
const localIP = process.env.EXPO_PUBLIC_SERVER_URL;

export async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    return { success: false, message: "Preencha todos os campos", msgType: "warning", token: null };
  }

  try {
    const response = await fetch(localIP + ':3000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const data = await response.json(); 
    return data;

  } catch (err) {
    console.log(err);
    return { success: false, message: err, msgType: "error", token: null };
  }
}

export async function handleLogout(token?: string) {
  try {
    const response = await authFetch(localIP + ':3000/logout', {
      method: "GET",
      headers: token ? { Authorization: token } : undefined,
    });

    const data = await response.json();
    return data
  } catch (err) {
    console.log(err);
    return { success: false, message: err, msgType: "error" };
  }
}

export async function handleRegister(username: string, password: string) {
    if (!username || !password) {
      return { success: false, message: "Preencha todos os campos", msgType: "warning" };
    }

try {
    const response = await fetch(localIP + ':3000/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err, msgType: "error" };
  }
}
