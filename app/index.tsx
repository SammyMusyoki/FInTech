import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
// import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const VideoAsset = require('@/assets/images/introImage.jpg');

const Page = () => {
  const [assets] = useAssets(VideoAsset)
  return (
    <View style={styles.container}>
      {/* {
        assets && (
          <Video
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted
          shouldPlay
          source={{ uri: assets[0].uri }} style={styles.video}/>
        )
      } */}
      <Image
      source={VideoAsset} style={styles.image} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ready to change the way you make money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link asChild href={'/login'} style={[defaultStyles.pillButton, {flex: 1, backgroundColor: Colors.dark}]}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500'}}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link asChild href={'/signup'} style={[defaultStyles.pillButton, {flex: 1, backgroundColor: '#fff'}]}>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: '500'}}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  image: {
    flex: 1,
    width: '100%',
    height: "100%",
    position: 'absolute'
  },
  headerContainer: {
    marginTop: 80,
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white'
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