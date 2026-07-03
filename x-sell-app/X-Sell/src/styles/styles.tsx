import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404080",
  },
  input: {
    justifyContent: "center",
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

  buttonRow: {
  flexDirection: "row",
  gap: 10,         
  marginTop: 20,
},

  welcomeMsg: {
    fontWeight: "black",
    fontSize: 20,
    fontFamily: "sans-serif",
  },

    errorMessage: {
    fontWeight: "bold",
    color: "red",
    fontSize: 20,
  },
  
  list: {
    width: "100%",
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: "#0b6774",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    width: "100%",
    minHeight: 70,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  id: {
    fontSize: 14,
    fontWeight: "bold",
  },

  status: {
    fontSize: 14,
    color: "#e45ce4"
  },

  message: {
    marginTop: 6,
    fontSize: 13,
    color: "#440044",
  },

  right: {
    alignItems: "flex-end",
    gap: 6,
  },

  smallButton: {
    backgroundColor: "#ab0fab",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 80,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    marginBottom: 16,
  },

  fileName: {
    color: "blue",
    fontStyle: "italic",
    marginVertical: 10,
  },
  
  cancelButton: {
    padding: 10,
    marginTop: 8,
  },

  errorText: {
    fontWeight: "bold",
    color: "#aa4444",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },

  stars: {
    flexDirection: "row",
    marginBottom: 18,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  sendButton: {
    backgroundColor: "#ab0fab",
    padding: 10,
    borderRadius: 5,
  },
  sendText: {
    color: "#fff",
  },
successMessage: {
  color: "green",
  fontWeight: "bold",
  fontSize: 18,
},

warningMessage: {
  color: "#d98c00",
  fontWeight: "bold",
  fontSize: 18,
},

infoMessage: {
  color: "#007AFF",
  fontWeight: "bold",
  fontSize: 18,
},
filterRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  verticalAlign:"top",
  paddingHorizontal: 3,
  gap: 8,
  marginBottom: 12,
},

filterButton: {
  padding: 8,
  borderRadius: 20,
  backgroundColor: "#ab0fab",
},

filterButtonActive: {
  backgroundColor: "#dd0fd8",
},

});