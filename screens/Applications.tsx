  import React, { useEffect, useState } from 'react';
  import { Button, TextInput, Text,Card,IconButton,Dialog} from 'react-native-paper';
  import { View, StyleSheet,FlatList, PermissionsAndroid, } from 'react-native';
  import { textAlign } from '@mui/system';
  import {Alert} from 'react-native'
  import { useNavigation } from '@react-navigation/native';
  import firestore from '@react-native-firebase/firestore';
  import RNFetchBlob from 'rn-fetch-blob';
  import firebase from '@react-native-firebase/app'


const Applications= (props) => {
  const [visible,setVisible]=useState(false);
  const hideDialog=()=>setVisible(false);
  const db=firestore();
  const [appl,setappl]=useState([]);
  const [themes,setThemes]=useState("");
    const [userData,setUserData]=useState([]);
    try{
      const user=firebase.auth().currentUser;
      if(user){
        useEffect(()=>{
          firestore()
          .collection('recruit')
          .doc(user.uid)
          .get()
          .then(documentSnapshot=>{
            if(documentSnapshot.data().appllicants)
            setappl(documentSnapshot.data().appllicants);
          })
        },[])
        }
      }
    catch(error){
      console.log(error);
    }

    useEffect(()=>{
      firestore()
      .collection('users')
      .get()
      .then(querySnapshot=>{
        const data1=[];
        const data2=[];
        querySnapshot.forEach((documentSnapshot)=>{
          if(documentSnapshot.exists)
          if(appl.includes(documentSnapshot.data().uid)){
          if(documentSnapshot.data().name){
          if(documentSnapshot.data().payID!=='')
          {
            data1.push({
              id:documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          }
          else{
            data2.push({
              id:documentSnapshot.id,
              ...documentSnapshot.data(),
            })
          }
        }
      }
      })
      setUserData([...data1,...data2]);//merging of 2 arrays
      })
    },[])
        //empty array to fire useffect only once, prevents app from crashing as it prevents infinite loop
    
    //console.log(userData);
    const handleFav=async(item)=>{
      console.log('pressed fav button',item.uid);
      const userDocRef=db.collection('users').doc(item.uid);
      await userDocRef.update({"isFav":1});
    }

    const handleDownload=async(val)=>{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Job Finder Storage Permission',
            message:
              'Job Finder App needs access to your storage ' +
              'so you can download resume.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("storage permission allowed");
          console.log(val);
          const {config,fs}=RNFetchBlob;
          const fileDir=fs.dirs.DownloadDir;
          const date=new Date();
          config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
              fileCache : true,
              addAndroidDownloads:{
                useDownloadManager:true,
                notification:true,
                path:fileDir+"/download_"+Math.floor(date.getDate()+date.getSeconds()/2)+'.docx',
                description:'file download'
              },
              
         })
          .fetch('GET', val, {})
          .then((res) => {
    // the temp file path

    console.log('The file saved to ', res.path())
    setVisible(true);
    // Alert.alert(
    //   'Resume Download Status',
    //   'Resume Downloaded Successfully',
    //   [{text:'OK',onPress:()=>console.log('OK pressed')}]

    // );
  })
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
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
            if(documentSnapshot.data().uiTheme==='light')
            setThemes('light');
            if(documentSnapshot.data().uiTheme==='dark')
            setThemes('dark');
          })
        },[])
    }
}
catch(error)
{
  console.log(error);
}
  return (

      <View style={{flex:1,paddingHorizontal:20,backgroundColor:themes==='light'?'white':'#121212' ,}}>
        <IconButton
        icon="menu"
        style={{top:60,left:-10,zIndex:1}}
        size={30}
        iconColor='#6750a4'
        onPress={()=>props.navigation.openDrawer()}
        />
      {/* <Button icon="menu" style={{width:2,paddingRight:20,top:50,zIndex:1}} onPress={()=>props.navigation.openDrawer()}></Button> */}

      <Text variant="headlineLarge" style={{textAlign:'center',paddingTop:10,color:themes==='light'?'black':'white'}}>Applications</Text>  
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{marginTop:20,}}>
          <View style={styles.userContainer}>
            <IconButton
            icon='cards-heart-outline'
            style={{left:320,top:20,zIndex:1,position:'absolute'}}
            onPress={()=>handleFav(item)}
            />
            
            <Text variant='titleMedium'>Name: {item.name}</Text>
            <Text variant='titleMedium'>Email: {item.emailID}</Text>
            <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>
            <Text variant='titleMedium'>Current Organization: {item.currOrg}</Text>
            <Text variant='titleMedium'>Years of Experience: {item.yoe}</Text>
            <Text variant='titleMedium'>Current Salary: {item.currSal}</Text>
            <Text variant='titleMedium'>Expected Salary: {item.expSal}</Text>
            <Text variant='titleMedium'>Payment ID: {item.payID}</Text>   
            <Text variant='titleMedium'>Message to the Recruiter: {item.message}</Text>
            <Button mode='contained-tonal' icon='download' style={{marginTop:10,}} onPress={()=>handleDownload(item.fileUrl)}>Download Resume</Button>
            </View>
            </Card>
        )}
        />
        <Dialog visible={visible} onDismiss={hideDialog}>
         <Dialog.Icon icon='download-circle' size={40}/>
          <Dialog.Title style={{justifyContent:'center',textAlign:'center'}}><Text variant='headlineMedium'>Resume Download Status</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant='titleSmall' style={{textAlign:'center'}}>Resume Downloaded Successfully</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
    </View>

  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  buttons:{
    width:300,
    margin:10,
  },
  userContainer:{
    padding:20,
  }

})
export default Applications;