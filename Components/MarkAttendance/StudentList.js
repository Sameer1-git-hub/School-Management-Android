import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AttendanceSheet from './AttendanceSheet';
function StudentList() {
    const [students, setStudents] = useState([
        { name: 'Mohammad Shaheer Gul', rollNo: 123456, studentID: 'S001' },
        { name: 'Mehdi Hassan', rollNo: 123456, studentID: 'S002' },
        { name: 'Charlie Clark', rollNo: 123456, studentID: 'S003' },
        { name: 'David Diaz', rollNo: 123456, studentID: 'S004' },
        { name: 'Eva Evans', rollNo: 123456, studentID: 'S005' },
        { name: 'Frank Foster', rollNo: 123456, studentID: 'S006' },
        { name: 'Grace Green', rollNo: 123456, studentID: 'S007' },
        { name: 'Hannah Hill', rollNo: 123456, studentID: 'S008' },
        { name: 'Ian Ingram', rollNo: 123456, studentID: 'S009' },
        { name: 'Jill Johnson', rollNo: 123456, studentID: 'S010' },
    ]); // Your students data
    
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleDropdownChange = (studentID) => {
        setActiveDropdown(studentID);
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={students}
            extraData={activeDropdown}
            keyExtractor={student => student.studentID.toString()}
            renderItem={({ item }) => (
                <AttendanceSheet
                    data={item}
                    onDropdownChange={handleDropdownChange}
                    isActive={activeDropdown === item.studentID}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

export default StudentList;
