import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env"

const initialState = {
    teacherTimeTable: [],
    timetable: [],
    error: null,
    days: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" }
    ]
}

const timetableSlice = createSlice({
    initialState: initialState,
    name: "TimeTable",
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getTimeTable.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.timetable = action.payload.value;
                }
                else if (action.payload.statusCode === 404) {
                    state.timetable = [];
                    state.error = action.payload.message
                }
                else {
                    state.timetable = [];
                    state.error = "Network error"
                }
            })
            .addCase(getTimeTableforTeacher.fulfilled, (state, action) => {
                if (action.payload.statusCode === 400) {
                    state.teacherTimeTable = action.payload.value;
                }
                else if (action.payload.statusCode === 404) {
                    state.teacherTimeTable = [];
                    state.error = action.payload.message
                }
                else {
                    state.timetable = [];
                    state.error = "Network error"
                }
            })
})

export default timetableSlice.reducer;

export const getTimeTableforTeacher = createAsyncThunk(
    "/time-table/getDayWiseTimeTableForTeacher",
    async ({ day, id }, { rejectWithValue }) => {

        try {
            const response = await fetch(`${process.env.API_URL}/time-table/getDayWiseTimeTableForTeacher`, {
                method: "POST",
                body: JSON.stringify({ day: day, teacher_id: id }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            return result;

        } catch (error) {

            console.log("Failed to fetch time table", error);
            return rejectWithValue(error.message);
        }
    }
);
export const getTimeTable = createAsyncThunk(
    "/time-table/getDayWiseTableTimeForStudent",
    async ({ day, class_id, section_id }, { rejectWithValue }) => {

        try {
            const response = await fetch(`${process.env.API_URL}/time-table/getDayWiseTableTimeForStudent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ day, class_id, section_id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            return result;

        } catch (error) {

            console.log("Failed to fetch subjects", error);
            return rejectWithValue(error.message);
        }
    }

);


