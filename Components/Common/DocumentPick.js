import React, { useState, useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker';

const useDocumentPicker = ({ submitted }) => {
    const [selectedDocument, setSelectedDocument] = useState(null);


    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedDocument(result[0]);
            return result[0];
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("Document Picker Closed");
            } else {
                throw err;
            }
        }
    };

    useEffect(() => {
        if (submitted)
            setSelectedDocument(null)
    }, [submitted])

    return { selectedDocument, pickDocument };
};

export default useDocumentPicker;
