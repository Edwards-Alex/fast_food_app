import React, { useState } from "react";
import { View, Text, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { createUser } from "@/lib/appwrite";

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name:'',email:'',password:''});

  const submit = async() => {
    const {name, email, password} = form;


    if(!name || !email || !password) return Alert.alert('Error','Please enter valid name & email address & password.')

    setIsSubmitting(true)
    
    try {
      await createUser({
        email,
        password,
        name
      })

      // Alrert.alert("success","User signed up successfully.");
      //when login in route home page
      router.replace('/');
    } catch (error:any) {
      Alert.alert('Error',error.message);
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
       <CustomInput 
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text)=>{setForm((prev)=>({...prev, name: text}))}}
        secureTextEntery = {false}
        label="Full name"
        keyboardType='default'
      />
      <CustomInput 
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text)=>{setForm((prev)=>({...prev, email: text}))}}
        secureTextEntery = {false}
        label="Email"
        keyboardType='email-address'
      />
      <CustomInput 
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text)=>{setForm((prev)=>({...prev, password: text}))}}
        secureTextEntery = {true}
        label="Password"
        keyboardType='default'
      />

      <CustomButton
        title="Sign Up"
        isLoading={ isSubmitting }
        onPress={ submit }
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='text-gray-100 base-regular'>
          Already have an account?
        </Text>
        <Link href='/SignIn' className='base-bold text-primary'>
          Sign In
        </Link>
      </View>
    </View>
    
  )
}

export default SignUp; 

