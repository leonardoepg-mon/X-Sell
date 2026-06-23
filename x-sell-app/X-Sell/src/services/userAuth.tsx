
export async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    return { auth: false, error: "Preencha todos os campos" };
  }

  try {
    const response = await fetch("http://192.168.15.89:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const auth = await response.json();

    if (auth) {
      return { auth: true, error: "Usuário autenticado com sucesso!" };
    }

    return { auth: false, error: "Usuário ou senha inválidos." };
  } catch (err) {
    console.log(err);
    return { auth: false, error: "Erro ao conectar com o servidor." };
  }
}

export async function handleRegister(username: string, password: string) {
    if (!username || !password) {
      return { auth: false, error: "Preencha todos os campos" };
    }

try {
    const response = await fetch("http://192.168.15.89:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, senha: password }),
    });

    const {userExists, saved } = await response.json();

    if (userExists) {
      return { auth: false, error: "Usuário já existe!" };
    }
    else if (saved) return { auth: true, error: "Conta criada com sucesso." };
    else return {auth: false, error: "Erro inesperado com o servidor"};
  } catch (err) {
    console.log(err);
    return { auth: false, error: "Erro ao conectar com o servidor." };
  }
} 