import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeesScreen from './Employees';
import Employee from './Employee';
import { EmployeesStackParamList } from '../../types';
import { theme } from '@themes';
import HomeButton from '@components/HomeBtn';
import CustomDrawerToggleButton from '@components/CustomDrawerButton';

const Stack = createNativeStackNavigator<EmployeesStackParamList>();

export default function EmployeesManagementScreen(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: theme.lightColors?.white
        },
        headerStyle: {
          backgroundColor: theme.lightColors?.primary
        },
        headerRight: () => <HomeButton />,
        headerLeft: () => <CustomDrawerToggleButton />,
        headerTintColor: theme.lightColors?.white,
      }}>
      <Stack.Screen name="Employees" component={EmployeesScreen} options={{headerTitle: "Employees"}}/>
      <Stack.Screen name="Employee" component={Employee} options={{ headerLeft: undefined , headerTitle: "Employee"}} />
    </Stack.Navigator>
  );
}
