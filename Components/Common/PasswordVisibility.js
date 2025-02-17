import React from 'react';
import { TouchableOpacity } from 'react-native';
import Hide from 'react-native-vector-icons/Feather';

const PasswordVisiblity = ({ isSecure, toggleSecure, color }) => {
  return (
    <TouchableOpacity
      onPress={toggleSecure}
      style={{ paddingRight: 5 }}>
      <Hide name={isSecure ? "eye" : "eye-off"} color={color ? color : "grey"} size={18} />
    </TouchableOpacity>
  );
}
export default PasswordVisiblity;
