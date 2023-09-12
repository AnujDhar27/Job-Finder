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
      const [searchQuery,setSearchQuery]=useState('');
      const [themes,setThemes]=useState("");
      const onChangeSearch=(query)=>{setSearchQuery(query)};
      try{
        const user=firebase.auth().currentUser;
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
  }
  catch(error)
  {
    console.log(error);
  }
      try{
      const user=firebase.auth().currentUser;
      if(user)
      useEffect(()=>{
        firestore()
        .collection('recruit')
        .doc(user.uid)
        .get()
        .then(documentSnapshot=>{
          const data=[];
          if(documentSnapshot.exists)
          data.push({
            id:documentSnapshot.id,
            ...documentSnapshot.data(),
          })
          setUserData(data);
        })
      })
    }
    catch(error)
    {
      console.log(error);
    }
      console.log(userData);
    
    return (
      <KeyboardAvoidingView style={{flex:1,paddingHorizontal:20,backgroundColor:themes==='light'?"white":"#121212"}}>
        
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

      <Text style={{paddingBottom:5,paddingTop:40,color:themes==="light"?"black":"white"}} variant="displaySmall">Hello</Text>
      <Text variant="displaySmall" style={{fontWeight:'bold',color:themes==="light"?"black":"white"}}>{userName}</Text>
      
      <Text variant='titleMedium' style={{paddingBottom:20,paddingTop:10,color:themes==="light"?"black":"white"}}>Jobs Posted by you</Text>
      
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card4}>
          <View style={{padding:10,}}>
            
            <Text variant='titleLarge'> {item.JobRole}</Text>
            <Text variant='titleSmall'> Rs. {item.Salary} </Text>
            <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc2")}>Check Details</Button>
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
  welcome:{

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