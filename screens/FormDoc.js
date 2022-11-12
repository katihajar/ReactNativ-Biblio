import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
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


const FormDoc = (props) => {
    const { navigation } = props;
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data2, setData] = useState([]);
    const accessToken = global.token;
    const [checked, setChecked] = useState(false);
    const toggleChecked = () => {
        setChecked(value => !value);
        console.log("hna chked  " + checked);
    };
    const [singleFile, setSingleFile] = useState(null);
    const [doc, setDoc] = useState();
    const [uri, setUri] = useState();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [size, setSyze] = useState();
    const selectFile = async () => {
        try {
            let res = await DocumentPicker.getDocumentAsync({
            });
            console.log('res : ' + JSON.stringify(res));
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;

        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true
        })
            .then(response => {
                if (response.type == 'success') {
                    let { name, size, uri } = response;

                    / ------------------------/
                    if (Platform.OS === "android" && uri[0] === "/") {
                        uri = `file://${uri}`;
                        uri = uri.replace(/%/g, "%25");
                    }
                    / ------------------------/

                    let nameParts = name.split('.');
                    let fileType = nameParts[nameParts.length - 1];
                    var fileToUpload = {
                        name: name,
                        size: size,
                        uri: uri,
                        type: "application/" + fileType
                    };
                    console.log(fileToUpload, '...............file')
                    setType("application/" + fileType);
                    setName(name);
                    setUri(uri);
                    setSyze(size);
                    setDoc(fileToUpload);
                }
            });
        // console.log(result);

    }

    useEffect(() => {
        console.log(accessToken);
        setLoading(true);
        fetch('http://localhost:8036/api/thematique/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("log :" + JSON.stringify(data));
                var count = Object.keys(data).length;
                let dropDownData = [];
                data.map((data) => {
                    dropDownData.push({ value: data.domaine, obj: data }); // Create your array of data
                })
                setData(dropDownData)
                console.log("hnaaa   " + data2)
            })
    }, []);

    return (
        <DismissKeyboard>
            <Block flex style={{ paddingHorizontal: theme.SIZES.BASE * 1.3 }}>
                <Block flex >
                    <Block style={styles.registerContainer}>
                        <Block flex space="evenly">
                            <Block flex={1} style={{ paddingHorizontal: theme.SIZES.BASE }} space="between">
                                <Block center flex={0.9}>
                                    <Block flex space="between">
                                        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 30 }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'montserrat-regular',
                                                    textAlign: 'center'
                                                }}
                                                color="#333"
                                                size={24}
                                            >
                                                Upload Document
                                            </Text>
                                        </Block>
                                        <Block>
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
                                                    placeholder={!isFocus ? 'Select Thematique' : '...'}
                                                    searchPlaceholder="Search..."
                                                    onFocus={() => setIsFocus(true)}
                                                    onBlur={() => setIsFocus(false)}
                                                    value="value"
                                                    onChange={item => {
                                                        console.log("item  " + item.obj);
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
                                            <TouchableOpacity
                                                style={styles.buttonStyle}
                                                activeOpacity={0.5}
                                                onPress={pickDocument}>
                                                <Text style={styles.buttonTextStyle}>Select File</Text>
                                            </TouchableOpacity>
                                            {/*Showing the data of selected Single file*/}
                                            {doc != null ? (
                                                <Text style={styles.textStyle}>
                                                    File Name: {doc.name ? doc.name : ''}
                                                    {'\n'}
                                                    File Size: {doc.size ? doc.size : ''}
                                                    {'\n'}
                                                </Text>
                                            ) : null}
                                            <Block
                                                style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15 }}
                                                row
                                                width={width * 0.75}
                                            >
                                                <Checkbox
                                                    label="Add Public"
                                                    checkboxStyle={{
                                                        borderWidth: 1,
                                                        borderRadius: 2,
                                                        borderColor: '#E3E3E3'
                                                    }}
                                                    checked={checked}
                                                    onChange={toggleChecked}
                                                    color={nowTheme.COLORS.PRIMARY}
                                                    labelStyle={{
                                                        color: nowTheme.COLORS.HEADER,
                                                        fontFamily: 'montserrat-regular'
                                                    }}

                                                />
                                            </Block>
                                        </Block>
                                        <Block center style={{ marginBottom: 2 }}>
                                            <Button color="primary" round style={styles.createButton} onPress={() => {
                                                console.log("login");
                                                console.log("Doc: " + doc);
                                                console.log("name :" + name);
                                                console.log("type :" + type);
                                                console.log("uri :" + uri);
                                                const formData = new FormData();
                                                formData.append('file', { uri, name: name, type: type });
                                                formData.append('visi', checked);
                                                formData.append('them',  value.id );
                                                formData.append('user',  global.idUser );
                                                console.log("data file : " + JSON.stringify(formData));
                                                fetch('http://localhost:8036/api/document/upload', {
                                                    method: 'POST',
                                                    headers: {
                                                        Accept: 'application/json',
                                                        'Authorization': `Bearer ${accessToken}`
                                                    },
                                                    body: formData


                                                }).then((response) =>{
                                                    response.json();
                                                    setValue(null);
                                                    setDoc(null);
                                                    setChecked(false);
                                                    setIsFocus(false);
                                                }
                                                )
                                                    .catch((err) => {
                                                        console.log(err);
                                                    });
                                            }} >
                                                <Text
                                                    style={{ fontFamily: 'montserrat-bold' }}
                                                    size={14}
                                                    color={nowTheme.COLORS.WHITE}
                                                >
                                                    Upload
                                                </Text>

                                            </Button>

                                        </Block>


                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
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
        marginTop: 10,
        marginBottom: 10,
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
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
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
        marginBottom: 50
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

export default FormDoc;

