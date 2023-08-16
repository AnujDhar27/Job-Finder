import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import   '@react-navigation/native'
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'

const Login = (props) => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("")
  const handleSingIn=()=>{
    auth()
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials=>{
      const user=userCredentials.user;
      console.log('Login successful',user.email);
      setEmail("");
      setPassword("");
      props.navigation.navigate("Home");
    })
    .catch(error=>{
      if(error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
    })
  }
  return (
      <View style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Welcome to Job Finder</Text>
      <Text style={styles.login} variant="headlineMedium">Login</Text>
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
      style={styles.textBox2}
        placeholder='Enter password'
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={()=>props.navigation.navigate("ForgotPassword")} style={styles.forgot}><Text variant='titleSmall'>Forgot your <Text style={{color:'#6750a4'}}>password</Text>?</Text></Button>
      <Button mode="contained" onPress={handleSingIn}>
        Login
      </Button>
      <Button onPress={()=>props.navigation.navigate("SignUp")} style={{marginTop:20}}><Text style={{textAlign:'center',paddingTop:20}} variant='titleSmall'>Don't have an account? <Text style={{color:'#6750a4'}}>Sign Up</Text></Text></Button>
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
    marginLeft:200,
    marginBottom:20,
    
  }

})
export default Login;
