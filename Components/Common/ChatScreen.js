import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { GiftedChat, InputToolbar, Composer, Send, Actions, Bubble, Time } from 'react-native-gifted-chat'
import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Back from "react-native-vector-icons/AntDesign"
import Call from "react-native-vector-icons/MaterialIcons"
import Sendd from "react-native-vector-icons/MaterialIcons"
import Attach from "react-native-vector-icons/Entypo"
import Seperator from '../Profile/Seperator'
import useDocumentPicker from './DocumentPick'
import useImagePicker from './ImagePick'

const ChatScreen = ({ route }) => {

    const [messages, setMessages] = useState([])
    const { pickDocument, selectedDocument } = useDocumentPicker({ submitted: false })
    const { selectedImage, pickImage, takePhoto } = useImagePicker({ submitted: false });
    const { id, image, name } = route.params
    const navigation = useNavigation()

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: id,
                    name: name,
                    avatar: image,
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: '#e7e7e7',
                paddingTop: 3,
                borderColor: '#E8E8E8',
            }}
        />
    );

    const renderComposer = (props) => (
        <Composer
            {...props}
            textInputStyle={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingTop: 8,
                paddingBottom: 8,
            }}
        />
    );

    const renderSend = (props) => {
        return (
            <Send {...props} alwaysShowSend={true}>
                <View style={{ marginRight: 10, marginBottom: 10, marginLeft: 10 }}>
                    <Sendd name="send" size={28} color="black" />
                </View>
            </Send>
        );
    };

    const renderActions = (props) => {
        return (
            <Actions
                {...props}
                containerStyle={{
                    width: 30,
                    height: 45,
                    justifyContent: 'center',
                    marginBottom: 0,
                }}
                icon={() => (
                    <Attach name="attachment" size={25} color="black" />
                )}
                options={{
                    'Open Camera': () => {
                        takePhoto()
                    },
                    'Choose Image': () => {
                        pickImage();
                    },
                    'Choose Document': () => {
                        pickDocument();
                    },
                    Cancel: () => { },
                }}
            />
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: { backgroundColor: '#e7e7e7' },
                    right: { backgroundColor: '#e7e7e7' },
                }}
                textStyle={{
                    left: { color: 'black' },
                    right: { color: 'black' }
                }}
            />
        );
    }

    const renderTime = (props) => (
        <Time
            {...props}
            timeTextStyle={{
                left: { color: 'grey' },
                right: { color: 'grey' },
            }}
        />
    );



    const renderAvatar = () => null;




    return (
        <View style={{ flex: 1 }}>

            <View style={styles.Header}>

                <View style={{ flexDirection: "row", alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Back name="arrowleft" size={28} color="black" />
                    </TouchableOpacity>

                    <Image
                        style={{ height: 30, width: 30, borderRadius: 15, marginLeft: 10 }}
                        source={{ uri: image }} />

                    <Text style={{ color: "black", fontSize: 18, fontWeight: "600", flex: 1, marginLeft: 5 }}>{name}</Text>

                    <TouchableOpacity>
                        <Call name="call" size={25} color="black" />
                    </TouchableOpacity>

                </View>
                <Seperator marginTop={5} />

            </View>


            <ImageBackground
                source={require("../../Assets/Background.png")}
                style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderInputToolbar={renderInputToolbar}
                    renderComposer={renderComposer}
                    renderSend={renderSend}
                    renderActions={renderActions}
                    renderBubble={renderBubble}
                    renderAvatar={renderAvatar}
                    renderTime={renderTime}
                />
            </ImageBackground>


        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    Header: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        paddingRight: 10
    }
})