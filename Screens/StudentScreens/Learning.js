import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Home/Header';

const windowWidth = Dimensions.get('window').width;

const learningResources = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    type: 'Video',
    duration: '15 min',
  },
  {
    id: '2',
    title: 'Photosynthesis Notes',
    type: 'PDF',
    duration: '5 pages',
  },
  {
    id: '3',
    title: 'World War II Summary',
    type: 'Article',
    duration: '10 min read',
  },
  {
    id: '4',
    title: 'English Grammar Basics',
    type: 'Video',
    duration: '12 min',
  },
];

export default function Learning() {
  return (
    <>
      <Header title="Learning Resources" />
      <View style={styles.container}>
        <FlatList
          data={learningResources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.type} • {item.duration}
              </Text>
              <Text style={styles.link}>▶ Tap to Start</Text>
            </TouchableOpacity>
          )}
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
    paddingTop: 60,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: windowWidth - 30,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  meta: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: '#ff9e80',
    fontWeight: '500',
  },
});
