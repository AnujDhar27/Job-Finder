import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text,Card} from 'react-native-paper';
import { View, StyleSheet,FlatList,ScrollView } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const Applications= (props) => {
    const [userDetails,setUserDetails]=useState([]);
    useEffect(()=>{
      const unsubscribe=firestore()
      .collection('users')
      .onSnapshot((querySnapshot)=>{
        const data=[];
        querySnapshot.forEach((documentSnapshot)=>{
          data.push({
            id:documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setUserDetails(data);
      });
      return()=>unsubscribe();
    })
  return (

      <View style={styles.container}>
      <Button icon="menu" style={{width:2,paddingRight:20,top:50,zIndex:1}} onPress={()=>props.navigation.openDrawer()}></Button>

      <Text variant="headlineLarge" style={{textAlign:'center',paddingTop:10,}}>Applications</Text>
      <FlatList
        data={userDetails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{marginTop:20,}}>
          <View style={styles.userContainer}>
            <Text variant='titleMedium'>Name: {item.name}</Text>
            <Text variant='titleMedium'>Email: {item.emailID}</Text>
            <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>
            <Text variant='titleMedium'>Current Organization: {item.currOrg}</Text>
            <Text variant='titleMedium'>Years of Experience: {item.yoe}</Text>
            <Text variant='titleMedium'>Current Salary: {item.currSal}</Text>
            <Text variant='titleMedium'>Expected Salary: {item.expSal}</Text>
            <Text variant='titleMedium'>Message to the Recruiter: {item.message}</Text>
            </View>
            </Card>
        )}
        />
    </View>

  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    // paddingTop:40,
    // justifyContent:'center'
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  buttons:{
    width:300,
    margin:10,
  },
  userContainer:{
    padding:20,
  }

})
export default Applications;