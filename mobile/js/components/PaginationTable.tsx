import React, {useState, useEffect, useMemo} from 'react';
import pluralize from 'pluralize';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import {Button, Input, Icon, CheckBox, ListItem} from '@rneui/themed';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import BaseService from '../services/BaseService';
import {getErrorMessage} from '@utils/error';
import {toExcel} from '../exporters/xls/xlsx';
import {toJson} from '../exporters/json/json';
import {useAppSelector} from '../hooks';
import {theme} from '../themes';

import {logScreenView} from '@modules/firebase/analytics';
import { recordError } from '../modules/firebase/crashlytics';

// Define the props interface
interface Props<S extends BaseService> {
  service: S;
  pageSize?: number;
  searchable: boolean;
  multipleSelect: boolean;
  canDeleteItems: boolean;
  canEditItems: boolean;
  canAddItems: boolean;
  confirmDeletingMessage?: string;
  confirmMultipleDeletingMessage?: string;
  allowExportToExcel: boolean;
  excelSheetName?: string;
  excelFileName?: string;
  exportFields?: Record<string, any>;
  allowExportToJson: boolean;
  jsonFileName?: string;
  disableRowClick?: boolean;
  service_params?: Record<string, any>;
  children: (props: {item: any}) => React.ReactNode;
}

