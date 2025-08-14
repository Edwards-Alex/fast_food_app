import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function signIn() {
  return (
    <View>
      <Text>signIn</Text>
      <Button title="sign Up" onPress={()=>router.push("/signUp")}></Button>
    </View>
  )
}