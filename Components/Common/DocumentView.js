import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Modal, PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DocumentView = ({ pdfUrl, isVisible, onClose }) => {

    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        if (isVisible) {
            requestStoragePermission();
        }
    }, [isVisible]);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission Required",
                    message: "This app needs access to your storage to download and display PDF files.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
                setHasPermission(false);
                console.log("Storage Permission Denied.");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const googleDrivePDFUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl}`;

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={isVisible && hasPermission}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <WebView
                    source={{ uri: googleDrivePDFUrl }}
                    style={{ flex: 1 }}
                />
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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

export default DocumentView;
