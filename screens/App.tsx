import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import Home from './Home';
import Desc1 from './Desc1';
import Form1 from './Form1';
import PostForm from './PostForm';
import Home2 from './Home2';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"  component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Desc1" component={Desc1} options={{headerShown:false}} />
        <Stack.Screen name="Form1" component={Form1} options={{headerShown:false}} />
        <Stack.Screen name="PostForm" component={PostForm} options={{headerShown:false}} />
        <Stack.Screen name="Home2" component={Home2} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
