import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text,Card,Searchbar,IconButton} from 'react-native-paper';
import { View, StyleSheet,FlatList,Linking } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Mycontacts = (props) => {
  const [userDetails,setUserDetails]=useState([]);
  const [oldData,setOldData]=useState([]);
  useEffect(()=>{
    const unsub=firestore()
    .collection('users')
    .onSnapshot((querySnapshot)=>{
      const data=[];
      querySnapshot.forEach((documentSnapshot)=>{
          if(documentSnapshot.data().cinfo!=null)
          if(documentSnapshot.data().cinfo.length===10&& /^\d+$/.test(documentSnapshot.data().cinfo))
          {
        data.push({
          id:documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      }
      });
      setUserDetails(data);
      setOldData(data);
    });
    return()=>unsub();
  },[]);//passing empty array in useEffect fires itself only once

  const [searchQuery,setSearchQuery]=useState('');

  const handleSearch=text=>{
    if(text!==''){
      setUserDetails([]);
      let tempList=userDetails.filter(item=>{
      return item.name.toLowerCase().indexOf(text.toLowerCase())>-1;
     });
     setUserDetails(tempList);
    }
    else{
      setUserDetails(oldData)
    }
    //console.log("hi");
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
        {/* <Button icon="menu" style={{width:2,paddingRight:20,top:50,zIndex:1}} onPress={()=>props.navigation.openDrawer()}></Button> */}
      <Text style={{textAlign:'center',paddingTop:10,}} variant="headlineLarge">Contacts</Text>
      
      <Searchbar
      placeholder="Search"
      onChangeText={text=>{handleSearch(text); setSearchQuery(text);}}
      value={searchQuery}
      style={styles.searchbar}
      />

      <FlatList
      data={userDetails}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
       
        <Card style={{marginTop:20,paddingBottom:10,}}>
         {/* <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.emailID}`)}> */}
          <View style={{padding:20,}}>
            
            <Text variant='titleMedium'>Name: {item.name}</Text>
            <Text variant='titleMedium'>Email: {item.emailID}</Text>
            <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>

            <IconButton icon="email" onPress={()=>Linking.openURL(`mailto:${item.emailID}`)} style={{position:'absolute',left:300,top:10,}}/>
            <IconButton icon='cellphone' onPress={()=>Linking.openURL(`tel:${item.cinfo}`)} style={{position:'absolute',left:300,top:50,}}/>
            {/* <Button style={{marginLeft:100,marginRight:100,right:100,top:20,}} icon='cellphone' mode='elevated' onPress={()=>Linking.openURL(`tel:${item.cinfo}`)}></Button> 
            <Button icon='email' style={{marginLeft:80,marginRight:80,left:80,bottom:20,}}  mode='elevated' onPress={()=>Linking.openURL(`mailto:${item.emailID}`)}></Button> */}
          </View>
          {/* </TouchableOpacity> */}
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