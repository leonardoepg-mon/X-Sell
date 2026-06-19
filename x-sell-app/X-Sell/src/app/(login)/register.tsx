import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Alert } from "react-native";
import users from "../../data/users.json"


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  function handleRegister() {
    setError("");
    const userExists = users.find(
                    (user) => user.nome === username
                    );
    
    if (!username || !password) {
      setError("Preencha todos os campos");
      Alert.alert(error);
      return;
    }

    if (!userExists) { // Já existe?
      setError("Conta criada com sucesso!");
      //users.concat({"nome":username, "senha":password});
      router.replace("../(tabs)");
    }
    else { 
        setError("Usuário já existe!");
      return
    }
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
