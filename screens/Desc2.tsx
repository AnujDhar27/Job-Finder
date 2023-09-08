import React, { useState,useEffect,useContext } from 'react';
import { Button, TextInput, Text,IconButton} from 'react-native-paper';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import   '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import UserContext from './UserContext';

const Desc2 = (props) => {
  const [cname,setCname]=useState('Company Name');
  const [role,setRole]=useState('Job Role');
  const [loc,setLoc]=useState('Location');
  const [sal,setSal]=useState('Salary');
  const [type,setType]=useState('Job Type');
  const [pos,setPos]=useState('Position');
  const [des,setDes]=useState('Description');
  const {userRole}=useContext(UserContext);
  const [userData,setUserData]=useState([]);
  try{
    const user=firebase.auth().currentUser;
    if(user)
    useEffect(()=>{
      firestore()
      .collection('recruit')
      .doc(user.uid)
      .get()
      .then(documentSnapshot=>{
        const data=[];
        if(documentSnapshot.exists)
        data.push({
          id:documentSnapshot.id,
          ...documentSnapshot.data(),
        })
        setUserData(data);
        if(userData.length===1){
        setCname(userData[0].cname);
        setDes(userData[0].JobDes);
        setLoc(userData[0].Location);
        setPos(userData[0].Position);
        setRole(userData[0].JobRole);
        setSal(userData[0].Salary);
        setType(userData[0].JobType);
        }
      })
    })
  }
  catch(error)
  {
    console.log(error);
  }

  
  const handleBack=()=>{
    if(userRole==='Recruiter')
    props.navigation.navigate("Home2")
    else
    props.navigation.navigate("Home")
  }
  return (

      <ScrollView style={styles.container}>
         <IconButton
        icon='keyboard-backspace'
        size={30}
        style={{position:'absolute',top:40,left:-10,zIndex:1}}
        onPress={handleBack}
        />
        <Text variant='headlineLarge' style={{textAlign:'center',padding:50,paddingLeft:50}} > {cname} </Text>
        <Image style={{width:230,position:'relative',bottom:160,left:80}} source={require('../src/logo1.png')} resizeMode='contain'/>
      <Text variant='headlineSmall' style={{position:'relative',bottom:250,textAlign:'center',fontWeight:'bold'}}>{role}</Text>

      <Text variant='labelLarge' style={{position:'relative',left:35,bottom:200,}}>{cname}</Text>
      <Text variant='labelLarge' style={{position:'relative',left:150,bottom:220,}}>{loc}</Text>
      <Text variant='labelLarge' style={{position:'relative',left:280,bottom:240}}>1 day ago</Text>

      <Image resizeMode='contain' style={{position:'relative',width:80,left:10,bottom:280}} source={require('../src/newsal.png')}/>
      <Image resizeMode='contain' style={{width:80,position:'relative',left:140,bottom:615}} source={require('../src/jobtype.png')}/>
      <Image resizeMode='contain' style={{width:100,position:'relative',left:260,bottom:1010}} source={require('../src/position.png')}/>
      
      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:1130}}>Salary</Text>
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:1150}}>Job Type</Text>
      <Text variant='labelLarge' style={{left:290,position:'relative',bottom:1170}}>Position</Text>

      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:1160}}>Rs.{sal}</Text> 
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:1180}}>{type}</Text> 
      <Text variant='labelLarge' style={{left:300,position:'relative',bottom:1200}}>{pos}</Text>

      <Text variant='headlineSmall' style={{bottom:1180, fontWeight:'bold'}}> Description</Text>
      <Text variant='bodyLarge' style={{bottom:1160,position:'relative',left:10}}>{des}</Text>

      <Button rippleColor="#FF000020" mode='contained' style={{position:'relative',bottom:1100,}} onPress={()=>props.navigation.navigate('Form1')} disabled={userRole==='Recruiter'?true:false}><Text variant='bodyLarge' style={{color:'white',fontWeight:'bold'}}>Apply Now</Text></Button>
    </ScrollView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  
})
export default Desc2;