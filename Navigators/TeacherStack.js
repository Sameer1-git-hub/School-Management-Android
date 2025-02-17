import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import Attendance from '../Screens/TeacherScreens/Attendance'
import ViewAttendance from '../Screens/TeacherScreens/ViewAttendance'
import TimeTable from '../Screens/TeacherScreens/TimeTable'
import News from '../Screens/Common/News'
import NewsDetails from '../Screens/Common/NewsDetails'
import Subjects from '../Screens/Common/Subjects'
import Assignment from '../Screens/StudentScreens/Assignment'
import AssignmentDetail from '../Screens/Common/AssignmnetDetails'
import Chats from '../Screens/Common/Chats'
import AssignmentSubmission from '../Screens/TeacherScreens/AssignmentSubmission'

const TeacherStack = () => {
    const Authorized = createNativeStackNavigator()
    return (
        <Authorized.Navigator initialRouteName='HomeScreen'>

            <Authorized.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
            <Authorized.Screen name="Attendance" component={Attendance} options={{ headerShown: false }} />
            <Authorized.Screen name='viewAttendance' component={ViewAttendance} options={{ headerShown: false }} />
            <Authorized.Screen name='TimeTable' component={TimeTable} options={{ headerShown: false }} />
            <Authorized.Screen name='News' component={News} options={{ headerShown: false }} />
            <Authorized.Screen name='NewsDetails' component={NewsDetails} options={{ headerShown: false }} />
            <Authorized.Screen name="Subjects" component={Subjects} options={{ headerShown: false }} />
            <Authorized.Screen name="Assignment" component={Assignment} options={{ headerShown: false }} />
            <Authorized.Screen name="Assignment-details" component={AssignmentSubmission} options={{ headerShown: false }} />
            <Authorized.Screen name="Chats" component={Chats} options={{ headerShown: false }} />

        </Authorized.Navigator>
    )
}

export default TeacherStack
