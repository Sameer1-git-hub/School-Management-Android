import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import { useAuth } from "../../authContext";


const NewsDetails = ({ route }) => {

    const { data, toggle } = route.params
    const { UserRole } = useAuth()

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <SessionaTracker />

            <Header title="Details" />
            <Seperator marginTop={50} />

            <ScrollView style={styles.container}>

                <Text style={{ alignSelf: "flex-end" }}>{data.date}</Text>

                <Text style={styles.Heading}>From</Text>
                <Text style={styles.text}>{data.user.first_name} {data.user.last_name}</Text>

                <Text style={styles.Heading}>To</Text>
                <Text style={styles.text}>{toggle ? "To Everyone " : "All " + UserRole}</Text>

                <Text style={styles.Heading}>Subject</Text>
                <Text style={styles.text}>{data.subject}</Text>

                <Text style={styles.Heading}>Message</Text>
                <Text style={styles.text}>{data.content}</Text>
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 16,
    },
    Heading: {
        fontWeight: 'bold',
    },
    text: {
        color: '#888',
        marginBottom: 8,
    },
});

export default NewsDetails;
