import React from 'react';
import {View, Text} from 'react-native';
import PaginationTable from '@components/PaginationTable';
import EmployeeService from '../../services/employees';
import {FORMAT, formatDate} from '@utils/time';
import {hasOneOfScopes} from '@components/RestrictedView';
import {Avatar} from '@rneui/themed';
import { theme } from '@themes';

const Employees = () => {
  let canEdit = hasOneOfScopes(['employees:edit']);

  return (
    <View style={{flex: 1}}>
      <PaginationTable
        service={EmployeeService}
        pageSize={5}
        searchable={true}
        multipleSelect={canEdit}
        canDeleteItems={canEdit}
        canEditItems={canEdit}
        canAddItems={canEdit}
        confirmDeletingMessage={'Do you really want to delete this employee?'}
        confirmMultipleDeletingMessage={
          'Do you really want to delete these employees?'
        }
        allowExportToExcel={true}
        allowExportToJson={true}>
        {(item: any) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Avatar
                rounded
                source={{
                  uri:
                    item.item.avatar ||
                    'https://randomuser.me/api/portraits/men/33.jpg',
                }}
                size={40}
                containerStyle={{marginRight: 10, alignSelf: 'center'}}
              />
              <View style={{flexDirection: 'column', marginBottom: 8}}>
                <Text
                  style={{color: theme.lightColors?.black, marginBottom: 8, maxWidth: 160}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.item.first_name + ' ' + item.item.last_name}
                </Text>

                <Text style={{minWidth: 30, color: theme.lightColors?.black}}>Email:</Text>
                <Text
                  style={{color: theme.lightColors?.black, marginBottom: 8, maxWidth: 160}}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.item.work_mail}
                </Text>

                <Text style={{minWidth: 30, color: theme.lightColors?.black}}>
                  Date of birth:
                </Text>
                <Text style={{color: theme.lightColors?.black, marginBottom: 8}}>
                  {formatDate(item.item.date_of_birth, FORMAT.DATE)}
                </Text>
              </View>
            </View>
          );
        }}
      </PaginationTable>
    </View>
  );
};

export default Employees;
