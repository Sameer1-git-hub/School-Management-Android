import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator, // Importing ActivityIndicator
} from 'react-native';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import DocumentView from '../../Components/Common/DocumentView';
import ImageDisplay from '../../Components/Common/ImageDisplay';
import DocumentPicker from 'react-native-document-picker';
import {submitAssignment} from '../../store/slices/AssignmenstSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../../authContext';
import ErrorModal from '../../Components/Common/ErrorModal';
import {useNavigation} from '@react-navigation/native';
import {resetModal} from '../../store/slices/AssignmenstSlice';
import LoadingScreen from '../../Components/Home/LoadingScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AssignmentDetail = ({route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for managing loading
  const dispatch = useDispatch();
  const {UserData} = useAuth();
  const navigation = useNavigation();
  const {error, modalVisibility, navigateHome} = useSelector(
    state => state.assignment,
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading

  const assignment = route.params?.assignment;

  if (!assignment) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const fileName = assignment.question_file?.[0] || '';
  const isImage =
    fileName.endsWith('.png') ||
    fileName.endsWith('.jpg') ||
    fileName.endsWith('.jpeg');

  const isPdf = fileName.endsWith('.pdf');

  const checkDue = () => {
    const assignmentDue = new Date(assignment.due_date);
    const todaysDate = new Date();
    return todaysDate >= assignmentDue;
  };

  const isDue = checkDue();

  const attachFile = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error:', err);
        throw err;
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // const handleSubmit = () => {
  //   if (!selectedFile) {
  //     console.log('No file selected');
  //     return;
  //   }

  //   dispatch(
  //     submitAssignment({
  //       assignment_id: assignment.id,
  //       submitted_by: UserData.id,
  //       file: selectedFile,
  //     }),
  //   );
  // };

  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }
    
    setIsLoading(true); // Start loading
    
    try {
      await dispatch(
        submitAssignment({
          assignment_id: assignment.id,
          submitted_by: UserData.id,
          file: selectedFile,
        }),
      );
      
      // Update the assignment submission state if necessary
      assignment.assignment_submission = {
        isSubmitted: true,
        assignment_mark: { marks: null }, // Example update, ensure it fits your actual data structure
      };
      
      // Optionally trigger a re-render by forcing state update
      setSelectedFile(null); // Clear file after submission
    } catch (error) {
      console.error('Error submitting assignment:', error);
      // Handle error if needed
    } finally {
      setIsLoading(false); // End loading
    }
  };
  
  

  return (
    <View style={styles.container}>
      <SessionaTracker />

      <View style={{backgroundColor: '#edf5fa'}}>
        <Header title="Details" />
        <Seperator marginTop={50} />
      </View>

      <ErrorModal
        isVisible={modalVisibility}
        message={error}
        heading="Message"
        onClose={() => {
          dispatch(resetModal());
          navigateHome && navigation.navigate('HomeScreen');
        }}
      />

      {isImage ? (
        <ImageDisplay
          opendisplay={isVisible}
          setOpenDisplay={setIsVisible}
          uri={assignment.question_file[0]}
        />
      ) : isPdf ? (
        <DocumentView
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          pdfUrl={assignment.question_file[0]}
        />
      ) : (
        <Text style={styles.data}>Unsupported file format</Text>
      )}

      <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.data}>{assignment.name}</Text>

        <Text style={styles.title}>Due Date:</Text>
        <Text style={styles.data}>{assignment.due_date}</Text>

        <Text style={styles.title}>Marks:</Text>
        <Text style={styles.data}>
          {assignment.assignment_submission?.assignment_mark?.marks || 'N/A'}
        </Text>

        <Text style={styles.title}>Status:</Text>
        <Text style={styles.data}>
          {!assignment.assignment_submission ? 'Pending' : 'Done'}
        </Text>

        <Text style={styles.title}>Question:</Text>
        <Text style={styles.data}>{assignment.question}</Text>

        <Text style={styles.title}>Attachments:</Text>
        <TouchableOpacity  onPress={() => setIsVisible(true)}>
          <Text style={styles.data}>
            {assignment.question_file
              ? 'Click to open attachments' 
              : 'No attachments'}
          </Text>
        </TouchableOpacity>

        {assignment &&
        (!assignment.assignment_submission ||
          !assignment.assignment_submission.isSubmitted) ? (
          <>
            <TouchableOpacity
              disabled={isDue || isLoading} // Disable the button when loading or due date passed
              onPress={attachFile}
              style={[styles.assignment_op, {marginTop: windowHeight * 0.04}]}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFF" /> // Display loader
              ) : (
                <Text style={styles.op_text}>Attach a file</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isDue || isLoading }
              onPress={handleSubmit}
              style={styles.assignment_op}>
              <Text style={styles.op_text}>
                {!assignment.assignment_submission ? 'Turn in' : 'Submitted'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.alreadySubmittedText}>
            Assignment already submitted
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#edf5fa',
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
    color: '#000',
  },
  data: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  assignment_op: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fca88d',
    height: 45,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: 5,
  },
  op_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  alreadySubmittedText:{
    backgroundColor:"#fca88d",
    padding:8,
    top:12,
    borderRadius:7,
    color:'white',
    textAlign:'center'
  }
});

export default AssignmentDetail;
