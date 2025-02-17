import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

const InfoModal = ({ isVisible, message, onClose, heading }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        

                        <View style={styles.textView}>
                            <Text style={styles.modalHeading}>{heading}</Text>
                            <Text style={styles.modalText}>{message}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default InfoModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        justifyContent: "center",
        width: '70%',
        height: "27%",
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 15,
        textAlign: "center",
    },
    closeButton: {
        height: 40,
        width: 100,
        borderRadius: 20,
        backgroundColor: "#F98864",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 13,
    },
    modalText: {
        fontSize: 14,
        fontWeight: "300",
        textAlign : "center"

    },
    modalHeading: {
        fontSize: 22,
        fontWeight: "500",
        textAlign: "center",
        marginBottom : 10
    },
    textView: {
        flex: 1,
        justifyContent : "center"
    }
});
