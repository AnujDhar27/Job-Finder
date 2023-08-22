import React, { useState } from 'react';
import { Button, TextInput, Text} from 'react-native-paper';
import { View, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { textAlign } from '@mui/system';
import {Alert} from 'react-native'
import {Formik} from 'formik'
import { ScrollView } from 'react-native-gesture-handler';
const PostForm = (props) => {

  return (
    
      <ScrollView style={styles.container}>
      <Text style={styles.welcome} variant="displaySmall">Job Posting Form</Text>
      <Formik
      initialValues={{cname:'',loc:'',role:'',pos:'',type:'',sal:'',desc:''}}
      onSubmit={values=>console.log(values)}
      validate={values=>{
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
            {errors.type && touched.type&& <Text style={styles.errorMessage}>{errors.type}</Text>}
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
                style={{paddingBottom:70,marginBottom:20}}
        />
        {errors.desc && touched.desc && <Text style={styles.errorMessage}>{errors.desc}</Text>}
        
        <Button mode='contained' onPress={handleSubmit} disabled={Object.keys(errors).length !== 0}>
            Post
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
    paddingTop:50,
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
    textAlign:'center'
  },

  errorMessage:{
    color:'red',
    paddingBottom:20,
  }
})
export default PostForm;