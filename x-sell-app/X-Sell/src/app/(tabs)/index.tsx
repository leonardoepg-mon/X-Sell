import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

//Explicações

export default function Index() {
  const router = useRouter();
  const {ContextLogout} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMsg} > Bem-vindo! </Text>
      <Text > Explicações </Text>
      <Pressable style={styles.button} onPress={() => {router.navigate('/(tabs)/status');}}>
        <Text selectable={false} style={styles.buttonText} > Ver requisições </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {
                                                  ContextLogout();
                                                  router.replace('/login');}}>
        <Text selectable={false} style={styles.buttonText} > Fechar sessão </Text>
      </Pressable>
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
  welcomeMsg: {
    fontWeight: "black",
    fontSize: 20,
    fontFamily: "sans-serif",
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
  }
});
