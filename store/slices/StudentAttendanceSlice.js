import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_URL } from "@env"

const initialState = {
    studentAttendance: [],
    error: null,
    modalVisible: false
}

const studentAttendanceSlice = createSlice({
    
    name: "studentAttendance",
    initialState: initialState,
    reducers: {
        resetStudentState: (state) => {
            state.studentAttendance = [];
            state.error = null;
            state.modalVisible = false;
        },
    },
    
    extraReducers: builder => {
        builder
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.studentAttendance = action.payload.value;
                }
                else if (action.payload.statusCode === 409) {
                    state.error = action.payload.message;
                    state.modalVisible = true
                    state.studentAttendance = [];
                }
                else if (action.payload.statusCode === 404) {
                    state.studentAttendance = [];
                    state.error = action.payload.message;
                }
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
})

export default studentAttendanceSlice.reducer
export const { resetStudentState } = studentAttendanceSlice.actions;

export const fetchAttendance = createAsyncThunk(
    'attendance/fetchtAttendance',
    async ({ id, fDate, tDate }, { rejectWithValue }) => {

        try {
            const response = await fetch(`${process.env.API_URL}/attendance/getStudentAttendance`, {
                method: "post",
                body: JSON.stringify({ student_id: id, fromDate: fDate, toDate: tDate }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (result.statusCode !== 200 && result.statusCode !== 404 && result.statusCode !== 409) {
                return rejectWithValue('Failed to fetch student attendance');
            }
            return result;
        } catch (error) {
            console.error("Error fetching student attendance:", error);
            return rejectWithValue(error.message || 'Failed to fetch student attendance');
        }
    }
);