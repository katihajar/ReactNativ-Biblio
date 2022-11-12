import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);




const Register = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data2, setData] = useState([]);

  
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8036/api/universite/', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {console.log("log :"+JSON.stringify(data));
  var count = Object.keys(data).length;
  let dropDownData = [];

  data.map( (data) =>{



dropDownData.push( {value:data.libelle   , obj:data}    ); // Create your array of data


  }  )


  setData(dropDownData)

  
  console.log("hnaaa   "+data2)

})

},[] );


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { navigation } = props;
  const {err, setErr}=useState('');


 
  return (
    
    <DismissKeyboard>
      <ScrollView showsVerticalScrollIndicator={false}>{
      <Block flex>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex  style={{ paddingHorizontal: theme.SIZES.BASE * 1.3}}>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} style={{ paddingHorizontal: theme.SIZES.BASE ,backgroundColor: nowTheme.COLORS.WHITE}}>
                  <Block flex={0.5} style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                      Register
                    </Text>
                  </Block>

                  <Block flex={0.5} row space="between" style={{ paddingHorizontal: theme.SIZES.BASE ,marginBottom: 18 }}>
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
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                {err != null ? (
                                                <Text style={styles.textStyle}>
                                                    {err ? err : ''}
                                                    {'\n'}
                                                   
                                                </Text>
                                            ) : null}</Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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

                <Block flex={1} style={{ paddingHorizontal: theme.SIZES.BASE }} space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>

                        <Block width={width * 0.8} >
                          <Input
                            placeholder="username"
                            style={styles.inputs}
                            onChangeText={newText => setUsername(newText)}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="profile-circle"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            onChangeText={newText => setEmail(newText)}
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
                            placeholder="Phone Number"
                            onChangeText={newText => setPhone(newText)}
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="mobile2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Password"
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
                        <Block>
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data2}
                            maxHeight={300}
                            labelField="value"
                             valueField="value"
                            placeholder={!isFocus ? 'Select Universite' : '...'}
                            searchPlaceholder="Search..."
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            value="value"
                            onChange={item => {
                              console.log("item  "+ item.obj );
                              setValue(item.obj);
                              setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                              <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                              />
                            )}
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
                      <Block center style={{marginBottom: 2}}>
                        <Button color="primary" round style={styles.createButton} onPress={() => {
                          console.log("login");
                          console.log(value);
                          fetch('http://localhost:8036/api/auth/signup', {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              username: username,
                              password: password,
                              phone: phone,
                              email: email,
                              universite: value
                            })
                          }).then((response) => response.json())
                            .then((data) => {
                              console.log(data);
                              if (data.accessToken != null) {
                                navigation.navigate('SignIn');
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                              setErr("Failled to register")
                            });
                        }} >
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Get Started
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
                              SignIn? 
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
      }</ScrollView>
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
    height: height < 820 ? height * 0.8 : height * 0.9,
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
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 21.5,
    paddingHorizontal: 8,
    backgroundColor: 'white'
},
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

export default Register;
