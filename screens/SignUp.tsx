import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native';

const SignUp= (props) => {

  const [name,setName]=useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);

        Alert.alert(
          'Sign Up Successful',
          'You can now log in using your credentials',
          [
            {text:'OK', onPress:()=>props.navigation.navigate("Login")}
          ]
        )
      })
      .catch(error => {
        let errorMessage='An error has occured while signing you up'

        if (error.code === 'auth/email-already-in-use') {
          errorMessage='The email id is already in use, please use a different id';
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          errorMessage='The email id is invalid, please enter a valid email id';
          console.log('That email address is invalid!');
        }

        Alert.alert(
          'Sign Up Error',
          errorMessage,
          [{text:'OK',onPress:()=>console.log('OK pressed')}]

        );
        console.error(error);
  })};
  
  

  return (
      <View style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Welcome to Job Finder</Text>
      <Text style={styles.login} variant="headlineMedium">Create Account</Text>
      <TextInput
      mode= 'outlined'
      style={styles.textBox1}
        placeholder="Enter Name"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
      mode= 'outlined'
      style={styles.textBox1}
        placeholder="Enter Email ID"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
      mode='outlined'
      style={styles.textBox1}
        placeholder='Enter password'
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button mode="contained" onPress={handleSignUp} >
        Sign Up
      </Button>
      <Button onPress={()=>props.navigation.navigate("Login")} style={styles.forgot}><Text style={{textAlign:'center',paddingTop:20}} variant='titleSmall'>Already have an account? <Text style={{color:'#6750a4'}}>Login </Text></Text></Button>
      
    
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
  welcome:{
    paddingBottom:60,
    fontWeight:'bold',
  },
  login:{
    paddingBottom:20,
    
  },
  forgot:{
    marginLeft:150,
    marginTop:20,
    
  }

});
export default SignUp;
