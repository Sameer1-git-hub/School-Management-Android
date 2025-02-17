import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env";

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: {
        status: "idle",
        isModalVisible: false,
        isErrorModalVisible: false,
        modalText: "",
        modalHeading: ""
    },
    reducers: {
        resetState: state => {
            Object.assign(state, {
                status: "idle",
                isModalVisible: false,
                isErrorModalVisible: false,
                modalText: "",
                modalHeading: ""
            });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(ResetPassword.pending, state => {
                state.status = 'loading';
            })
            .addCase(ResetPassword.fulfilled, (state, action) => {
                const { statusCode } = action.payload;
                if (statusCode === 200) {
                    Object.assign(state, {
                        modalHeading: "Success",
                        modalText: "Password changed successfully",
                        isModalVisible: true,
                        status: 'succeeded'
                    });
                } else if (statusCode === 411) {
                    Object.assign(state, {
                        isErrorModalVisible: true,
                        modalHeading: "Failed",
                        modalText: "Old Password does not match",
                        status: 'Failed'
                    });
                } else if (statusCode === 412) {
                    Object.assign(state, {
                        isErrorModalVisible: true,
                        modalHeading: "Failed",
                        modalText: "New password and confirm password do not match",
                        status: 'Failed'
                    });
                } else {
                    state.status = 'failed';
                    modalHeading = "Failed";
                    state.modalText = 'Failed to change password';
                    state.isErrorModalVisible = true;
                }
            })
            .addCase(ResetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default resetPasswordSlice.reducer;
export const { resetState } = resetPasswordSlice.actions;

export const ResetPassword = createAsyncThunk('/auth/forgotPassword',
    async ({ id, oldPassword, newPassword, confirmPassword }) => {
        const response = await fetch(`${process.env.API_URL}/auth/forgotPassword`, {
            method: "POST",
            body: JSON.stringify({ user_id: id, oldPassword, password: newPassword, confirmPassword }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (![200, 411, 412].includes(result.statusCode)) {
            throw new Error('Failed to reset password');
        }

        return result;
    }
);