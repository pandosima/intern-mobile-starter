import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import {t} from '@localization';
import {createScreenHeaderOptions} from '@utils/screen';
import { VADrawerParamList } from '../types';
import DrawerContent from '../../../components/DrawerContent';
import DashboardSrceen from './Dashboard';
import BotsManagementScreen from './bots';
import BotsTrainingScreen from './training';
import ModelsManagementScreen from './models';

const Drawer = createDrawerNavigator<VADrawerParamList>();

const vaDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContent
      {...props}
      appName={t('Virtual_assistants')}
      logoSource={require('../../../assets/HumanResource.jpg')}
      drawerItems={[
        {
          name: t('Dashboard'),
          icon: 'view-dashboard',
          screen: 'VADashboard',
        },
        {
          name: t('Bots'),
          icon: 'face-agent',
          screen: 'BotsManagement',
        },
        {
          name: t('Training'),
          icon: 'progress-star',
          screen: 'BotsTraining',
        },
        {
          name: t('Models'),
          icon: 'brain',
          screen: 'ModelsManagement',
        }
      ]}
    />
  );
}

export default function VADrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={vaDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="VADashboard"
        component={DashboardSrceen}
        options={createScreenHeaderOptions(t('Dashboard'))}
      />
      <Drawer.Screen
        name="BotsManagement"
        component={BotsManagementScreen}
        options={createScreenHeaderOptions(t('Bots'))}
      />
      <Drawer.Screen
        name="BotsTraining"
        component={BotsTrainingScreen}
        options={createScreenHeaderOptions(t('Training'))}
      />
      <Drawer.Screen
        name="ModelsManagement"
        component={ModelsManagementScreen}
        options={createScreenHeaderOptions(t('Models'))}
      />
    </Drawer.Navigator>
  );
};