import React, { useState } from 'react';
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
import Applications from './Applications'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SavedApplicants from './SavedApplicants';
import Mycontacts from './Mycontacts';
import Myaccount from './Myaccount';
import UserContext from './UserContext';
import LocationSearch from './LocationSearch';
import EmpProfile from './EmpProfile';
import Desc2 from './Desc2';
import {View} from 'react-native';
import {Drawer as PaperDrawer} from 'react-native-paper';
const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();
//const [active,setActive]=useState('first');
const Draw = () => {

   return (
            <Drawer.Navigator
          
            screenOptions={{swipeEdgeWidth:0,}}//this disables the opening of drawer on swiping
            drawerContent={(props) => <CustomDrawerContent {...props}  />}
            
            >
            <Drawer.Screen name='Home' component={Home2Screen} options={{headerShown:false}}/>
            <Drawer.Screen name='Applications' component={Applications} options={{headerShown:false}}/>
            <Drawer.Screen name='Saved Applicants' component={SavedApplicants} options={{headerShown:false}}/>  
            <Drawer.Screen name='My Contacts'component={Mycontacts} options={{headerShown:false}}/>
            <Drawer.Screen name='My Account'component={Myaccount} options={{headerShown:false}}/>
             </Drawer.Navigator>
        );
};


      // const Draw=()=>{
      //   return(
      //     <NavigationContainer>
      //     <Drawer.Navigator drawerContent={{props}=><CustomDrawerContent{...props}/>}>  
      //       <Drawer.Screen name='Home' component={Home2Screen} options={{headerShown:false}}/>
      //       <Drawer.Screen name='Applications' component={Applications} options={{headerShown:false}}/>
      //       <Drawer.Screen name='Saved Applicants' component={SavedApplicants} options={{headerShown:false}}/>  
      //       <Drawer.Screen name='My Contacts'component={Mycontacts} options={{headerShown:false}}/>
      //       <Drawer.Screen name='My Account'component={Myaccount} options={{headerShown:false}}/>
      //     </Drawer.Navigator>
      //     </NavigationContainer>
      //   );
      // };

const CustomDrawerContent=(props)=>{
  const [active,setActive]=useState("first")

  const handleNavHome=()=>{
    props.navigation.navigate("Home");
    setActive("first");
    }
  const handleNavApp=()=>{
       props.navigation.navigate("Applications");
       setActive("second");
   }
   const handleNavSave=()=>{
    props.navigation.navigate("Saved Applicants");
    setActive("third");
    }
    const handleNavCont=()=>{
      props.navigation.navigate("My Contacts");
      setActive("fourth");
    }
    const handleNavAcc=()=>{
      props.navigation.navigate("My Account");
      setActive("fifth");
    }
  return (
    <PaperDrawer.Section >

      <View style={{paddingTop:50,}}>
      <PaperDrawer.Item 
      active={active==='first'}
      icon='home'
      label="Home"
      onPress={handleNavHome}
  
      />
      <PaperDrawer.Item
      icon="file-account"
      label="Applications"
      active={active==='second'}
      onPress={handleNavApp}
      //onPress={()=>props.navigation.navigate("Applications")}
      />
      <PaperDrawer.Item
      icon="content-save"
      label="Saved Applicants"
      active={active==='third'}
      //onPress={()=>props.navigation.navigate("Saved Applicants")}
      onPress={handleNavSave}
      />
      <PaperDrawer.Item
      icon="contacts"
      label="My Contacts"
      active={active==='fourth'}
      //onPress={()=>props.navigation.navigate("My Contacts")}
      onPress={handleNavCont}
      />
      <PaperDrawer.Item
      icon="account"
      label="Account"
      active={active==='fifth'}
      onPress={handleNavAcc}
      //onPress={()=>props.navigation.navigate("My Account")}
      />
      </View>
    </PaperDrawer.Section>
  )
}
  function App() {
    const [userName,setUserName]=useState(null);
    const [userEmail,setUserEmail]=useState(null);
    const [userRole,setUserRole]=useState(null);
        return (
      <NavigationContainer>
        <UserContext.Provider value={{userName,setUserName,userEmail,setUserEmail,userRole,setUserRole}}>
        <Stack.Navigator>
          <Stack.Screen name="Login"  component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}} />
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="EmpProfile" component={EmpProfile} options={{headerShown:false}}/>
          <Stack.Screen name="Desc1" component={Desc1} options={{headerShown:false}} />
          <Stack.Screen name="Desc2" component={Desc2} options={{headerShown:false}} />
          <Stack.Screen name="Form1" component={Form1} options={{headerShown:false}} />
          <Stack.Screen name="PostForm" component={PostForm} options={{headerShown:false}} /> 
          <Stack.Screen name="LocationSearch" component={LocationSearch} options={{headerShown:false}}/>
          <Stack.Screen name="Home2" component={Draw} options={{headerShown:false}} />
 
        </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
  );
}

export default App;
