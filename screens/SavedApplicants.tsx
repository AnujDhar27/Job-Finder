import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text,Card,IconButton} from 'react-native-paper';
import { View, StyleSheet,FlatList,ScrollView, PermissionsAndroid, SectionList } from 'react-native';
import { textAlign } from '@mui/system';
import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from '@react-native-firebase/app'


const SavedApplicants = (props) => {
  const db=firestore();
  const [userData,setUserData]=useState([]);
  const [icons,setIcons]=useState(0);
  const [themes,setThemes]=useState("");

  useEffect(()=>{
    const unsubscribe=firestore()
    .collection('users')
    .onSnapshot((querySnapshot)=>{
      const data1=[];
      const data2=[];
      querySnapshot.forEach((documentSnapshot)=>{
        
          //console.log(documentSnapshot.data().payID);
          //console.log(documentSnapshot.data())
          if(documentSnapshot.data().payID!=null&&documentSnapshot.data().isFav!=null)
          {
            data1.push({
              id:documentSnapshot.id,
              ...documentSnapshot.data(),
            });
            //console.log('hi');
          }
          else if (documentSnapshot.data().payID==null && documentSnapshot.data().name!=null&&documentSnapshot.data().isFav!=null){
        data2.push({
          id:documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      }
      });
      setUserData([...data1,...data2]);//merging of 2 arrays
    });
    return()=>unsubscribe();
  },[])
  const handleUnfav=async(item)=>{
    const userDocRef=db.collection('users').doc(item.uid);
    await userDocRef.update({"isFav":null});
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
  Alert.alert(
    'Resume Download Status',
    'Resume Downloaded Successfully',
    [{text:'OK',onPress:()=>console.log('OK pressed')}]

  );
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
      const unsubscribe=firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((documentSnapshot)=>{
     if(documentSnapshot.data().uiTheme==="light")
           setThemes("light");
      if(documentSnapshot.data().uiTheme==="dark")
          setThemes("dark");
      });
      return()=>unsubscribe();
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
      <Text variant="headlineMedium" style={{textAlign:'center',paddingTop:10,color:themes==='light'?'black':'white'}}>Saved Applicants</Text>  
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{marginTop:20,}}>
          <View style={styles.userContainer}>
            <Button icon='cards-heart' style={{left:320,top:20,zIndex:1,position:'absolute'}} onPress={()=>handleUnfav(item)}>rem</Button>
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
    </View>
  );
};
const styles=StyleSheet.create({
  container:{

  },
  buttons:{
    width:300,
    margin:10,
  },
  userContainer:{
    padding:20,
  }
})
export default SavedApplicants;