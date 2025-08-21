import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import {t} from '@localization';
import {createScreenHeaderOptions} from '@utils/screen';
import { EcommerceDrawerParamList } from '../types';
import DrawerContent from '../../../components/DrawerContent';
import DashboardSrceen from './Dashboard';
import SitesManagementScreen from './sites';
import ArticlesManagementScreen from './articles';
import ArticleCategoriesManagementScreen from './article-categories';
import OrdersManagementScreen from './orders';
import PaymentMedthodsManagementScreen from './payment-methods';
import DeliveryMedthodsManagementScreen from './delivery-methods';

const Drawer = createDrawerNavigator<EcommerceDrawerParamList>();

const websitesDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContent
      {...props}
      appName={t('Websites')}
      logoSource={require('../../../assets/HumanResource.jpg')}
      drawerItems={[
        {
          name: t('Dashboard'),
          icon: 'view-dashboard',
          screen: 'WebsitesDashboard',
        },
        {
          name: t('Sites'),
          icon: 'web',
          screen: 'SitesManagement',
        },
        {
          name: t('Articles'),
          icon: 'file-document-multiple',
          screen: 'ArticlesManagement',
        },
        {
          name: t('Article_categories'),
          icon: 'folder',
          screen: 'ArticleCategoriesManagement',
        }
      ]}
    />
  );
}

export default function WebsitesDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={websitesDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="WebsitesDashboard"
        component={DashboardSrceen}
        options={createScreenHeaderOptions(t('Dashboard'))}
      />
      <Drawer.Screen
        name="SitesManagement"
        component={SitesManagementScreen}
        options={createScreenHeaderOptions(t('Sites'))}
      />
      <Drawer.Screen
        name="ArticlesManagement"
        component={ArticlesManagementScreen}
        options={createScreenHeaderOptions(t('Articles'))}
      />
      <Drawer.Screen
        name="ArticleCategoriesManagement"
        component={ArticleCategoriesManagementScreen}
        options={createScreenHeaderOptions(t('Categories'))}
      />
    </Drawer.Navigator>
  );
};