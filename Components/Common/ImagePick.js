import React, { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const useImagePicker = ({ setSelected, submitted }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5, });

            if (!result.didCancel && !result.error) {
                return setSelectedImage(result.assets[0].uri);
            }
            console.log(result.didCancel ? 'Image picker was cancelled' : 'Image picker error:', result.error);
        } catch (error) {
            console.log('Error while picking an image:', error);
        }

        return null;
    };

    const takePhoto = async () => {
        try {
            const result = await launchCamera({ mediaType: 'photo', quality: 0.5 });

            if (!result.didCancel && !result.error) {
                return setSelectedImage(result.assets[0].uri);
            }
            console.log(result.didCancel ? 'Camera was cancelled' : 'Camera error:', result.error);
        } catch (error) {
            console.log('Error while taking a photo:', error);
        }

        return null;
    };



    if (submitted) {
        setSelectedImage(null);
    }

    return { selectedImage, pickImage, takePhoto };
};

export default useImagePicker;
