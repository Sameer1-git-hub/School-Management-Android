import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import Signout from "react-native-vector-icons/MaterialIcons"
import Share from "react-native-vector-icons/AntDesign"
import Seperator from '../Profile/Seperator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../authContext'



const CustomDrawer = (props) => {
    const windowHeight = Dimensions.get('window').height;
    const { setUserExists, setUserRole, UserData } = useAuth();

    const signOut_User = async () => {
        await AsyncStorage.removeItem("USER_Exists");
        await AsyncStorage.removeItem("USER_Role");
        await AsyncStorage.removeItem("Token");
        setUserExists(null);
        setUserRole(null);
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={{ height: windowHeight * 0.28, backgroundColor: '#D5EEFB' }}>
                <ImageBackground
                    style={{ flex: 1, padding: 10, justifyContent: 'flex-end' }}
                    source={require("../../Assets/Background.png")}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 50 }}
                        source={require("../../Assets/dummyProfile.png")} />
                    <Text style={styles.name}>{UserData?.first_name} {UserData?.last_name}</Text>
                </ImageBackground>
            </View>

            <DrawerContentScrollView {...props} style={{ paddingTop: 10 }}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Seperator />
            <View style={{ paddingHorizontal: 20 }}>
                <ImageBackground source={require("../../Assets/Background.png")}>

                    <TouchableOpacity style={styles.signout}>
                        <Share name="sharealt" size={20} color="black" />
                        <Text style={styles.bottomText}>Invite </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={signOut_User}
                        style={[styles.signout, { paddingBottom: 10 }]}>
                        <Signout name="logout" size={20} color="black" />
                        <Text style={styles.bottomText}>Sign Out </Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>

        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: "400",
        paddingLeft: 5,
        paddingTop: 10,
        color: "black"
    },
    regNo: {
        fontSize: 20,
        fontWeight: "300"
    },
    signout: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    bottomText: {
        fontSize: 15,
        color: "black",
        paddingLeft: 10
    }
})