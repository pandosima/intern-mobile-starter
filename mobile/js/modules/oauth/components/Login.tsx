import React, {useState} from 'react';
import {Linking, TextInput, TouchableOpacity, View} from 'react-native';
import {Card, Text, makeStyles, Button, CheckBox} from '@rneui/themed';
import {t} from '@localization';
import {useAppSelector, useAppDispatch} from '../../../hooks';
import {fetchUser, login as handleLogin} from '../store/actions';
import {setCredential} from '../store';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {Platform} from 'react-native';
import {LoginScreenProps} from '../types';

import { getErrorMessage } from '@utils/error';
import { recordError } from '../../firebase/crashlytics';
import { getToken } from '../../../modules/firebase/messaging';
import {createUserToken} from '../../firebase/store/actions';

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        // marginHorizontal: 26,
      },
      ios: {
        alignItems: 'center',
      },
    }),
    backgroundColor: theme.colors.primary,
  },
  cardContent: {
    borderRadius: 10,
    marginHorizontal: 40,
  },
  errorPanel: {
    margin: 5,
  },
  errorText: {
    textAlign: 'center',
    margin: 5,
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#857372',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000000',
  },
  hideShowPasswordIcon: {
    fontSize: 20,
    position: 'absolute',
    right: 20,
    bottom: -10,
  },
  loginTitle: {
    paddingHorizontal: 20,
  },
  loginBtnContainer: {
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  cardText: {
    color: '#D7347B',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
  },
}));

function Login({navigation, route}: LoginScreenProps): React.JSX.Element {
  const credential = useAppSelector(state => state.oauth.credential);
  const loggingIn = useAppSelector(state => state.oauth.loggingIn);
  const fetchingUser = useAppSelector(state => state.oauth.fetchingUser);
  const user_id = useAppSelector(state => state.oauth.currentUser.id);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(
    credential.username ? credential.username : '',
  );
  const [password, setPassword] = useState(
    credential.password ? credential.password : '',
  );
  const [rememberMe, setRememberMe] = useState(!!credential.rememberMe);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let validateErrors: string[] = [];
    if (!username || username === '') {
      validateErrors = [
        ...validateErrors,
        'Email is required or format email was wrong',
      ];
    }
    if (!password || password === '') {
      validateErrors = [...validateErrors, 'Password is required'];
    }
    setErrors(validateErrors);
    return validateErrors.length === 0;
  };

  function uploadToken() {
    getToken()
    .then((token: any) => {
      dispatch(createUserToken({user_id: user_id, token: token as string})).then(
        response => {
          console.log('Uploaded token: ', token);
          console.log('USER_TOKEN:: ', response.payload);
        },
      );
    });
  }

  const login = async () => {
    if (!validate()) {
      return;
    }
    if (username && password) {
      dispatch(handleLogin({username, password}))
        .then(response => {
          // Only save credential if the logging in is success.
          if (rememberMe) {
            dispatch(
              setCredential({
                username,
                password,
                rememberMe,
              }),
            );
          }
          // Fetch user information after login
          dispatch(fetchUser(true)).then(response => {
            uploadToken();
          });
        })
        .catch(e => {
          recordError(e as Error);
          const error = getErrorMessage(e,t('an_error_occurred'));
          setErrors([error]);
          throw error;
        });
    }
  };

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContent}>
        <View style={[styles.inputContainer, {marginTop: 30}]}>
          <TextInput
            placeholder={t('default_placeholder')}
            placeholderTextColor={'#000000'}
            autoCorrect={false}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('password_placeholder')}
            placeholderTextColor={'#000000'}
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <MaterialDesignIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="black"
              style={styles.hideShowPasswordIcon}
              onPress={toggleShowPassword}
            />
          </TouchableOpacity>
        </View>
        <CheckBox
          checked={rememberMe}
          title={t('Remember_me')}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Card.Divider />
        <View style={styles.loginBtnContainer}>
          <Button
            titleStyle={styles.loginTitle}
            title={t('Login')}
            onPress={login}
            loading={loggingIn && fetchingUser}
            radius={20}
            size="md"
          />
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={styles.cardText}
            onPress={() =>
              Linking.openURL(
                'https://business.dev.pandosima.org/forgot-password',
              )
            }>
            {t('Forgot_password')}
          </Text>
        </View>
        {errors && errors.length > 0 && (
          <View style={styles.errorPanel}>
            {errors.map((item, index) => (
              <Text style={styles.errorText} key={index}>
                {item}
              </Text>
            ))}
          </View>
        )}
      </Card>
    </View>
  );
}

export default Login;
