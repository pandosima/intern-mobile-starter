import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function OAuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        {
          //Todo: Add other screens for Changing/Resting/Forgoting password.
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default OAuthStack;
