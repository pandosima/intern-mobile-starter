import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RolesStackParamList = {
  'Roles': undefined;
  'Role': {id: string, editing: boolean} | undefined;
};

export type RolesScreenScreenProps = NativeStackScreenProps<
  RolesStackParamList,
  'Roles'
>;

export type RoleScreenScreenProps = NativeStackScreenProps<
  RolesStackParamList,
  'Role'
>;
