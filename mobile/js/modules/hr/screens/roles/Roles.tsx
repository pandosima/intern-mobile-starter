import React from 'react';
import {RolesScreenScreenProps} from '../../types';
import RoleService from '../../services/roles';
import PaginationTable from '@components/PaginationTable';
import {FORMAT, formatDateTime} from '@utils/time';
import {View, Text} from 'react-native';
import { theme } from '@themes';

export default function RoleScreen(
  prop: RolesScreenScreenProps,
): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <PaginationTable
        service={RoleService}
        pageSize={5}
        searchable={true}
        multipleSelect={true}
        canDeleteItems={true}
        canEditItems={true}
        canAddItems={true}
        confirmDeletingMessage={'Do you really want to delete this role?'}
        confirmMultipleDeletingMessage={
          'Do you really want to delete these roles?'
        }
        allowExportToExcel={true}
        allowExportToJson={true}>
        {(item: any) => {
          return (
            <View>
              <View style={{flexDirection: 'column', marginBottom: 8}}>
                <Text style={{color:theme.lightColors?.black}}>{item.item.name}</Text>
              </View>

              <View style={{flexDirection: 'column', marginBottom: 8}}>
                <Text style={{minWidth: 30, color:theme.lightColors?.black}}>Updated at: </Text>
                <Text style={{color:theme.lightColors?.black}}>
                  {formatDateTime(
                    item.item.updated_at,
                    FORMAT.DATE_TIME,
                    false,
                  )}
                </Text>
              </View>
            </View>
          );
        }}
      </PaginationTable>
    </View>
  );
}
