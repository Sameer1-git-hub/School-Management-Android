import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import React from 'react';
import Header from '../../Components/Home/Header'; // If using a custom header

const windowWidth = Dimensions.get('window').width;

const classWorkData = [
  {
    id: '1',
    subject: 'Math',
    title: 'Algebra Worksheet',
    date: '2025-05-29',
    status: 'Completed',
  },
  {
    id: '2',
    subject: 'Science',
    title: 'Chapter 3 Reading',
    date: '2025-05-28',
    status: 'Pending',
  },
  {
    id: '3',
    subject: 'English',
    title: 'Essay Writing',
    date: '2025-05-27',
    status: 'Completed',
  },
  {
    id: '4',
    subject: 'Physics',
    title: 'Essay Writing',
    date: '2025-05-27',
    status: 'Completed',
  },
  {
    id: '5',
    subject: 'Chemistry',
    title: 'Essay Writing',
    date: '2025-05-27',
    status: 'Pending',
  },
  {
    id: '6',
    subject: 'Biology',
    title: 'Essay Writing',
    date: '2025-05-27',
    status: 'Completed',
  },
];

export default function ClassWork() {
  return (
    <>
      <Header title="Class Work" />
      <View style={styles.container}>
        <FlatList
          data={classWorkData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>📅 {item.date}</Text>
              <View
                style={[
                  styles.statusTag,
                  {
                    backgroundColor:
                      item.status === 'Completed' ? '#4CAF50' : '#FF9800',
                  },
                ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
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
    padding: 16,
    paddingTop: 50
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  date: {
    marginTop: 6,
    color: '#888',
    fontSize: 13,
  },
  statusTag: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
});
