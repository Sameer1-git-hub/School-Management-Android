import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import Refresh from "react-native-vector-icons/MaterialCommunityIcons"
import Menu from "react-native-vector-icons/Entypo"
import Back from "react-native-vector-icons/AntDesign"
import { useNavigation, useNavigationState } from '@react-navigation/native'


const Header = ({ title }) => {
    const navigation = useNavigation()

    const CurrentScreenName = () => {
        return useNavigationState((state) => state.routes[state.index].name);
    }
    const Active_Screen = CurrentScreenName()
    // console.log(Active_Screen)

    useEffect(() => {
        navigation.closeDrawer();
    }, []);
    
    return (
        <View style={styles.MainView}>

            <View style={{ flexDirection: "row", padding: 5, alignItems: 'center' }}>
                {
                    Active_Screen.toLowerCase().includes("home") &&
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Menu name="menu" size={28} color="black" />
                    </TouchableOpacity>
                }

                {
                    !Active_Screen.toLowerCase().includes("home") &&
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Back name="arrowleft" size={28} color="black" />
                    </TouchableOpacity>
                }

                <Text style={{ color: "black", fontSize: 20, fontWeight: "600", flex: 1, marginLeft: 10 }}>{title}</Text>

                {
                    Active_Screen.toLowerCase().includes("home") &&
                    <TouchableOpacity>
                        <Refresh name="refresh" size={28} color="black" />
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    MainView: {
        width: "100%",
        // borderColor: "red",
        // borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1
    }
})