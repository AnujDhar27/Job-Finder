import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
const ForgotPassword = (props) => {
  const [email, setEmail] = useState(""); 
  const[isEmailSent,setEmailSent]=useState(true);
  const handleFP=()=>{
    auth()
    .sendPasswordResetEmail(email)
    .then(()=>{
      setEmailSent(true);
      Alert.alert(
        "Forgot Password",
        "Please check your mail",
        [{text:"OK",onPress:()=>console.log("Ok pressd")}]
      )
    })
    .catch(error=>{
      let errorMessage="An error has occured"
      if (error.code === 'auth/invalid-email') {
        errorMessage='The email id is invalid, please enter a valid email id';
        console.log('That email address is invalid!');
      }
      Alert.alert(
        "Forgot Password Error",
        errorMessage,
        [{text:"OK",onPress:()=>console.log("Ok,pressed")  }]

      )
    })

  }
  return (
      <View style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Restore your password</Text>
      
      <TextInput
      mode= 'outlined'
      style={styles.textBox1}
        placeholder="Enter Email ID"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Button mode="contained" onPress={handleFP} style={{marginTop:10}}>
        Send Reset Instructions
      </Button>
      <Button onPress={()=>props.navigation.navigate("Login")} style={styles.forgot}><Text style={{textAlign:'center',paddingTop:20}} variant='titleSmall'>Back to <Text style={{color:'#6750a4'}}>Login </Text></Text></Button>
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
export default ForgotPassword;