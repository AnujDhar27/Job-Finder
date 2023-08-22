import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Applications= (props) => {
    const navigation = useNavigation();
    const users = firestore().collection('users').get().then(querySnapshot=>{
        console.log('Total users',querySnapshot.size)
        
    });
  return (
      <View style={styles.container}>
      <Text variant="displaySmall">Drawer</Text>
      <Text>Name: {users}</Text>
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingTop:20,
    // justifyContent:'center'
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  buttons:{
    width:300,
    margin:10,
  }
})
export default Applications;