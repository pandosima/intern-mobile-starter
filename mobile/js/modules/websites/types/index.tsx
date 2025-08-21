import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  WebsitesDashboard: undefined;
  SitesManagement: undefined;
  ArticlesManagement: undefined;
  ArticleCategoriesManagement: undefined;
};

export type WebsitesDashboardScreenProps = DrawerScreenProps<RootDrawerParamList, 'WebsitesDashboard'>;
export type SitesManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'SitesManagement'>;
export type ArticlesManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'ArticlesManagement'>;
export type ArticleCategoriesManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'ArticleCategoriesManagement'>;
