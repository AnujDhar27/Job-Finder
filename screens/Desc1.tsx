import React, { useState,useEffect } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import   '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const Desc1 = (props) => {
  const [cname,setCname]=useState('Company Name');
  const [role,setRole]=useState('Job Role');
  const [loc,setLoc]=useState('Location');
  const [sal,setSal]=useState('Salary');
  const [type,setType]=useState('Job Type');
  const [pos,setPos]=useState('Position');
  const [des,setDes]=useState('Description');
  //const [userdata,setUserData]=useState([]);
  return (

      <ScrollView style={styles.container}>
        
        <Text variant='headlineLarge' style={{textAlign:'center',padding:50,paddingLeft:50}} > cname </Text>
        <Image style={{width:230,position:'relative',bottom:160,left:80}} source={require('../src/logo1.png')} resizeMode='contain'/>
      <Text variant='headlineSmall' style={{position:'relative',bottom:250,textAlign:'center',fontWeight:'bold'}}>role</Text>

      <Text variant='labelLarge' style={{position:'relative',left:35,bottom:200,}}>cname</Text>
      <Text variant='labelLarge' style={{position:'relative',left:150,bottom:220,}}>location</Text>
      <Text variant='labelLarge' style={{position:'relative',left:280,bottom:240}}>1 day ago</Text>

      <Image resizeMode='contain' style={{position:'relative',width:80,left:10,bottom:280}} source={require('../src/newsal.png')}/>
      <Image resizeMode='contain' style={{width:80,position:'relative',left:140,bottom:615}} source={require('../src/jobtype.png')}/>
      <Image resizeMode='contain' style={{width:100,position:'relative',left:260,bottom:1010}} source={require('../src/position.png')}/>
      
      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:1130}}>Salary</Text>
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:1150}}>Job Type</Text>
      <Text variant='labelLarge' style={{left:290,position:'relative',bottom:1170}}>Position</Text>

      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:1160}}>salary</Text> 
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:1180}}>Part Time</Text> 
      <Text variant='labelLarge' style={{left:300,position:'relative',bottom:1200}}>Junior</Text>

      <Text variant='headlineSmall' style={{bottom:1180, fontWeight:'bold'}}> Description</Text>
      <Text variant='bodyLarge' style={{bottom:1160,position:'relative'}}>1. Knowledge of online technology and related products, including web and mobile UI and tools. </Text>
      <Text variant='bodyLarge' style={{position:'relative',bottom:1150,}}>2. Familiarity with user experience research priciples and practices and how to use data to provide informed user insights</Text>
      <Text variant='bodyLarge' style={{position:'relative',bottom:1140,}}>3. Experience developing information architecture for complex documentation sets or product suites</Text>

      <Button rippleColor="#FF000020" mode='contained' style={{position:'relative',bottom:1100,}} onPress={()=>props.navigation.navigate('Form1')}><Text variant='bodyLarge' style={{color:'white',fontWeight:'bold'}}>Apply Now</Text></Button>
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
export default Desc1;