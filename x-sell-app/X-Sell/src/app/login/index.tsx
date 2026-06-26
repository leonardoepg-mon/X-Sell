import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { handleLogin } from "../../services/userAuth"
import { useAuth } from "@/contexts/AuthContext";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {ContextLogin} = useAuth()

  return (
    <View style={styles.container}>
      <TextInput style= {styles.input} onChangeText={setUsername}
                 value={username}
                 placeholder="Nome"/>
      <TextInput style= {styles.input} onChangeText={setPassword}
                 value={password}
                 secureTextEntry={true}
                 placeholder="Senha"/>
                  <Pressable
                style={styles.button}
                onPress={async () => {
                  const response = await handleLogin(username, password);
                  setError(response.error);
                  if (response.auth) {
                    ContextLogin(username);
                    router.replace("/(tabs)");
                  }
                }}
                  >
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
