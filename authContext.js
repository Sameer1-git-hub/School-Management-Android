import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [UserExists, setUserExists] = useState(null);
    const [UserRole, setUserRole] = useState(null);
    const [UserData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    ////////   CLEANING ASYNC STORAGE   ////////
    const removeAllData = async () => {
        try {
            await AsyncStorage.clear()
            console.log("All data erased in async storage")
        } catch (error) {
            console.log("Error in authContext erasing all data from storage: ", error)
        }

    }
    // removeAllData()

    useEffect(() => {

        ////////   SETTING THE USER DATA AT FIRST LOGIN   ////////
        const fetchUserExists = async () => {
            const user_status = await AsyncStorage.getItem("USER_Exists");
            const Token = await AsyncStorage.getItem("Token");
            const user_role = await AsyncStorage.getItem("USER_Role");
            const user_data = await AsyncStorage.getItem("USER_Data");
            setUserExists(user_status);
            setToken(Token);
            setUserRole((user_role));
            setUserData(JSON.parse(user_data));
            setIsLoading(false);
        };

        fetchUserExists();

    }, [UserRole]);

    return (

        <AuthContext.Provider value={{ UserExists, setUserExists, UserRole, setUserRole, isLoading, UserData, token, setToken }}>
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
