import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CustomDropdown from './CustomDropdown';
import { useAuth } from '../../authContext';
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;


const AttendanceSheet = ({ data, onAttendanceUpdate, options }) => {
    const [values, setValues] = useState({});
    const [actualValue, setActualValue] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { UserData } = useAuth();

    // console.log(actualValue)
    
    useEffect(() => {
        if (values[data.studentID]) {
            onAttendanceUpdate({
                attendance_date:  new Date().toISOString().split('T')[0],
                // marked_at:  new Date().toISOString().split('T')[0],
                marked_by: UserData.id,
                userId: data.user.id,
                rollNo: data.roll_number,
                attendanceCodeId: actualValue
            });
        }
    }, [values]);


    return (
        <Animated.View 
        entering={FadeInUp.duration(400)}
        style={styles.attendanceForm}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.rollNo}>{data.roll_number}</Text>
                <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
            </View>

            <View style={{ marginLeft: -windowWidth * 0.13 }}>
                <CustomDropdown
                    setActualValue={setActualValue}
                    value={values[data.studentID]}
                    setValue={(value) => setValues(prev => ({ ...prev, [data.studentID]: value }))}
                    PlaceHolder="mark"
                    option={options}
                    dropdownName={data.studentID}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    width={windowWidth * 0.3}
                    height={40}
                />
            </View>
        </Animated.View>
    );
};

export default AttendanceSheet


const styles = StyleSheet.create({
    attendanceForm: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: '#edf5fa',
        width: windowWidth - 15,
        alignSelf: 'center',
        marginBottom: 2,
        borderRadius: 10,
        marginVertical: 2,

    },
    studentInfo: {
        color: "black",
        fontSize: 16,
        fontWeight: "300",
        marginVertical: 5,
    },
    rollNo: {
        width: '20%',
        textAlign: 'center',
        fontWeight: '500',
        marginRight: 10,
        color: "black",
        fontSize: 12

    },
    name: {
        width: '55%',
        fontWeight: '500',
        textAlign: 'center',
        marginRight: 10,
        color: "black",
        fontSize: 13
    }
});
