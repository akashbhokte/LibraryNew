import React, { useCallback, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { scale } from 'react-native-size-matters';
import { Colors, EN, Fonts, Images, Size } from '../../../constants';


const FileUpload = ({ leftIcon, label = '', ...rest }: any) => {
    const [hide, setHide] = useState<boolean>(true)
    const [fileResponse, setFileResponse] = useState<any>([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response: any = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                type: [types.pdf, types.images, types.doc],
            });
            console.log("res", response)
            convertToBase64(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const convertToBase64 = async (file: any) => {
        try {
            if (Platform.OS == 'ios') {
                const uriParts = file.uri.split('/');
                const name = uriParts.pop();
                const inbox = uriParts.pop();
                const realPath = `file://${RNFS.TemporaryDirectoryPath}${inbox}/${decodeURIComponent(name)}`;
                var data = await RNFS.readFile(realPath, 'base64').then((res) => {
                    return res;
                })
            }
            else {
                var data = await RNFS.readFile(file.uri, 'base64').then((res) => {
                    return res;
                })
            }
            setFileResponse((prev: any) => [...prev, { "type": file.type, "data": data, "path": file.uri }])
        }
        catch (error) {
            console.log("ERROR", error)
        }
    }

    const deleteImage = (index: any) => {
        setFileResponse([
            ...fileResponse.slice(0, index),
            ...fileResponse.slice(index + 1, fileResponse.length)
        ]);
    }

    return (
        <View style={{ flex: 1, }}>
            <TouchableOpacity onPress={() => setHide(!hide)}>
                <View style={styles.container}>
                    <Image
                        source={leftIcon}
                        style={styles.leftIcon}
                    />
                    <Text style={styles.text}>
                        {label}
                    </Text>
                    <Image
                        source={hide ? Images.RightArrow : Images.UpArrow}
                        style={styles.arrow}
                    />
                </View>
            </TouchableOpacity>
            {
                !hide ?
                    (
                        fileResponse.length > 0 ?
                            (
                                <View style={{ ...styles.imageContainer, }}>
                                    <ScrollView>

                                        {fileResponse.map((i: any, index: any) => {
                                            return (
                                                <View
                                                    key={index.toString()}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: Colors.text,
                                                        borderRadius: 6,
                                                        height: scale(128),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                        width: '100%',
                                                        backgroundColor: Colors.color12,
                                                    }}>
                                                    {
                                                        i.type == 'application/pdf' || i.type == 'application/msword' ?
                                                            <Text style={{ width: scale(282), color: Colors.white, textAlign: 'center' }}>{i.path}</Text>
                                                            :
                                                            <Image
                                                                source={{ uri: `data:image/gif;base64,${i.data}` }}
                                                                style={{ width: scale(282), flex: 1, borderRadius: 6, resizeMode: 'contain' }}
                                                            />
                                                    }
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#626370', position: 'absolute', right: 7, bottom: 8, padding: 7, borderRadius: 3 }}
                                                        onPress={() => deleteImage(index)}
                                                    >
                                                        <Image
                                                            source={Images.DeleteIcon}
                                                            style={{ height: scale(15), width: scale(15), resizeMode: 'contain', }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            )

                                        })}
                                    </ScrollView>

                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: Colors.text,
                                        borderRadius: 6,
                                        borderStyle: 'dashed',
                                        height: scale(71),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        marginTop: 20
                                    }} onPress={handleDocumentSelection}>
                                        <Text style={styles.uploadLabel}>+ Add more</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            (<View style={styles.uploadFileContainer}>
                                <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentSelection}>
                                    <Image
                                        source={Images.UploadIcon}
                                        style={styles.uploadIcon}
                                    />
                                    <Text style={styles.uploadLabel}>{EN.FileUploadLabel}</Text>
                                    <Text style={styles.uploadDescn}>{EN.FileUploadDescn}</Text>
                                </TouchableOpacity>
                            </View>)
                    ) : null
            }
        </View>
    )
}

export default FileUpload

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.color11,
        height: scale(50),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 5
    },
    uploadFileContainer: {
        borderColor: Colors.color11,
        height: scale(173),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: 'center',
        elevation: 3,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 20
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 6,
        borderStyle: 'dashed',
        height: scale(128),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    addMore: {
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 6,
        borderStyle: 'dashed',
        height: scale(71),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        marginTop: 20
    },
    uploadLabel: {
        fontFamily: Fonts.MontserratSemiBold,
        fontSize: Size.F11,
        lineHeight: 13,
        color: Colors.subHead,
        textAlign: 'center',
        marginVertical: 7,
    },
    leftIcon: {
        resizeMode: 'contain',
        width: 28,
        height: 28,
        flex: 2,
    },
    text: {
        fontFamily: Fonts.MontserratSemiBold,
        color: Colors.color6,
        fontSize: Size.F13,
        lineHeight: 16,
        flex: 6.5
    },
    arrow: {
        resizeMode: 'contain',
        width: 10,
        height: 10,
        marginHorizontal: 20
    },
    arrowContainer: {
        flex: 1.5,
        alignItems: 'center',
        height: scale(50),
        justifyContent: 'center',
    },
    uploadIcon: {
        resizeMode: 'contain',
        width: 30,
        height: 18,
    },
    uploadDescn: {
        fontFamily: Fonts.MontserratMedium,
        color: Colors.subHead,
        fontSize: Size.F10,
        lineHeight: 12,
        textAlign: 'center',
        marginHorizontal: 54
    },
    imageContainer: {
        borderColor: Colors.color11,
        height: scale(254),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 5,
        justifyContent: 'center',
        elevation: 3,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 20,
    }
})