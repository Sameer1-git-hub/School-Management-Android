import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
  // subjects: ["Urdu", "English", "Maths", "Physics", "Chemistry", "Computer", "Islamiyat", "History"]
  assignments: [],
  subjects: [],
  submissions: [],
  error: '',
  modalVisibility: false,
  navigateHome : false
};

const assignmentSlice = createSlice({
  name: 'Assignment',
  initialState: initialState,
  reducers: {
    resetAssignment(state) {
      state.assignments = [];
      state.submissions = [];
      state.error = null;
    },
    resetAllinAssignment(state) {
      state.assignments = [];
      state.subjects = [];
      state.error = null;
    },
    resetModal(state) {
      state.error = null;
      state.modalVisibility = false;
    },
  },
extraReducers: builder => {
  builder
    .addCase(getSubject.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        state.subjects = action.payload.value;
        state.modalVisibility = false;
        state.error = ''; // Clear any previous error
      } else if (action.payload.statusCode === 400) {
        state.subjects = [];
        state.modalVisibility = true;
        state.error = action.payload.message;
      }
    })
    .addCase(getSubject.rejected, (state, action) => {
      state.subjects = [];
      state.error = "We're sorry, there was a network error";
      state.modalVisibility = true;
    })
    .addCase(getAssignments.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        state.assignments = action.payload.value;
        state.modalVisibility = false;
        state.error = ''; // Clear any previous error
      } else if (action.payload.statusCode === 404) {
        state.assignments = [];
        state.modalVisibility = true;
        state.error = action.payload.message;
      }
    })
    .addCase(getTeacherSubject.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        state.subjects = action.payload.value;
        state.modalVisibility = false;
        state.error = ''; // Clear any previous error
      } else if (action.payload.statusCode === 404) {
        state.subjects = [];
        state.modalVisibility = true;
        state.error = action.payload.message;
      }
    })
    .addCase(getTeacherSubject.rejected, (state, action) => {
      state.subjects = [];
      state.error = "We're sorry, there was a network error";
      state.modalVisibility = true;
    })
    .addCase(getAssignmentSubmissions.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        state.submissions = action.payload.value;
        state.modalVisibility = false;
        state.error = ''; // Clear any previous error
      } else if (action.payload.statusCode === 404) {
        state.submissions = [];
        state.modalVisibility = true;
        state.error = action.payload.message;
      }
    })
    .addCase(getAssignmentSubmissions.rejected, (state, action) => {
      state.submissions = [];
      state.error = "We're sorry, there was a network error";
      state.modalVisibility = true;
    })
    .addCase(submitAssignment.fulfilled, (state, action) => {
      if (action.payload.statusCode === 200) {
        state.assignments.push(action.payload.value);
        state.modalVisibility = true;
        state.error = "Assignment Posted"; 
        state.navigateHome = true
      } else {
        state.error = action.payload.message;
        state.modalVisibility = true;
        state.navigateHome = false
      }
    })
    .addCase(submitAssignment.rejected, (state, action) => {
      state.error = action.payload || 'Failed to submit assignment';
      state.modalVisibility = true;
      state.navigateHome = false
    });
}

});

export default assignmentSlice.reducer;
export const {resetAssignment, resetAllinAssignment, resetModal} =
  assignmentSlice.actions;


export const submitAssignment = createAsyncThunk(
    '/assignment/assignmentSubmission',
    async ({ assignment_id, submitted_by, file }, { rejectWithValue }) => {
      try {
        // Create a FormData object to hold the form fields and the file
        const formData = new FormData();
        formData.append('assignment_id', assignment_id); // Ensure these field names match what your backend expects
        formData.append('submitted_by', submitted_by);
        formData.append('file', {
          uri: file.uri,   // The local file URI on the device
          type: file.type, // The MIME type of the file
          name: file.name, // The file name, as it should appear in the FormData
        });
  
  
        // Make the API request to upload the assignment
        const response = await fetch(
          `${process.env.API_URL}/assignment/assignmentSubmission`,
          {
            method: 'POST',
            body: formData, // No need to set Content-Type header; the browser will do it
          }
        );

  
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Server Error:', errorText);
          throw new Error(`Network response was not ok: ${errorText}`);
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        console.log('Failed to submit assignment', error);
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
  );
  
  

export const getSubject = createAsyncThunk(
  '/time-table/getSubjectByClass',
  async ({class_id}, {rejectWithValue}) => {
    try {
      const response = await fetch(`${process.env.API_URL}/time-table/getSubjectByClass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({class_id: `${class_id}`}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.log('Failed to fetch subjects', error);
      return rejectWithValue(error.message);
    }
  },
);

export const getAssignments = createAsyncThunk(
  '/time-table/getAssignments',
  async ({subject_id, student_id, class_id, section_id}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/assignment/getSubjectAssignment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({subject_id, student_id, class_id, section_id}),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.log('Failed to fetch assignments', error);
      return rejectWithValue(error.message);
    }
  },
);

export const getTeacherSubject = createAsyncThunk(
  '/time-table/getSubjectsForTeacher',
  async ({teacher_id}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/time-table/getSubjectsForTeacher`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({teacher_id: teacher_id}),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.log('Failed to fetch subjects for teacher', error);
      return rejectWithValue(error.message);
    }
  },
);

//same as student just need teacher_id in place of student_id
export const getAssignmentsForTeacher = createAsyncThunk(
  '/assignment/getSubjectAssignmentForTeacher',
  async ({class_id, section_id, subject_id, student_id}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/assignment/getSubjectAssignmentForTeacher`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject_id,
            teacher_id: student_id,
            class_id,
            section_id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.log('Failed to fetch assignments', error);
      return rejectWithValue(error.message);
    }
  },
);

export const getAssignmentSubmissions = createAsyncThunk(
  '/assignment/getSubmittedAssignmtForTeacher',
  async (
    {class_id, section_id, subject_id, assignment_id},
    {rejectWithValue},
  ) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/assignment/getSubmittedAssignmtForTeacher`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            class_id,
            section_id,
            subject_id,
            assignment_id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.log('Failed to fetch assignments', error);
      return rejectWithValue(error.message);
    }
  },
);
