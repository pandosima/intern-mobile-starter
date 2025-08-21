import React from 'react';
import {View, Text} from 'react-native';
import PaginationTable from '../../../../../components/PaginationTable';
import DeviceService from '../../../services/devices';
import {hasOneOfScopes} from '../../../../../components/RestrictedView';
import {theme} from '../../../../../themes';

const TimekeeperDevicesScreen = () => {
  let canEdit = hasOneOfScopes(['devices:view']);

  return (
    <View style={{flex: 1}}>
      <PaginationTable
        service={DeviceService}
        pageSize={5}
        searchable={true}
        multipleSelect={canEdit}
        canDeleteItems={canEdit}
        canEditItems={canEdit}
        canAddItems={canEdit}
        confirmDeletingMessage={'Do you really want to delete this device?'}
        confirmMultipleDeletingMessage={
          'Do you really want to delete these devices?'
        }
        allowExportToExcel={true}
        allowExportToJson={true}>
        {(item: any) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', marginBottom: 8}}>
                <Text
                  style={{
                    color: theme.lightColors?.black,
                    marginBottom: 8,
                    maxWidth: 200,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.item.name}
                </Text>

                <View style={{marginLeft: 10}}>
                  <Text style={{minWidth: 30, color: theme.lightColors?.black}}>
                    Email:
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColors?.black,
                      marginBottom: 8,
                      maxWidth: 200,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.item.user.email}
                  </Text>
                </View>

                <View style={{marginLeft: 10}}>
                  <Text style={{minWidth: 30, color: theme.lightColors?.black}}>
                    Owner:
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColors?.black,
                      marginBottom: 8,
                      maxWidth: 200,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.item.user.first_name} {item.item.user.last_name}
                  </Text>
                </View>

                <View style={{marginLeft: 10}}>
                  <Text style={{minWidth: 30, color: theme.lightColors?.black}}>
                    Office:
                  </Text>
                  <Text
                    style={{
                      color: theme.lightColors?.black,
                      marginBottom: 8,
                      maxWidth: 200,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.item.office?.name}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      </PaginationTable>
    </View>
  );
};

export default TimekeeperDevicesScreen;
