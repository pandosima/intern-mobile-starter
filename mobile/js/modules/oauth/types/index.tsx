import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type OAuthStackParamList = {
  Login: undefined;
  //Todo: Add other screens for Changing/Resting/Forgoting password.
};

export type LoginScreenProps = NativeStackScreenProps<OAuthStackParamList, 'Login'>