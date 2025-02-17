import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, FlatList } from 'react-native';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import DownArrow from 'react-native-vector-icons/Feather';
import CustomDropdown from '../../Components/MarkAttendance/CustomDropdown';
import DatePickerComp from '../../Components/CreateStudent/DatePicker';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendance, fetchClasses, fetchSections,fetchSubjectByClass } from '../../store/slices/TeacherAttendanceSlice';
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;


const ViewAttendance = () => {
    const [date, setDate] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [datePickerType, setDatePickerType] = useState('');
    const [valueClass, setValueClass] = useState(null);
    const [valueSection, setValueSection] = useState(null);
    const [valueSubject, setValueSubject] = useState(null);
    const [labelClass, setLabelClass] = useState(null);
    const [labelSubject, setLabelSubject] = useState(null);
    const [labelSection, setLabelSection] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const grade = useSelector(state => state.attendance.grade);
    const section = useSelector(state => state.attendance.section);
    const students = useSelector(state => state.attendance.std_attendance);
    const studentApiCalled = useSelector(state => state.attendance.studentApiCalled);
    const subjects = useSelector(state=>state.attendance.subject)
    const error = useSelector(state => state.attendance.error);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchClasses())
        dispatch(fetchSections())
        dispatch(fetchSubjectByClass())

    }, [])

    const subjectOptions = subjects.map(subject => ({
        label: subject.name,
        value: subject.id,
      }));      

    const checkDisable = () => {
        if (date && valueClass && valueSection &&valueSubject)
            return false
        return true
    }

    const getAttendance = async () => {
        dispatch(fetchStudentAttendance({ valueSection, valueClass, date,valueSubject }));
    }

    return (
        <View style={styles.container}>

            <SessionaTracker />

            <ImageBackground
                source={require("../../Assets/attendance/AttendanceBg.png")}
                style={styles.imageBackground}>

                <Header title="Attendance" />

                <Seperator marginTop={50} />

                <View style={styles.datePickerView}>

                    <Text style={styles.TopText}>Select Class & Date</Text>

                    <View>
                        <CustomDropdown
                            setActualValue={setValueClass}
                            value={labelClass}
                            setValue={setLabelClass}
                            option={grade}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                            dropdownName="classDropdown"
                            PlaceHolder="Select Class"
                            width={windowWidth * 0.7}
                            height={50}
                        />

                        <CustomDropdown
                            setActualValue={setValueSection}
                            value={labelSection}
                            setValue={setLabelSection}
                            option={section}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                            dropdownName="sectionDropdown"
                            PlaceHolder="Select Section"
                            width={windowWidth * 0.7}
                            height={50}
                        />
                        <CustomDropdown
                            setActualValue={setValueSubject}
                            value={labelSubject}
                            setValue={setLabelSubject}
                            option={subjectOptions}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                            dropdownName="subjectDropdown"
                            PlaceHolder="Select Subject"
                            width={windowWidth * 0.7}
                            height={50}
                        />

                    </View>

                    <View style={[styles.Buttons, { backgroundColor: date ? "#c3dec8" : "#d3e5eb" }]}>

                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: "row" }}
                            onPress={() => { setDatePickerType('date'); setOpenDatePicker(true); }}>

                            <Text style={[styles.ButtonsText, { fontWeight: date ? "500" : "300" }]}>
                                {date ? date.toISOString().split('T')[0] : "Select Date"}
                            </Text>

                            <DownArrow name="arrow-down" size={20} color="grey" style={{ marginRight: 10 }} />
                        </TouchableOpacity>

                    </View>

                    {openDatePicker && datePickerType === 'date' && (

                        <DatePickerComp
                            date={date || new Date()}
                            setDate={setDate}
                            visible={openDatePicker}
                            closeModal={() => setOpenDatePicker(false)} />

                    )}

                </View>

                <TouchableOpacity
                    disabled={checkDisable()}
                    onPress={getAttendance}
                    style={{ ...styles.searchButton, backgroundColor: checkDisable() ? "#fcbba7" : "#ff9e80" }}>
                    <Text style={styles.SearchText}>Search</Text>
                </TouchableOpacity>

            </ImageBackground>

            {
                studentApiCalled ?
                    students ?
                        <Animated.View entering={FadeInUp.duration(400)}>

                            <Seperator marginTop={2} />
                            <View style={styles.attendanceFormContainer}>

                                <View style={{ width: 100 }}>
                                    <Text style={styles.studentInfo}>Roll No</Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.studentInfo}>Name</Text>
                                </View>

                                <View style={{ width: 100 }}>
                                    <Text style={[styles.studentInfo]}>Attendance</Text>
                                </View>

                            </View>

                            <Seperator />

                            <FlatList
                                data={students}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={index}
                                        style={styles.attendanceForm}>

                                        <View style={styles.attendanceHeadings}>
                                            <Text style={styles.attendanceText}>{item.roll_number}</Text>
                                        </View>

                                        <View style={[styles.attendanceHeadings, { flex: 1 }]}>
                                            <Text style={styles.attendanceText}>{item.first_name} {item.last_name}</Text>
                                        </View>

                                        <View style={styles.attendanceHeadings}>
                                            <Text style={[styles.attendanceText, { fontWeight: "500" }]}>{item.description}</Text>
                                        </View>

                                    </View>
                                )}
                            />

                        </Animated.View>
                        :
                        < View style={styles.flexContainer}>
                            <Text>No student found</Text>
                        </View>
                    :
                    < View style={styles.flexContainer} />
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
        justifyContent: "center",
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
        fontSize: 13,
        fontWeight: '500',
        flex: 1
    },
    searchButton: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff9e80',
        height: 45,
        width: 250,
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
    },
    attendanceText: {
        color: "black",
        textAlign: 'center'
    },
    attendanceHeadings: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ViewAttendance;