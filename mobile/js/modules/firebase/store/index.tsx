import {createSlice} from '@reduxjs/toolkit';
import initialState, {UserToken} from './initialState';
import {createUserToken, deleteUserToken} from './actions';
import { log } from '../crashlytics';

export const firebaseSlide = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload as UserToken;
    },
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(createUserToken.pending, state => {
      state.uploadingUserToken = true;
    });
    builder.addCase(createUserToken.fulfilled, (state, action) => {
      state.userToken = action.payload as unknown as UserToken;
    });
    builder.addCase(createUserToken.rejected, state => {
      state.uploadingUserToken = false;
      log("Failed to upload user token");
    });

    builder.addCase(deleteUserToken.pending, state => {
      state.removingUserToken = true;
    });
    builder.addCase(deleteUserToken.fulfilled, state => {
      state.userToken = initialState.userToken;
    });
    builder.addCase(deleteUserToken.rejected, state => {
      state.removingUserToken = false;
    });
  },
});

export const {setUserToken, reset} = firebaseSlide.actions;

export default firebaseSlide.reducer;
