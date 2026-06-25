// funções de upload e download
import * as DocumentPicker from "expo-document-picker"
import { useState } from "react"


//
export async function handleUpload(document: DocumentPicker.DocumentPickerAsset | null) {
  if (!document) {
    return {success: false, message: "Nenhum documento selecionado." };
  }

  try {
    const formData = new FormData();

    const file = await fetch(document.uri);
    const blob = await file.blob();

    formData.append("uploadFile", blob, document.name);

    const response = await fetch("http://192.168.15.89:3000/upload", {
      method: "POST",

      body: formData,
    });

    const text = await response.text();

    return {
      success: response.ok,
      message: text,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Erro ao conectar com o servidor.",
    };
  }
    }

export async function pickDocument() { 
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        return result.assets[0]
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
    return null
}

