import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { t } from '@localization';
import Roles from './Roles';
import Role from './Role';
import {theme} from '../../../../themes';
import HomeButton from '../../../../components/HomeBtn';
import CustomDrawerToggleButton from '../../../../components/CustomDrawerButton';
import {RolesStackParamList} from '../../types/RolesStack';


const Stack = createNativeStackNavigator<RolesStackParamList>();

export default function RolesManagementScreen(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: theme.lightColors?.white,
        },
        headerStyle: {
          backgroundColor: theme.lightColors?.primary,
        },
        headerRight: () => <HomeButton />,
        headerLeft: () => <CustomDrawerToggleButton />,
      }}>
      <Stack.Screen name="Roles" component={Roles} options={{headerTitle: t("Roles")}}/>
      <Stack.Screen
        name="Role"
        component={Role}
        options={{headerLeft: undefined, title: t("Role"), headerTintColor: theme.lightColors?.white}}
      />
    </Stack.Navigator>
  );
}
