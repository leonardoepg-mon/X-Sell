import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  function handleLogin() {
    setError("");
    const data = { nome: username, senha: password};
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }
    try { 
      fetch('http://192.168.15.89:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(data)
      }).then((response) => response.json())
    .then((auth) => {
      //console.log("auth recebido:", auth);
      if (auth) {
          setError("Usuário autenticado com sucesso!");
      //console.log("login sucesso");
          router.replace("../(tabs)");
        } else {
          setError("Usuário ou senha inválidos.")
        }
      })
    } catch(err) {console.log(err) }
  }

  return (
    <View style={styles.container}>
      <TextInput style= {styles.input} onChangeText={setUsername}
                 value={username}
                 placeholder="Nome"/>
      <TextInput style= {styles.input} onChangeText={setPassword}
                 value={password}
                 secureTextEntry={true}
                 placeholder="Senha"/>
      <Pressable style={styles.button} onPress={() => handleLogin()}>
        <Text selectable={false} style={styles.buttonText} > Login </Text>
      </Pressable>
      <Text > Não tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/register")}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
        <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404080",
  },
  input: {
    borderWidth: 2,
    backgroundColor: "#FFF",
    borderColor: "#abcfdf"
  },
  buttonText: {
    fontStyle: "italic",
    color: "#11a1b3"
  },
  button: {
    backgroundColor: '#ab0fab',
    borderWidth: 1,
    borderRadius:5,
  },
    errorMessage: {
    fontWeight: "bold",
    color: "red",
    fontSize: 20,
  }
});
