import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {t} from '../localization';
import linking from '../config/Linking';
import DashboardScreen from './Dashboard';
import KnowledgeDashboard from '../modules/knowledge/screens';
import WebsitesDrawer from '../modules/websites/screens';
import ECommerceDrawer from '../modules/ecommerces/screens';
import HRDrawer from '../modules/hr/screens';
import VADrawer from '../modules/va/screens';
import {theme} from '../themes';
import HomeButton from '../components/HomeBtn';
import {LogOutButton} from '../modules/oauth/components';
import CustomDrawerToggleButton from '../components/CustomDrawerButton';

const Stack = createNativeStackNavigator();

export default function MainStack(): React.JSX.Element {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
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
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerRight: () => <LogOutButton />,
            headerShown: true,
            headerLeft: () => { return null;},
          }}
        />
        <Stack.Screen
          name="HumanResources"
          component={HRDrawer}
          options={{title: t('Human_resources')}}
        />
        <Stack.Screen
          name="Ecommerce"
          component={ECommerceDrawer}
          options={{title: t('E_commerce')}}
        />
        <Stack.Screen
          name="Websites"
          component={WebsitesDrawer}
          options={{title: t('Websites')}}
        />
        <Stack.Screen
          name="VirtualAssistants"
          component={VADrawer}
          options={{title: t('Virtual_assistants')}}
        />
        <Stack.Screen
          name="Knowledge"
          component={KnowledgeDashboard}
          options={{title: t('Knowledge')}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
