import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import Attendance from '../Screens/AdminScreens/Attendance'
import News from '../Screens/Common/News'
import NewsDetails from '../Screens/Common/NewsDetails'
const AdminStack = () => {
    const Authorized = createNativeStackNavigator()
    return (
        <Authorized.Navigator initialRouteName='HomeScreen'>

            <Authorized.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
            <Authorized.Screen name="Attendance" component={Attendance} options={{ headerShown: false }} />
            <Authorized.Screen name='News' component={News} options={{ headerShown: false }} />
            <Authorized.Screen name='NewsDetails' component={NewsDetails} options={{ headerShown: false }} />

        </Authorized.Navigator>
    )
}

export default AdminStack
