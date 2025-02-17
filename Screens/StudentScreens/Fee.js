import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Home/Header'
import Seperator from '../../Components/Profile/Seperator'
import Arrow from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { FadeInUp } from 'react-native-reanimated';
import { handleDecr, handleIncr } from '../../store/slices/FeeSlice'


const windowWidth = Dimensions.get('window').width;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


const Fee = () => {

    const { challans, year } = useSelector(state => state.fee)
    const flteredChallan = challans.filter((item) => item.year == year)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <Header title="Fee Payments" />
            <Seperator marginTop={50} />

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 30 }}>

                    <TouchableOpacity onPress={() => dispatch(handleDecr())}>
                        <Arrow name="less-than" size={30} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.Year}>{year}</Text>

                    <TouchableOpacity onPress={() => dispatch(handleIncr())}>
                        <Arrow name="greater-than" size={30} color="#000" />
                    </TouchableOpacity>

                </View>


                {
                    flteredChallan.length > 0 ?

                        <FlatList
                            data={flteredChallan}
                            contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
                            renderItem={({ item, index }) => (
                                
                                <AnimatedTouchableOpacity
                                    onPress={() => { navigation.navigate("Fee-Details", item) }}
                                    entering={FadeInUp.duration(400)}
                                    style={styles.listItem}
                                    key={index}>

                                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                                        <Text style={{ fontSize: 12 }}>{item.month}-{item.year}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                        <Text style={styles.listHeading}>Status : </Text>
                                        <Text style={styles.Listtext}>{item.status}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                        <Text style={styles.listHeading}>Amount : </Text>
                                        <Text style={styles.Listtext}>{item.amount} Rs</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                        <Text style={styles.listHeading}>Due : </Text>
                                        <Text style={styles.Listtext}>{item.duedate}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                        <Text style={styles.listHeading}>Due amount : </Text>
                                        <Text style={styles.Listtext}>{item.dueAmount} Rs</Text>
                                    </View>


                                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                                        <Text style={{ fontSize: 12 }}>See Details</Text>
                                    </View>

                                </AnimatedTouchableOpacity>
                            )} />
                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>No Challan Found!</Text>
                        </View>
                }


            </View>
        </View>
    )
}

export default Fee

const styles = StyleSheet.create({
    classView: {
        // borderWidth: 1,
        alignItems: "center",
        paddingTop: 20
    },
    classText: {
        fontSize: 18,
        fontWeight: "300",
        color: "black"
    },
    Year: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        color: "#000",
        fontSize: 18
    },
    listItem: {
        padding: 10,
        backgroundColor: "#edf5fa",
        width: windowWidth * 0.85,
        marginTop: 5,
        borderRadius: 10

    },
    listHeading: {
        fontSize: 14,
        color: "black"
    },
    Listtext: {
        fontSize: 14,
        color: "black",
        fontWeight: "300",
    }
})