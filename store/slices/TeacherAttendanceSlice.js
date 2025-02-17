import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import { API_URL } from "@env"

const initialState = {
  grade: [],
  section: [],
  subject: [],
  attendanceCodeOptions: [],
  students: null,
  std_attendance: null,
  studentApiCalled: false,
  isModalVisible: false,
  modalText: '',
  status: 'idle',
  error: null,
};

const AttendanceSlice = createSlice({
  name: 'Attendance',
  initialState: initialState,
  reducers: {
    resetStudentState: state => {
      state.students = null;
      state.studentApiCalled = false;
      state.isModalVisible = false;
      state.modalText = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    //for getting students
    builder
      .addCase(fetchStudents.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.students = action.payload.value;
          state.studentApiCalled = true;
          state.status = 'succeeded';
        } else if (action.payload.statusCode === 208) {
          state.isModalVisible = true;
          state.modalText = 'attendance already marked';
          state.status = 'succeeded';
        } else {
          state.students = null;
          state.studentApiCalled = true;
          state.status = 'failed';
          state.error = 'Failed to fetch students';
        }
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    //for getting classs
    builder
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.grade = action.payload.value;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.error = action.error.message;
      });

    //for getting sections
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.section = action.payload.value;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // for getting subjects
    builder
      .addCase(fetchSubjectByClass.fulfilled, (state, action) => {
        // Assuming the subjects come in `action.payload.value`
        state.subject = action.payload.value;
      })
      .addCase(fetchSubjectByClass.rejected, (state, action) => {
        state.error = action.error.message;
      });

    //for getting attendance code
    builder
      .addCase(fetchAttendanceCode.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.attendanceCodeOptions = action.payload.value;
        }
      })
      .addCase(fetchAttendanceCode.rejected, (state, action) => {
        state.error = action.error.message;
      });

    //for marking attendance
    builder
      .addCase(markAttendance.fulfilled, (state, action) => {
        if (action.payload.statusCode === 201) {
          state.isModalVisible = true;
          state.modalText = action.payload.message;
        }
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.error = action.error.message;
      });

    //for getting student prevous attendance
    builder
      .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.std_attendance = action.payload.value;
          state.studentApiCalled = true;
        } else if (action.payload.statusCode === 404) {
          state.std_attendance = null;
          state.studentApiCalled = true;
        }
      })
      .addCase(fetchStudentAttendance.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default AttendanceSlice.reducer;
export const {resetStudentState} = AttendanceSlice.actions;

export const fetchStudents = createAsyncThunk(
  'attendance/getStudentsForAttendance',
  async ({section_id, class_id, attendance_date, subject_id}) => {
    const response = await fetch(
      `${process.env.API_URL}/attendance/getStudentsForAttendance`,
      {
        method: 'post',
        body: JSON.stringify({
          section_id,
          class_id,
          attendance_date,
          subject_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();


    if (
      result.statusCode !== 200 &&
      result.statusCode !== 302 &&
      result.statusCode !== 208
    ) {
      throw new Error('Failed to fetch students');
    }

    return result;
  },
);

// New api added
export const fetchSubjectByClass = createAsyncThunk(
  'time-table/getSubjectByClass',
  async (class_id, {rejectWithValue}) => {
    try {
      // Convert class_id to string when sending it in the API
      const response = await fetch(
        `${process.env.API_URL}/time-table/getSubjectByClass`,
        {
          method: 'POST',
          body: JSON.stringify({class_id: class_id}),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.json();

      if (result.statusCode !== 200) {
        return rejectWithValue('Failed to fetch subjects');
      }
      return result;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return rejectWithValue(error.message || 'Failed to fetch subjects');
    }
  },
);

export const fetchClasses = createAsyncThunk(
  'attendance/fetchClasses',
  async (_, {getState, dispatch}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/attendance/getClass`,
      );
      const result = await response.json();
      if (result.statusCode !== 200) {
        throw new Error('Failed to fetch classes');
      }
      return result;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },
);

export const fetchSections = createAsyncThunk(
  'attendance/fetchSections',
  async (_, {getState, dispatch}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/attendance/getSection`,
      );
      const result = await response.json();
      if (result.statusCode !== 200) {
        throw new Error('Failed to fetch sections');
      }
      return result;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  },
);

export const fetchAttendanceCode = createAsyncThunk(
  'attendance/fetchAttendanceCode',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/attendance/attendanceCode`,
      );
      const result = await response.json();

      if (result.statusCode !== 200) {
        return rejectWithValue('Failed to fetch attendance code');
      }

      return result;
    } catch (error) {
      console.error('Error fetching attendance code:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch attendance code',
      );
    }
  },
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async ({attendanceData}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/attendance/markAttendance`,
        {
          method: 'post',
          body: JSON.stringify(attendanceData),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.json();

      if (result.statusCode !== 201) {
        return rejectWithValue('Failed to post attendance');
      }

      return result;
    } catch (error) {
      console.error('Error marking attendance:', error);
      return rejectWithValue(error.message || 'Failed to post attendance');
    }
  },
);

export const fetchStudentAttendance = createAsyncThunk(
  'attendance/getStudentsAttendanceByClassAndSection',
  async ({valueSection, valueClass, date,valueSubject}, {rejectWithValue}) => {
    const DATE = date.toISOString().split('T')[0];
    try {
      const response = await fetch(
        `${process.env.API_URL}/attendance/getStudentsAttendanceByClassAndSection`,
        {
          method: 'post',
          body: JSON.stringify({
            section_id: valueSection,
            class_id: valueClass,
            attendance_date: DATE,
            subject_id:valueSubject
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.json();
      if (result.statusCode !== 200 && result.statusCode !== 404) {
        return rejectWithValue('Failed to fetch student attendance');
      }
      return result;
    } catch (error) {
      console.error('Error fetching student attendance:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch student attendance',
      );
    }
  },
);
