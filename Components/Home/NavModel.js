import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const NavModal = ({ optionOne, optionTwo, modalVisible, setModalVisble }) => {

    const navigation = useNavigation()

    const handleSelect = (itemValue) => {
        navigation.navigate(itemValue)
        setModalVisble(!modalVisible)
    };


    return (
        <View style={{ width: 300, position: 'relative' }}>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisble(!modalVisible)}
            >
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPress={() => setModalVisble(!modalVisible)}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>

                            <TouchableOpacity
                                onPress={() => handleSelect("Attendance")}
                                style={styles.option}>
                                <Text style={styles.optionText}>{optionOne}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSelect("viewAttendance")}
                                style={styles.option}>
                                <Text style={styles.optionText}>{optionTwo}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 3,
        borderRadius: 12,
        backgroundColor: 'black',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalView: {
        justifyContent: "center",
        width: '70%',
        height: "27%",
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',        
    },
    option: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff9e80',
        height: 45,
        width: 180,
        alignSelf: 'center',
        marginTop: 5,
        justifyContent: 'center',
        marginBottom : 5
    },
    optionText: {
        color: "white",
        fontWeight: "400",
        fontSize: 13,
    }




});
