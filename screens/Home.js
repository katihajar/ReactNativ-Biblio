import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar } from "react-native";
import { SafeAreaView, View, FlatList, Image } from 'react-native';
import { Input, Icon } from '../components';
import { nowTheme } from '../constants';
import { Block, theme, Text } from "galio-framework";
import { WebView } from 'react-native-webview';
import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");
import { NativeModules } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { decode, encode } from 'base-64';
import * as Sharing from 'expo-sharing';
const Home = (props) => {
  const RNReactNativeDocViewer = NativeModules.RNReactNativeDocViewer;

  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const accessToken = global.token;
  const [data, setData] = useState();
  const [doc, setDoc] = useState();


  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };

  /* <WebView
                      javaScriptEnabled={true}
                      source={{
                        html: `
                              <iframe src="data:${item.fileType};base64,${item.file}">
          </iframe>

      ` }}
  
                    />
          <Document file="${item.fileType};base64,${item.file}" > </Document>
                    */


  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8036/api/document/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (loading) {
          setData(data);
          setDoc(data[1]);
        }

      });
    return () => {
      setLoading(false);
    };
  }, [])


  return (
    <Block flex style={{ paddingHorizontal: theme.SIZES.BASE * 1.1 }}>
      <Block center >
        <Input
          flex={0}
          placeholder="search for document"
          shadowless
          iconContent={
            <Icon
              size={11}
              style={{ marginRight: 10 }}
              color={nowTheme.COLORS.ICON}
              name="zoom-bold2x"
              family="NowExtra"
            />
          }
        /></Block>
      <Block row style={{ paddingBottom: theme.SIZES.BASE * 6 }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (

                <View style={[styles.item, styles.elevation]}>

                  <Image
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/375px-Image_created_with_a_mobile_phone.png" }}
                    style={styles.im}
                  />
                  <Text >{item.titre}</Text>
                  <Button
                    shadowless
                    style={{ backgroundColor: nowTheme.COLORS.WHITE, height: 20, cursor: 'pointer' }}
                    onPress={async () => {
                      global.base64Doc = `data:application/pdf;base64,${item.file}`;
                      //global.fileName = item.titre;
                      const pdfBuffer = item.file;

                      // const path = `${FileSystem.documentDirectory}/${item.titre}`;
                      //  await FileSystem.writeAsStringAsync(`${path}`, pdfBuffer, {
                      //    encoding: FileSystem.EncodingType.Base64,
                      // });


                      const filename = FileSystem.documentDirectory+"/" + item.titre;
                      FileSystem.writeAsStringAsync(filename, pdfBuffer, {
                        encoding: FileSystem.EncodingType.Base64
                      }).then(async () => {
                        //Sharing.shareAsync(filename);
                        await FileSystem.readAsStringAsync(filename,{ mimeType: item.fileType});
                      });
                    
                      //await FileSystem.downloadAsync(pdfBuffer,path, {  encoding: FileSystem.EncodingType.Base64 });
                     
                     //await FileSystem.readAsStringAsync(path, { mimeType: item.fileType,encoding: FileSystem.EncodingType.Base64 });
                      //await Sharing.shareAsync(path, { mimeType: item.fileType });
                      global.fileUri = filename;
                      navigation.navigate("DocView");



                    }}
                  >
                    <Text style={{ color: 'blue' }}>View Document</Text></Button>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />

        </SafeAreaView>
      </Block>
    </Block>
  );

}

const styles = StyleSheet.create({
  Home: {
    width: width
  },
  container: {
    flex: 1,
    marginTop: 4,


  },
  item: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
    backgroundColor: 'white',
    height: 250,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 10,
  },

  title: {
    fontSize: 32,
  },

  im: {
    height: 210, width: 350,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textV: {
    alignItems: 'right',
    color: 'blue'
  }
});

export default Home;
