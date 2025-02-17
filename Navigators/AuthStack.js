import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/AuthScreens/Login'
import ForgotPassword from '../Screens/AuthScreens/ForgotPassword'
import Signup from '../Screens/AuthScreens/Signup'

const AuthStack = () => {

    const UnAuthorized = createNativeStackNavigator()
    
    return (
        <UnAuthorized.Navigator initialRouteName='Login'>

            <UnAuthorized.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <UnAuthorized.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <UnAuthorized.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />

        </UnAuthorized.Navigator>
    )
}

export default AuthStack
