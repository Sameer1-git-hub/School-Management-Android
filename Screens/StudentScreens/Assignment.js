import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../Components/Home/Header'
import Seperator from '../../Components/Profile/Seperator'
import { useNavigation } from '@react-navigation/native'
import SessionaTracker from '../../Components/Common/SessionaTracker'
import { useDispatch, useSelector } from 'react-redux'
import { getAssignments, getAssignmentsForTeacher, resetModal } from '../../store/slices/AssignmenstSlice'
import ErrorModal from '../../Components/Common/ErrorModal'
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


const Assignment = ({ route }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { subject, subject_id, student_id, class_id, section_id, role_name } = route.params
    const { assignments, error, modalVisibility } = useSelector(state => state.assignment)

    useEffect(() => {
        if (assignments.length < 1 && !error) {
            dispatch(getAssignments({ subject_id, student_id, class_id, section_id }))
            dispatch(getAssignmentsForTeacher({ subject_id, student_id, class_id, section_id }))
        }
    }, [assignments])

    // console.log("Hello : " , assignments)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <SessionaTracker />
{/* 
            <ErrorModal
                isVisible={modalVisibility}
                message={error}
                heading="Error"
                onClose={() => {dispatch(resetModal()) }}
            /> */}

            <Header title={subject} />
            <Seperator marginTop={50} />

            {
                assignments.length > 0 ?
                    <FlatList
                        data={assignments}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ alignItems: "center" }}>

                                <AnimatedTouchableOpacity
                                    onPress={() => { navigation.navigate("Assignment-details", data = { assignment: item, subject_id, class_id, section_id }) }}
                                    entering={FadeInUp.duration(400)}
                                    style={styles.subjects}>

                                    <View style={{ alignItems: "flex-start" }}>
                                        <Text style={styles.assignName}>{item?.name}</Text>
                                    </View>

                                    {
                                        role_name === "student" && (
                                            <>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={styles.label}>Marks: </Text>
                                                    <Text style={styles.assignInfo}>{item?.assignment_submission?.assignment_mark ? item.assignment_submission?.assignment_mark.marks : "null"}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={styles.label}>Status: </Text>
                                                    <Text style={styles.assignInfo}>{!item?.assignment_submission ? "Pending" : "Done"}</Text>
                                                </View>
                                            </>
                                        )

                                    }

                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={styles.label}>Due: </Text>
                                        <Text style={styles.assignInfo}>{item?.due_date}</Text>
                                    </View>

                                </AnimatedTouchableOpacity>
                            </View>
                        )} />
                    :
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "300" }}>
                            no assignments
                        </Text>
                    </View>
            }

        </View>
    )
}

export default Assignment

const styles = StyleSheet.create({
    subjects: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#edf5fa',
        width: windowWidth - 15,
        justifyContent: "space-around",
        marginBottom: 2,
        borderRadius: 10,
        marginVertical: 2,
    },
    assignmentStatus: {
        flexDirection: "row",
        justifyContent: 'space-around',
        width: windowWidth - 15,
    },
    assignInfo: {
        marginVertical: 2,
        color: "grey",
        fontWeight: "300"
    },
    assignName: {
        fontSize: 18,
        color: "black",
        fontWeight: "500",
    },
    label: {
        fontSize: 14,
        color: "black",
        fontWeight: "300"
    }
})