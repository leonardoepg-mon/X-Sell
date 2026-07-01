
import { handleDownload } from "@/services/fileMgmt";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

//Explicações

export default function Download(protocol: Int32) {
  return (
      <View style={styles.loneButton}>
      <Pressable style={styles.button} onPress={async () => { const response = await handleDownload(protocol);
          console.log(response.message)
      }}>
        <Text selectable={false} style={styles.buttonText} > Baixar </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loneButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404080",
  },
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
