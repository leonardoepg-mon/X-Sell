import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

//Explicações

export default function Index() {
  const [text, onChangeText] = useState('');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text> Subir tabela </Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text selectable={false} style={styles.buttonText} > Botão de subir </Text>
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
