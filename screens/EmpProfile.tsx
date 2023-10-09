
import React, { useEffect,useContext, useState } from 'react';
import { Button, TextInput, Text, Avatar,FAB,IconButton,Dialog} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import UserContext from './UserContext';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';

const EmpProfile = (props) => {
    const db=firestore();
  const {userName}=useContext(UserContext);
  const {userEmail}=useContext(UserContext);
  const {userRole}=useContext(UserContext);
  const [selectedFile,setSelectedFile]=useState({});
  const [fileUrl,setfileUrl]=useState('');
  const [type,setType]=useState('');
  const [validity,setValidity]=useState('-');
  const user=firebase.auth().currentUser;
  const [themes,setThemes]=useState("");
  const [visible,setVisible]=useState(false);
  const hideDialog=()=>setVisible(false);
  //light mode dark mode check
  try{
    const user=firebase.auth().currentUser;
  if(user)
  {
    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot=>{
        if(documentSnapshot.exists)
        {
          if(documentSnapshot.data().uiTheme==='light')
          setThemes("light");
          if(documentSnapshot.data().uiTheme==='dark')
          setThemes("dark");
        }
        
      })
    },[])
}
}
catch(error)
{
  console.log(error);
}
//checking for proile photo
try{
if(user)
{
    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot=>{
        if(documentSnapshot.data().profileUrl!=='')
        setfileUrl(documentSnapshot.data().profileUrl);
      })
    },[])
}
}
catch(error)
{
  console.log(error);
}
//next due date and validity check
  if(user)
  {
    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot=>{
        if(documentSnapshot.exists)
        {
          if(documentSnapshot.data().payID!=='')
          {
              setType('Premium');
              console.log('hi');    
              console.log(documentSnapshot.data().premiumDate);         
              const validDate=moment(documentSnapshot.data().premiumDate).add(30,'days').format('DD/MM/YYYY');
              //const validDate=documentSnapshot.data().premiumDate.setDate(documentSnapshot.data().premiumDate + 30);
              console.log(validDate);
              setValidity(validDate);
              const currDate=new Date();
              const newCurrDate=moment(currDate).format('DD/MM/YYYY');
              
              if(moment(newCurrDate).isSameOrAfter(validDate))
               {
                 console.log('INvalid');
                 setType('Normal');
                 //setValidity('Expired');
                 const Ref=db.collection('users').doc(user.uid);
                 Ref.update({"payID":null});
               }
               else{
                 console.log('valid');
               }
          }
          else{
            setType('Normal');
          }
        }
      })
      });
      
    }
    //theme change
const handleTheme=()=>{
      //console.log('Pressed');
      if(user){
        if(themes==='light'){
       const userdocRef=db.collection('users').doc(user.uid);
        setThemes("dark");
        userdocRef.update({'uiTheme':"dark"});
      }
      else if(themes==='dark')
      {
        const userdocRef=db.collection('users').doc(user.uid);
        setThemes("light");
        console.log('pressed');
        userdocRef.update({'uiTheme':"light"});
      }
      }   
  }
  const handleProfilePic=async()=>{
    try{
      const user=firebase.auth().currentUser;
      if(user)
      {
      const res=await DocumentPicker.pick({type:[DocumentPicker.types.images],copyTo:'cachesDirectory'})
      setSelectedFile(res);
      console.log(res[0].fileCopyUri);
      if(selectedFile)
      {
        const fileRef=storage().ref(`/profilePic/${user.uid}/${selectedFile[0].name}`);
        const filePath=selectedFile[0].fileCopyUri;
        await fileRef.putFile(filePath);
        const url=await fileRef.getDownloadURL();
        console.log(url);
        setfileUrl(url);
        const userdocRef=db.collection('users').doc(user.uid);
        userdocRef.update({'profileUrl':url})
      }
  }
  }
  catch(error){
    setVisible(true);
    console.log('Error',error);
  }
  
};

