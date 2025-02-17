// connectionSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    year: 2023,
    challans: [
        {
            status: "paid",
            month: "June",
            year: "2022",
            duedate: "June 15th 2023",
            amount: 2200,
            dueAmount: 0
        },
        {
            status: "unpaid",
            month: "July",
            year: "2022",
            duedate: "July 20th 2023",
            amount: 2800,
            dueAmount: 3200
        },
        {
            status: "unpaid",
            month: "May",
            year: "2023",
            duedate: "May 17th 2023",
            amount: 2500,
            dueAmount: 3500
        },
        {
            status: "paid",
            month: "June",
            year: "2023",
            duedate: "June 15th 2023",
            amount: 2200,
            dueAmount: 0
        },
        {
            status: "unpaid",
            month: "July",
            year: "2023",
            duedate: "July 20th 2023",
            amount: 2800,
            dueAmount: 3200
        },
        {
            status: "unpaid",
            month: "Aug",
            year: "2023",
            duedate: "July 20th 2023",
            amount: 2800,
            dueAmount: 3200
        },
        {
            status: "unpaid",
            month: "July",
            year: "2023",
            duedate: "July 20th 2023",
            amount: 2800,
            dueAmount: 3200
        },
        {
            status: "unpaid",
            month: "Aug",
            year: "2023",
            duedate: "July 20th 2023",
            amount: 2800,
            dueAmount: 3200
        }
    ],
}

export const feeSlice = createSlice({
    name: 'fee',
    initialState: initialState,
    reducers: {
        handleIncr: (state) => {
            state.year += 1
        },
        handleDecr: (state) => {
            state.year -= 1
        },
    }
});

export const { handleIncr, handleDecr } = feeSlice.actions
export default feeSlice.reducer;


export const selectFilteredChallans = (state) => {
    return state.fee.challans.filter((challan) => challan.year === state.year);
};