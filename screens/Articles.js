import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
import { SafeAreaView, View, VirtualizedList, SectionList, StatusBar,FlatList,Image } from 'react-native';
import { articles, nowTheme } from '../constants/';
import { Card } from '../components/';
import { Button, Icon, Input } from '../components';
const Articles = (props) => {


  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const accessToken = global.token;
  const [data, setData] = useState();

  

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8036/api/document/doc/id/' + global.idUser, {
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
    <Block flex style={{ paddingHorizontal: theme.SIZES.BASE*1.1 }}>
       <Block right >
          <Button color="primary" round style={styles.createButton} onPress={() => {
            navigation.navigate('FormDoc');
          }} >
            <Text
              style={{ fontFamily: 'montserrat-bold' }}
              size={14}
              color={nowTheme.COLORS.WHITE}
            >
              Upload Doc
            </Text>

          </Button>

        </Block>
        <Block flex row>
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
                   <Text  style={{color:'blue'}}>View Document</Text>
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
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
    backgroundColor: 'white',
    height: 250,
    marginVertical: 8,
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


export default Articles;
