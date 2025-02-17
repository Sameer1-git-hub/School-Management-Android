import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env"


const initialState = {
    notifications: []
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        markNotificationAsRead: (state, action) => {
            const notificationId = action.payload;
            const notification = state.notifications.find((n) => n.id === notificationId);
            if (notification) {
                notification.read = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.notifications = action.payload;
        });
        builder.addCase(fetchAllNews.fulfilled, (state, action) => {
            state.notifications = action.payload;
        });
    },
});


export const { markNotificationAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;

export const fetchNews = createAsyncThunk('announcement/getAnnouncementByRole',
    async (UserRole) => {
        try {
            const response = await fetch(`${process.env.API_URL}/announcement/getAnnouncementByRole`, {
                method: "post",  // Assuming you meant to use POST here
                body: JSON.stringify({ role_name: UserRole }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            return result.value;
        }
        catch (error) {
            console.log("Error in Notification Slice : ", error);
            throw error;
        }
    }
);

export const fetchAllNews = createAsyncThunk('announcement/getAllAnnouncement',
    async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/announcement/getAllAnnouncement`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            return result.value;
        }
        catch (error) {
            console.log("Error in Notification Slice : ", error);
            throw error;
        }
    }
);

