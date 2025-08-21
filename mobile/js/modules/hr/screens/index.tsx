import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { t } from '@localization';
import { createScreenHeaderOptions } from '@utils/screen';
import { HRDrawerParamList } from '../types';
import DrawerContent from '@components/DrawerContent';
import DashboardScreen from './Dashboard';
import RolesManagementScreen from './roles';
import EmployeesManagementScreen from './employees';
import Contracts from './contracts';
import OfficesScreen from './offices/Offices';
import OrganizationTreeScreen from './organization/OrganizationTree';
import OrganizationChart from './organization/OrganizationChart';
import LeaveTypesScreen from './leaves/LeaveTypes';
import LeaveRequestsScreen from './leaves/LeaveRequests';
import ApprovalsScreen from './leaves/Approvals';
import TemplatesScreen from './appraisals/Templates';
import AppraisalsScreen from './appraisals/Appraisals';
import TimekeeperDeviceManagement from './timetracking/devices/index';
import TimeRecords from './timetracking/TimeRecordsScreen';
import CustomFieldsScreen from './employees/CustomFieldsScreen';
import { hasOneOfScopes } from '../../../components/RestrictedView';

const Drawer = createDrawerNavigator<HRDrawerParamList>();

const hrDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContent
      {...props}
      appName={t('Human_resources')}
      logoSource={require('../../../assets/HumanResource.jpg')}
      drawerItems={[
        {
          name: t('Dashboard'),
          icon: 'view-dashboard',
          screen: 'HRDashboard',
        },
        {
          name: t('Roles'),
          icon: 'account-key',
          screen: 'RolesManagement',
        },
        {
          name: t('Employees'),
          icon: 'account-group',
          section: 'EmployeesManagement',
          subItems: [
            ...(hasOneOfScopes(['employees:edit']) 
            ? [{ name: t('Custom_fields'), screen: 'CustomFields' }]
            : []),
            { name: t('Employees'), screen: 'EmployeesManagement' },
            { name: t('Contracts'), screen: 'Contracts' },
          ],
          screen: ''
        },
        {
          name: t('Offices'),
          icon: 'office-building',
          screen: 'Offices',
        },
        {
          name: t('Organization'),
          icon: 'sitemap',
          section: 'Organization',
          subItems: [
            { name: t('Organization_tree'), screen: 'OrganizationTree' },
            { name: t('Organization_chart'), screen: 'OrganizationChart' },
          ],
          screen: ''
        },
        {
          name: t('Leaves'),
          icon: 'exit-run',
          section: 'leaves',
          subItems: [
            { name: t('Leave_types'), screen: 'LeaveTypes' },
            { name: t('Leave_requests'), screen: 'LeaveRequests' },
            { name: t('Approvals'), screen: 'Approvals' },
          ],
          screen: ''
        },
        {
          name: t('Appraisals'),
          icon: 'file-sign',
          section: 'appraisals',
          subItems: [
            { name: t('Templates'), screen: 'Templates' },
            { name: t('Appraisals'), screen: 'Appraisals' },
          ],
          screen: ''
        },
        {
          name: t('Time_tracking'),
          icon: 'calendar-clock',
          section: 'timetracking',
          subItems: [
            { name: t('Timekeeper_devices'), screen: 'TimekeeperDeviceManagement' },
            { name: t('Time_records'), screen: 'TimeRecords' },
          ],
          screen: ''
        }
      ]}
    />
  )
}


export default function HRDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={hrDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="HRDashboard"
        component={DashboardScreen}
        options={createScreenHeaderOptions(t('Dashboard'))}
      />
      <Drawer.Screen
        name="EmployeesManagement"
        component={EmployeesManagementScreen}
      />
      <Drawer.Screen
        name="RolesManagement"
        component={RolesManagementScreen}
      />
      <Drawer.Screen
        name="CustomFields"
        component={CustomFieldsScreen}
         options={createScreenHeaderOptions(t('Custom_fields'))}
      />
      <Drawer.Screen
        name="Contracts"
        component={Contracts}
        options={createScreenHeaderOptions(t('Contracts'))}
      />
      <Drawer.Screen
        name="Offices"
        component={OfficesScreen}
        options={createScreenHeaderOptions(t('Offices'))}
      />
      <Drawer.Screen
        name="OrganizationTree"
        component={OrganizationTreeScreen}
        options={createScreenHeaderOptions(t('Organization_tree'))}
      />
      <Drawer.Screen
        name="OrganizationChart"
        component={OrganizationChart}
        options={createScreenHeaderOptions(t('Organization_chart'))}
      />
      <Drawer.Screen
        name="LeaveTypes"
        component={LeaveTypesScreen}
        options={createScreenHeaderOptions(t('Leave_types'))}
      />
      <Drawer.Screen
        name="LeaveRequests"
        component={LeaveRequestsScreen}
        options={createScreenHeaderOptions(t('Leave_requests'))}
      />
      <Drawer.Screen
        name="Approvals"
        component={ApprovalsScreen}
        options={createScreenHeaderOptions(t('Approvals'))}
      />
      <Drawer.Screen
        name="Templates"
        component={TemplatesScreen}
         options={createScreenHeaderOptions(t('Templates'))}
      />
      <Drawer.Screen
        name="Appraisals"
        component={AppraisalsScreen}
        options={createScreenHeaderOptions(t('Appraisals'))}
      />
      <Drawer.Screen
        name="TimekeeperDeviceManagement"
        component={TimekeeperDeviceManagement}
      />
      <Drawer.Screen
        name="TimeRecords"
        component={TimeRecords}
        options={createScreenHeaderOptions(t('Time_records'))}
      />
    </Drawer.Navigator>
  );
};


