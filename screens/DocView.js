

 import React from "react";
 import { View, StyleSheet, Dimensions,Text } from "react-native";
import PDFReader from 'rn-pdf-reader-js';
const DocView = (props) => {
   
  return (
      <PDFReader 
        source={{
          base64: global.base64Doc
        }}
      />
    
  );
}
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
 });
 
export default DocView;