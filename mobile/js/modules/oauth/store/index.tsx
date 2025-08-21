import {createSlice} from '@reduxjs/toolkit';
import initialState, {User, extractTokenInfo} from './initialState';
import {login, logout, refreshToken, fetchUser, register} from './actions';
import { log, setUserId, setAttributes } from '../../firebase/crashlytics';

export const oauthSlide = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    setTokenInfo: (state, action) => {
      state.tokenInfo = extractTokenInfo(action.payload);
    },
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
    reset: (state, action) => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loggingIn = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const tokenInfo = extractTokenInfo(action.payload);
      state.tokenInfo = tokenInfo;
      state.loggingIn = false;
    });
    builder.addCase(login.rejected, state => {
      state.loggingIn = false;
    });
    builder.addCase(logout.pending, state => {
      state.loggingOut = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.tokenInfo = initialState.tokenInfo;
      state.loggingOut = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loggingOut = false;
    });
    builder.addCase(refreshToken.pending, state => {
      state.refreshingToken = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.tokenInfo = extractTokenInfo(action.payload);
      state.refreshingToken = false;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      if (action.payload !== 'refreshing') {
        state.refreshingToken = false;
      }
    });
    builder.addCase(fetchUser.pending, state => {
      state.fetchingUser = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as unknown as User;
      setUserId(state.currentUser.id);
      setAttributes({
        first_name: String(state.currentUser.first_name),
        last_name: String(state.currentUser.last_name),
        email: String(state.currentUser.email),
        active: String(state.currentUser.active),
      });

      state.fetchingUser = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.payload !== 'fetching') {
        state.refreshingToken = false;
      }
    });
    builder.addCase(register.pending, state => {
      state.registering = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.tokenInfo = initialState.tokenInfo;
      state.registering = false;
    });
    builder.addCase(register.rejected, state => {
      state.registering = false;
    });
  },
});

export const {setTokenInfo, setCredential, reset} = oauthSlide.actions;

export default oauthSlide.reducer;
