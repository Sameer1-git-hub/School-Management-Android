import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MyProfile from '../Screens/DrawerScreens/MyProfile';
import TeacherStack from './TeacherStack';
import StudentStack from './StudentStack';
import AdminStack from './AdminStack';
import HomeIcon from "react-native-vector-icons/AntDesign"
import CustomDrawer from '../Components/Drawer/CustomDrawer';
import Settings from '../Screens/DrawerScreens/Settings';
import LoadingScreen from '../Components/Home/LoadingScreen';
import { ImageBackground, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'



const Drawer = createDrawerNavigator();

const MyDrawer = ({ role, isLoading }) => {

    if (isLoading) return <LoadingScreen />

    // const StackByRole = () => {
    //     if (role === "super admin")
    //         return <AdminStack />
    //     if (role === "admin")
    //         return <AdminStack />
    //     if (role === "teacher")
    //         return <TeacherStack />
    //     if (role === "student")
    //         return <StudentStack />
    // }

const StackByRole = () => {
        if (role === "super admin") return <AdminStack />;
        if (role === "admin") return <AdminStack />;
        if (role === "teacher") return <TeacherStack />;
        if (role === "student") return <StudentStack />;
        return <Text>No valid role</Text>;
    };
console.log("Drawer Role:", role)
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerStyle: { width: "60%" },
                drawerLabelStyle: { marginLeft: -25, color: 'black' },
                drawerActiveBackgroundColor: '#D5EEFB',
                drawerActiveTintColor: "black",
                headerShown: false,
            }}>

            <Drawer.Screen
                name="Home"
                component={StackByRole}
                options={{
                    drawerIcon: () => (
                        <HomeIcon name="home" size={20} color="black" />
                    )
                }} />

            <Drawer.Screen
                name="Profile"
                component={MyProfile} options={{
                    drawerIcon: () => (
                        <HomeIcon name="user" size={20} color="black" />
                    )
                }} />

            <Drawer.Screen
                name="Change Password"
                component={Settings}
                options={{
                    drawerIcon: () => (
                        <HomeIcon name="setting" size={20} color="black" />
                    )
                }} />



        </Drawer.Navigator>
    );
}

export default MyDrawer;
