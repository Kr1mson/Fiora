import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import {router} from "expo-router"
import CustomButton from '../components/CustomButton'
const EmptyState = ({title,subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
      source={images.empty} className="w-[270px]
      h-[215px]" resizeMode='contain'/>
      <Text className="text-2xl text-center font-psemibold text-black-100 mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-500">{subtitle}</Text>
      {/* <CustomButton
      title="Create video"
      handlePress={()=>router.push('/create')}
      containerStyles="w-full my-5"
      /> */}
    </View>
  )
}

export default EmptyState