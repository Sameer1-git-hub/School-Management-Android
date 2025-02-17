import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import Attendance from '../Screens/StudentScreens/Attendance'
import TimeTable from '../Screens/StudentScreens/TimeTable'
import Subjects from '../Screens/Common/Subjects'
import Assignment from '../Screens/StudentScreens/Assignment'
import AssignmnetDetails from '../Screens/Common/AssignmnetDetails'
import News from '../Screens/Common/News'
import NewsDetails from '../Screens/Common/NewsDetails'
import Chats from '../Screens/Common/Chats'
import ChatScreen from '../Components/Common/ChatScreen'
import Fee from '../Screens/StudentScreens/Fee'
import FeeDetails from '../Components/Student/FeeDetails'

const StudentStack = () => {
    const Authorized = createNativeStackNavigator()
    return (
        <Authorized.Navigator initialRouteName='HomeScreen'>

            <Authorized.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
            <Authorized.Screen name="Attendance" component={Attendance} options={{ headerShown: false }} />
            <Authorized.Screen name="TimeTable" component={TimeTable} options={{ headerShown: false }} />
            <Authorized.Screen name="Subjects" component={Subjects} options={{ headerShown: false }} />
            <Authorized.Screen name="Assignment" component={Assignment} options={{ headerShown: false }} />
            <Authorized.Screen name="Assignment-details" component={AssignmnetDetails} options={{ headerShown: false }} />
            <Authorized.Screen name='News' component={News} options={{ headerShown: false }} />
            <Authorized.Screen name='NewsDetails' component={NewsDetails} options={{ headerShown: false }} />
            <Authorized.Screen name='Chats' component={Chats} options={{ headerShown: false }} />
            <Authorized.Screen name='Chat-Screen' component={ChatScreen} options={{ headerShown: false }} />
            <Authorized.Screen name='Fee' component={Fee} options={{ headerShown: false }} />
            <Authorized.Screen name='Fee-Details' component={FeeDetails} options={{ headerShown: false }} />

        </Authorized.Navigator>
    )
}

export default StudentStack
