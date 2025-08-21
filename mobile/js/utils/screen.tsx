import { theme } from '@themes';
import HomeButton from '../components/HomeBtn';
import CustomDrawerToggleButton from '../components/CustomDrawerButton';

export const createScreenHeaderOptions = (title: string) => {
  return { 
    headerShown: true,
    headerTitle: title,
    headerTitleStyle: {
      color: theme.lightColors?.white
    },
    headerStyle: {
      backgroundColor: theme.lightColors?.primary
    },
    headerLeft: () => <CustomDrawerToggleButton />,
    headerRight: () => <HomeButton />
  }
};