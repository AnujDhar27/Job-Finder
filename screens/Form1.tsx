import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { textAlign } from '@mui/system';
import {Alert} from 'react-native'
import {Formik} from 'formik'
const Form1 = (props) => {

  return (
      <View style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Job Application Form</Text>
      <Formik
      initialValues={{currSal:'',expSal:'',yoe:'',message:''}}
      onSubmit={values=>console.log(values)}
      validate={values=>{
        const errors={};
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
        <Button mode='contained' onPress={handleSubmit} disabled={Object.keys(errors).length !== 0}>
            Submit
        </Button>
            </KeyboardAvoidingView>
        )}
      </Formik>
      
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
  errorMessage:{
    color:'red',
    paddingBottom:20,
  }
})
export default Form1;