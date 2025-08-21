import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import AvatarPicker from '../../components/employees/AvatarPicker';
import ModelForm from '@components/ModelForm';
import EmployeeService from '../../services/employees';
import EmployeeCustomFieldService from '../../services/employee-custom-fields';
import RoleService from '../../services/roles';
import {useAppSelector} from '../../../../hooks';
import {FORMAT, formatDate} from '../../../../utils/time';
import {GENDERS} from '../../../../constants/gender';
import {ACCOUNT_STATTUS} from '../../../../constants/account-status';
import {EmployeeScreenScreenProps} from '../../types/EmployeesStack';
import {theme} from '../../../../themes';
import {Alert} from 'react-native';
import {hasOneOfScopes} from '../../../../components/RestrictedView';
import {t} from '@localization';

export default function Employee(props: EmployeeScreenScreenProps) {
  const businessId = useAppSelector(
    state => state.oauth.currentUser.business_id,
  );

  const [employeeId] = useState(props.route.params?.id);
  const [editing] = useState(props.route.params?.editing);

  const [genders, setGenders] = useState([]);
  const [accountStatus, setAccountStatus] = useState([]);
  const [roles, setRoles] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);

  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [openJoinDate, setOpenJoinDate] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [joinDate, setJoinDate] = useState(new Date());

  useEffect(() => {
    // Fetch roles and additional information
    RoleService.gets({}).then(response => {
      const roles = response as any;
      setRoles(roles);
    });

    EmployeeCustomFieldService.gets({}).then(response => {
      const additionalFields = response as any;
      setAdditionalInfo(additionalFields);
    });

    // Set genders and account status
    setGenders(GENDERS.map(g => ({value: g, label: g})));
    setAccountStatus(
      Object.entries(ACCOUNT_STATTUS).map(([k, v]) => ({
        value: v,
        label:
          k === 'ACCOUNT_STATUS_DEACTIVE'
            ? t('ACCOUNT_STATUS_DEACTIVE')
            : t('ACCOUNT_STATUS_ACTIVE'),
      })),
    );
  }, []);

  const sendInvitation = () => {
    if (employeeId) {
      EmployeeService.sendInvitation(employeeId).then((response: any) => {
        if (response.message === 'The invitation have been sent.') {
          Alert.alert('Invitation has been sent to employee mail account.');
        }
      });
    }
  };

  const canEdit = hasOneOfScopes(['employees:edit', 'businesses:edit-mine']);

  return (
    <ModelForm
      id={employeeId}
      editing={editing ? editing : false}
      service={EmployeeService}
      title="Employee"
      editable={canEdit}
      collapsible={true}
      default={{
        first_name: null,
        last_name: null,
        work_mail: null,
        personal_mail: null,
        gender: null,
        status: 0,
      }}
      nestedFields={['additional_information']}
      contentType={'multipart/form-data'}>
      {({current, editing, setCurrent}) => (
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            <AvatarPicker
              employeeId={employeeId}
              avatar={
                current.avatar
                  ? current.avatar
                  : 'https://randomuser.me/api/portraits/men/33.jpg'
              }
              editable={editing}
              onAvatarChange={avatar =>
                setCurrent({...current, avatar: avatar})
              }
            />
          </View>

          {current.id && !current.user && !current.user_id && (
            <View style={{marginBottom: 15}}>
              <Button
                title="Resend Invitation"
                onPress={sendInvitation}
                color={theme.lightColors?.grey3}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              value={current.first_name}
              editable={editing}
              onChangeText={value =>
                setCurrent({...current, first_name: value})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              value={current.last_name}
              editable={editing}
              onChangeText={value => setCurrent({...current, last_name: value})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <Dropdown
              disable={!editing}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={[...genders.map(g => ({label: g.label, value: g.value}))]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select gender"
              value={current.gender}
              onChange={item =>
                setCurrent({...current, gender: item.value as string})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Work Email:</Text>
            <TextInput
              style={styles.input}
              value={current.work_mail}
              editable={editing}
              onChangeText={value => setCurrent({...current, work_mail: value})}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Personal Email:</Text>
            <TextInput
              style={styles.input}
              value={current.personal_mail}
              editable={editing}
              onChangeText={value =>
                setCurrent({...current, personal_mail: value})
              }
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Pressable
              disabled={!editing}
              style={{flex: 1}}
              onPress={() => setOpenDateOfBirth(true)}>
              <TextInput
                style={styles.input}
                value={formatDate(current.date_of_birth, FORMAT.DATE) as string}
                editable={false}
              />

              <DatePicker
                modal
                mode="date"
                open={openDateOfBirth}
                date={dateOfBirth}
                onConfirm={date => {
                  setOpenDateOfBirth(false);
                  setDateOfBirth(date);
                  setCurrent({
                    ...current,
                    date_of_birth: formatDate(date, FORMAT.DATE),
                  });
                }}
                onCancel={() => {
                  setOpenDateOfBirth(false);
                }}
              />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Join Date:</Text>
            <Pressable
              disabled={!editing}
              style={{flex: 1}}
              onPress={() => setOpenJoinDate(true)}>
              <TextInput
                style={styles.input}
                value={formatDate(current.join_date, FORMAT.DATE) as string}
                editable={false}
              />

              <DatePicker
                modal
                mode="date"
                open={openJoinDate}
                date={joinDate}
                onConfirm={date => {
                  setOpenJoinDate(false);
                  setJoinDate(date);
                  setCurrent({
                    ...current,
                    join_date: formatDate(date, FORMAT.DATE),
                  });
                }}
                onCancel={() => {
                  setOpenJoinDate(false);
                }}
              />
            </Pressable>
          </View>

          <View style={{...styles.inputContainer, alignSelf: 'flex-start'}}>
            <Text style={styles.label}>Roles:</Text>
          </View>

          <MultiSelect
            disable={!editing}
            style={{
              ...styles.dropdown,
              width: Dimensions.get('window').width - 50,
            }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={[...roles.map(g => ({label: g.name, value: g}))]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select roles"
            value={
              current.roles
                ? [
                    ...current.roles.map(g =>
                      roles.find(role => role.id === g.id),
                    ),
                  ]
                : []
            }
            onChange={item => {
              setCurrent({
                ...current,
                roles: item,
              });
            }}
            selectedStyle={styles.selectedStyle}
            dropdownPosition="top"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status:</Text>
            <Dropdown
              disable={!editing}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={[
                ...accountStatus.map(g => ({
                  label: g.label,
                  value: g.value.toString().trim(),
                })),
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select status"
              value={current.status.toString()}
              onChange={item =>
                setCurrent({...current, status: parseInt(item.value)})
              }
            />
          </View>

          {additionalInfo.map(item => (
            <View key={item.field.id} style={styles.inputContainer}>
              <Text style={styles.label}>{item.field.name}</Text>
              <TextInput
                style={styles.input}
                value={item.value}
                onChangeText={value => {
                  const newInfo = additionalInfo.map(i =>
                    i.field.id === item.field.id ? {...i, value: value} : i,
                  );
                  setAdditionalInfo(newInfo);
                }}
              />
            </View>
          ))}
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    flex: 1, // Takes up the remaining space in the container
    borderWidth: 1,
    borderColor: theme.lightColors?.greyOutline,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginLeft: 10, // Space between label and input field
    color: theme.lightColors?.grey2,
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
  selectedStyle: {
    borderRadius: 12,
    marginBottom: 15,
    marginLeft: 5,
  },
});
