import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const Page = () => {

  const [countryCode, setCountryCode] = useState<string>('+254')
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('')

  const keyBoardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const onSignUp = async () => {}
  return (
    <KeyboardAvoidingView style={{ flex: 1}} behavior='padding' keyboardVerticalOffset={keyBoardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={styles.input}
          placeholder='Country Code'
          placeholderTextColor={Colors.gray}
          value={countryCode}
          />
          <TextInput 
          style={[styles.input,
          
          {flex: 1}]}
          placeholder="0712345678"
          placeholderTextColor={Colors.gray}
          keyboardType='numeric'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          />
        </View>

        <Link asChild replace href={'/login'}>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>

        <View  style={{flex: 1}}/>

        <TouchableOpacity style={[defaultStyles.pillButton, 
          phoneNumber !== '' ? styles.enabled : styles.disabled,
          { marginBottom: 20}]}
          onPress={onSignUp}
          >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary
  },
  disabled: {
    backgroundColor: Colors.primaryMuted
  }
});
export default Page