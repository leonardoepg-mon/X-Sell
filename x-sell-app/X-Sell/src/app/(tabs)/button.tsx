import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";



export default function Home() {
  const [pressed, setPress] = useState(0);

  return (
    <View style={styles.container} >
      <Text>You pressed {pressed} time{pressed === 1 ? "": "s"}.</Text>
      <Pressable style={styles.button} 
        onPress={() => {
                                  setPress(pressed + 1);
                 }}>
        <Text selectable={false}> Press Here </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404080"
  },
  button: {
    backgroundColor: '#ab0fab',
    borderWidth: 1,
    borderRadius: 5,
  }
});
