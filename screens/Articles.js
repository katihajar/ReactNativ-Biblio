import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';
import { SafeAreaView, View, VirtualizedList,SectionList, StatusBar } from 'react-native';
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
        setData(data);
       
      })
  })
  const student_data= ()=>{
    
    for(const i=0;i<data.lenght;i++){
      console.log("lenght :"+data.lenght);
      console.log("title :"+(data.titre));
      
 return(<Text>{data[i].titre}</Text>);

};
  }
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false}>{
        <Block style={styles.container}>
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
        <Text size={16} style={styles.title}>
          Cards
        </Text>
        <Card item={articles[0]} horizontal />
        <Block flex row>

        </Block>
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} full />

      </Block>}</ScrollView>
    </Block>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default Articles;
