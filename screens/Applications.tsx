import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text,Card} from 'react-native-paper';
import { View, StyleSheet,FlatList,ScrollView, PermissionsAndroid } from 'react-native';
import { textAlign } from '@mui/system';
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';

const Applications= (props) => {
    const [userDetails1,setUserDetails1]=useState([]);
    const [userDetails2,setUserDetails2]=useState([]);
    useEffect(()=>{
      const unsubscribe=firestore()
      .collection('users')
      .onSnapshot((querySnapshot)=>{
        const data1=[];
        const data2=[];
        querySnapshot.forEach((documentSnapshot)=>{
          
            //console.log(documentSnapshot.data().payID);
            //console.log(documentSnapshot.data())
            if(documentSnapshot.data().payID!=null)
            {
              data1.push({
                id:documentSnapshot.id,
                ...documentSnapshot.data(),
              });
              //console.log('hi');
            }
            else{
          data2.push({
            id:documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }
        });
        const DATA=[data1,data2];
        setUserDetails1(data1);
        setUserDetails2(data2);
       // console.log(data2);
      });
      
      return()=>unsubscribe();
    })
  
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
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  return (

      <View style={styles.container}>
      <Button icon="menu" style={{width:2,paddingRight:20,top:50,zIndex:1}} onPress={()=>props.navigation.openDrawer()}></Button>

      <Text variant="headlineLarge" style={{textAlign:'center',paddingTop:10,}}>Applications</Text>
      
      <FlatList
        data={userDetails1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{marginTop:20,}}>
          <View style={styles.userContainer}>
            <Text variant='titleMedium'>Name: {item.name}</Text>
            <Text variant='titleMedium'>Email: {item.emailID}</Text>
            <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>
            <Text variant='titleMedium'>Current Organization: {item.currOrg}</Text>
            <Text variant='titleMedium'>Years of Experience: {item.yoe}</Text>
            <Text variant='titleMedium'>Current Salary: {item.currSal}</Text>
            <Text variant='titleMedium'>Expected Salary: {item.expSal}</Text>
            <Text variant='titleMedium'>Payment ID: {item.payID}</Text>   
            <Text variant='titleMedium'>Message to the Recruiter: {item.message}</Text>
            <Button mode='contained-tonal' icon='download' style={{marginTop:10,}} onPress={()=>handleDownload(item.fileUrl)}>Downlaod Resume</Button>
            </View>
            </Card>
        )}
        />
        <FlatList
         data={userDetails2}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
           <Card style={{marginTop:20,}}>
           <View style={styles.userContainer}>
             <Text variant='titleMedium'>Name: {item.name}</Text>
             <Text variant='titleMedium'>Email: {item.emailID}</Text>
             <Text variant='titleMedium'>Phone Number: {item.cinfo}</Text>
             <Text variant='titleMedium'>Current Organization: {item.currOrg}</Text>
             <Text variant='titleMedium'>Years of Experience: {item.yoe}</Text>
             <Text variant='titleMedium'>Current Salary: {item.currSal}</Text>
             <Text variant='titleMedium'>Expected Salary: {item.expSal}</Text>
             <Text variant='titleMedium'>Payment ID: {item.payID}</Text> 
             <Text variant='titleMedium'>Message to the Recruiter: {item.message}</Text>
             <Button mode='contained-tonal' icon='download' style={{marginTop:10,}} onPress={()=>handleDownload(item.fileUrl)}>Downlaod Resume</Button>
             </View>
             </Card>
         )}
        />
    </View>

  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    // paddingTop:40,
    // justifyContent:'center'
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