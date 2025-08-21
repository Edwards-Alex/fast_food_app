import React, { useState } from "react";
import { View, Text, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native"
import useAuthStore from "@/store/auth.store";

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email:'',password:''});
  const {email, password} = form;
  const { fetchAuthenticaredUser } = useAuthStore();

  const submit = async() => {
    if(!email || !password) return Alert.alert('Error','Please enter valid email address & password.')

    setIsSubmitting(true)
    
    try {
      //Call Appwrite Sign In function
      await signIn({email, password});
      // change  isAuthenticated 
      await fetchAuthenticaredUser();
      
      router.replace('/');
    } catch (error:any) {
      Alert.alert('Error',error.message);
      Sentry.captureEvent(error)
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
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
        title="Sign In"
        isLoading={ isSubmitting }
        onPress={ submit }
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='text-gray-100 base-regular'>
          Don`&apos;`t have an account?
        </Text>
        <Link href='/signUp' className='base-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
    
  )
}

export default SignIn; 

