import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../Home/Header'
import Seperator from '../Profile/Seperator'


const windowWidth = Dimensions.get('window').width;


const FeeDetails = ({ route }) => {

    const { status, month, year, duedate, amount, dueAmount } = route.params


    return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>

            <Header title="Fee-Details" />
            <Seperator marginTop={50} />

            <View style={styles.ItemsView}>
                <Text style={styles.itemName}>Fee Challan Month</Text>
                <Text style={styles.itemValue}>{month}-{year}</Text>
            </View>


            <View style={styles.CombinedItem}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.itemName}>Due Date</Text>
                    <Text style={styles.itemValue}>{duedate}</Text>
                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                    <Text style={styles.itemName}>Amount After Due</Text>
                    <Text style={styles.itemValue}>PKR {dueAmount}</Text>
                </View>
            </View>


            <View style={styles.ItemsView}>
                <Text style={styles.itemName}>Total Fee</Text>
                <Text style={styles.itemValue}>PKR {dueAmount}</Text>
            </View>


            <View style={styles.opacities}>

                <TouchableOpacity style={{ alignItems: "center" }}>
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={require("../../Assets/Fee/download.png")} />

                    <Text style={styles.itemName}>Download</Text>
                    <Text style={styles.itemName}>Challan</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: "center" }}>
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={require("../../Assets/Fee/onlinePayments.png")} />

                    <Text style={styles.itemName}>Online</Text>
                    <Text style={styles.itemName}>Payment</Text>

                </TouchableOpacity>
            </View>


        </View>
    )
}

export default FeeDetails

const styles = StyleSheet.create({
    ItemsView: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "#edf5fa",
        width: windowWidth * 0.85,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemName: {
        fontSize: 14,
        color: "black"
    },
    itemValue: {
        fontSize: 14,
        color: "black",
        fontWeight: "300",
    },
    CombinedItem: {
        paddingHorizontal: 10,
        backgroundColor: "#edf5fa",
        width: windowWidth * 0.85,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    opacities: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: windowWidth * 0.85,
        marginTop: 20
    }
})