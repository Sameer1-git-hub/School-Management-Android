import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import AttendanceSheet from '../../Components/MarkAttendance/AttendanceSheet';
import CustomDropdown from '../../Components/MarkAttendance/CustomDropdown';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import InfoModal from '../../Components/Common/InfoModal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchStudents,
  fetchClasses,
  fetchSections,
  fetchAttendanceCode,
  markAttendance,
  fetchSubjectByClass,
} from '../../store/slices/TeacherAttendanceSlice';
// import {fetchSubjectByClass} from '../../store/slices/TimeTableSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Attendance = () => {
  const [valueClass, setValueClass] = useState(null);
  const [valueSection, setValueSection] = useState(null);
  const [valueSubject, setValueSubject] = useState(null);
  const [labelClass, setLabelClass] = useState(null);
  const [labelSection, setLabelSection] = useState(null);
  const [labelSubject, setLabelSubject] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDisable, setisDisable] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const students = useSelector(state => state.attendance.students);
  const grade = useSelector(state => state.attendance.grade);
  const section = useSelector(state => state.attendance.section);
  const subjects = useSelector(state => state.attendance.subject);
  const options = useSelector(state => state.attendance.attendanceCodeOptions);
  const isModalVisible = useSelector(state => state.attendance.isModalVisible);
  const modalText = useSelector(state => state.attendance.modalText);
  const studentApiCalled = useSelector(
    state => state.attendance.studentApiCalled,
  );


  const subjectOptions = subjects.map(subject => ({
    label: subject.name,
    value: subject.id,
  }));
  useEffect(()=>{
    setValueSubject(subjectOptions.map(subject_id=>subject_id.value))

  },[])

  const handleGetStudents = () => {
    const attendance_date = new Date().toISOString().split('T')[0];
    dispatch(
      fetchStudents({
        section_id: valueSection,
        class_id: valueClass,
        subject_id: valueSubject,
        attendance_date: attendance_date,
      }),
    );
    dispatch(fetchAttendanceCode());
  };

  const checkClass_Section = () => {
    if (labelClass && labelSection) return false;
    return true;
  };

  const handlePostAttendance = async () => {
    dispatch(markAttendance({attendanceData}));
  };

  useEffect(() => {
    // const checkDisable = () => {
    //   attendanceData.length === students.length
    //     ? setisDisable(false)
    //     : setisDisable(true);
    // };

    const checkDisable = () => {
      // Ensure all students have an attendance entry
      const isAllMarked = students.every(student => 
        attendanceData.some(data => data.rollNo === student.roll_number)
      );
      
      setisDisable(!isAllMarked);
    };
    if (students?.length&& attendanceData?.length) {
      checkDisable();
    }
    dispatch(fetchClasses());
    dispatch(fetchSections());
    if (valueClass) {
        dispatch(fetchSubjectByClass(String(valueClass)));
        dispatch(fetchSubjectByClass());
      }

    if (!options) fetchAttendanceCode();
  }, [attendanceData, students,valueClass]);



  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        source={require('../../Assets/attendance/AttendanceBg.png')}
        style={{backgroundColor: '#edf5fa', paddingBottom: 10}}>
        <SessionaTracker />

        {isModalVisible ? (
          <InfoModal
            isVisible={isModalVisible}
            message={modalText}
            heading="Message"
            onClose={() => {
              navigation.goBack();
              // setModalVisible(!isModalVisible);
            }}
          />
        ) : null}

        <View>
          <Header title="Attendance" />
        </View>

        <Seperator marginTop={50} />

        <View style={{}}>
          <View style={styles.dropDownView}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '400',
                  marginBottom: 5,
                }}>
                Select Class & Section
              </Text>
            </View>

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

          <View>
            <TouchableOpacity
              onPress={() => handleGetStudents()}
              disabled={checkClass_Section()}
              style={{
                ...styles.Go,
                backgroundColor: checkClass_Section() ? '#fcbba7' : '#ff9e80',
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                Go
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {studentApiCalled ? (
        students && students.length > 0 ? (
          <View style={{flex: 1, paddingVertical: 2}}>
            <Seperator />
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                paddingHorizontal: 7,
                paddingTop: 5,
              }}>
              <Text
                style={[
                  styles.studentInfo,
                  {paddingLeft: windowWidth * 0.023},
                ]}>
                Roll No
              </Text>
              <Text
                style={[
                  styles.studentInfo,
                  {flex: 1, marginLeft: -windowWidth * 0.03},
                ]}>
                Name
              </Text>
              <Text
                style={[
                  styles.studentInfo,
                  {paddingHorizontal: '5%', marginRight: '2%'},
                ]}>
                Attendance
              </Text>
            </View>
            <Seperator />

            <View style={{flex: 1}}>
              <FlatList
                contentContainerStyle={{Bottom: windowHeight * 1}}
                data={students}
                keyExtractor={(student, index) => `${student.roll_number}-${index}`}
                renderItem={({item}) => (
                  <AttendanceSheet
                    data={item}
                    options={options}
                    onAttendanceUpdate={updatedAttendance => {
                      const updatedWithSubject = {
                        // add subject_id here 
                        ...updatedAttendance,
                        subject_id: valueSubject, 
                      };
                      setAttendanceData(prevData => {
                        const existingIndex = prevData.findIndex(
                          student =>
                            student.rollNo === updatedAttendance.rollNo,
                        );
                        if (existingIndex !== -1) {
                          prevData[existingIndex] = updatedWithSubject;
                          return [...prevData];
                        } else {
                          return [...prevData, updatedWithSubject];
                        }
                      });
                    }}
                  />
                )}
              />
            </View>

            <View style={{backgroundColor: '#edf5fa'}}>
              <TouchableOpacity
                onPress={handlePostAttendance}
                disabled={isDisable}
                style={{
                  ...styles.Sumbit,
                  backgroundColor: isDisable ? '#fcbba7' : '#ff9e80',
                }}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#edf5fa',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'grey', fontSize: 18, fontWeight: '300'}}>
              No Student Found!
            </Text>
          </View>
        )
      ) : (
        <View style={{flex: 1, backgroundColor: '#edf5fa'}}></View>
      )}
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  dropDownView: {
    marginTop: 10,
    alignItems: 'center',
  },
  Go: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    width: 250,
    alignSelf: 'center',
    marginTop: 5,
    zIndex: 1,
  },
  Sumbit: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    width: 250,
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 2,
    zIndex: 1,
  },
  studentInfo: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    alignSelf: 'center',
    fontWeight: '500',
    textAlign: 'center',
  },
});
