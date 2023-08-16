import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';

const Home = (props) => {
  const [email, setEmail] = useState(""); 

  return (
      <View style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Welcome to Home Screen</Text>

    
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  textBox1:{
    paddingBottom: 10,
    marginBottom: 20,
  },
  textBox2:{
    paddingBottom:10,
    marginBottom:20,
  },
  welcome:{
    paddingBottom:60,
    fontWeight:'bold',
  },
  login:{
    paddingBottom:20,
    
  },
  forgot:{
    marginLeft:260,
    marginTop:10,
    
  }
})
export default Home;