import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import   '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
const Desc1 = (props) => {

  return (
      <ScrollView style={styles.container}>
        
        <Text variant='headlineLarge' style={{textAlign:'center',padding:50,paddingLeft:50}} > Apple </Text>
        <Image style={{width:230,position:'relative',bottom:160,left:80}} source={require('../src/logo1.png')} resizeMode='contain'/>
      <Text variant='headlineSmall' style={{position:'relative',bottom:250,textAlign:'center',fontWeight:'bold'}}>Product Designer</Text>

      <Text variant='labelLarge' style={{position:'relative',left:35,bottom:200,}}>Apple</Text>
      <Text variant='labelLarge' style={{position:'relative',left:150,bottom:220,}}>California</Text>
      <Text variant='labelLarge' style={{position:'relative',left:280,bottom:240}}>1 day ago</Text>

      <Image resizeMode='contain' style={{position:'relative',width:80,left:10,bottom:280}} source={require('../src/newsal.png')}/>
      <Image resizeMode='contain' style={{width:80,position:'relative',left:140,bottom:615}} source={require('../src/jobtype.png')}/>
      <Image resizeMode='contain' style={{width:100,position:'absolute',left:260,bottom:1080}} source={require('../src/position.png')}/>
      
      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:830}}>Salary</Text>
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:848}}>Job Type</Text>
      <Text variant='labelLarge' style={{left:290,position:'relative',bottom:870}}>Position</Text>

      <Text variant='labelLarge' style={{left:20,position:'relative',bottom:840}}>$10K-$12K</Text> 
      <Text variant='labelLarge' style={{left:150,position:'relative',bottom:860}}>Part Time</Text> 
      <Text variant='labelLarge' style={{left:300,position:'relative',bottom:880}}>Junior</Text>

      <Text variant='headlineSmall' style={{bottom:850, fontWeight:'bold'}}> Description</Text>
      <Text variant='bodyLarge' style={{bottom:840,position:'relative'}}>1. Knowledge of online technology and related products, including web and mobile UI and tools.</Text>
      <Text variant='bodyLarge' style={{position:'relative',bottom:830,}}>2. Familiarity with user experience research priciples and practices and how to use data to provide informed user insights</Text>
      <Text variant='bodyLarge' style={{position:'relative',bottom:820,}}>3. Experience developing information architecture for complex documentation sets or product suites</Text>

      <Button rippleColor="#FF000020" mode='contained' style={{position:'relative',bottom:800,}} onPress={()=>props.navigation.navigate('Form1')}><Text variant='bodyLarge' style={{color:'white',fontWeight:'bold'}}>Apply Now</Text></Button>
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