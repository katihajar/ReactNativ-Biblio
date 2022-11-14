import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView,StatusBar} from "react-native";
import { SafeAreaView, View,FlatList,Image } from 'react-native';
import { Input ,Icon} from '../components';
import { nowTheme } from '../constants';
import OpenFile from 'react-native-files-viewer';
import { Block, theme, Text } from "galio-framework";
import { WebView } from 'react-native-webview';
import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

const Home = (props) => {
  
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const accessToken = global.token;
  const [data, setData] = useState();

/* <WebView
                    javaScriptEnabled={true}
                    source={{
                      html: `
        <iframe src="data:${item.fileType};base64,${item.file}">
        </iframe>
    ` }}
                  />
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
        if(loading ){
        setData(data);
        }

      });
      return () => {
        setLoading(false);
        };
    }, [])

  
    return (
      <Block flex style={{ paddingHorizontal: theme.SIZES.BASE*1.1}}>
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
      <Block row style={{paddingBottom:theme.SIZES.BASE*6}}>
      
            <SafeAreaView style={styles.container}>
              <FlatList
                data={data}
                renderItem={({ item }) => {
                  return (
                    <View style={[styles.item,styles.elevation]}>
                    <Image
                     source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/375px-Image_created_with_a_mobile_phone.png" }}
                    style={styles.im}
                  />
                   <Text >{item.titre}</Text>
                   <Button
                            shadowless

                            style={{ backgroundColor: nowTheme.COLORS.WHITE,height:20,cursor: 'pointer' }}
                            onPress={() =>{
                              if (Platform.OS === 'android') {
                                OpenFile.openDocb64(
                                  {
                                    base64:item.file,
                                    fileName: item.titre,
                                    fileType: item.fileType,
                                  },
                                );
                              }
                            }}
                          >
                   <Text  style={{color:'blue'}}>View Document</Text></Button>
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
Home:{
  width:width
},
container: {
  flex: 1,
  marginTop: 4,
  
  
},
  item: {
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
    borderRadius: 8,  
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
    backgroundColor: 'white',
    height: 250,
    marginVertical: 10,
    justifyContent:'center',
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
 
  im:{
    height: 210, width: 350,
    borderTopLeftRadius: 8,  
    borderTopRightRadius: 8,
  },
  textV:{
    alignItems: 'right',
    color:'blue'
  }
});

export default Home;
