import { ImageBackground, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Person from "react-native-vector-icons/MaterialIcons"
import Lock from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import PasswordVisiblity from '../../Components/Common/PasswordVisibility'
import Validations from '../../Components/FromValidation/Validations'
import { useAuth } from '../../authContext'

const windowHeight = Dimensions.get('window').height;

const Signup = () => {

    const [isSecure, setIsSecure] = useState(true)
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [userExist, setUserExist] = useState(false)
    const { setUserExists, setUserRole } = useAuth();
    const { handleUsernameValidation, handlePasswordValidation, checkDisable, error } = Validations(UserName, Password);
    const navigation = useNavigation()
    const isDisabled = checkDisable()

    const handleSignup = async () => {
        const UserRole = "Teacher"
        await AsyncStorage.setItem("USER_Exists", "true");
        await AsyncStorage.setItem("USER_Role", UserRole);
        setUserExists(true)
        setUserRole(UserRole)
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mainContainer}>

            <ImageBackground
                style={styles.backgroundImage}
                source={require("../../Assets/Background.png")}>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Login") }}
                    style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ color: "#0F96A3", fontWeight: '400' }}>
                        LogIn
                    </Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>School Monitoring</Text>
                </View>

                <View style={{ alignItems: 'center', height: windowHeight * 0.3, marginBottom: 15 }}>

                    <View style={styles.inputContainer}>

                        <Person name="person" color="#e6e6e6" size={20} />

                        <TextInput
                            placeholder='Username'
                            placeholderTextColor="white"
                            style={styles.userName}
                            value={UserName}
                            onChangeText={(t) => { setUserName(t), handleUsernameValidation() }} />

                    </View>

                    {
                        error.toLowerCase().includes("name") ?
                            <Text style={{ color: "red", fontSize: 12, fontWeight: "300" }}>{error}</Text>
                            :
                            null
                    }

                    {
                        userExist &&
                        <View style={styles.inputContainer}>

                            <Lock name="lock" color="#e6e6e6" size={18} />

                            <TextInput
                                placeholder='Password'
                                placeholderTextColor="white"
                                secureTextEntry={isSecure}
                                style={styles.userName}
                                value={Password}
                                onChangeText={(t) => { setPassword(t), handlePasswordValidation() }} />

                            <PasswordVisiblity
                                isSecure={isSecure}
                                toggleSecure={() => setIsSecure(!isSecure)}
                                color="white"
                            />

                        </View>

                    }

                    {
                        userExist && error.toLowerCase().includes("password") ?
                            <Text style={{ color: "red", fontSize: 12, fontWeight: "300" }}>{error}</Text>
                            :
                            null
                    }

                    <View style={[styles.Login, isDisabled ? { opacity: 0.7 } : { opacity: 1 }]}>
                        <TouchableOpacity
                            disabled={isDisabled}
                            onPress={() => { userExist ? handleSignup() : setUserExist(true) }}
                            style={{ paddingRight: 5, flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '300' }}>{userExist ? "SignUp" : "Verify"}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                    <View style={{ alignItems: 'center' }}>

                        <Text style={{ fontWeight: '400', color: '#0F96A3', fontSize: 13, marginBottom: 5 }}>Version:2.2.5(P)</Text>

                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <Text style={{ fontWeight: '400', color: 'black', fontSize: 14 }}>  Powered by
                            <Text style={{ color: "#0F96A3", fontWeight: 'bold' }}>  FireFly </Text>
                        </Text>

                    </View>

                </View>

            </ImageBackground>
        </ScrollView>
    )
}

export default Signup

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
        marginTop: 10,

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
        color: "#0F96A3",
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    logoContainer: {
        alignItems: 'center',
        height: windowHeight * 0.21,
        justifyContent: 'center',
        marginTop: windowHeight * 0.02,
    }
})