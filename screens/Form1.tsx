import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { ScrollView, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { textAlign } from '@mui/system';
import {Alert} from 'react-native';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const Form1 = (props) => {
  const db=firestore()
  
  const handleSubmit=async(values)=>{
    try{
      const user=firebase.auth().currentUser;
      if(user)
      {
        const userData={
          uid:user.uid,
          name:values.name,
          currOrg:values.currOrg,
          emailID:values.emailID,
          cinfo:values.cinfo,
          currSal:values.currSal,
          expSal:values.expSal,
          yoe:values.yoe,
          message:values.message,
        };
        const userDocRef=db.collection('users').doc(user.uid);
        await userDocRef.set(userData);
        Alert.alert('Success','Form data submitted')

      }
      else
      {
        Alert.alert('Error','User not logged in');
      }
    }
    catch(error)
    {
      console.error('Error submitting form data:',error);
      Alert.alert('Error','An error occured while submitting data');
    }
  };
  return (
      <ScrollView style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Job Application Form</Text>
      <Formik
      initialValues={{name:'',currOrg:'',emailID:'',cinfo:'',currSal:'',expSal:'',yoe:'',message:''}}
      onSubmit={
        handleSubmit
        //values=>console.log(values)
      }
      validate={values=>{
        const errors={};
        if(!values.name)
        errors.name="*Name required";
        if(!values.currOrg)
        errors.currOrg="*Current Organization required";
        if(!values.emailID)
        errors.emailID="*Email ID required";
        if(!values.cinfo)
        errors.cinfo="*Contact Information required";
        if(!values.currSal)
        errors.currSal="*Current Salary required";
        if(!values.expSal)
        errors.expSal="*Expected Salary required";
        if(!values.yoe)
        errors.yoe="*Years of Experience required";
        if(!values.message)
        errors.message="*Message required";
    return errors;
      }}
      >
        {({handleChange,handleBlur,handleSubmit,values,errors,touched})=> (
            <KeyboardAvoidingView>
              <TextInput
                mode='outlined'
                label='Name'
                name="name"
                placeholder="Enter your name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.textBox1}
            />
            {errors.name&& touched.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
             <TextInput
                mode='outlined'
                label='Current Organization'
                name="currOrg"
                placeholder="Enter the name of your current organization"
                onChangeText={handleChange('currOrg')}
                onBlur={handleBlur('currOrg')}
                value={values.currOrg}
                style={styles.textBox1}
            />
            {errors.currOrg && touched.currOrg && <Text style={styles.errorMessage}>{errors.currOrg}</Text>}
             <TextInput
                mode='outlined'
                label='Email ID'
                name="emailID"
                placeholder="Enter your Email ID"
                keyboardType='email-address'
                onChangeText={handleChange('emailID')}
                onBlur={handleBlur('emailID')}
                value={values.emailID}
                style={styles.textBox1}
            />
            {errors.emailID && touched.emailID && <Text style={styles.errorMessage}>{errors.emailID}</Text>}
                <TextInput
                mode='outlined'
                label='Contact Information'
                name="cinfo"
                placeholder="Enter your contact number"
                keyboardType='numeric'
                onChangeText={handleChange('cinfo')}
                onBlur={handleBlur('cinfo')}
                value={values.cinfo}
                style={styles.textBox1}
            />
            {errors.cinfo && touched.cinfo && <Text style={styles.errorMessage}>{errors.cinfo}</Text>}
                <TextInput
                mode='outlined'
                label='Current Salary'
                name="currSal"
                placeholder="Enter Current Salary"
                keyboardType='numeric'
                onChangeText={handleChange('currSal')}
                onBlur={handleBlur('currSal')}
                value={values.currSal}
                style={styles.textBox1}
            />
            {errors.currSal && touched.currSal && <Text style={styles.errorMessage}>{errors.currSal}</Text>}
            
            <TextInput
            mode='outlined'
            label='Expected Salary'
            name="expSal"
            placeholder="Enter Expected Salary"
            keyboardType='numeric'
            onChangeText={handleChange('expSal')}
                onBlur={handleBlur('expSal')}
                value={values.expSal}
                style={styles.textBox1}
        />
        {errors.expSal && touched.expSal && <Text style={styles.errorMessage}>{errors.expSal}</Text>}

            <TextInput
            mode='outlined'
            label='Years of Experience'
            name="yoe"
            placeholder="Enter your years of experience"
            keyboardType='numeric'
            onChangeText={handleChange('yoe')}
                onBlur={handleBlur('yoe')}
                value={values.yoe}
                style={styles.textBox1}
        />
        {errors.yoe && touched.yoe && <Text style={styles.errorMessage}>{errors.yoe}</Text>}

        <TextInput
            mode='outlined'
            label='Message'
            name="message"
            placeholder="Enter your message to the recruiter"
            onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                value={values.message}
                style={{paddingBottom:70,marginBottom:20}}
        />
        {errors.message && touched.message && <Text style={styles.errorMessage}>{errors.message}</Text>}
        <Button mode='contained' onPress={handleSubmit} disabled={Object.keys(errors).length !== 0} style={{marginBottom:20}}>
            Submit
        </Button>
            </KeyboardAvoidingView>
        )}
      </Formik>
      
    </ScrollView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor:'white' ,
  },
  textBox1:{
    paddingBottom: 10,
    marginBottom: 20,
  },

  welcome:{
    paddingTop:40,
    textAlign:'center',
    paddingBottom:30,
    fontWeight:'bold',
  },
  login:{
    paddingBottom:20,
    
  },
  errorMessage:{
    color:'red',
    paddingBottom:20,
  }
})
export default Form1;