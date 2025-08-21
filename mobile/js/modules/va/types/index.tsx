import { DrawerScreenProps } from '@react-navigation/drawer';

export type VADrawerParamList = {
  VADashboard: undefined;
  BotsManagement: undefined;
  BotsTraining: undefined;
  ModelsManagement: undefined;
};

export type VADashboardScreenProps = DrawerScreenProps<RootDrawerParamList, 'VADashboard'>;
export type BotsManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'BotsManagement'>;
export type BotsTrainingScreenProps = DrawerScreenProps<RootDrawerParamList, 'BotsTraining'>;
export type ModelsManagementScreenProps = DrawerScreenProps<RootDrawerParamList, 'ModelsManagement'>;
