import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Person from 'react-native-vector-icons/MaterialIcons';
import Lock from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../authContext';
import PasswordVisiblity from '../../Components/Common/PasswordVisibility';
import ErrorModal from '../../Components/Common/ErrorModal';
import Validations from '../../Components/FromValidation/Validations';
import {useDispatch} from 'react-redux';
import {API_URL} from '@env';
// import App from '../../App';

const windowHeight = Dimensions.get('window').height;

const Login = () => {
  const [isSecure, setIsSecure] = useState(true);
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const {
    handleUsernameValidation,
    handlePasswordValidation,
    checkDisable,
    error,
  } = Validations(UserName, Password);
  const navigation = useNavigation();
  const isDisabled = checkDisable();
  const {setToken, setUserExists} = useAuth();

  ////   GETTING AUTH TOKEN    ////////
  const handleLogin = async () => {
    const email = UserName.trim();
    const password = Password.trim();
    try {
      // const response = await fetch("http://192.168.29.216:5000/auth/signin", {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'post',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
    //   console.log('response', response);
      console.log('result', result.role);
    //   setRole(result.role);

      if (result.statusCode === 200) {
        await AsyncStorage.setItem('USER_Exists', 'true');
        await AsyncStorage.setItem('USER_Role', result.role);
        setUserExists(true);
        await AsyncStorage.setItem('Token', result.token);
        setToken(result.token);
      } else {
        setModalText(result.message);
        setModalVisible(true);
      }
    } catch (error) {
      console.log('Error in Log in : ', error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../Assets/Background.png')}>
        {isModalVisible ? (
          <ErrorModal
            isVisible={isModalVisible}
            message={modalText}
            heading="Error"
            onClose={() => setModalVisible(!isModalVisible)}
          />
        ) : null}

        {/* <TouchableOpacity
                    onPress={() => { navigation.navigate("Signup") }}
                    style={{ alignSelf: 'flex-end' }}>

                    <Text style={{ color: "#0F96A3", fontWeight: '400' }}>SignUp</Text>

                </TouchableOpacity> */}

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>School Monitoring</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 15}}>
          <View style={styles.inputContainer}>
            <Person name="person" color="#e6e6e6" size={20} />

            <TextInput
              placeholder="Username"
              placeholderTextColor="white"
              style={styles.userName}
              value={UserName}
              onChangeText={t => {
                setUserName(t), handleUsernameValidation();
              }}
            />
          </View>

          {error.toLowerCase().includes('name') ? (
            <Text style={{color: 'red', fontSize: 12, fontWeight: '300'}}>
              {error}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Lock name="lock" color="#e6e6e6" size={18} />

            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={isSecure}
              style={styles.userName}
              value={Password}
              onChangeText={t => {
                setPassword(t), handlePasswordValidation();
              }}
            />

            <PasswordVisiblity
              isSecure={isSecure}
              toggleSecure={() => setIsSecure(!isSecure)}
              color="white"
            />
          </View>

          {error.toLowerCase().includes('password') ? (
            <Text style={{color: 'red', fontSize: 12, fontWeight: '300'}}>
              {error}
            </Text>
          ) : null}

          <View
            style={[styles.Login, isDisabled ? {opacity: 0.7} : {opacity: 1}]}>
            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => handleLogin()}
              style={{paddingRight: 5, flex: 1, alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '300'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={{alignSelf: 'center', marginTop: 10}}>
          <Text style={{color: 'black', fontWeight: '300', fontSize: 14}}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: '400',
                color: '#0F96A3',
                fontSize: 13,
                marginBottom: 5,
              }}>
              Version:2.2.5(P)
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '400', color: 'black', fontSize: 14}}>
              {' '}
              Powered by
              <Text style={{color: '#0F96A3', fontWeight: 'bold'}}>
                {' '}
                FireFly{' '}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    padding: 15,
    flex: 1,
  },
  logoText: {
    color: '#01272e',
    fontWeight: '700',
    fontSize: 22,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    borderRadius: 20,
    height: 47,
    fontWeight: '300',
    color: 'white',
    paddingLeft: 15,
  },
  inputContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#3CA9B4',
    height: 47,
    paddingHorizontal: 10,
    width: 300,
    marginTop: 10,
  },
  Login: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#F98864',
    height: 47,
    paddingHorizontal: 10,
    width: 300,
    marginTop: 10,
  },
  logo: {
    color: '#0F96A3',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    height: windowHeight * 0.19,
    justifyContent: 'center',
    marginTop: windowHeight * 0.02,
  },
});
