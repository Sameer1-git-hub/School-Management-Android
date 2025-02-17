import { StyleSheet, Text, View, ImageBackground, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../Components/Home/Header'
import ScrollingOptions from '../Components/Home/ScrollingOptions'
import Bottom from '../Components/Home/Bottom'
import SessionaTracker from '../Components/Common/SessionaTracker'
import { useDispatch } from 'react-redux'
import { resetAllinAssignment } from '../store/slices/AssignmenstSlice'
import { useAuth } from '../authContext'

const windowHeight = Dimensions.get('window').height;

const Home = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetAllinAssignment())
    }, [])


    return (
        <View style={{ flex: 1 }}>

            <SessionaTracker />

            <Header title="Home" />

            <Image
                style={{ width: "100%", height: windowHeight * 0.28 }}
                source={require('../Assets/home/School.png')} />

            <ScrollingOptions />

            <Bottom />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({})