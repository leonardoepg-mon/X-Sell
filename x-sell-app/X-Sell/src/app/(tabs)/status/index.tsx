import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

//Explicações

export default function Index() {
  const [text, onChangeText] = useState('');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text> Status de requisições </Text>
      <Pressable style={styles.button} onPress={() => {router.navigate('/(tabs)/feed/upload');}}>
        <Text selectable={false} style={styles.buttonText} > Nova requisição </Text>
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
