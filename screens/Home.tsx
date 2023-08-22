import React, { useState } from 'react';
import {Card, Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView, Platform } from 'react-native';
import { textAlign } from '@mui/system';
import {useRoute} from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { Padding } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { ScrollView } from 'react-native-gesture-handler';

const Home = (props) => {
  const route=useRoute();
  const {name}=route.params;
  const [searchQuery,setSearchQuery]=useState('');
  const onChangeSearch=(query)=>{setSearchQuery(query)};
  return (

      <KeyboardAvoidingView style={styles.container}>
              <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}
/>
      <ScrollView>
        <View style={styles.hello}>
      <Text style={styles.welcome} variant="displaySmall">Hello</Text>
      <Text variant="displaySmall" style={{fontWeight:'bold',}}>{name}</Text>
      </View>
      <Text variant='titleMedium' style={{fontWeight:'bold',paddingTop:20,marginBottom:320}}>Find your job</Text>
      

      <Card style={styles.card1}>
        <Card.Content>
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center'}}>44.8K</Text>
          <Text variant='titleSmall' style={{textAlign:'center'}}>Remote Jobs</Text>
        </Card.Content>
        </Card>
        <Card style={styles.card2}>
        <Card.Content>
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center'}}>66.8K</Text>
          <Text variant='titleSmall' style={{textAlign:'center'}}>Full Time</Text>
        </Card.Content>
        </Card>

        <Card style={styles.card3}>
        <Card.Content>
        <Text variant='titleLarge' style={{fontWeight:'bold',textAlign:'center'}}>38.9K</Text>
          <Text variant='titleSmall' style={{textAlign:'center'}}>Part Time</Text>
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
    marginRight:60,
    marginLeft:20,
  },
  apply:{
    marginLeft:220,
    
  },
  card1:{
    position:'absolute',
    paddingTop:50,
    paddingBottom:100,
   
    bottom:400,
    width:'45%',
  },
  card2:{
    position:'absolute',
    left:190,
    bottom:525,
    paddingTop:10,
    paddingBottom:10,
    width:'50%',

  },
  card3:{
    position:'absolute',
    left:190,
    bottom:400,
    paddingTop:10,
    paddingBottom:10,
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