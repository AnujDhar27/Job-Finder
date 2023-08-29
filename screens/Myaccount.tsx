import React, { useContext, useState } from 'react';
import { Button, TextInput, Text, Avatar} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import UserContext from './UserContext';
const Myaccount = (props) => {

  const {userName}=useContext(UserContext);
  const {userEmail}=useContext(UserContext);
  const {userRole}=useContext(UserContext);
  const handleSignOut=()=>{
    try{
      auth().signOut();
      console.log('user successfully logged out');
      props.navigation.navigate('Login')
    }
    catch(error)
    {
      console.log('error while sign out',error);
    }
  };
  return (
      <View style={styles.container}>
        <Button  icon="menu" style={{position:'relative',top:60,width:2,paddingRight:20,zIndex:1}} onPress={()=> props.navigation.openDrawer()}></Button> 
      <Text style={styles.welcome} variant="displaySmall">Profile</Text>
      <Avatar.Image style={{marginLeft:100,marginTop:40,}} size={200} source={require('../src/profile_Image.jpeg')}
      />
     <Text style={{paddingBottom:20,paddingLeft:20,paddingTop:40}} variant='titleLarge'>Name: <Text>{userName}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20}} variant='titleLarge'>Email ID: <Text>{userEmail}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20}} variant='titleLarge'>Role: <Text>{userRole}</Text></Text>
        <Button style={{marginTop:10}} rippleColor="#FF000020" mode="contained" onPress={handleSignOut} >
          Sign Out
        </Button>
      
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:'center',
    // paddingTop:40,
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  textBox1:{
    paddingBottom: 10,
    marginBottom: 20,
  },

  welcome:{
    textAlign:'center',
    // paddingLeft:200,
    paddingTop:10,
  },
  login:{
    paddingBottom:20,
    
  },
})
export default Myaccount;