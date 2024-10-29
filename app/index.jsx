import { View, Text, ScrollView,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { images } from '../constants';
import { StatusBar } from 'react-native';
import { router } from 'expo-router';

const Index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image source={images.logo}
            className="w-[180px] h-[84px]"
            resizeMode="contain"/>
            <Image source={images.cards}
            className="max-w-[500px] w-full h-[400px]"
            resizeMode="contain"/>
            <View className="relative mt-5">
              <Text className="text-3xl text-black-100 font-bold text-center">
                Discover Endless{"\n"}
                Possibilities with{' '}
                <Text className="text-secondary-200">Fiora</Text>
              </Text>
              

            </View>
            <Text className="text-sm font-pregular text-gray-500 mt-7 text-center ">From passionate collectors to savvy sellers, connect with a community that values quality and convenience.</Text>
            <CustomButton title="Continue to App"
            handlePress={()=>router.push('/home')}
            containerStyles="w-full mt-7"/>       
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"/>
      
      </SafeAreaView>
  )
}

export default Index