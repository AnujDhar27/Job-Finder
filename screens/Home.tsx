import React, { useContext, useState,useEffect } from 'react';
import {Card, Button, IconButton, Text,} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView, Platform ,Image,FlatList} from 'react-native';
import { textAlign } from '@mui/system';
import {useRoute} from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { Padding } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { ScrollView } from 'react-native-gesture-handler';
import UserContext from './UserContext';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Home = (props) => {
  const db=firestore();
  const {userName}=useContext(UserContext);
  const [searchQuery,setSearchQuery]=useState('');
  const user=firebase.auth().currentUser;
  const [userData,setuserData]=useState([]);
  const [themes,setThemes]=useState("");
  try{
    const user=firebase.auth().currentUser;
    if(user)
    useEffect(()=>{
      const unsubscribe=firestore()
      .collection('recruit')
      .onSnapshot((querySnapshot)=>{
        const data=[];
        querySnapshot.forEach((documentSnapshot)=>{
          if(documentSnapshot.exists)
              data.push({
                id:documentSnapshot.id,
                ...documentSnapshot.data(),
              });
        });
        setuserData(data);
      });
      return()=>unsubscribe();
    },[])
  }
  catch(error)
  {
    console.log(error);
  }
    console.log(userData);
  // useEffect(()=>{
  //   const unsubscribe=firestore()
  //   .collection('recruit')
  //   .get()
  //   .then(querySnapshot=>{
  //     querySnapshot.forEach(documentSnapshot=>{
  //       const data=[];
  //       if(documentSnapshot.data().length>0)
  //       data.push({
  //         id:documentSnapshot.id,
  //         ...documentSnapshot.data(),
  //       })
        
  //       console.log(documentSnapshot.data());
  //       setuserData(data);

  //     });
  //   });
  // })

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

  const onChangeSearch=(query)=>{setSearchQuery(query)};
  return (

      <KeyboardAvoidingView style={{flex:1,paddingHorizontal:20,backgroundColor:themes==='light'?'white':"#121212"}}>
              <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}/>
              <IconButton
              icon="account"
              size={30}
              iconColor='#6750a4'
              onPress={()=>props.navigation.navigate('EmpProfile')}
              style={{position:'relative',left:320,bottom:50,width:50,height:45,}}
              />
              {/* <Button   mode='contained-tonal' icon="account" onPress={()=>props.navigation.navigate('EmpProfile')} style={{position:'relative',left:320,bottom:50,width:50,height:45,}} ></Button> */}
      
        
      <Text style={{ paddingBottom:5,color:themes==='light'?'black':'white'}} variant="displaySmall">Hello</Text>
      <Text variant="displaySmall" style={{fontWeight:'bold', color:themes==='light'?'black':'white'}}>{userName}</Text>
      
      <Text variant='titleMedium' style={{fontWeight:'bold',paddingTop:20,marginBottom:320,color:themes==='light'?'black':'white'}}>Find your job</Text>
      

      <Card style={styles.card1}>
        <Card.Content>
          <Image 
          source={require('../src/remote-jobs.png')}
          style={{marginLeft:49,width:50,height:50,top:30}}
          />
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center',top:40}}>44.8K</Text>
          <Text variant='titleSmall' style={{textAlign:'center',top:40}}>Remote Jobs</Text>
        </Card.Content>
        </Card>

        <Card style={styles.card2}>
        <Card.Content>
          <Image 
          source={require('../src/full-time.png')}
          style={{width:30,height:30,top:25,left:18}}
          />
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center',bottom:10}}>66.8K</Text>
          <Text variant='titleSmall' style={{textAlign:'center',bottom:10}}>Full Time</Text>
        </Card.Content>
        </Card>

        <Card style={styles.card3}>
        <Card.Content>
        <Image 
          source={require('../src/part-tiime.png')}
          style={{width:30,height:30,top:25,left:18}}
          />
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center',bottom:10}}>38.9K</Text>
          <Text variant='titleSmall' style={{textAlign:'center',bottom:10}}>Part Time</Text>
        </Card.Content>
        </Card>
      <Text variant='headlineMedium' style={{fontWeight:'bold',marginBottom:20,color:themes==='light'?'black':'white'}} >Recent Job List</Text>
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
      {/* <Card style={styles.card4}>
        <Card.Content>
         
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Apply Now</Button>
        </Card.Content>
      </Card>
      <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Apply Now</Button>
        </Card.Content>
      </Card>
       */}
    </KeyboardAvoidingView>
  );
};
const styles=StyleSheet.create({

  welcome:{
    paddingBottom:5,
  },
  hello:{
    flex:1,
    marginTop:50,
    
  },
  searchbar:{
    marginTop:40,
    marginRight:100,
    marginLeft:10,
  },
  apply:{
    marginLeft:220,
    
  },
  card1:{
    position:'absolute',
    top:330,
    left:20,
    bottom:30,
    width:170,
    height:240,
  },
  card2:{
    position:'absolute',
    left:200,
    bottom:480,
    width:'50%',
    height:105,

  },
  card3:{
    position:'absolute',
    left:200,
    bottom:350,
    width:'50%',
  },
  card4:{
    marginBottom:20,
  },
  recent:{
    fontWeight:'bold',
    marginBottom:20,
  },

})
export default Home;