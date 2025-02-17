import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Header from '../../Components/Home/Header';
import Seperator from '../../Components/Profile/Seperator';
import Hide from "react-native-vector-icons/Feather";
import * as yup from 'yup';
import PasswordVisiblity from '../../Components/Common/PasswordVisibility';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword, resetState } from '../../store/slices/ResetPasswordSlice';
import { useAuth } from '../../authContext';
import Validations from '../../Components/FromValidation/Validations';
import InfoModal from '../../Components/Common/InfoModal';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from '../../Components/Common/ErrorModal';


const windowWidth = Dimensions.get('window').width;

const passwordSchema = yup.object().shape({
  newPassword: yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

const Settings = () => {
  const [isSecureold, setIsSecureold] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [isSecureNew, setIsSecureNew] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [isSecureConfrim, setIsSecureConfrim] = useState(true);
  const [confirmPassword, setConfrimPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handlePasswordValidation, checkDisable, error } = Validations(newPassword, confirmPassword);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { UserData } = useAuth()

  const { isModalVisible, modalText, modalHeading, isErrorModalVisible } = useSelector(state => state.resetPassword)


  const isDisabled = checkDisable()

  const handleChangePassword = () => {
    const id = UserData?.id
    if (newPassword === confirmPassword) {
      setErrorMessage(null)
      dispatch(ResetPassword({ id, oldPassword, newPassword, confirmPassword }))
      setOldPassword("")
      setNewPassword("")
      setConfrimPassword("")

    }
    else
      setErrorMessage("password does not match")
  }


  const onClose = () => {
    dispatch(resetState());
    if (isModalVisible) {
      navigation.navigate("Home")
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      <SessionaTracker />

      <InfoModal
        isVisible={isModalVisible}
        message={modalText}
        heading={modalHeading}
        onClose={onClose}
      />

      <ErrorModal
        isVisible={isErrorModalVisible}
        message={modalText}
        heading={modalHeading}
        onClose={onClose}
      />

      <Header title="Password" />
      <Seperator marginTop={50} />

      <View style={styles.mainView}>

        <View style={{ paddingLeft: 12 }}>
          <Text style={styles.TopText}>Create new Password</Text>
          <Text style={{ fontSize: 14, color: "grey", marginTop: 5 }}>New password must be different from previous</Text>
        </View>

        <View style={{ marginVertical: 10, flex: 1, alignItems: "center" }}>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Old Password'
              placeholderTextColor="grey"
              secureTextEntry={isSecureold}
              style={styles.passIp}
              value={oldPassword}
              onChangeText={(t) => { setOldPassword(t) }} />

            <PasswordVisiblity
              isSecure={isSecureold}
              toggleSecure={() => setIsSecureold(!isSecureold)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='New Password'
              placeholderTextColor="grey"
              secureTextEntry={isSecureNew}
              style={styles.passIp}
              value={newPassword}
              onChangeText={(t) => { setNewPassword(t), handlePasswordValidation() }} />

            <PasswordVisiblity
              isSecure={isSecureNew}
              toggleSecure={() => setIsSecureNew(!isSecureNew)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Confirm Password'
              placeholderTextColor="grey"
              secureTextEntry={isSecureConfrim}
              style={styles.passIp}
              value={confirmPassword}
              onChangeText={(t) => { setConfrimPassword(t), handlePasswordValidation() }} />

            <PasswordVisiblity
              isSecure={isSecureConfrim}
              toggleSecure={() => { setIsSecureConfrim(!isSecureConfrim) }}
            />

          </View>

          {
            error.toLowerCase().includes("password") ?
              <Text style={{ color: "red", fontSize: 12, fontWeight: "300", height: 20 }}>{error}</Text>
              :
              null
          }

          {errorMessage ?
            <Text style={{ color: 'red', marginVertical: 5, fontSize: 12, fontWeight: "300", height: 20 }}>
              {errorMessage}
            </Text>
            :
            null
          }

          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => { handleChangePassword() }}
            style={styles.searchButton}>
            <Text style={styles.SearchText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Settings;




const styles = StyleSheet.create({
  TopText: {
    fontSize: 22,
    fontWeight: "400",
    color: "black"
  },
  mainView: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  inputContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 47,
    paddingHorizontal: 10,
    width: 300,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e3e3e3",

  },
  passIp: {
    flex: 1,
    fontSize: 14,
    borderRadius: 20,
    height: 47,
    fontWeight: '300',
    color: 'black',
    paddingLeft: 5
  },
  searchButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff9e80',
    height: 45,
    width: windowWidth * 0.83,
    alignSelf: 'center',
    marginTop: 10,
  },
  SearchText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
})