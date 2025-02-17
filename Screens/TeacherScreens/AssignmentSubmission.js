import { StyleSheet, Text, View, Dimensions, FlatList, Linking } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  getAssignmentSubmissions,
  resetAssignment,
} from '../../store/slices/AssignmenstSlice';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const AssignmentSubmission = ({ route }) => {
  const { assignment, subject_id, class_id, section_id } = route.params;
  const { submissions, error } = useSelector(state => state.assignment);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  useFocusEffect(
    React.useCallback(() => {
      if (submissions.length < 1 && !error)
        dispatch(
          getAssignmentSubmissions({
            class_id: class_id,
            section_id: section_id,
            subject_id: subject_id,
            assignment_id: assignment?.id,
          }),
        );

      return () => {
        dispatch(resetAssignment());
      };
    }, [navigation, dispatch]),
  );

  const handleViewFile = (fileUrl) => {
    Linking.openURL(fileUrl)
      .catch((err) => console.error('Error opening file', err));
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff' }}>
        <Header title="Assignment-Details" />
        <Seperator marginTop={50} />
      </View>

      <View style={styles.assignmentCard}>
        <View>
          <Text style={styles.assignmentName}>{assignment?.name}</Text>
          <Text style={styles.assignmentQues}>{assignment?.question}</Text>
        </View>
      </View>

      {submissions.length > 0 ? (
        <>
          <Seperator />
          <Text style={styles.SubmissionText}>Submissions</Text>
          <Seperator />

          <View style={styles.Submissions}>
            <FlatList
              data={submissions}
              contentContainerStyle={{ marginTop: 7 }}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.student}>
                  <Text>
                    {index + 1}) {item.student.first_name} {item.student.last_name}
                  </Text>

                  {/* Dynamically passing the file URL */}
                  {item.answer_file?.length > 0 && (
                    <TouchableOpacity onPress={() => handleViewFile(item.answer_file[0])}>
                      <Text>View</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '300' }}>No Submissions</Text>
        </View>
      )}
    </View>
  );
};

export default AssignmentSubmission;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  assignmentCard: {
    marginTop: 5,
    alignSelf: 'center',
    width: windowWidth - 15,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#edf5fa',
    borderWidth: 0.3,
    borderRadius: 10,
    marginBottom: 10,
  },
  assignmentName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  assignmentQues: {
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
  },
  Submissions: {},
  SubmissionText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  student: {
    height: 55,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#edf5fa',
    width: windowWidth - 15,
    marginBottom: 2,
    borderRadius: 10,
    marginVertical: 2,
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
