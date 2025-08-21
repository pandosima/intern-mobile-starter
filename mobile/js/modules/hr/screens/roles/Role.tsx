import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ModelForm from '@components/ModelForm';
import RoleService from '../../services/roles';
import {RoleScreenScreenProps} from '../../types';
import ScopeSelector from '../../components/roles/ScopeSelector';
import OauthService from '@modules/oauth/services/OauthService';
import {useFocusEffect} from '@react-navigation/native';
import { theme } from '@themes';

import { recordError } from '@modules/firebase/crashlytics';

export default function Role(props: RoleScreenScreenProps) {
  const [roleId] = useState(props.route.params?.id);
  const [editing] = useState(props.route.params?.editing);

  const [_scopes, _setScopes] = useState<any>(null);
  const [_default_scopes, _setDefaultScopes] = useState<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      OauthService.getScopes().then((response: any) => {
        console.log('scope response:\n', response);
        const {scopes, default_scopes} = response;
        try {
          //peopleGrantableScopes
          if (scopes && scopes.openid) {
            delete scopes.openid;
          }
        } catch (error) {
          recordError(error as Error);
          console.warn(error);
        }

        _setScopes(scopes);
        _setDefaultScopes(default_scopes);
      });
    }, []),
  );

  return (
    <ModelForm
      id={roleId}
      editing={editing ? editing : false}
      service={RoleService}
      title="Role"
      editable={true}
      collapsible={true}
      default={{
        name: null,
        description: null,
        scope: null,
      }}>
      {({current, editing, setCurrent}) => (
        <>
          {/* Example form fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Name: </Text>
            <TextInput
              style={styles.textInput}
              value={current.name}
              editable={editing}
              onChangeText={value => setCurrent({...current, name: value})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Description: </Text>
            <TextInput
              style={styles.textInput}
              value={current.description}
              editable={editing}
              onChangeText={value =>
                setCurrent({...current, description: value})
              }
            />
          </View>

          <View style={{...styles.inputContainer, flexDirection: 'column'}}>
            <Text
              style={{
                ...styles.text,
                alignSelf: 'flex-start',
                marginBottom: 15,
              }}>
              Permissions:
            </Text>
            <View style={{marginLeft: 20}}>
              {_scopes && _default_scopes && (
                <ScopeSelector
                  modelValue={current.scope}
                  scopes={_scopes}
                  defaultScopes={_default_scopes}
                  editable={editing ? editing : false}
                  setCurrent={setCurrent}
                  current={current}
                />
              )}
            </View>
          </View>
        </>
      )}
    </ModelForm>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    minWidth: 120,
    color: theme.lightColors?.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textInput: {
    flex: 1, // Takes up the remaining space in the container
    borderWidth: 1,
    borderColor: theme.lightColors?.greyOutline,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginLeft: 10, // Space between label and input field
    color: theme.lightColors?.black,
  },
});
