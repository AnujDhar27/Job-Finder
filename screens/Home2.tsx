import React, { useState } from 'react';
import {Card, Button, TextInput, Text,FAB,Menu,Divider,PaperProvider} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView, Platform } from 'react-native';
import { textAlign } from '@mui/system';
import {useNavigation, useRoute,DrawerActions} from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { Padding } from '@mui/icons-material';
import { Icon, Paper } from '@mui/material';
import { ScrollView } from 'react-native-gesture-handler';


const Home2Screen = (props) => {
  const route=useRoute();
  const navigation=useNavigation();  
  //  const {name}=route.params;
  const [searchQuery,setSearchQuery]=useState('');
  const onChangeSearch=(query)=>{setSearchQuery(query)};
  return (
    <KeyboardAvoidingView style={styles.container}>
      
    <ScrollView>
      <Button  icon="menu" style={{position:'relative',top:60,width:2,paddingRight:20}} onPress={()=> props.navigation.openDrawer()}></Button> 
      <Searchbar

        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

        <View style={styles.hello}>
      <Text style={styles.welcome} variant="displaySmall">Hello</Text>
      {/* <Text variant="displaySmall" style={{fontWeight:'bold',}}>{name}</Text> */}
      </View>
      <Text variant='titleMedium' style={{paddingBottom:20,paddingTop:20}}>Jobs Posted by you</Text>
      


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
      </Card>
      <Card style={styles.card4}>
        <Card.Content>
          <Text variant='titleLarge' >Product Designer</Text>
          <Text variant='bodyMedium'>$10K-$12K/month</Text>
          <Button rippleColor="#FF000020" style={styles.apply} mode='contained' onPress={()=>props.navigation.navigate("Desc1")}>Check Details</Button>
        </Card.Content>
      </Card>
      
      </ScrollView>

    <FAB
      icon="plus"
      style={styles.fab}
      onPress={()=>props.navigation.navigate('PostForm')}
      />

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
    marginTop:10,
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