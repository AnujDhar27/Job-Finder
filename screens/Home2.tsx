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


    const Home2Screen = (props) => {
      const {userName}=useContext(UserContext);
      const [userData,setUserData]=useState([]);
     const route=useRoute();  
      const [searchQuery,setSearchQuery]=useState('');
      const onChangeSearch=(query)=>{setSearchQuery(query)};
      try{
      const user=firebase.auth().currentUser;
      if(user)
      useEffect(()=>{
        const unsubscribe=firestore()
        .collection('recuit')
        .doc(user.uid)
        .collection('b5b361ae-b7b0-4a0f-a4b8-e8e506a726a2')
        .onSnapshot((querySnapshot)=>{
          const data=[];
          
          querySnapshot.forEach((documentSnapshot)=>{
                data.push({
                  id:documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
          });
          setUserData(data);
        });
        return()=>unsubscribe();
      },[])
    }
    catch(error)
    {
      console.log(error);
    }
      console.log(userData[0]);
    return (
      <KeyboardAvoidingView style={styles.container}>
        
        <IconButton
        icon="menu"
        style={{top:60,left:-10,}}
        size={30}
        iconColor='#6750a4'
        onPress={()=>props.navigation.openDrawer()}
        />
        {/* <Button  icon="menu" style={{position:'relative',top:60,width:2,paddingRight:20}} onPress={()=> props.navigation.openDrawer()}></Button>  */}
        <Searchbar

          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />

      <Text style={styles.welcome} variant="displaySmall">Hello</Text>
      <Text variant="displaySmall" style={{fontWeight:'bold',}}>{userName}</Text>
      
      <Text variant='titleMedium' style={{paddingBottom:20,paddingTop:10,}}>Jobs Posted by you</Text>
      
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card4}>
          <View style={{padding:10,}}>
            
            <Text variant='titleLarge'> {item.JobRole}</Text>
            <Text variant='titleSmall'> Rs. {item.Salary} </Text>
            <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
            </View>
            </Card>
        )}
        />
        {/* <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>
      <Card style={styles.card4}> 
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>
      <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>
      <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>
      <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>  */}
      

    <FAB
      icon="plus"
      style={styles.fab}
      onPress={()=>props.navigation.navigate('PostForm')}
      />
      {/* <FAB
      icon="plus"
      style={{position:'absolute',
      left:350,
      top:700,}}
      onPress={()=>props.navigation.navigate('LocationSearch')}
      /> */}
      
    </KeyboardAvoidingView>

  );
};
const styles=StyleSheet.create(
  {
  container:{
    flex:1,
    // justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor: 'white' ,
  },
  welcome:{
    paddingBottom:5,
    paddingTop:40,
  },
  searchbar:{
    marginTop:3,
    marginRight:30,
    marginLeft:50,
    
    
  },
  apply:{
    marginLeft:220,
    
  },
  card4:{
    marginBottom:20,
    
  },
  recent:{
    fontWeight:'bold',
    marginBottom:20,
  },
  fab:{
    position:'absolute',
    left:350,
    top:800,
  }

})
export default Home2Screen;