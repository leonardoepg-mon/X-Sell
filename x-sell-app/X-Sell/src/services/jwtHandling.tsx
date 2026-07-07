//move token related things here (including authfetch)
import AsyncStorage from "@react-native-async-storage/async-storage"
const localIP = process.env.EXPO_PUBLIC_SERVER_URL;

export async function checkToken(token?: string) {
      try {
    const response = await authFetch(localIP + ':3000/validate', {
      method: "GET",
      headers: token ? { Authorization: token } : undefined,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err, msgType: "error" };
  }
}

export async function getToken() {
      try { const username = await AsyncStorage.getItem("username");
            const token = await AsyncStorage.getItem("token");
        if (username && token) {return { exists: true, username: username, token: token};}
        else return { exists: false, username: username, token: token};
      }
        catch (err) {console.log(err);
          return { exists: false, username: "", token: ""};
        } 
}

export async function putToken(username:string, token: string) {
      if (! username) {return {success: false, message: "No username given."};}
      try {await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("token", token);
        return {success: true, message: "Sessão guardada"}
      }
        catch (err) {console.log(err);
          return {success:false, message: err}
        } 
}

export async function killToken() {
      try {await AsyncStorage.removeItem("username");
           await AsyncStorage.removeItem("token");
      }
        catch (err) {console.log(err)} 
  return
}


let onExpiredToken: (() => void) | null = null;

export function setOnExpiredToken(callback: () => void) {
  onExpiredToken = callback;
}

export async function authFetch(url: string, options: RequestInit = {}) {
  const savedToken = await AsyncStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (savedToken && !headers.has("Authorization")) {
    headers.set("Authorization", savedToken);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    await killToken();
    onExpiredToken?.();
    throw new Error("Sessão Expirada");
  }

  return response;
}