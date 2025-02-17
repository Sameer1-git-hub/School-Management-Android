import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Components/Home/Header'
import Seperator from '../../Components/Profile/Seperator'
import SessionaTracker from '../../Components/Common/SessionaTracker'
import { useAuth } from '../../authContext'

const MyProfile = () => {

    const { UserData } = useAuth()

    return (
        <View style={{ flex: 1 }}>

            <SessionaTracker />

            <Header title="Profile" />

            <Seperator marginTop={50} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {UserData.section_name && UserData.roll_number && (
                    <>
                        <View style={styles.TextView}>
                            <Text style={styles.fieldName}>Roll Number : </Text>
                            <Text style={styles.data}>{UserData.roll_number}</Text>
                        </View>
                        <Seperator marginTop={0} />

                        <View style={styles.TextView}>
                            <Text style={styles.fieldName}>Class Name : </Text>
                            <Text style={styles.data}>{UserData.class_name}-{UserData.section_name} </Text>
                        </View>
                        <Seperator marginTop={0} />
                    </>
                )
                }

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Name : </Text>
                    <Text style={styles.data}>{UserData.first_name} {UserData.last_name}</Text>
                </View>
                <Seperator marginTop={0} />

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Dob : </Text>
                    <Text style={styles.data}>{UserData.date_of_birth}</Text>
                </View>
                <Seperator marginTop={0} />


                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Email : </Text>
                    <Text style={styles.data}>{UserData.email}</Text>
                </View>
                <Seperator marginTop={0} />


                {/* <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Gender : </Text>
                    <Text style={styles.data}>Male</Text>
                </View>
                <Seperator marginTop={0} /> */}

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Father Name : </Text>
                    <Text style={styles.data}>{UserData.father_name}</Text>
                </View>
                <Seperator marginTop={0} />

                {/* <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Mother Name : </Text>
                    <Text style={styles.data}>Shaheer</Text>
                </View>
                <Seperator marginTop={0} /> */}

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Contact 1: </Text>
                    <Text style={styles.data}>{UserData.phone_number}</Text>
                </View>
                <Seperator marginTop={0} />

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Contact 2: </Text>
                    <Text style={styles.data}>{UserData.secondary_contact}</Text>
                </View>
                <Seperator marginTop={0} />

                <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Address : </Text>
                    <Text style={styles.data}>{UserData.address}</Text>
                </View>
                <Seperator marginTop={0} />

                {/* <View style={styles.TextView}>
                    <Text style={styles.fieldName}>Father Phone : </Text>
                    <Text style={styles.data}>2222</Text>
                </View>
                <Seperator marginTop={0} /> */}




            </ScrollView>

            <View style={{ alignItems: 'center', height: 60, justifyContent: 'center', borderTopWidth: 0.5, borderTopColor: "silver" }}>
                <TouchableOpacity style={styles.Update}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: '300' }}>Update</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    Update: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#F98864",
        height: 45,
        width: 250,
    },
    fieldName: {
        color: "#34BFA2",
        fontSize: 18,
        fontWeight: '300'
    },
    data: {
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
        // textAlign: 'justify'

    },
    TextView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 50,
        marginBottom: 5
        // borderColor: "red",
        // borderWidth: 1
    }
})