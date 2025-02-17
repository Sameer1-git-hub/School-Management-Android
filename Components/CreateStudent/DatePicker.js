import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerComp = ({ date, setDate, visible, closeModal }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>

            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
                        <View style={styles.modalView}>
                            <DatePicker
                                style={{ width: 250 }}
                                mode='date'
                                date={date}
                                onDateChange={setDate}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    closeModal();
                                    setDate(date)
                                }}
                                style={styles.opacity}>
                                <Text style={{ color: "white", fontSize: 15, fontWeight: '300' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 5,
    },
    opacity: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: "center",
        borderRadius: 30,
        backgroundColor: "#ff9e80",
        height: 40,
        paddingHorizontal: 10,
        width: 90,
        marginTop: 10,
        alignSelf: 'center'
    }

});

export default DatePickerComp;


