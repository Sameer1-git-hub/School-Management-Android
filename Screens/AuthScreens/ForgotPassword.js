import { Image, ImageBackground, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Person from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import Lock from "react-native-vector-icons/MaterialIcons"
import Hide from "react-native-vector-icons/Feather"

const windowHeight = Dimensions.get('window').height;

const ForgotPassword = () => {

    const [isSecure, setIsSecure] = useState(false)
    const [UserName, setUserName] = useState("")
    const navigation = useNavigation()


    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mainContainer}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require("../../Assets/Background.png")}>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: "200" }}>
                        Forgot your password?
                    </Text>
                </View>

                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>Provide Username</Text>
                </View>

                <View style={{ alignItems: 'center' }}>

                    <View style={styles.inputContainer}>

                        <Person name="person" color="#e6e6e6" size={20} />

                        <TextInput
                            placeholder='Username'
                            placeholderTextColor="white"
                            style={styles.userName}
                            value={UserName}
                            onChangeText={(t) => { setUserName(t) }} />

                    </View>

                    <View style={styles.Login}>
                        <TouchableOpacity
                            style={{ paddingRight: 5, flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '300' }}>Change Password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.Login}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={{ paddingRight: 5, flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '300' }}>Back To Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        </ScrollView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
    },
    backgroundImage: {
        padding: 15,
        flex: 1,
    },
    logoText: {
        color: "#01272e",
        fontWeight: "700",
        fontSize: 22,
    },
    userName: {
        flex: 1,
        fontSize: 16,
        borderRadius: 20,
        height: 47,
        fontWeight: '300',
        color: 'white',
        paddingLeft: 15
    },
    inputContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#3CA9B4',
        height: 47,
        paddingHorizontal: 10,
        width: 300,

    },
    Login: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#F98864",
        height: 47,
        paddingHorizontal: 10,
        width: 300,
        marginTop: 10
    },
    logo: {
        color: "black",
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    logoContainer: {
        alignItems: 'center',
        height: windowHeight * 0.175,
        justifyContent: 'center',
        marginTop: windowHeight * 0.02,
    },

})