import React, { useState } from 'react';
import { Button, TextInput, Text,Provider, DefaultTheme,Dialog,IconButton} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView,ScrollView } from 'react-native';
import { textAlign } from '@mui/system';
import {Alert} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {Formik} from 'formik';
//import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


const PostForm = (props) => {
  const db=firestore();
  // const [showDropDown,setShowDropDown]=useState(false);
  // const [type,setType]= useState ("");
  // const typeList=[
  //   {
  //     label:"Part Time",
  //     value:"part-time",
  //   },
  //   {
  //     label:"Remote Jobs",
  //     value:"remote-jobs",
  //   },
  //   {
  //     label:"Full Time",
  //     value:"full-time",
  //   },
  // ]
  const [visible,setVisible]=useState(false);
  const hideDialog=()=>setVisible(false);
  const handleSubmit=async(values)=>{
    console.log(values);
    try{
    const user=firebase.auth().currentUser;
    if(user)
    {
      const empData={
        uid:user.uid,
        cname:values.cname,
        Location:values.loc,
        JobRole:values.role,
        Position:values.pos,
        JobType:values.type,
        Salary:values.sal,
        JobDes:values.desc, 
      };
      const uidStore=[];
      var uid=uuid.v4();
      const userDocRef=db.collection('recuit').doc(user.uid).collection(uid.toString()).doc(uid.toString());
      await userDocRef.set(empData);
      uidStore.push(uid.toString());
      console.log(uidStore);
      setVisible(true);
    }
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (

      <ScrollView style={styles.container}>
        <IconButton
        icon='keyboard-backspace'
        size={30}
        style={{position:'absolute',top:40,left:-10,zIndex:1}}
        onPress={()=>props.navigation.navigate("Home2")}
        />
      <Text style={styles.welcome} variant="displaySmall">Job Posting Form</Text>
      <Provider theme={DefaultTheme}>
      <Formik
      initialValues={{cname:'',loc:'',role:'',pos:'',sal:'',desc:'',type:''}}
      onSubmit={handleSubmit}

      validate={(values)=>{
        const errors={};
        if(!values.cname)
        errors.cname="*Company Name required";

        if(!values.loc)
        errors.loc="*Location required";

        if(!values.role)
        errors.role="*Job Role required";
        
        if(!values.pos)
        errors.pos="*Position required";

         if(!values.type)
         errors.type="*Job Type required";

        if(!values.sal)
        errors.sal="*Salary required";

        if(!values.desc)
        errors.desc="*Job Description required";
    return errors;
      }}
      >
        {({handleChange,handleBlur,handleSubmit,values,errors,touched})=> (
            
            <KeyboardAvoidingView>
              
                <TextInput
                mode='outlined'
                label='Company Name'
                name="cname"
                placeholder="Enter Company Name"
                onChangeText={handleChange('cname')}
                onBlur={handleBlur('cname')}
                value={values.cname}
                style={styles.textBox1}
            />
            {errors.cname && touched.cname&& <Text style={styles.errorMessage}>{errors.cname}</Text>}
            <TextInput
            mode='outlined'
            label='Location'
            name="loc"
            placeholder="Enter location"
            onChangeText={handleChange('loc')}
                onBlur={handleBlur('loc')}
                value={values.loc}
                style={styles.textBox1}
        />
        {errors.loc && touched.loc&& <Text style={styles.errorMessage}>{errors.loc}</Text>}
            <TextInput
            mode='outlined'
            label='Job Role'
            name="role"
            placeholder="Enter the job role"
            onChangeText={handleChange('role')}
                onBlur={handleBlur('role')}
                value={values.role}
                style={styles.textBox1}
        />
        {errors.role && touched.role&& <Text style={styles.errorMessage}>{errors.role}</Text>}
        <TextInput
            mode='outlined'
            label='Position'
            name="pos"
            placeholder="Enter Job Position"
            onChangeText={handleChange('pos')}
                onBlur={handleBlur('pos')}
                value={values.pos}
                style={styles.textBox1}
        />
        {errors.pos && touched.pos&& <Text style={styles.errorMessage}>{errors.pos}</Text>}
        <TextInput
                mode='outlined'
                label='Job Type'
                name="type"
                placeholder="Enter Job Type"
                onChangeText={handleChange('type')}
                onBlur={handleBlur('type')}
                value={values.type}
                style={styles.textBox1}
            />
              {/* <DropDown
              label={"Job Type"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={()=>setShowDropDown(true)}
              onDismiss={()=>setShowDropDown(false)}
              value={type}
              setValue={setType}
              list={typeList}
              /> */}

             {errors.type&& touched.type&& <Text style={styles.errorMessage}>{errors.type}</Text>}
            <TextInput
            mode='outlined'
            label='Salary'
            name="sal"
            placeholder="Enter salary"
            keyboardType='numeric'
            onChangeText={handleChange('sal')}
                onBlur={handleBlur('sal')}
                value={values.sal}
                style={styles.textBox1}
        />
        {errors.sal && touched.sal && <Text style={styles.errorMessage}>{errors.sal}</Text>}

        <TextInput
            mode='outlined'
            label='Job Description'
            name="desc"
            placeholder="Enter job description"
            onChangeText={handleChange('desc')}
                onBlur={handleBlur('desc')}
                value={values.desc}
                style={{paddingBottom:70,marginBottom:20,zIndex:0}}
            multiline={true}
        />
        {errors.desc && touched.desc && <Text style={styles.errorMessage}>{errors.desc}</Text>}
        
        <Button mode='contained' onPress={handleSubmit} disabled={Object.keys(errors).length !== 0}>
            Post
        </Button>

        <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon
        icon='check-circle'
        size={30}
        />
        <Dialog.Title style={{textAlign:'center'}}>Success</Dialog.Title>
        <Dialog.Content><Text style={{textAlign:'center'}}>Job Posted Successfully</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={()=>props.navigation.navigate("Home2")}>Okay</Button>
        </Dialog.Actions>
      </Dialog>
            </KeyboardAvoidingView>

        )}
        
      </Formik>
      </Provider>

      </ScrollView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    // paddingTop:50,
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  textBox1:{
    paddingBottom: 10,
    marginBottom: 20,
    zIndex:0,
  },

  welcome:{
    paddingTop:50,
    paddingBottom:60,
    fontWeight:'bold',
    textAlign:'center'
  },

  errorMessage:{
    color:'red',
    paddingBottom:20,
  }
})
export default PostForm;