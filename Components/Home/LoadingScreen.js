import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet , ImageBackground} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{flex : 1}}>
        <ImageBackground 
        style={styles.container}
        source={require("../../Assets/Background.png")}>

      <ActivityIndicator size={45} color="blue" />
      <Text style={styles.loadingText}>Loading</Text>

        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});

export default LoadingScreen;
