import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'


const Bottom = () => {
    return (
        <View>
            <ImageBackground
                style={{ height: 45, justifyContent: 'center' }}
                source={require("../../Assets/home/bottomSlide.png")}>

                <Text style={{ alignSelf: 'center', fontWeight: "300" }}>Powered By
                    <Text style={{ fontWeight: "500", color: '#0F96A3' }}> Firefly</Text>
                </Text>

            </ImageBackground>
        </View>
    )
}

export default Bottom

const styles = StyleSheet.create({})