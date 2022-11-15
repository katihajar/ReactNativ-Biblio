

 import React from "react";
 import { View, StyleSheet, Dimensions,Text } from "react-native";
import PDFReader from 'rn-pdf-reader-js';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';

/* <HTML html={`
    <iframe src="${global.base64Doc}" height="500" width="700">
</iframe>

` }/> */
const DocView = (props) => {
   
  return (

      <PDFReader 
        source={{
         base64:global.base64Doc,
        }}
     
      style={styles.pdf}
    />
  );
}
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    paddingTop: 30,
    flex: 1,
  },
 });
 
export default DocView;