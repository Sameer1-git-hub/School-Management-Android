import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../Components/Home/Header'
import Seperator from '../../Components/Profile/Seperator'
import { useNavigation } from '@react-navigation/native'
import SessionaTracker from '../../Components/Common/SessionaTracker'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../authContext'
import { getSubject, getTeacherSubject, resetModal } from '../../store/slices/AssignmenstSlice'
import { resetAssignment } from '../../store/slices/AssignmenstSlice'
import { useFocusEffect } from '@react-navigation/native';
import ErrorModal from '../../Components/Common/ErrorModal'
import Animated, { FadeInUp } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Subjects = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const { UserData } = useAuth()
    const { subjects, assignments, error, modalVisibility } = useSelector(state => state.assignment)
   


    useFocusEffect(
        React.useCallback(() => {
            if (UserData && UserData.role_name === "student") {
                dispatch(getSubject({ class_id: UserData.class_id }));
            } else if (UserData) {
                dispatch(getTeacherSubject({ teacher_id: UserData.id }));
            }
    
            return () => {
                dispatch(resetAssignment());
            };
        }, [UserData, dispatch])
    );
    


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <Header title="Subjects" />
            <Seperator marginTop={50} />

            <SessionaTracker />

            {/* <ErrorModal
                isVisible={modalVisibility}
                message={error}
                heading="Error"
                onClose={() => dispatch(resetModal())}
            /> */}

            <FlatList
                contentContainerStyle={{ flex: 1 }}
                data={subjects}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ alignSelf: "center" }}>

                            <AnimatedTouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Assignment", {
                                        subject: item.name,
                                        student_id: UserData.id,
                                        section_id: UserData.section_id || item.section_id,
                                        class_id: UserData.class_id || item.class_id,
                                        subject_id: item.id || item.subject_id,
                                        role_name: UserData.role_name
                                    })
                                }}
                                entering={FadeInUp.duration(400)}
                                style={styles.subjects}>

                                <Text style={styles.subjectName}>{item.name}</Text>
                                {
                                    UserData.role_name === "teacher" && (
                                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end" }}>
                                            <Text style={styles.label}>Class: </Text>
                                            <Text style={styles.label}>{item?.class_name}-{item?.section_name}</Text>
                                        </View>
                                    )
                                }

                            </AnimatedTouchableOpacity>

                        </View>
                    );
                }}
            />
        </View>
    )
}

export default Subjects

const styles = StyleSheet.create({
    subjects: {
        height: 55,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#edf5fa',
        width: windowWidth - 15,
        justifyContent: 'center',
        marginBottom: 2,
        borderRadius: 10,
        marginVertical: 2,
        borderWidth: 0.3
    },
    subjectName: {
        fontSize: 18,
        color: "black",
        fontWeight: "300"
    },
    label: {
        fontSize: 12,
        color: "black",
        fontWeight: "300"
    }
})