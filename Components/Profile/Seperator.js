import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'

const Seperator = ({ marginTop, opacity }) => {
    return (
        <View>
            <Image
                style={{ marginTop: marginTop, width: "100%", opacity: opacity ? opacity : 0.6, height: 1 }}
                source={require("../../Assets/home/seperator.png")} />
        </View>
    )
}

export default Seperator

const styles = StyleSheet.create({})