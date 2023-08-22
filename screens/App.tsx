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
import Home2Screen from './Home2';
import DrawerScreen from './LeftDrawer';
import Applications from './Applications'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();

function Draw(){
  return(
    <Drawer.Navigator initialRouteName='Home2'>
      <Drawer.Screen name='Draw1' component={DrawerScreen} options={{headerShown:false}}/>
    </Drawer.Navigator>
  )
}
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
        <Stack.Screen name="Home2" component={Home2Screen} options={{headerShown:false}} />
        <Stack.Screen name="Draw1" component={Draw} options={{headerShown:false}}/>
        <Stack.Screen name="Applications" component={Applications} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;