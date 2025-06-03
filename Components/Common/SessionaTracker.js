import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionaTracker = () => {
  const {setUserExists, setUserData, token, setUserRole, setToken} = useAuth();
  console.log(token)
  const [isVisible, setIsVisible] = useState(false);

  ////////   CHECKING TOKEN VALIDITY   ////////
  useEffect(() => {
    const VerifyToken = async () => {
      try {
        const response = await fetch(
          'https://shaheer.firefly-techsolutions.com/auth/verifyToken',
          {
            method: 'post',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        );
        const result = await response.json();

        if (result.statusCode == 200) {
        } else if (result.statusCode == 401) {
          setIsVisible(true);
          console.log('Session End');
        }
      } catch (error) {
        console.log('Error in Session Tracker Comp : ', error);
      }
    };

    VerifyToken();
  }, [token]);

  ////////  CLEANING ALL STATES AND ASYNC STORAGE  ////////
  const removeAllData = async () => {
    try {
      await AsyncStorage.clear();
      setUserExists(null);
      setUserRole(null);
      setUserData(null);
      setToken(null);
    } catch (error) {
      console.log('Error in Removing Data in Sesssion Tracker : ', error);
    }
  };

  return (
    <View>
      {isVisible ? (
        <SessionEndModal
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
            removeAllData();
          }}
        />
      ) : null}
    </View>
  );
};

const SessionEndModal = ({isVisible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image
                style={{height: 50, width: 50, alignSelf: 'center'}}
                source={require('../../Assets/errorModal/error.png')}
              />
            </View>

            <View style={styles.textView}>
              <Text style={styles.modalHeading}>Oops...</Text>
              <Text style={styles.modalText}>Session has been ended</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    justifyContent: 'center',
    width: '70%',
    height: '27%',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#F98864',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
  },
  modalText: {
    fontSize: 14,
    fontWeight: '300',
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  textView: {
    flex: 1,
    paddingVertical: 5,
  },
});

export default SessionaTracker;
