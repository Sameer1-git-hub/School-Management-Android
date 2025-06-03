import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import DownArrow from 'react-native-vector-icons/Feather'

const CustomDropdown = ({
    setActualValue,
    actualValue,
    value,
    setValue,
    option,
    activeDropdown,
    setActiveDropdown,
    dropdownName,
    PlaceHolder,
    width,
    height
}) => {

    const [isOpen, setIsOpen] = useState(false);
  

    useEffect(() => {
        if (activeDropdown !== dropdownName) {
            setIsOpen(false);
        }
    }, [activeDropdown]);

    const handleToggleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            setActiveDropdown(null);
        } else {
            setIsOpen(true);
            setActiveDropdown(dropdownName);
        }
    };

    const handleSelect = (label, value) => {
        setActualValue(value)
        setValue(label);
        setIsOpen(false);
    };

    return (
        <View style={{ width: width, position: 'relative' }}>

            <TouchableOpacity
                style={[styles.input, { height: height, backgroundColor: value ? "#c3dec8" : "#d3e5eb" }]}
                onPress={handleToggleDropdown}>
                <Text style={{ flex: 1, fontSize: 13, fontWeight: value ? "500" : "300", color: "black" }}>{value || PlaceHolder}</Text>
                <DownArrow name="arrow-down" size={20} color="grey" />
            </TouchableOpacity>

            <Modal
                animationType='fade'
                transparent={true}
                visible={isOpen}
                onRequestClose={handleToggleDropdown}
            >
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPress={handleToggleDropdown}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <ScrollView style={styles.scrollView}
                                persistentScrollbar={true}>
                                {option?.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        onPress={() => handleSelect(item.label, item.value)} style={styles.modalItem}>
                                        <Text style={styles.modalText}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '70%',
        height: "27%",
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // backgroundColor : "#d3e5eb"
    },
    modalItem: {
        width: '100%',
        padding: 12,
        justifyContent: 'center',
        borderColor: "#E5E5E5",
        borderBottomWidth: 0.5,
    },
    modalText: {
        fontSize: 15,
        color: '#333',
    },
    scrollView: {
        width: '100%',
        maxHeight: 280,
    },
});

export default CustomDropdown;