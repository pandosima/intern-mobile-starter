import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '@themes';
import {t} from '@localization';
import HomeButton from '@components/HomeBtn';
import CustomDrawerToggleButton from '@components/CustomDrawerButton';
import TimekeeperDevicesScreen from './TimekeeperDevices';
import TimekeeperDeviceScreen from './TimekeeperDevice';
import { TimeTrackingStackParamList } from '../../../types';

const Stack = createNativeStackNavigator<TimeTrackingStackParamList>();

export default function TimekeeperDeviceManagementScreens(): React.JSX.Element {
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
      <Stack.Screen name="TimekeeperDevices" component={TimekeeperDevicesScreen} options={{headerTitle: t('Timekeeper_devices')}}/>
      <Stack.Screen name="TimekeeperDevice" component={TimekeeperDeviceScreen} options={{ headerLeft: undefined , headerTitle: t('Timekeeper_device')}} />
    </Stack.Navigator>
  );
}
