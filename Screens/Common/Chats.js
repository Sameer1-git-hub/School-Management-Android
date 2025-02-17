import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Home/Header'
import Seperator from '../../Components/Profile/Seperator'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Chats = () => {

    const { teachers, students } = useSelector(state => state.chats)
    const [isStudent, setIsStudent] = useState(true)
    const [isTeacher, setIsisTeacher] = useState(false)
    const navigation = useNavigation()

    const renderItem = ({ item, index }) => (
        <View>
            <TouchableOpacity
                onPress={() => { navigation.navigate("Chat-Screen", item) }}
                style={styles.listView}
                key={index}>

                <Image
                    style={{ width: 60, height: 60, resizeMode: "cover", borderRadius: 30 }}
                    source={{ uri: item.image }}
                />

                <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{item.name}</Text>
                        <Text> ({item.id})</Text>
                    </View>
                    <Text>{isStudent ? item.section : item.techingSub}</Text>
                </View>

            </TouchableOpacity>

            <Seperator marginTop={0} />

        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <Header title="Chats" />
            
            <Seperator marginTop={50} />

            <View style={styles.chatSelector}>

                <TouchableOpacity onPress={() => { setIsStudent(true); setIsisTeacher(false) }}>
                    <Text style={[styles.selectorText, { fontWeight: isStudent ? "500" : "300" }]}>Students</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setIsStudent(false); setIsisTeacher(true) }}>
                    <Text style={[styles.selectorText, { fontWeight: isTeacher ? "500" : "300" }]}>Teachers</Text>
                </TouchableOpacity>

            </View>

            {
                isStudent && students.length > 0 ?
                    <FlatList
                        data={students}
                        renderItem={renderItem}
                    />
                    :
                    <FlatList
                        data={teachers}
                        renderItem={renderItem}
                    />
            }

        </View>
    )
}

export default Chats

const styles = StyleSheet.create({
    chatSelector: {
        alignSelf: "center",
        borderWidth: 0.5,
        borderColor: "#d3d3d3",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        paddingVertical: 10,
        width: windowWidth * 0.9,
        borderRadius: 5,
        marginBottom: 5
    },
    selectorText: {
        fontSize: 13,
        color: "#000",
    },
    listView: {
        padding: 10,
        // borderWidth: 0.5,
        flexDirection: "row"
    }
})