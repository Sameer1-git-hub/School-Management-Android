import { createSlice } from "@reduxjs/toolkit";


const imageURL = "https://res.cloudinary.com/dbg4yt0bz/image/upload/v1697908529/FYP/Employees/a0lujv320rfspnxrbk58.jpg";

const initialState = {
    teachers: [
        { name: "Shaheer", id: "T001", image: imageURL, techingSub: "Urdu" },
        { name: "Anita", id: "T002", image: imageURL, techingSub: "Urdu" },
        { name: "Rohan", id: "T003", image: imageURL, techingSub: "Urdu" },
        { name: "Samantha", id: "T004", image: imageURL, techingSub: "Urdu" },
        { name: "Jared", id: "T005", image: imageURL, techingSub: "Urdu" }
    ],
    students: [
        { name: "Alisha", id: "S001", image: imageURL, section: "6a" },
        { name: "Vikas", id: "S002", image: imageURL, section: "6a" },
        { name: "Tanya", id: "S003", image: imageURL, section: "6a" },
        { name: "Ivan", id: "S004", image: imageURL, section: "6a" },
        { name: "Maria", id: "S005", image: imageURL, section: "6a" }
    ]
};

const ChatsSlice = createSlice({
    name: "Attendance",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => { }
});

export default ChatsSlice.reducer;
