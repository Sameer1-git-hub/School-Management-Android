import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavModal} from './NavModel';
import {useAuth} from '../../authContext';
import {useDispatch} from 'react-redux';
import {resetStudentState} from '../../store/slices/TeacherAttendanceSlice';

const ScrollingOptions = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisble] = useState(false);
  const {UserRole} = useAuth();
  const dispatch = useDispatch();

  const handleNavigation = route => {
    // console.log(route, UserRole, modalVisible)
    if (route === 'Attendance' && UserRole === 'teacher') {
      setModalVisble(true);
    } else {
      navigation.navigate(route);
    }
  };

  return (
    <View style={{flex: 1, paddingVertical: 15}}>
      <NavModal
        optionOne="Mark Attendance"
        optionTwo="View Attendance"
        modalVisible={modalVisible}
        setModalVisble={setModalVisble}
      />

      <View style={{alignItems: 'center', paddingBottom: 25}}>
        <Image
          style={{width: '80%'}}
          source={require('../../Assets/home/seperator.png')}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              dispatch(resetStudentState());
              handleNavigation('Attendance');
            }}
            style={styles.options}>
            <Image
              style={styles.optionImage}
              source={require('../../Assets/home/attendance.png')}
            />
            <Text style={styles.Iconname}>Attendence</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigation('TimeTable')}
            style={styles.options}>
            <Image
              style={styles.optionImage}
              source={require('../../Assets/home/timetable.png')}
            />
            <Text style={styles.Iconname}>Time Table</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigation('News')}
            style={styles.options}>
            <Image
              style={styles.optionImage}
              source={require('../../Assets/home/notice.png')}
            />
            <Text style={styles.Iconname}>Notice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => handleNavigation('Subjects')}
            style={styles.options}>
            <Image
              style={styles.optionImage}
              source={require('../../Assets/home/homework.png')}
            />
            <Text style={styles.Iconname}>Assignments</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
                        onPress={() => { handleNavigation("Chats"); }}
                        style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/chats.png")} />
                        <Text style={styles.Iconname}>Chats</Text>
                    </TouchableOpacity> */}
          {/* 
                    <TouchableOpacity 
                    onPress={()=>{handleNavigation("Fee")}}
                    style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/fee.png")} />
                        <Text style={styles.Iconname}>Fee</Text>
                    </TouchableOpacity> */}
        </View>

        {/* <View style={styles.optionContainer}>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/quiz.png")} />
                        <Text style={styles.Iconname}>Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/progress.png")} />
                        <Text style={styles.Iconname}>Progress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/classwork.png")} />
                        <Text style={styles.Iconname}>Classwork</Text>
                    </TouchableOpacity>
                </View> */}
        {/* 
                <View style={styles.optionContainer}>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/gallery.png")} />
                        <Text style={styles.Iconname}>Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/learningResource.png")} />
                        <Text style={styles.Iconname}>Learnings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/monthlyPlanner.png")} />
                        <Text style={styles.Iconname}>Planner</Text>
                    </TouchableOpacity>

                </View> */}

        {/* <View style={styles.optionContainer}>

                    <TouchableOpacity style={styles.options}>
                        <Image
                            style={styles.optionImage}
                            source={require("../../Assets/home/contactus.png")} />
                        <Text style={styles.Iconname}>Contact Us</Text>
                    </TouchableOpacity>
                </View> */}
      </ScrollView>

      {/* <View style={{ alignItems: 'center', paddingTop: 15 }}>
                <Image
                    style={{ width: "80%" }}
                    source={require("../../Assets/home/seperator.png")} />
            </View> */}
    </View>
  );
};

export default ScrollingOptions;

const styles = StyleSheet.create({
  scrollContainer: {
    // borderColor: "green",
    // borderWidth: 1,
    flexGrow: 1,
  },
  options: {
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: 'center',
    width: 120,
  },
  optionImage: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
  },
  Iconname: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 37,
  },
});
