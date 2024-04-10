import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page =async () => {

  const [countryCode, setCountryCode] = useState<string>('+254')
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('')
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn()
  const keyBoardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const onSignIn = async (type: SignInType) => {
    if ( type === SignInType.Phone) {
      if ( !isLoaded && !signIn) return null
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`

        const { supportedFirstFactors } = await signIn?.create({
          identifier: fullPhoneNumber
        });
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
          return factor.strategy === 'phone_code'
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn?.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId
        });

        router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber, signin: 'true'}})
      } catch (err) {
        console.error('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if ( err.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', err.errors[0].message)
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1}} behavior='padding' keyboardVerticalOffset={keyBoardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
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
          placeholder="712345678"
          placeholderTextColor={Colors.gray}
          keyboardType='numeric'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity style={[defaultStyles.pillButton, 
          phoneNumber !== '' ? styles.enabled : styles.disabled,
          { marginBottom: 20}]}
          onPress={() => onSignIn(SignInType.Phone)}
          >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16}}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray}}/>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray}}/>
        </View>

        <TouchableOpacity 
        onPress={() => SignInType.Email}
        style={[defaultStyles.pillButton, 
          { 
            flexDirection: 'row',
            gap: 16,
            marginTop: 20,
            backgroundColor: '#fff'
          }
          ]}>
          <Ionicons name='mail' size={24} color={'#000'}/>
          <Text style={[defaultStyles.buttonText, {color: '#000'}]}>Continue with email</Text>
        </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => SignInType.Google}
          style={[defaultStyles.pillButton, 
            { 
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff'
            }
            ]}>
            <Ionicons name='logo-google' size={24} color={'#000'}/>
            <Text style={[defaultStyles.buttonText, {color: '#000'}]}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => SignInType.Apple}
          style={[defaultStyles.pillButton, 
            { 
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff'
            }
            ]}>
            <Ionicons name='logo-apple' size={24} color={'#000'}/>
            <Text style={[defaultStyles.buttonText, {color: '#000'}]}>Continue with Apple</Text>
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
  },
    buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20
  }
});
export default Page