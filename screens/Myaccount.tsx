import React, { useContext, useState,useEffect } from 'react';
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
  const user=firebase.auth().currentUser;
  const [themes,setThemes]=useState("");
  const db=firestore();
  try{
  if(user)
      {
        useEffect(()=>{
          firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(documentSnapshot=>{
            if(documentSnapshot.exists)
            {
              if(documentSnapshot.data().uiTheme==="light")
              setThemes("light");
              if(documentSnapshot.data().uiTheme==="dark")
              setThemes("dark");
            }
          })
          
        },[])
    }
  }
  catch(error)
  {
    console.log(error);
  }

try{
  if(user)
  {
      useEffect(()=>{
        firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot=>{
          if(documentSnapshot.data().profileUrl!=='')
          setfileUrl(documentSnapshot.data().profileUrl);
        })
      },[])
  }
  }
  catch(error)
  {
    console.log(error);
  }

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
        const userdocRef=db.collection('users').doc(user.uid);
        userdocRef.update({'profileUrl':url})
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

  const handleTheme=()=>{
    //console.log('Pressed');
    //const user1=firebase.auth().currentUser
    if(user){
      if(themes==='light'){
     const userdocRef=db.collection('users').doc(user.uid);
      setThemes("dark");
      userdocRef.update({'uiTheme':"dark"});
    }
    else if(themes==='dark')
    {
      const userdocRef=db.collection('users').doc(user.uid);
      setThemes("light");
      console.log('pressed');
      userdocRef.update({'uiTheme':"light"});
    }
    }
  }
  return (
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:themes==="light"?"white":'#121212' ,}}>
        <IconButton
        icon="menu"
        style={{top:60,left:-10,zIndex:1}}
        size={30}
        iconColor='#6750a4'
        onPress={()=>props.navigation.openDrawer()}
        />
         <IconButton
      icon={themes==="light"?"weather-sunny":"moon-waning-crescent"}
      size={30}
      iconColor='#6750a4'
      style={{position:'relative',top:8,left:350,zIndex:1}}
      onPress={handleTheme}
      />
        {/* <Button  icon="menu" style={{position:'relative',top:60,width:2,paddingRight:20,zIndex:1}} onPress={()=> props.navigation.openDrawer()}></Button>  */}
      <Text style={{textAlign:'center',color:themes==="light"?"black":"white"}} variant="displaySmall">Profile</Text>
      
      <FAB  style={{position:'absolute',left:280,top:280,zIndex:1}} icon='plus' onPress={handleProfilePic}/>
      <Avatar.Image style={{marginLeft:100,marginTop:40,}} size={200} source={Object.keys(fileUrl).length===0?require('../src/profile_Image.jpeg'):{uri:fileUrl}}/>
     
     <Text style={{paddingBottom:20,paddingLeft:20,paddingTop:40,color:themes==="light"?"black":"white"}} variant='titleLarge'>Name: <Text style={{color:themes==="light"?"black":"white"}}>{userName}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?"black":"white"}} variant='titleLarge'>Email ID: <Text style={{color:themes==="light"?"black":"white"}} >{userEmail}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?"black":"white"}} variant='titleLarge'>Role: <Text style={{color:themes==="light"?"black":"white"}} >{userRole}</Text></Text>
        <Button style={{marginTop:10}} rippleColor="#FF000020" mode="contained" onPress={handleSignOut} >
          Sign Out
        </Button>
      
    </View>
  );
};

export default Myaccount;