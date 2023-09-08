import React, { useContext, useState } from 'react';
import { Button, TextInput, Text, SegmentedButtons,IconButton} from 'react-native-paper';
import   '@react-navigation/native'
import { View, StyleSheet,TouchableOpacity, KeyboardAvoidingView ,Dimensions} from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import UserContext from './UserContext';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
const Login = (props) => {
  const {setUserName}=useContext(UserContext);
  const {setUserEmail}=useContext(UserContext);
  const {setUserRole}=useContext(UserContext);
  const [name,setName]=useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("")
  const [value,setValue]=useState('emp')
  const [secure,setSecure]=useState(true)
  
  const handleEye=()=>{
    setSecure((prev)=>!prev);//current value can be obtained by prev 
  }
  const handleSingIn=()=>{
    auth()
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials=>{
      const user=userCredentials.user;
      console.log('Login successful',user.email);
      console.log('name',name);
      console.log('pass',password);
      setEmail("");
      setPassword("");
      setName("");
      const db=firestore();
      const date=new Date();
      const newDate=moment(date).format("DD/MM/YYYY");
      const userDocRef=db.collection('users').doc(user.uid);
      userDocRef.update({"todayDate":newDate});
      
      //props.navigation.navigate(value==='emp'?"Home":"Home2",{userdata:{name:name,email:user.email,}});
      setUserName(name);
      setUserEmail(user.email);
      setUserRole(value==='emp'?'Employee':'Recruiter');
      props.navigation.navigate(value === 'emp' ? "Home" : "Home2");

    })
    .catch(error=>{
      if(error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
    })
  }
  return (
      <KeyboardAvoidingView style={styles.container}>

        {/* <Wavyheader customStyles={styles.svgCurve}></Wavyheader> */}
        
      <Text style={styles.welcome} variant="displaySmall">Welcome to Job Finder</Text>
      <Text style={styles.login} variant="headlineMedium">Login</Text>
      <SegmentedButtons
      style={{paddingBottom:20}}
        value={value}
        onValueChange={setValue}
        buttons={[

          {
            icon:'briefcase-search',
            
            value: 'emp',
            label: 'Employee',
          },
          {
            icon:'account-search',
            value: 'recruit',
            label: 'Recruiter',
          },
        ]}
      />

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
      style={{position:'relative',bottom:-63,left:330,marginTop:-50,zIndex:2}}
      onPress={handleEye}
      />
      <TextInput
      mode='outlined'
      style={styles.textBox2}
        placeholder='Enter password'
        label="Password"
        secureTextEntry={secure}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={()=>props.navigation.navigate("ForgotPassword")} style={styles.forgot}><Text variant='titleSmall'>Forgot your <Text style={{color:'#6750a4'}}>password</Text>?</Text></Button>
      <Button rippleColor="#FF000020" mode="contained" onPress={handleSingIn}>
        Login
      </Button>
      <Button onPress={()=>props.navigation.navigate("SignUp")} style={{marginTop:20}}><Text style={{textAlign:'center',paddingTop:20}} variant='titleSmall'>Don't have an account? <Text style={{color:'#6750a4'}}>Sign Up</Text></Text></Button>
    </KeyboardAvoidingView>
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
    textAlign:'center',
    
  },
  forgot:{
    marginLeft:200,
    marginBottom:20,
    
  },

})
export default Login;
