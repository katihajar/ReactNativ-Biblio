import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants/';
import { Card } from '../components/';
import { Button, Icon, Input } from '../components';
const Articles = (props) => {
  const { navigation } = props;


    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{ <Block style={styles.container}>
        <Block right >
                        <Button color="primary" round style={styles.createButton} onPress={() => { navigation.navigate('FormDoc');
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
          <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={articles[2]} />
        </Block>
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} full />
        
      </Block>}</ScrollView>
      </Block>
    );
  
    }

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    
    color: nowTheme.COLORS.HEADER
  }
});

export default Articles;
