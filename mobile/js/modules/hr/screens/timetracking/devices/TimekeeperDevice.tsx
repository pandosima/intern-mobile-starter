// TimekeeperDevicesDetails.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import ModelForm from '@components/ModelForm'; // Assume a custom ModelForm component
import DeviceService from '../../../services/devices';
import {theme} from '../../../../../themes';
import {hasOneOfScopes} from '@components/RestrictedView';
import {TimekeeperDeviceScreenProps} from '../../../types';
import OfficeService from '../../../services/offices';
import {toFormData} from '../../../../../utils/obj';
import {useNavigation} from '@react-navigation/native';

export default function TimekeeperDevicesScreen(
  props: TimekeeperDeviceScreenProps,
) {
  const [deviceId] = useState(props.route.params?.id);
  const [editing] = useState(props.route.params?.editing);

  const [offices, setOffices] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    OfficeService.gets({}).then((response:any) => {
      setOffices(response);
    });
  }, []);

  const sendInvitation = async (changes: any) => {
    const formData = toFormData({
      email: changes.user.email,
      first_name: changes.user.first_name,
      last_name: changes.user.last_name,
      office_id: changes.office_id,
    });
    DeviceService.invite(formData).then((response:any) => {
      if (response.message === 'The invitation have been sent.') {
        Alert.alert('Invitation has been sent to the mail account.');
        navigation.goBack();
      }
    });
  };

  const canEdit = hasOneOfScopes(['devices:edit']);

  return (
    <ModelForm
      id={deviceId}
      editing={editing ? editing : false}
      service={DeviceService}
      title="Device"
      editable={canEdit}
      collapsible={true}
      default={{
        id: null,
        name: null,
        user: {
          first_name: null,
          last_name: null,
          email: null,
        },
        office_id: null,
        office: {
          id: null,
          name: null,
        },
      }}
      nestedFields={['user']}
      contentType={'multipart/form-data'}
      onCustomCreate={sendInvitation}>
      {({current, editing, setCurrent}) => (
        <View style={styles.form}>
          {current.id && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Device Name:</Text>
              <TextInput
                style={styles.input}
                value={current.name}
                editable={editing}
                onChangeText={value => {
                  setCurrent({...current, name: value});
                }}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Device Email:</Text>
            <TextInput
              style={[
                styles.input,
                editing && current.id !== null && styles.disabledInput,
              ]}
              value={current.user.email}
              editable={editing && current.id === null}
              onChangeText={value =>
                setCurrent({...current, user: {...current.user, email: value}})
              }
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={[
                styles.input,
                editing && current.id !== null && styles.disabledInput,
              ]}
              value={current.user.first_name}
              editable={editing && current.id === null}
              onChangeText={value => {
                setCurrent({
                  ...current,
                  user: {...current.user, first_name: value},
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={[
                styles.input,
                editing && current.id !== null && styles.disabledInput,
              ]}
              value={current.user.last_name}
              editable={editing && current.id === null}
              onChangeText={value => {
                setCurrent({
                  ...current,
                  user: {...current.user, last_name: value},
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Office:</Text>
            <Dropdown
              disable={!editing}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={[
                ...offices.map((office:any) => ({
                  label: office.name,
                  value: office.id,
                })),
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select an office"
              value={current.office_id}
              onChange={item => setCurrent({...current, office_id: item.value})}
            />
          </View>
        </View>
      )}
    </ModelForm>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    minWidth: 120,
    color: theme.lightColors?.grey2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.lightColors?.greyOutline,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginLeft: 10,
    color: theme.lightColors?.grey2,
  },
  disabledInput: {
    backgroundColor: theme.lightColors?.grey5, // Set the background color to gray
  },
  dropdown: {
    flex: 1,
    height: 45,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.lightColors?.greyOutline,
    borderRadius: 4,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
});
