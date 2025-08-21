import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  KnowledgeDashboard: undefined;
  NamespacesManagement: undefined;
};

export type KnowledgeDashboardScreenProps = DrawerScreenProps<RootDrawerParamList, 'KnowledgeDashboard'>;
export type NamespacesManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'NamespacesManagement'>;
