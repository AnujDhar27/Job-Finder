import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text,Card,Searchbar} from 'react-native-paper';
import { View, StyleSheet,FlatList,Linking } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Mycontacts = (props) => {
  const [userDetails,setUserDetails]=useState([]);
  useEffect(()=>{
    const unsub=firestore()
    .collection('users')
    .onSnapshot((querySnapshot)=>{
      const data=[];
      querySnapshot.forEach((documentSnapshot)=>{
          if(documentSnapshot.data().cinfo.length===10&& /^\d+$/.test(documentSnapshot.data().cinfo))
          {
        data.push({
          id:documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      }
      });
      setUserDetails(data);
    });
    return()=>unsub();
  })

  const [searchQuery,setSearchQuery]=useState('');
  const onChangeSearch=(query)=>{setSearchQuery(query)};
  return (
      <View style={styles.container}>
        <Button icon="menu" style={{width:2,paddingRight:20,top:50,zIndex:1}} onPress={()=>props.navigation.openDrawer()}></Button>
      <Text style={{textAlign:'center',paddingTop:10,}} variant="headlineLarge">Contacts</Text>
      
      <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}
              
/>
      <FlatList
      data={userDetails}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
       
        <Card style={{marginTop:20,}}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.cinfo}`)}>
          <View style={{padding:20,}}>
            
            <Text variant='titleMedium'>Name: {item.name}</Text>
            <Text variant='titleMedium'>Email: {item.emailID}</Text>
            <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>
            
          </View>
          </TouchableOpacity>
        </Card>

        
      )}

       />
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  searchbar:{
    marginTop:20,
  },
})
export default Mycontacts;