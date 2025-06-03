import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './Navigators/Drawer';
import AuthStack from './Navigators/AuthStack';
import LoadingScreen from './Components/Home/LoadingScreen';
import NoConnectionScreen from './Components/Common/NoConnectionScreen';
import { AuthProvider, useAuth } from './authContext';
import { StatusProvider } from './NewsReadContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsInternetConnected, setIsInternetReachable } from './store/slices/NetworkSlice';
import NetInfo from "@react-native-community/netinfo";
import userData from './userdata';



const AppContent = () => {
  

  const { UserExists, isLoading, UserRole, token, setUserRole } = useAuth();
  console.log(useAuth)
  const { isInternetConnected, isInternetReachable } = useSelector(state => state.connection)
  const dispatch = useDispatch()


  ////////   GETTING USER DATA BY SENDING TOKEN   ////////
  useEffect(() => {
    
    const getData = async () => {
      try {
        const response = await fetch("http://your-ip:5000/auth/verifyToken", {
          method: "post",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        const result = await response.json()
        console.log(result)

        if (result.statusCode == 200) {
          if (result) {
            await AsyncStorage.setItem("USER_Role", result.value.role_name);
            await AsyncStorage.setItem("USER_Data", JSON.stringify(result.value));
            setUserRole(result.value.role_name);
          }
          else {
            console.log('Error message:', result.message);
          }
        }
        else if (result.statusCode == 401) {
          console.log('Donot get data because token expired ');
        }
      }
      catch (error) {
        console.log("Error in App page : ", error)
      }
    }


    // console.log("heyyyyy" , token , UserExists)

    if (token && UserExists) {
      getData()
    }
  }, [token, UserExists])

  ////////   CHECKING NEWTWORK STATUS   ////////
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setIsInternetConnected(state.isConnected));
      dispatch(setIsInternetReachable(state.isInternetReachable));
    });

    NetInfo.fetch().then(state => {
      dispatch(setIsInternetConnected(state.isConnected));
      dispatch(setIsInternetReachable(state.isInternetReachable));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  ////////   SETTING LOADING SCREEN ON API CALLING & FETCHING DATA FROM ASYNC STROAGE  ////////
  if (isLoading) {
    return <LoadingScreen />;
  }

  ////////   CHECKING NETWORK AVAILABILITY   ////////
  // if (!isInternetConnected || !isInternetReachable) {
  //   return <NoConnectionScreen />
  // }

  return UserExists ? <MyDrawer role={UserRole } /> : <AuthStack />;
};


const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>

        <NavigationContainer>
          <AppContent />
        </NavigationContainer>

      </AuthProvider>
    </Provider>

  );
};

export default App;
