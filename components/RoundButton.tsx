import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

type RoundButtonProps = {
    text: string,
    icon: typeof Ionicons.defaultProps | typeof FontAwesome.defaultProps,
    onPress: Function,
}

const RoundButton = ({text, icon, onPress}: RoundButtonProps) => {
  return (
    <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
            <FontAwesome name={icon}/>
        </TouchableOpacity>
        <Text style={{ color: 'white'}}>{text}</Text>
    </View>
  )
}



const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.primary_zinc[700],
        padding: 6,
        borderRadius:6,
        width: 78
    },
    button: {
        height: 32,
        width: 32,
        backgroundColor: Colors.primary_zinc[400],
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
     },
     iconText: {
        fontSize: 8,
        color: Colors.primary_zinc[300]
     }
});

export default RoundButton