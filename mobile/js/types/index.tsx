import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export * from '@modules/oauth/types';

export type AppStackParamList = {
  Dashboard: undefined;
  HumanResources: undefined;
  Ecommerce: undefined;
  Websites: undefined;
  VirtualAssistants: undefined;
  Knowledge: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<AppStackParamList, 'Dashboard'>
export type HumanResourcesScreenProps = NativeStackScreenProps<AppStackParamList, 'HumanResources'>;
export type EcommerceScreenProps = NativeStackScreenProps<AppStackParamList, 'Ecommerce'>;
export type WebsitesScreenProps = NativeStackScreenProps<AppStackParamList, 'Websites'>;
export type VirtualAssistantsScreenProps = NativeStackScreenProps<AppStackParamList, 'VirtualAssistants'>;
export type KnowledgeProps = NativeStackScreenProps<AppStackParamList, 'Knowledge'>;