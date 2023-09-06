import React, { useContext, useState } from 'react';
import { Button, TextInput, Text, Avatar,FAB,IconButton} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import UserContext from './UserContext';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const Myaccount = (props) => {

  const {userName}=useContext(UserContext);
  const {userEmail}=useContext(UserContext);
  const {userRole}=useContext(UserContext);
  const [selectedFile,setSelectedFile]=useState({});
  const [fileUrl,setfileUrl]=useState('');
  const handleProfilePic=async()=>{
    try{
      const user=firebase.auth().currentUser;
      if(user)
      {
      const res=await DocumentPicker.pick({type:[DocumentPicker.types.images],copyTo:'cachesDirectory'})
      setSelectedFile(res);
      console.log(res[0].fileCopyUri);
      if(selectedFile)
      {
        const fileRef=storage().ref(`/profilePic/${user.uid}/${selectedFile[0].name}`);
        const filePath=selectedFile[0].fileCopyUri;
        await fileRef.putFile(filePath);
        const url=await fileRef.getDownloadURL();
        console.log(url);
        setfileUrl(url);
      }
  }
  }
  catch(error){
    
    console.log('Error',error);
  }
};
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
        <IconButton
        icon="menu"
        style={{top:60,left:-10,zIndex:1}}
        size={30}
        iconColor='#6750a4'
        onPress={()=>props.navigation.openDrawer()}
        />
        {/* <Button  icon="menu" style={{position:'relative',top:60,width:2,paddingRight:20,zIndex:1}} onPress={()=> props.navigation.openDrawer()}></Button>  */}
      <Text style={styles.welcome} variant="displaySmall">Profile</Text>
      <FAB  style={{position:'absolute',left:280,top:280,zIndex:1}} icon='plus' onPress={handleProfilePic}/>

      <Avatar.Image style={{marginLeft:100,marginTop:40,}} size={200} source={Object.keys(fileUrl).length===0?require('../src/profile_Image.jpeg'):{uri:fileUrl}}/>
     
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