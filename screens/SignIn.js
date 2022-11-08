import axios from 'axios';
import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);


const SignIn = (props) =>{
  
  const { navigation } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
      <DismissKeyboard>
        <Block flex >
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex style={{ paddingHorizontal: theme.SIZES.BASE * 1.3}} >
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} style={{ paddingHorizontal: theme.SIZES.BASE ,backgroundColor: nowTheme.COLORS.WHITE}} >
                    <Block flex={0.5} style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Sign Inn
                      </Text>
                    </Block>

                    <Block flex={0.5} row tyle={{paddingTop: theme.SIZES.BASE }} space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="google"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.GOOGLE}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="linkedin"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.LINKEDIN}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} tyle={{paddingTop: theme.SIZES.BASE }}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block>
                  <Block flex={1} tyle={{paddingTop: theme.SIZES.BASE }} space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>


                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Username"
                              name="username"
                              style={styles.inputs}
                              onChangeText={newText => setUsername(newText)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Password"
                              name="password"
                              style={styles.inputs}
                              onChangeText={newText => setPassword(newText)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="lock-circle-open2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15 }}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'montserrat-regular'
                              }}
                              label="I agree to the terms and conditions."
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton} onPress={ ()=>{
                           console.log("login");
                           fetch('http://10.214.41.144:8036/api/auth/login', {
                              method: 'POST',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                username: username,
                                password: password
                              })
                            }) .then((response) => response.json())
                            .then((data) => {
                              console.log(data);
                              if(data.accessToken !=null){
                                global.token=data.accessToken;
                                global.user=data;
                                console.log(global.user);
                                navigation.navigate('App');
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          }} >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              login
                            </Text>
                          </Button>
                          <Button
                            shadowless
                            style={{ backgroundColor: nowTheme.COLORS.WHITE }}
                            onPress={() => navigation.navigate('Account')}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                              color={theme.COLORS.BLACK}
                            >
                              GET STARTED? SignUp
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default SignIn;
