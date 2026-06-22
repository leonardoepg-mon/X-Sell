import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Alert } from "react-native";


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleRegister() {
    setError("");

    if (!username || !password) {
      setError("Preencha todos os campos");
  
      return;
    }

    const data = { nome: username, senha: password};
    try { 
      fetch('http://192.168.15.89:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(data)
      }).then((response) => response.json())
    .then(({userExists, saved}) => {
      console.log("userExists: ", userExists);
      console.log("saved: ", saved);
      if (userExists) {
          setError("Usuário já existe.")
        }
      else if (saved) {
          setError("Conta criada com sucesso!");
      console.log("criação de conta sucesso");
          router.navigate("./");
        }
      else setError("Erro inesperado!")
      })
    } catch(err) {console.log(err) };
    return  ;
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
      <Pressable style={styles.button} onPress={() => handleRegister()}>
        <Text selectable={false} style={styles.buttonText} > REGISTRAR </Text>
      </Pressable>
      <Text > Já tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("/")}>
        <Text selectable={false} style={styles.buttonText} > Login </Text>
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
