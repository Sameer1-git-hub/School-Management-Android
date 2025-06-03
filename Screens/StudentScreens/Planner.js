import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../Components/Home/Header'; // Adjust path if needed

const windowWidth = Dimensions.get('window').width;

export default function Planner() {
  const [plannerData, setPlannerData] = useState([
    {
      id: '1',
      date: '2025-05-30',
      task: 'Math Revision – Chapter 5',
      note: 'Revise formulas and practice 10 questions.',
    },
  ]);

  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (!date || !task) return;

    const newEntry = {
      id: Date.now().toString(),
      date,
      task,
      note,
    };

    setPlannerData(prev => [newEntry, ...prev]);
    setDate('');
    setTask('');
    setNote('');
  };

  return (
    <>
      <Header title="Student Planner" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Task Title"
            value={task}
            onChangeText={setTask}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Additional Notes"
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 60 }]}
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add to Planner</Text>
          </TouchableOpacity>

          <FlatList
            data={plannerData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.task}>{item.task}</Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#ff9e80',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
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
  date: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  task: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 5,
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});
