import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";



export default function Index() {
  const [text, onChangeText] = useState('');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TextInput style= {styles.input} onChangeText={onChangeText}
                 value={text}
                 placeholder="Write here"/>
      <Text> Your name is {text}{ !text ? "?":"." } {"\n \n \n"}</Text>
      <Pressable style={styles.button} onPress={() => {router.navigate('/button');}}>
        <Text selectable={false} style={styles.buttonText} > GO TO BUTTON </Text>
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
