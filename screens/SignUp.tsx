import React, { useState } from 'react';
import { Button, TextInput, Text,IconButton,Dialog} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore'
const SignUp= (props) => {
  const db=firestore();
  const [name,setName]=useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [secure,setSecure]=useState(true);
  const [errorMessage,setErrorMessage]=useState('An error has occured while signing you up')
  const [visible,setVisible]=useState(false);
  const [visible1,setVisible1]=useState(false);
  // const [index,setIndex]=useState(1);
  const hideDialog=()=>setVisible(false);
  const hideDialog1=()=>setVisible1(false);
  const handleEye=()=>{
    setSecure((prev)=>!prev);
    
  }
  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        const userDocRef=db.collection('users').doc(user.uid);
        userDocRef.set({"payID":'',"uiTheme":'light',"profileUrl":'',"isFav":0});//add isFav
        // userDocRef.set({"uiTheme":"light"});
        // userDocRef.set({"profileUrl":''});
        setVisible1(true);
        // Alert.alert(
        //   'Sign Up Successful',
        //   'You can now log in using your credentials',
        //   [
        //     {text:'OK', onPress:()=>props.navigation.navigate("Login")}
        //   ]
        // )
      })
      .catch(error => {
        let errorMessage='An error has occured while signing you up'

        if (error.code === 'auth/email-already-in-use') {
          errorMessage='The email id is already in use, please use a different id';
          setErrorMessage(errorMessage);
          setVisible(true);
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          
          errorMessage='The email id is invalid, please enter a valid email id';
          setVisible(true);
          setErrorMessage(errorMessage);
          console.log('That email address is invalid!');
        }

        // Alert.alert(
        //   'Sign Up Error',
        //   errorMessage,
        //   [{text:'OK',onPress:()=>console.log('OK pressed')}]

        // );
        if(error.code==='auth/weak-password')
        {
          errorMessage='The password should be at least 6 characters'
          setErrorMessage(errorMessage);
          setVisible(true);
          console.log('invalid password');
        }
        console.log(error);
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
      <IconButton
      icon={secure?'eye-off':'eye'}
      iconColor='#6750a4'
      style={{position:'relative',top:63,left:330,marginTop:-40,zIndex:visible||visible1?0:1,}}
      onPress={handleEye}
      />
      <TextInput
      mode='outlined'
      style={styles.textBox1}
        placeholder='Enter password'
        label="Password"
        secureTextEntry={secure}
        value={password}
        onChangeText={text => setPassword(text)}
      />
  
      <Button mode="contained" onPress={handleSignUp}  style={{zIndex:0}}>
        Sign Up
      </Button>
      <Button onPress={()=>props.navigation.navigate("Login")} style={styles.forgot}><Text style={{textAlign:'center',paddingTop:20}} variant='titleSmall'>Already have an account? <Text style={{color:'#6750a4'}}>Login </Text></Text></Button>
      <Dialog visible={visible} onDismiss={hideDialog}>
         <Dialog.Icon icon='alert' size={40}/>
          <Dialog.Title style={{justifyContent:'center',textAlign:'center'}}><Text variant='headlineMedium'>Sign Up Error</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant='titleSmall'>{errorMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visible1} onDismiss={hideDialog1}>
         <Dialog.Icon icon='check-circle' size={40}/>
          <Dialog.Title style={{justifyContent:'center',textAlign:'center'}}><Text variant='headlineMedium'>Sign Up Successful</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant='titleSmall' style={{textAlign:'center'}}>You can now log in using your credentials</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={()=>props.navigation.navigate("Login")}>OK</Button>
          </Dialog.Actions>
        </Dialog>

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
    zIndex:0,
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
    zIndex:0,
    
  }

});
export default SignUp;