const PaginationTable = <S extends BaseService>({
  service,
  pageSize = 0,
  searchable,
  multipleSelect,
  canDeleteItems,
  canEditItems,
  canAddItems,
  confirmDeletingMessage,
  confirmMultipleDeletingMessage,
  allowExportToExcel,
  excelSheetName,
  excelFileName,
  exportFields,
  allowExportToJson,
  jsonFileName,
  disableRowClick,
  service_params,
  children,
}: Props<S>) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<any, any>>(); // Adjust RouteProp based on your navigation setup

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [data, setData] = useState<{
    page: number;
    page_size: number;
    num_pages: number;
    count: number;
    results: any[];
  }>({
    page: 1,
    page_size: pageSize,
    num_pages: 0,
    count: 0,
    results: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<any | null>(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [confirmMultipleDeleteDialog, setConfirmMultipleDeleteDialog] =
    useState(false);
  const tokenInfo = useAppSelector(state => state.oauth.tokenInfo);

  // Compute the query parameters
  const query = useMemo(() => {
    const {page, page_size} = data;
    let params: Record<string, any> = {};
    if (page_size > 0) {
      params.page_size = page_size;
    }
    if (page > 0) {
      params.page = page;
    }
    if (debouncedKeyword.trim().length > 0) {
      params.keyword = debouncedKeyword;
    }
    if (service_params) {
      params = {...params, ...service_params};
    }
    return params;
  }, [data.page, data.page_size, debouncedKeyword, service_params]);

  // Fetch data from the service
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await service.gets(query);

      if (pageSize > 0) {
        const {page, num_pages, count, results} = response as any;
        setData({
          page,
          num_pages,
          count,
          page_size: pageSize,
          results,
        });
      } else {
        setData(prev => ({
          ...prev,
          results: response as any,
        }));
      }
    } catch (e) {
      recordError(e as Error);
      setError(getErrorMessage(e, 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Debounce the keyword input
  useEffect(() => {
    const handler = setTimeout(() => {
      setData(prev => ({...prev, page: 1}));
      setDebouncedKeyword(keyword);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  // Fetch data when query changes
  useEffect(() => {
    fetchData();
  }, [query, tokenInfo]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [query, tokenInfo]),
  );

    // Log screen view to Firebase Analytics
    useEffect(() => {
      logScreenView({
        screen_name: route.name,
        screen_class: 'PaginationTable',
      });
    }, [route.name]);

  // Handle selection of items
  const onSelectionChange = (item: any) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Handle row click
  const onRowClick = (item: any) => {
    if (disableRowClick) return;
    const {id} = item;
    if (id) {
      // Navigate to detail/edit screen
      navigation.navigate(pluralize.singular(route.name), {id: id, editing: false});
    }
  };

  // Handle page change
  const onCurrentPageChange = (page: number) => {
    setData(prev => ({...prev, page}));
  };

  // Handle single item deletion
  const onDeleteItem = (item: any) => {
    setDeletingItem(item);
    setConfirmDeleteDialog(true);
  };

  const deleteItem = async () => {
    if (!deletingItem) return;
    setError(null);
    try {
      await service.delete(deletingItem.id);
      const newResults = data.results.filter(i => i.id !== deletingItem.id);
      if (newResults.length === 0 && data.page > 1) {
        setData(prev => ({...prev, page: prev.page - 1}));
      } else {
        setData(prev => ({...prev, results: newResults}));
      }
    } catch (e) {
      recordError(e as Error);
      setError(getErrorMessage(e, 'An error occurred'));
    } finally {
      setConfirmDeleteDialog(false);
      setDeletingItem(null);
    }
  };

  const cancelDeletingItem = () => {
    setConfirmDeleteDialog(false);
    setDeletingItem(null);
  };

  // Handle multiple items deletion
  const onMultipleDelete = () => {
    setConfirmMultipleDeleteDialog(true);
  };

  const multipleDelete = async () => {
    const ids = selectedItems.map(item => item.id);
    if (ids.length === 0) return;
    setError(null);
    try {
      await service.multipleDelete(ids);
      const newResults = data.results.filter(i => !ids.includes(i.id));
      if (newResults.length === 0 && data.page > 1) {
        setData(prev => ({...prev, page: prev.page - 1}));
      } else {
        setData(prev => ({...prev, results: newResults}));
      }
      setSelectedItems([]);
    } catch (e) {
      recordError(e as Error);
      setError(getErrorMessage(e, 'An error occurred'));
    } finally {
      setConfirmMultipleDeleteDialog(false);
    }
  };

  const cancelMultipleDeleting = () => {
    setConfirmMultipleDeleteDialog(false);
  };

  // Handle editing an item
  const editItem = (id: any) => {
    navigation.navigate(pluralize.singular(route.name), {id: id, editing: true});
  };

  // Handle adding a new item
  const onAdd = () => {
    navigation.navigate(pluralize.singular(route.name), {id: null, editing: true});
  };

  // Handle exporting to Excel
  const exportToExcelHandler = () => {
    const {results} = data;
    if (results) {
      toExcel(results, excelSheetName, excelFileName, exportFields);
    }
  };

  // Handle exporting to JSON
  const exportToJsonHandler = () => {
    const {results} = data;
    if (results) {
      toJson(results, jsonFileName);
    }
  };

  // Render each row/item
  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity onPress={() => onRowClick(item)}>
      <ListItem bottomDivider>
        {multipleSelect && (
          <CheckBox
            checked={selectedItems.some(i => i.id === item.id)}
            onPress={() => onSelectionChange(item)}
          />
        )}
        {/* Render children with current, editing, and setCurrent */}
        {children({item})}
        {(canDeleteItems || canEditItems) && (
          <View style={styles.operations}>
            {canEditItems && (
              <Button
                type="clear"
                icon={
                  <Icon
                    name="edit"
                    type="font-awesome"
                    size={20}
                    color={theme.lightColors?.grey2}
                  />
                }
                onPress={() => editItem(item.id)}
              />
            )}
            {canDeleteItems && (
              <Button
                type="clear"
                icon={
                  <Icon
                    name="trash"
                    type="font-awesome"
                    size={20}
                    color={theme.lightColors?.grey2}
                  />
                }
                onPress={() => onDeleteItem(item)}
              />
            )}
          </View>
        )}
      </ListItem>
    </TouchableOpacity>
  );

  // Render pagination controls
  const renderPagination = () => {
    const {page, num_pages} = data;
    const pages = [];

    for (let i = 1; i <= num_pages; i++) {
      pages.push(
        <Button
          key={i}
          title={`${i}`}
          type={i === page ? 'solid' : 'outline'}
          onPress={() => onCurrentPageChange(i)}
          containerStyle={styles.pageButtonContainer}
          buttonStyle={
            i === page ? styles.activePageButton : styles.inactivePageButton
          }
        />,
      );
    }

    return (
      <View style={styles.pagination}>
        <Icon
          containerStyle={styles.paginationButton}
          onPress={() => onCurrentPageChange(page - 1)}
          disabled={page <= 1}
          name="left"
          type="ant-design"
          size={24}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pages}
        </ScrollView>
        <Icon
          containerStyle={styles.paginationButton}
          onPress={() => onCurrentPageChange(page + 1)}
          disabled={page >= num_pages}
          name="right"
          type="ant-design"
          size={24}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Error Message */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.lightColors?.grey0}
          style={styles.loading}
        />
      )}

      {/* Controls: Search */}
      <View style={styles.controls}>
        {searchable && (
          <Input
            value={keyword}
            onChangeText={setKeyword}
            placeholder={'Keyword'}
            leftIcon={<Icon name="search" type="font-awesome" size={20} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
          />
        )}
      </View>

      {/* Data Table */}
      <FlatList
        data={data.results}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={selectedItems}
        contentContainerStyle={styles.table}
        ListEmptyComponent={
          !loading && <Text style={styles.empty}>No data available.</Text>
        }
      />

      {/* Pagination */}
      {pageSize > 0 && renderPagination()}

      {/* Controls: Action Buttons */}
      <View style={styles.actionButtons}>
        {/* Add Button */}
        {canAddItems && (
          <Button
            icon={
              <Icon
                name="plus"
                type="font-awesome"
                size={15}
                color={theme.lightColors?.white}
              />
            }
            title={' New'}
            onPress={onAdd}
            containerStyle={styles.addButton}
            color={styles.addButton.backgroundColor}
          />
        )}
        {allowExportToExcel && (
          <Button
            icon={
              <Icon
                name="file-excel-o"
                type="font-awesome"
                size={15}
                color={theme.lightColors?.white}
              />
            }
            title={' To excel'}
            onPress={exportToExcelHandler}
            containerStyle={styles.exportButton}
            color={styles.exportButton.backgroundColor}
          />
        )}
        {allowExportToJson && (
          <Button
            icon={
              <Icon
                name="file-code-o"
                type="font-awesome"
                size={15}
                color={theme.lightColors?.white}
              />
            }
            title={' To json'}
            onPress={exportToJsonHandler}
            containerStyle={styles.exportButton}
            color={styles.exportButton.backgroundColor}
          />
        )}
        {multipleSelect && selectedItems.length > 0 && (
          <Button
            icon={
              <Icon
                name="trash"
                type="font-awesome"
                size={15}
                color={theme.lightColors?.white}
              />
            }
            title={' Delete'}
            onPress={onMultipleDelete}
            containerStyle={styles.deleteButton}
            color={styles.deleteButton.backgroundColor}
          />
        )}
      </View>

      {/* Confirm Delete Dialog */}
      <Modal visible={confirmDeleteDialog}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{'Confirm Deleting'}</Text>
          <Text style={styles.modalMessage}>
            {confirmDeletingMessage
              ? confirmDeletingMessage
              : 'Do you want to delete this item?'}
          </Text>
          <View style={styles.modalButtons}>
            <Button
              title={'Yes'}
              onPress={deleteItem}
              containerStyle={styles.modalYesButton}
            />
            <Button
              title={'Cancel'}
              type="outline"
              onPress={cancelDeletingItem}
              containerStyle={styles.modalCancelButton}
            />
          </View>
        </View>
      </Modal>

      {/* Confirm Multiple Delete Dialog */}
      <Modal visible={confirmMultipleDeleteDialog}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{'Confirm Deleting'}</Text>
          <Text style={styles.modalMessage}>
            {confirmMultipleDeletingMessage
              ? confirmMultipleDeletingMessage
              : 'Do you want to delete these items?'}
          </Text>
          <View style={styles.modalButtons}>
            <Button
              title={'Yes'}
              onPress={multipleDelete}
              containerStyle={styles.modalYesButton}
            />
            <Button
              title={'Cancel'}
              type="outline"
              onPress={cancelMultipleDeleting}
              containerStyle={styles.modalCancelButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaginationTable;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // Align items to the center horizontally
    alignItems: 'stretch',
    backgroundColor: theme.lightColors?.background,
  },
  error: {
    alignSelf: 'center',
    color: theme.lightColors?.error,
    marginBottom: 10,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    maxWidth: 500,
    marginRight: 10,
  },
  inputStyle: {
    paddingLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: -10,
    padding: 10,
    width: Dimensions.get('window').width + 100,
    backgroundColor: theme.lightColors?.primary,
  },
  exportButton: {
    backgroundColor: theme.lightColors?.primary,
    marginRight: 5,
    flex: 0.2,
    shadowColor: 'transparent',
  },
  deleteButton: {
    backgroundColor: theme.lightColors?.primary,
    flex: 0.2,
    shadowColor: 'transparent',
  },
  table: {
    flexGrow: 1,
  },
  operations: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageButtonContainer: {
    marginHorizontal: 2,
  },
  activePageButton: {
    backgroundColor: theme.lightColors?.primary,
  },
  inactivePageButton: {
    borderColor: theme.lightColors?.grey3,
  },
  paginationButton: {
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: theme.lightColors?.primary,
    alignSelf: 'flex-end',
    marginRight: 5,
    flex: 0.2,
    shadowColor: 'transparent',
  },
  modalContent: {
    flex: 1,
    backgroundColor: theme.lightColors?.background,
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.lightColors?.black,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 20,
    color: theme.lightColors?.black,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalYesButton: {
    backgroundColor: theme.lightColors?.primary,
    marginRight: 10,
  },
  modalCancelButton: {
    borderColor: theme.lightColors?.grey3,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: theme.lightColors?.grey3,
  },
});