const handlePayment=()=>{
    const user=firebase.auth().currentUser;
    var options={
    description:'Credits towards the consultation',
    image:'https://i.imgur.com/3g7nmJC.png',
    currency:'INR',
    key:'rzp_test_1cfiXazP8uKtw8',//api key from razorpay,
    amount:'100',//the amount is given in paise, 100 paise = 1 rupee is the minimum value
    name:'Job Finder',
    prefill:{
        email:'anuj@gmail.com',
        contact:'9191919876',
        name:'Anuj Razorpay test',
    },
    theme:{color:'#6750a4'}
}
RazorpayCheckout.open(options).then(async(data)=>{
    alert(`Success: ${data.razorpay_payment_id}`);
    if(user)
    {
        const date=new Date();
        const newDate=moment(date).format("YYYY-MM-DD");
        console.log(newDate);
        const userDocRef=db.collection('users').doc(user.uid);
        await userDocRef.update({"payID":`${data.razorpay_payment_id}`});
        await userDocRef.update({"premiumDate":newDate});
            }

}).catch((error) => {
  // handle failure
  alert(`Error: ${error.code} | ${error[0].description}`);
  console.log(`${error.description}`)
});
};
  const handleSignOut=()=>{
    try{
      auth().signOut();
      console.log('user successfully logged out');
      props.navigation.navigate('Login')
    }
    catch(error)
    {
      console.log('error while sign out',error);
    }
  };

  return (
      <View style={{flex:1,
        paddingHorizontal:20,
        backgroundColor:themes==="light"?"white":'#121212' ,}}>
      <IconButton
      icon="home"
      size={30}
      iconColor='#6750a4'
      style={{position:'relative',top:60,paddingRight:20,zIndex:1}}
      onPress={()=> props.navigation.navigate('Home')}
      />
      <IconButton
      icon={themes==="light"?"weather-sunny":"moon-waning-crescent"}
      size={30}
      iconColor='#6750a4'
      style={{position:'relative',top:8,left:350,zIndex:1}}
      onPress={handleTheme}
      />
        {/* <Button  icon="home" style={{position:'relative',top:60,width:2,paddingRight:20,zIndex:1}} onPress={()=> props.navigation.navigate('Home')}></Button>  */}
      <Text style={{textAlign:'center',color:themes==="light"?'black':'white',paddingTop:10,}} variant="displaySmall">Profile</Text>
      
      <Avatar.Image style={{marginLeft:100,marginTop:40,}} size={200} source={Object.keys(fileUrl).length===0?require('../src/profile_Image.jpeg'):{uri:fileUrl}}/>
      <FAB  style={{position:'absolute',left:280,top:280,zIndex:1}} icon='plus' onPress={handleProfilePic}/>

     <Text style={{paddingBottom:20,paddingLeft:20,paddingTop:40,color:themes==="light"?'black':'white'}} variant='titleLarge'>Name: <Text style={{color:themes==="light"?'black':'white'}}>{userName}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?'black':'white'}} variant='titleLarge'>Email ID: <Text style={{color:themes==="light"?'black':'white'}}>{userEmail}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?'black':'white'}} variant='titleLarge'>Role: <Text style={{color:themes==="light"?'black':'white'}}>{userRole}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?'black':'white'}} variant='titleLarge'>Type: <Text style={{color:themes==="light"?'black':'white'}}>{type}</Text></Text>
     <Text style={{paddingBottom:20,paddingLeft:20,color:themes==="light"?'black':'white'}} variant='titleLarge' >Next Due: <Text style={{color:themes==="light"?'black':'white'}}>{validity}</Text></Text>
     <Button mode='contained-tonal' rippleColor="#FF000020" onPress={handlePayment} disabled={type==='Premium'?true:false}> Go Premium</Button>
        <Button style={{marginTop:20}} rippleColor="#FF000020" mode="contained" onPress={handleSignOut} >
          Sign Out
        </Button>
        <Dialog visible={visible} onDismiss={hideDialog}>
         <Dialog.Icon icon='alert' size={40}/>
          <Dialog.Title style={{justifyContent:'center',textAlign:'center'}}><Text variant='headlineMedium'>Profile Photo Upload Status</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant='titleSmall' style={{textAlign:'center'}}>Failed to upload profile photo</Text>
            <Text variant='titleSmall' style={{textAlign:'center'}}>Please try again!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
    </View>
  );
};
const styles=StyleSheet.create({
  login:{
    paddingBottom:20,
  },
})
export default EmpProfile;
