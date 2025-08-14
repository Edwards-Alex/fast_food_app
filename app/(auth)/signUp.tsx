import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function signUp() {
  return (
    <View>
      <Text>signUp</Text>
      <Button title="sign In" onPress={()=>router.push("/signIn")}></Button>
    </View>
  )
}