import { configureStore } from '@reduxjs/toolkit'
import attendanceSlice from './slices/TeacherAttendanceSlice'
import connectionSlice from './slices/NetworkSlice'
import notificationSlice from './slices/NotificationSlice'
import studentAttendanceSlice from './slices/StudentAttendanceSlice'
import resetPasswordSlice from './slices/ResetPasswordSlice'
import chatsSlice from './slices/ChatsSlice'
import feeSlice from './slices/FeeSlice'
import assignmenstSlice from './slices/AssignmenstSlice'
import timeTableSlice from './slices/TimeTableSlice'

const store = configureStore({
    reducer: {
        attendance: attendanceSlice,
        connection: connectionSlice,
        notification: notificationSlice,
        studentAttendance: studentAttendanceSlice,
        resetPassword: resetPasswordSlice,
        chats: chatsSlice,
        fee: feeSlice,
        assignment: assignmenstSlice,
        timetable : timeTableSlice
    },
})

export default store