import {createAsyncThunk} from '@reduxjs/toolkit';
import OauthService from '../services/OauthService';
import UserService from '../services/UserService';
import {RootState} from '../../../store/reducer';

export const login = createAsyncThunk(
  'oauth/login/',
  async (data: {username: string; password: string}) => {
    const {username, password} = data;
    return await OauthService.login(username, password);
  },
);

export const logout = createAsyncThunk(
  'oauth/logout',
  async (force: boolean, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const {oauth} = state;
    const {tokenInfo, loggingOut} = oauth;
    if (!force && loggingOut) {
      return rejectWithValue('logging out');
    }
    const {access_token, refresh_token} = tokenInfo;
    if (!access_token || !refresh_token) {
      return rejectWithValue('logged out');
    }
    return await OauthService.logout(access_token, refresh_token);
  },
);

export const refreshToken = createAsyncThunk(
  'oauth/refreshToken',
  async (force: boolean, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const {oauth} = state;
    const {tokenInfo, refreshingToken} = oauth;
    if (!force && refreshingToken) {
      return rejectWithValue('refreshing');
    }
    const {refresh_token} = tokenInfo;
    if (!refresh_token) {
      return rejectWithValue('logged out');
    }
    return await OauthService.refressToken(refresh_token);
  },
);

export const fetchUser = createAsyncThunk(
  'oauth/fetchUser',
  async (force: boolean, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const {oauth} = state;
    const {tokenInfo, fetchingUser} = oauth;
    if (!force && fetchingUser) {
      return rejectWithValue('fetching');
    }
    const {sub} = tokenInfo;
    if (!sub) {
      return rejectWithValue('You have not login!');
    }
    return await UserService.userinfo();
  },
);

export const register = createAsyncThunk(
  'oauth/register/',
  async (data: { firstname: string; lastname: string; email: string; plan: 'starter' | 'premium' | 'standard' }) => {
    const { firstname, lastname, email, plan } = data;
    await OauthService.register(firstname, lastname, email, plan);
  }
);