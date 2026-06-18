import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";



export default function Index() {
  const [pressed, setPress] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Pressed {pressed} times.</Text>
      <Pressable style={{backgroundColor: '#ab0fab',
                        borderWidth: 1,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,}} 
        onPress={() => {
                                  setPress(pressed + 1);
                 }}>
        <Text> Press Here </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "1010d0"
  },
});
