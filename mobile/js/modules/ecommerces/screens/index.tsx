import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import {t} from '@localization';
import {createScreenHeaderOptions} from '@utils/screen';
import { EcommerceDrawerParamList } from '../types';
import DrawerContent from '../../../components/DrawerContent';
import DashboardSrceen from './Dashboard';
import ProductCategoriesManagementScreen from './products-categories';
import ProductsManagementScreen from './products';
import PromotionsManagementScreen from './promotions';
import OrdersManagementScreen from './orders';
import PaymentMedthodsManagementScreen from './payment-methods';
import DeliveryMedthodsManagementScreen from './delivery-methods';

const Drawer = createDrawerNavigator<EcommerceDrawerParamList>();

const ecommerceDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContent
      {...props}
      appName={t('Human_resources')}
      logoSource={require('../../../assets/HumanResource.jpg')}
      drawerItems={[
        {
          name: t('Dashboard'),
          icon: 'view-dashboard',
          screen: 'EcommerceDashboard',
        },
        {
          name: t('Products'),
          icon: 'package',
          section: 'products',
          subItems: [
            { name: t('Categories'), screen: 'ProductCategoriesManagement' },
            { name: t('Products'), screen: 'ProductsManagement' },
          ],
          screen: ''
        },
        {
          name: t('Promotions'),
          icon: 'sale',
          screen: 'PromotionsManagement',
        },
        {
          name: t('Orders'),
          icon: 'cart',
          screen: 'OrdersManagementScreen',
        },
        {
          name: t('Payment_methods'),
          icon: 'cash',
          screen: 'PaymentMedthodsManagement',
        },
        {
          name: t('Delivery_methods'),
          icon: 'truck-delivery',
          screen: 'DeliveryMedthodsManagement',
        }
      ]}
    />
  );
}

export default function ECommerceDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={ecommerceDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="EcommerceDashboard"
        component={DashboardSrceen}
        options={createScreenHeaderOptions(t('Dashboard'))}
      />
      <Drawer.Screen
        name="ProductCategoriesManagement"
        component={ProductCategoriesManagementScreen}
        options={createScreenHeaderOptions(t('Categories'))}
      />
      <Drawer.Screen
        name="ProductsManagement"
        component={ProductsManagementScreen}
        options={createScreenHeaderOptions(t('Products'))}
      />
      <Drawer.Screen
        name="PromotionsManagement"
        component={PromotionsManagementScreen}
        options={createScreenHeaderOptions(t('Promotions'))}
      />
      <Drawer.Screen
        name="OrdersManagement"
        component={OrdersManagementScreen}
        options={createScreenHeaderOptions(t('Orders'))}
      />
      <Drawer.Screen
        name="PaymentMedthodsManagement"
        component={PaymentMedthodsManagementScreen}
        options={createScreenHeaderOptions(t('Payment_methods'))}
      />
      <Drawer.Screen
        name="DeliveryMedthodsManagement"
        component={DeliveryMedthodsManagementScreen}
        options={createScreenHeaderOptions(t('Delivery_medthods'))}
      />
    </Drawer.Navigator>
  );
};

