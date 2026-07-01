import AsyncStorage from "@react-native-async-storage/async-storage"

export async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    return { success: false, message: "Preencha todos os campos", msgType: "warning", token: null };
  }

  try {
    const response = await fetch("http://192.168.15.89:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const data = await response.json(); 
    return data;

  } catch (err) {
    console.log(err);
    return { success: false, message: "Erro ao conectar com o servidor.", msgType: "error", token: null };
  }
}

export async function handleLogout(username: string | null) {
  try {
    const response = await fetch("http://192.168.15.89:3000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username }),
    });

    const data = await response.json();
    return data
  } catch (err) {
    console.log(err);
    return { success: false, message: "Erro ao conectar com o servidor.", msgType: "error" };
  }
}

export async function handleRegister(username: string, password: string) {
    if (!username || !password) {
      return { success: false, message: "Preencha todos os campos", msgType: "warning" };
    }

try {
    const response = await fetch("http://192.168.15.89:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Erro ao conectar com o servidor.", msgType: "error" };
  }
}

export async function getToken() {
      try { const username = await AsyncStorage.getItem("username");
            const token = await AsyncStorage.getItem("token");
        if (username) {return { exists: true, username: username, token: token};}
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
      try {await AsyncStorage.removeItem("username");}
        catch (err) {console.log(err)} 
  return
}