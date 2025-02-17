import React, {useState, useEffect} from 'react';
import {
  View,
  Switch,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '../../Components/Home/Header';
import {useNavigation} from '@react-navigation/native';
import Seperator from '../../Components/Profile/Seperator';
import SessionaTracker from '../../Components/Common/SessionaTracker';
import {useDispatch, useSelector} from 'react-redux';
import {markNotificationAsRead} from '../../store/slices/NotificationSlice';
import {useAuth} from '../../authContext';
import {fetchAllNews, fetchNews} from '../../store/slices/NotificationSlice';
import Animated, {FadeInUp} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const News = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const news = useSelector(state => state.notification.notifications);

  const dispatch = useDispatch();
  const {UserRole} = useAuth();
  const navigation = useNavigation();


  const handleEmailPress = notificationId => {
    dispatch(markNotificationAsRead(notificationId));
  };

  useEffect(() => {
    if (isEnabled) dispatch(fetchAllNews());
    else dispatch(fetchNews(UserRole));
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <SessionaTracker />

      <Header title="News" />

      <Seperator marginTop={50} />

      <View style={styles.toggleView}>
        <Text style={styles.toggleText}>See all</Text>

        <Switch
          trackColor={{false: '#a09fa1', true: '#a09fa1'}}
          thumbColor={isEnabled ? '#ff9e80' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {news &&
        (news.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              data={news}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <AnimatedTouchableOpacity
                  style={styles.list}
                  entering={FadeInUp.duration(400)}
                  onPress={() => {
                    navigation.navigate('NewsDetails', {
                      data: item,
                      toggle: isEnabled,
                    });
                    handleEmailPress(item.id);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
                      {item.user?.first_name || 'Unknown User'}
                    </Text>
                    <Text style={{fontSize: 11, fontWeight: '300'}}>
                      {item.createdAt ? item.createdAt.slice(0, 10) : 'No Date'}
                    </Text>
                  </View>

                  <Text>{item.user?.email || 'No Email'}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontWeight: '500'}}>Click to open</Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: item.read ? '300' : '500',
                      }}>
                      {item.read ? 'read' : 'unread'}
                    </Text>
                  </View>
                </AnimatedTouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '400', marginBottom: 50}}>
              no news yet
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toggleView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  toggleText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  MainHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 10,
  },
  list: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#edf5fa',
    width: windowWidth - 15,
    alignSelf: 'center',
    marginBottom: 2,
    borderRadius: 10,
    marginVertical: 2,
  },
});

export default News;
