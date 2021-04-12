import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username: localStorage.getItem("username"),
    avatar: localStorage.getItem("avatar")
};

// Cấu hình Slice (Ở đây có 1 slice là user)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateName: (state, action) => {
            state.username = action.payload;
        },
        updateAvatar: (state, action)=>{
            state.avatar = action.payload;
        }
    }
})

// Export actions
export const {updateName, updateAvatar} = userSlice.actions;


// Lấy ra state username, user avatar của user slice;
export const selectUsername = (state) => state.user.username;
export const selectUserAvatar = (state) => state.user.avatar;

// Export reducer
export default userSlice.reducer;

