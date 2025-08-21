import { DrawerScreenProps } from '@react-navigation/drawer';

export type EcommerceDrawerParamList = {
  EcommerceDashboard: undefined;
  ProductCategoriesManagement: undefined;
  ProductsManagement: undefined;
  PromotionsManagement: undefined;
  OrdersManagement: undefined;
  PaymentMedthodsManagement: undefined;
  DeliveryMedthodsManagement: undefined;
};

export type EcommerceDashboardScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'EcommerceDashboard'>;
export type ProductCategoriesManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'ProductCategoriesManagement'>;
export type ProductsManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'ProductsManagement'>;
export type PromotionsManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'PromotionsManagement'>;
export type OrdersManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'OrdersManagement'>;
export type PaymentMedthodsManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'PaymentMedthodsManagement'>;
export type DeliveryMedthodsManagementScreenProps = DrawerScreenProps<EcommerceDrawerParamList, 'DeliveryMedthodsManagement'>;
