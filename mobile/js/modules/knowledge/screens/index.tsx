import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import {t} from '@localization';
import {createScreenHeaderOptions} from '@utils/screen';
import { EcommerceDrawerParamList } from '../types';
import DrawerContent from '../../../components/DrawerContent';
import DashboardSrceen from './Dashboard';
import NamespacesManagementScreen from './namespaces';

const Drawer = createDrawerNavigator<EcommerceDrawerParamList>();

const knowledgeDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContent
      {...props}
      appName={t('Human_resources')}
      logoSource={require('../../../assets/HumanResource.jpg')}
      drawerItems={[
        {
          name: t('Dashboard'),
          icon: 'view-dashboard',
          screen: 'KnowledgeDashboard',
        },
        {
          name: t('Namespaces'),
          icon: 'harddisk',
          screen: 'NamespacesManagement',
        }
      ]}
    />
  );
}

export default function KnowledgeDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={knowledgeDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="KnowledgeDashboard"
        component={DashboardSrceen}
        options={createScreenHeaderOptions(t('Dashboard'))}
      />
      <Drawer.Screen
        name="NamespacesManagement"
        component={NamespacesManagementScreen}
        options={createScreenHeaderOptions(t('Namespaces'))}
      />
    </Drawer.Navigator>
  );
};