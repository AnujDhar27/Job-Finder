import React, { useContext, useState,useEffect } from 'react';
import {Card, Button, TextInput, Text,FAB,Menu,Divider,PaperProvider,IconButton,useTheme} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView, Platform,FlatList } from 'react-native';
import { textAlign } from '@mui/system';
import {useNavigation, useRoute,DrawerActions} from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { Padding } from '@mui/icons-material';
import { Icon, Paper } from '@mui/material';
import { ScrollView } from 'react-native-gesture-handler';
import UserContext from './UserContext';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const PartTime=(props)=>{
    const [searchQuery,setSearchQuery]=useState('');
    const onChangeSearch=(query)=>{setSearchQuery(query)};
    const  [userData,setUserData]=useState([]);
    const user=firebase.auth().currentUser;
  const [themes,setThemes]=useState("");
  if(user)
  {
    useEffect(()=>{
      const unsubscribe=firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((documentSnapshot)=>{
     if(documentSnapshot.data().uiTheme==="light")
           setThemes("light");
      if(documentSnapshot.data().uiTheme==="dark")
          setThemes("dark");
      });
      return()=>unsubscribe();
    },[])
}
    try{
    useEffect(()=>{
        firestore()
        .collection('recruit')
        .where('JobType','==','Part time')
        .get()
        .then(querySnapshot=>{
            const data=[];
            querySnapshot.forEach(documentSnapshot=>{
                data.push({
                    id:documentSnapshot.id,
                    ...documentSnapshot.data()
                })
                // console.log(documentSnapshot.data());
            });
            setUserData(data);
        })
      },[])
    } 
    catch(error)
    {
        console.log(error);
    }
    console.log(userData);
    
return(
    <View style={{flex:1,paddingHorizontal:20,backgroundColor:themes==='light'?'white':'#121212'}}>
    <IconButton
    icon='keyboard-backspace'
    size={30}
    style={{position:'absolute',left:20,top:40,zIndex:1}}
    iconColor='#6750a4'
    onPress={()=>props.navigation.navigate('Home')}
    />
    <Text variant='headlineLarge' style={{paddingTop:50,textAlign:'center',color:themes==='light'?'black':'white'}}>Part Time Jobs</Text>
    <Searchbar
    placeholder="Search"
    onChangeText={onChangeSearch}
    value={searchQuery}
    style={styles.searchbar}/>

    <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card  style={styles.card4}>
          <View style={{padding:10,}}>
            <Text variant='titleLarge'> {item.cname}</Text>
            <Text variant='titleMedium'> {item.JobRole}</Text>
            <Text variant='titleSmall'> Rs. {item.Salary} </Text>
            <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1",{userData},)}>Check Details</Button>
            </View>
            </Card>
        )}
        />
    </View>
    
);
};
const styles=StyleSheet.create({
    searchbar:{
      marginTop:40,
    },
    card4:{
        marginTop:20,
        marginBottom:20,
      },
      apply:{
        marginLeft:220,
        
      },

});
export default PartTime;