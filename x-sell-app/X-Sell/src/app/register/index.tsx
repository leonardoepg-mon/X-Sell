import { useAuth } from "@/contexts/AuthContext";
import { handleRegister } from "@/services/userAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Alert } from "react-native";


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {login} = useAuth();
  return (
    <View style={styles.container}>
      <TextInput style= {styles.input} onChangeText={setUsername}
                 value={username}
                 placeholder="Nome"/>
      <TextInput style= {styles.input} onChangeText={setPassword}
                 value={password}
                 secureTextEntry={true}
                 placeholder="Senha"/>
      <Pressable style={styles.button} onPress= {async () => {
                        const response = await handleRegister(username, password);
                        setError(response.error);
                        if (response.auth) {
                          login();
                          router.replace("/(tabs)")
                        }
                      }}>
        <Text selectable={false} style={styles.buttonText} > Registrar </Text>
      </Pressable>
      <Text > Já tem conta? </Text>
      <Pressable style={styles.button} onPress={() => router.navigate("./login")}>
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
