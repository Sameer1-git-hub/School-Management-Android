import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import NoConnection from "react-native-vector-icons/MaterialIcons"
import Bottom from '../Home/Bottom';
const windowHeight = Dimensions.get('window').height;

const NoConnectionScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#edf5fa" }}>

      <ImageBackground
        source={require("../../Assets/Background.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NoConnection name="wifi-off" size={100} color="silver" />
        <Text style={{ fontSize: 18, fontWeight: "500", color: "silver" }}>No Interet Connection</Text>
      </ImageBackground>

    </View>
  )
}

export default NoConnectionScreen

const styles = StyleSheet.create({})