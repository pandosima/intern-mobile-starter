import {createAsyncThunk} from '@reduxjs/toolkit';
import UserTokenService from '../services/UserTokenService';

export const createUserToken = createAsyncThunk(
  'userToken/createUserToken/',
  async (data: {user_id: string; token: string}) => {
    return await UserTokenService.create(data);
  },
);

export const deleteUserToken = createAsyncThunk(
  'userToken/deleteUserToken/',
  async (data: {id: string}) => {
    const {id} = data;
    return await UserTokenService.delete(id);
  },
);
