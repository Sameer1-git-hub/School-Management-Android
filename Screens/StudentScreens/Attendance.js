import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, FlatList } from 'react-native';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import DatePickerComp from '../../Components/CreateStudent/DatePicker';
import DownArrow from 'react-native-vector-icons/Feather';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance, resetStudentState } from '../../store/slices/StudentAttendanceSlice';
import { useAuth } from '../../authContext';
import ErrorModal from '../../Components/Common/ErrorModal';
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;


const Attendance = () => {

    const [toDate, setToDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [datePickerType, setDatePickerType] = useState('');
    const dispatch = useDispatch()
    const { UserData } = useAuth()
    const attendance = useSelector(state => state.studentAttendance.studentAttendance)
    const { error, modalVisible } = useSelector(state => state.studentAttendance)


    useEffect(() => {
        if (attendance)
            dispatch(resetStudentState())
    }, [])

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-Gb', options).format(date);
    }

    const getAttendance = () => {
        const tDate = toDate?.toISOString().split('T')[0]
        const fDate = fromDate?.toISOString().split('T')[0]
        const id = UserData?.id
        dispatch(fetchAttendance({ id, fDate, tDate }))
    }

    return (
        <View style={styles.container}>

            <SessionaTracker />

            <ErrorModal
                heading="Error"
                message={error}
                isVisible={modalVisible}
                onClose={() => dispatch(resetStudentState())}
            />

            <ImageBackground
                source={require("../../Assets/attendance/AttendanceBg.png")}
                style={styles.imageBackground}>

                <Header title="Attendance" />

                <Seperator marginTop={50} />

                <View style={styles.datePickerView}>

                    <Text style={styles.TopText}>Select Date</Text>

                    <View style={[styles.Buttons, { backgroundColor: fromDate ? "#c3dec8" : "#d3e5eb" }]}>

                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: "row" }}
                            onPress={() => { setDatePickerType('from'); setOpenDatePicker(true) }}>

                            <Text style={styles.ButtonsText}>
                                {fromDate ? formatDate(fromDate) : "From"}
                            </Text>

                            <DownArrow name="arrow-down" size={20} color="grey" style={{ marginRight: 10 }} />

                        </TouchableOpacity>

                    </View>

                    {openDatePicker && datePickerType === 'from' && (
                        <DatePickerComp
                            date={fromDate || new Date()}
                            setDate={setFromDate}
                            visible={openDatePicker}
                            closeModal={() => setOpenDatePicker(false)}
                        />
                    )}


                    <View style={[styles.Buttons, { backgroundColor: toDate ? "#c3dec8" : "#d3e5eb" }]}>

                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: "row" }}
                            onPress={() => { setDatePickerType('to'); setOpenDatePicker(true); }}>

                            <Text style={styles.ButtonsText}>
                                {toDate ? formatDate(toDate) : "To"}
                            </Text>

                            <DownArrow name="arrow-down" size={20} color="grey" style={{ marginRight: 10 }} />

                        </TouchableOpacity>

                    </View>

                    {openDatePicker && datePickerType === 'to' && (
                        <DatePickerComp
                            date={toDate || new Date()}
                            setDate={setToDate}
                            visible={openDatePicker}
                            closeModal={() => setOpenDatePicker(false)}
                        />
                    )}

                </View>

                <TouchableOpacity
                    disabled={!toDate || !fromDate}
                    onPress={() => getAttendance()}
                    style={styles.searchButton}>
                    <Text style={styles.SearchText}>Search</Text>
                </TouchableOpacity>

            </ImageBackground>


            {
                attendance.length !== 0 ?
                    <>
                        <Seperator marginTop={2} />
                        <View style={styles.attendanceFormContainer}>

                            <View style={{ width: 110 }}>
                                <Text style={styles.studentInfo}>Date</Text>
                            </View>
                            <View style={{ width: 100 }}>
                                <Text style={[styles.studentInfo]}>Attendance</Text>
                            </View>
                        </View>
                        <Seperator />

                        <FlatList
                            data={attendance}
                            renderItem={({ item, index }) => (
                                < Animated.View
                                    key={index}
                                    entering={FadeInUp.duration(400)}
                                    style={styles.attendanceForm}>

                                    <Text style={{ color: "black", alignSelf: "center" }}>{item.attendance_date}</Text>
                                    <Text style={{ color: "black", alignSelf: "center" }}>{item.attendanceCode.description}</Text>

                                </Animated.View>
                            )} />
                    </>
                    :
                    < View style={styles.flexContainer} >
                        <Text style={{ fontSize: 20, fontWeight: "300", color: "#c7c7c7" }}>{error}</Text>
                    </View>
            }

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        backgroundColor: '#edf5fa',
        paddingBottom: 10,
        paddingEnd: 2
    },
    flexContainer: {
        flex: 1,
        backgroundColor: '#edf5fa',
        justifyContent: 'center',
        alignItems: "center"
    },
    datePickerView: {
        marginTop: 10,
        alignItems: 'center',
    },
    TopText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 5,
    },
    Buttons: {
        paddingVertical: 10,
        marginVertical: 3,
        borderRadius: 12,
        backgroundColor: '#d3e5eb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.7,
        height: 50
    },
    ButtonsText: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 15,
        fontWeight: '300',
        flex: 1
    },
    searchButton: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff9e80',
        height: 45,
        width: windowWidth * 0.7,
        alignSelf: 'center',
        marginTop: 5,
    },
    SearchText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '300',
    },
    studentInfo: {
        color: "black",
        fontSize: 16,
        fontWeight: "300",
        alignSelf: 'center',
        fontWeight: "500",
        textAlign: 'center'
    },
    attendanceForm: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: '#edf5fa',
        width: windowWidth - 15,
        alignSelf: 'center',
        marginBottom: 2,
        borderRadius: 10,
        marginVertical: 2,

    },
    attendanceFormContainer: {
        flexDirection: "row",
        marginVertical: 10,
        paddingTop: 5,
        justifyContent: 'space-around',
        width: windowWidth - 15,
        alignSelf: "center"
    }
});

export default Attendance;