import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Home/Header';
import { FlatList } from 'react-native-gesture-handler';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../../Components/MarkAttendance/CustomDropdown';
import { useAuth } from '../../authContext';
import { getTimeTable } from '../../store/slices/TimeTableSlice';
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;

const TimeTable = () => {

    const [day, setDay] = useState(null);
    const [labelDay, setLabelDay] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchPressed, setSearchPressed] = useState(false);

    const { days, timetable, error } = useSelector(state => state.timetable)
    const { UserData } = useAuth()
    const dispatch = useDispatch()

    const fetchTimeTable = () => {
        const { class_id, section_id } = UserData
        dispatch(getTimeTable({ day, class_id, section_id }))
    }

    return (
        <View style={styles.container}>

            <SessionaTracker />

            <ImageBackground
                style={styles.imageBackground}
                source={require("../../Assets/attendance/AttendanceBg.png")}>

                <Header title="TimeTable" />

                <Image
                    style={{ marginTop: 50, width: "100%", opacity: 0.6, height: 1 }}
                    source={require("../../Assets/home/seperator.png")} />

                <View style={styles.datePickerView}>

                    <Text style={styles.topText}>Select Day</Text>

                    <CustomDropdown
                        setActualValue={setDay}
                        value={labelDay}
                        setValue={setLabelDay}
                        option={days}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        dropdownName="dayDropdown"
                        PlaceHolder="Select Day"
                        width={windowWidth * 0.7}
                        height={50}
                    />

                </View>

                <TouchableOpacity
                    onPress={() => { fetchTimeTable(); setSearchPressed(true); }}
                    style={styles.searchButton}
                    disabled={!day}>
                    <Text style={styles.SearchText}>Search</Text>
                </TouchableOpacity>

            </ImageBackground>

            {
                searchPressed && (
                    timetable.length > 0 ?

                        <View style={{ flex: 1 }}>

                            <View style={styles.timeView}>
                                <Text style={styles.TopDate}>{day}</Text>
                            </View>

                            <FlatList
                                data={timetable}
                                renderItem={({ item, index }) => (
                                    <Animated.View
                                        entering={FadeInUp.duration(400)}
                                        key={index} style={styles.list}>

                                        <Text style={{ fontWeight: "500", color: "black", fontSize: 18, alignSelf: "center" }}>
                                            {item.subject_model?.name}
                                        </Text>

                                        <Text style={{ fontWeight: "500", color: "black", fontSize: 16, alignSelf: "center" }}>
                                            {item.teacher?.first_name} {item.teacher?.last_name}
                                        </Text>

                                        <View style={styles.listBottom}>
                                            <Text style={styles.listItems}>Class : {item.class_model?.name}-{item.section_model?.name}</Text>
                                            <Text style={styles.listItems}>{item.timeFrom.slice(0, 5)}-{item.timeTo.slice(0, 5)}</Text>
                                        </View>

                                    </Animated.View>
                                )}
                            />
                        </View>
                        :
                        < View style={styles.flexContainer} >
                            <Text style={styles.noTimeTable}>No timetable found</Text>
                        </View>
                )
            }

        </View>
    )
}

export default TimeTable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    datePickerView: {
        marginTop: 10,
        alignItems: 'center',
    },
    topText: {
        fontSize: 20,
        fontWeight: "400",
        color: "black",
        marginBottom: 5
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
        fontWeight: '300',
        flex: 1
    },
    imageBackground: {
        backgroundColor: '#edf5fa',
        paddingBottom: 10,
        paddingEnd: 2,
        alignItems: "center"
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
    TopDate: {
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        alignSelf: "center"
    },
    list: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#edf5fa',
        width: windowWidth - 15,
        alignSelf: 'center',
        marginBottom: 2,
        borderRadius: 10,
        marginVertical: 2,
    },
    timeView: {
        width: windowWidth - 15,
        padding: 10,

    },
    listItems: {
        fontWeight: "400",
        fontSize: 14,
        color: "black"
    },
    flexContainer: {
        flex: 1,
        backgroundColor: '#edf5fa',
        justifyContent: "center",
        alignItems: "center"
    },
    listBottom: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10
    },
    noTimeTable: {
        fontWeight: "300",
        fontSize: 16
    }
})