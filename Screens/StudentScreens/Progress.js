import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  Dimensions,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Home/Header';

const windowWidth = Dimensions.get('window').width;

const studentProgressData = [
  {subject: 'Math', completed: 80},
  {subject: 'Science', completed: 65},
  {subject: 'English', completed: 90},
  {subject: 'History', completed: 50},
  {subject: 'Geography', completed: 75},
];

const getProgressColor = percentage => {
  if (percentage >= 85) return '#4CAF50'; // Green
  if (percentage >= 70) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

export default function Progress() {
  const safeProgress = value => {
    const progress = value / 100;
    return isNaN(progress) ? 0 : Math.min(Math.max(progress, 0), 1);
  };

  return (
    <>
      <Header title={'Progress'} />
      <View style={styles.container}>
        <Text style={styles.header}>📊 Student Progress</Text>
        <FlatList
          data={studentProgressData}
          keyExtractor={item => item.subject}
          renderItem={({item}) => {
            const progressColor = getProgressColor(item.completed);
            return (
              <View style={styles.card}>
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.percentage}>{item.completed}%</Text>
                {Platform.OS === 'android' ? (
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={safeProgress(item.completed)}
                    color={progressColor}
                  />
                ) : (
                  <ProgressViewIOS
                    progress={safeProgress(item.completed)}
                    progressTintColor={progressColor}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf5fa',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#d3e5eb',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    width: windowWidth - 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  subject: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#333',
    fontWeight: '300',
    marginBottom: 8,
  },
});
