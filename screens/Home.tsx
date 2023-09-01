import React, { useContext, useState } from 'react';
import {Card, Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView, Platform ,Image} from 'react-native';
import { textAlign } from '@mui/system';
import {useRoute} from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { Padding } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { ScrollView } from 'react-native-gesture-handler';
import UserContext from './UserContext';

const Home = (props) => {
  const route=useRoute();
  const {userName}=useContext(UserContext);
  //const {name}=route.params;
  const [searchQuery,setSearchQuery]=useState('');
  const onChangeSearch=(query)=>{setSearchQuery(query)};
  return (

      <KeyboardAvoidingView style={styles.container}>
              <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}/>
              <Button   mode='contained-tonal' onPress={()=>props.navigation.navigate('EmpProfile')} style={{position:'relative',left:320,bottom:50,width:50,height:45,}} >p</Button>
      <ScrollView>
        
      <Text style={styles.welcome} variant="displaySmall">Hello</Text>
      <Text variant="displaySmall" style={{fontWeight:'bold',}}>{userName}</Text>
      
      <Text variant='titleMedium' style={{fontWeight:'bold',paddingTop:20,marginBottom:320}}>Find your job</Text>
      

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
      <Text variant='headlineMedium' style={styles.recent} >Recent Job List</Text>
      <Card style={styles.card4}>
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
      
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
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
    paddingTop:0,
    paddingBottom:100,
   
    bottom:400,
    width:'45%',
  },
  card2:{
    position:'absolute',
    left:190,
    bottom:525,
    paddingTop:0,
    paddingBottom:0,
    width:'50%',
    height:105,


  },
  card3:{
    position:'absolute',
    left:190,
    bottom:400,
    paddingTop:0,
    paddingBottom:0,
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