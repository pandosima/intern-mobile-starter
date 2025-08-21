import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type EmployeesStackParamList = {
  'Employees': undefined;
  'Employee': {id: string; editing: boolean} | undefined;
};

export type EmployeesScreenProps = NativeStackScreenProps<
  EmployeesStackParamList,
  'Employee'
>;

export type EmployeeScreenProps = NativeStackScreenProps<
  EmployeesStackParamList,
  'Employee'
>;
