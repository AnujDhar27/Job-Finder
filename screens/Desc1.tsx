import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { ScrollView,View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import   '@react-navigation/native'
const Desc1 = (props) => {

  return (
      <ScrollView style={styles.container}>

        <Text variant='headlineLarge' style={{textAlign:'center',padding:50,paddingLeft:50}} > Apple </Text>
        <Image style={{width:230,position:'absolute',bottom:450,left:80}} source={require('../src/logo1.png')} resizeMode='contain'/>
      <Text variant='headlineSmall' style={{textAlign:'center', marginTop:150,fontWeight:'bold'}}>Product Designer</Text>
      <Text variant='labelLarge' style={{paddingTop:20,paddingLeft:20}}><Text >Apple          </Text><Text>                 California</Text><Text>                     1 day ago</Text></Text>
      <Image resizeMode='contain' style={{width:80,bottom:45}} source={require('../src/newsal.png')}/>
      <Image resizeMode='contain' style={{width:80,paddingRight:20,position:'absolute',left:145,bottom:200}} source={require('../src/jobtype.png')}/>
      <Image resizeMode='contain' style={{width:100,paddingRight:20,position:'absolute',left:270,bottom:300}} source={require('../src/position.png')}/>
      
      <Text variant='labelLarge' style={{paddingLeft:20,position:'absolute',bottom:400}}><Text >Salary      </Text><Text>                      Job Type</Text><Text>                      Position</Text></Text>
      <Text variant='labelLarge' style={{position:'absolute',paddingLeft:10,bottom:380}}><Text >$10K-$12K      </Text><Text>                Part Time</Text><Text>                        Junior</Text></Text>
      <Text variant='headlineSmall' style={{bottom:35, fontWeight:'bold'}}> Description</Text>
      <Text variant='bodyLarge' style={{paddingTop:10}}>1. Knowledge of online technology and related</Text>
      <Text variant='bodyLarge' >   products, including web and mobile UI and tools.</Text>

      <Text variant='bodyLarge' style={{paddingTop:10}}>2. Familiarity with user experience research</Text>
      <Text variant='bodyLarge' >   priciples and practices and how to use data</Text>
      <Text variant='bodyLarge' >   to provide informed user insights</Text>

      <Text variant='bodyLarge' style={{paddingTop:10}}>2. Experience developing information</Text>
      <Text variant='bodyLarge' >   architecture for complex documentation sets or</Text>
      <Text variant='bodyLarge'>    product suites</Text>
      <Button rippleColor="#FF000020" mode='contained' style={{marginTop:20}} onPress={()=>props.navigation.navigate('Form1')}><Text variant='bodyLarge' style={{color:'white',fontWeight:'bold'}}>Apply Now</Text></Button>
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