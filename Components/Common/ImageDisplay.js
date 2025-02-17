import React from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, Image } from 'react-native';

const ImageDisplay = ({ opendisplay, setOpenDisplay, uri }) => {
    const handleDonePress = () => {
        setOpenDisplay(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={opendisplay}
            onRequestClose={handleDonePress}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        uri ?
                            <Image
                                source={{ uri: uri }}
                                style={styles.image}
                                resizeMode="contain" />
                            :
                            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: "80%" }}>No image Found</Text>
                    }

                    <TouchableOpacity style={styles.closeButton} onPress={handleDonePress}>
                        <Text style={styles.closeButtonText}>close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',  // semi-transparent background
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        // paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.9)', // slightly transparent white background
        width: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        marginVertical: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default ImageDisplay;
