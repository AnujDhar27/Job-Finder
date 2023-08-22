import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
const DrawerScreen= (props) => {
    const navigation = useNavigation();

  
  return (
      <View style={styles.container}>
      <Text variant="displaySmall">Drawer</Text>
      <Button style={styles.buttons} mode='contained' icon='folder' onPress={()=>props.navigation.navigate('Applications')}>Applications</Button>
      <Button style={styles.buttons} mode='contained'icon='star'>Saved Applications</Button>
      <Button style={styles.buttons} mode='contained'icon='contacts'>My Contacts</Button>
      <Button style={styles.buttons} mode='contained'icon='crown'>My Account</Button>
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center'
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  buttons:{
    width:300,
    margin:10,
  }
})
export default DrawerScreen;