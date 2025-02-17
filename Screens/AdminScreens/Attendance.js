import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SessionaTracker from '../../Components/Common/SessionaTracker'

const Attendance = () => {
    return (
        <View>
            <SessionaTracker />
            <Text>Admin</Text>
        </View>
    )
}

export default Attendance

const styles = StyleSheet.create({})