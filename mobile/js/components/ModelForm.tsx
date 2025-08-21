import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import BaseService from '../services/BaseService';
import {nestedDiff, toFormData, overrideFieldIfNullOrEmpty} from '../utils/obj';
import {getErrorMessage} from '../utils/error';
import _ from 'lodash';
import {useAppSelector} from '../hooks';
import {Card, Icon, makeStyles} from '@rneui/themed';
import {theme} from '../themes';

import analytics from '@react-native-firebase/analytics';
import {recordError} from '../modules/firebase/crashlytics';
import {t} from '@localization';

interface Props {
  id?: string;
  service: BaseService;
  title?: string;
  collapsible?: boolean;
  default?: any | null;
  nestedFields?: any[];
  editable?: boolean;
  editing: boolean;
  overrideIfFieldNullOrEmpty?: any | null;
  rules?: any | null;
  contentType?: string | null;
  customCreateResponseParser?: (response: any) => any;
  labelWidth?: string | null;
  labelPosition?: string | null;
  onCustomUpdate?: (changes: any) => Promise<void>;
  onCustomCreate?: (changes: any) => Promise<void>;
  children: (props: {
    current: any;
    editing: boolean;
    setCurrent: React.Dispatch<React.SetStateAction<any>>;
  }) => React.ReactNode;
}

const ModelForm: React.FC<Props> = props => {
  const styles = useStyles();

  const [editing, setEditing] = useState<boolean>(
    props.editing && !!props.default,
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const initData = overrideFieldIfNullOrEmpty(
    props.default,
    props.overrideIfFieldNullOrEmpty,
  );
  const [current, setCurrent] = useState<any>(_.cloneDeep(initData));
  const [origin, setOrigin] = useState<any>(_.cloneDeep(initData));
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef(null);
  const tokenInfo = useAppSelector(state => state.oauth.tokenInfo);

  const changes = useMemo(() => {
    const o = origin;
    const c = current;
    if (!c) {
      return null;
    }

    return nestedDiff(c, o, props.nestedFields);
  }, [current, origin, props.nestedFields]);

  const changed = useMemo(() => {
    const c = changes;
    if (!c) {
      return false;
    }
    return Object.keys(c).length > 0;
  }, [changes]);

  useEffect(() => {
    fetchData();
  }, [tokenInfo]);

  const fetchData = async () => {
    const id = props.id;
    if (!id) return;

    setError(null);
    setLoading(true);

    try {
      let data = await props.service.get(id);
      if (props.overrideIfFieldNullOrEmpty) {
        data = overrideFieldIfNullOrEmpty(
          data,
          props.overrideIfFieldNullOrEmpty,
        );
      }
      setOrigin(_.cloneDeep(data));
      setCurrent(_.cloneDeep(data));
    } catch (e) {
      recordError(e as Error);
      setError(
        getErrorMessage(
          e,
          e.statusCode ? 'An error occurred' : 'Connection corrupted',
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    if (!formRef.current) return;

    // formRef.current.validate((valid: boolean) => {
    //   if (!valid) return;
    //   saveEntry();
    // });
    //Todo: validate formRef in React Native
    saveEntry();
  };

  const saveEntry = async () => {
    let value = changes;
    if (!value) return;

    const {id} = value;

    const contentType = props.contentType;
    if (contentType && contentType.includes('form-data')) {
      value = toFormData(value);
    }

    setError(null);
    try {
      if (id) {
        let response;
        if (props.onCustomUpdate) {
          response = await props.onCustomUpdate(changes);
        } else {
          response = await props.service.update(value);
        }
        let data = response;
        if (props.overrideIfFieldNullOrEmpty) {
          data = overrideFieldIfNullOrEmpty(
            data,
            props.overrideIfFieldNullOrEmpty,
          );
        }
        setOrigin(_.cloneDeep(data));
        setCurrent(_.cloneDeep(data));
      } else {
        let response;
        if (props.onCustomCreate) {
          response = await props.onCustomCreate(changes);
        } else {
          response = await props.service.create(value);
        }
        let data = props.customCreateResponseParser
          ? props.customCreateResponseParser(response)
          : response;
        if (props.overrideIfFieldNullOrEmpty) {
          data = overrideFieldIfNullOrEmpty(
            data,
            props.overrideIfFieldNullOrEmpty,
          );
        }
        setOrigin(_.cloneDeep(data));
        setCurrent(_.cloneDeep(data));
        // navigate to the updated URL based on `data.id`
      }

      //Analytics
      await analytics().logEvent('form_saved', {
        id: props.id || 'new_entry',
        changes: Object.keys(changes).length,
      });
    } catch (e) {
      recordError(e as Error);
      console.log(e);

      setError(getErrorMessage(e, t('an_error_occurred')));
    }
  };

  const discard = () => {
    if (origin) setCurrent(_.cloneDeep(origin));
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Card containerStyle={styles.card}>
              {error && <Text style={styles.errorText}>{error}</Text>}
              {!collapsed && current && (
                <View
                  ref={formRef}
                  style={{
                    display: collapsed ? 'none' : 'flex',
                    flexDirection: 'column',
                    margin: 20,
                  }}>
                  {/* Render children with current, editing, and setCurrent */}
                  {props.children({current, editing, setCurrent})}
                </View>
              )}
            </Card>
          )}
        </View>
      </ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          {props.editable && !editing && (
            <Icon
              style={styles.icon}
              name="edit"
              type="material"
              onPress={() => setEditing(true)}
              size={36}
              color={theme.lightColors?.white}
            />
          )}
          {editing && changed && (
            <Icon
              style={styles.icon}
              name="cancel"
              type="material"
              onPress={discard}
              size={36}
              color={theme.lightColors?.white}
            />
          )}
          {editing && changed && (
            <Icon
              style={styles.icon}
              name="save"
              type="material"
              onPress={onSave}
              size={36}
              color={theme.lightColors?.white}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ModelForm;

const useStyles = makeStyles(theme => ({
  scrollContainer: {
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('window').width, // Adjusting card width to fit the screen with some padding
    backgroundColor: theme.colors.background,
    padding: 0,
    margin: 0,
    borderColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  errorText: {
    color: theme.colors.error,
    alignSelf: 'center',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    justifyContent: 'flex-end', // Aligns items to the ends of the container
  },
  titleContainer: {
    flex: 1, // Takes up remaining space, pushing icons to the end
  },
  iconContainer: {
    flexDirection: 'row', // Align icons in a row
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
}));
