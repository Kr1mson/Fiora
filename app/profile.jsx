import { View, Text, FlatList, Image, } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import {icons, images} from "../constants"
import EmptyState from '../components/EmptyState'
import { TouchableOpacity } from 'react-native';
import InfoBox from '../components/InfoBox';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
const Profile = () => {
  const back=()=>{
    router.back()
  }
  
  return (
    <SafeAreaView className="bg-primary h-full px-2">
      <FlatList
        data={[]}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <Text>{item}</Text>
        )}
        ListHeaderComponent={()=>(
          <View className="w-full justify-center 
          items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-20 h-20 border
            border-secondary rounded-lg justify-center
            items-center">
              <Image
              source={images.profile}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode='cover'
              />
            </View>
            <InfoBox
              title="User"
              containerStyles='mt-5'
              titleStyles="text-lg "
            />
            <View className="mt-5 flex-row">
            <InfoBox 
              title="0"
              subtitle="Orders"
              containerStyles='mr-10'
              titleStyles="text-xl "
            />
            <InfoBox 
              title="$1.2k"
              subtitle="Credits"
              titleStyles="text-xl "
            />
            </View>

          </View>
        )}
        ListEmptyComponent={()=>(
          <View>
            <EmptyState
            title="No Orders Found"
            subtitle="No items booked yet"/>
            <CustomButton
              title="Back to Home"
              handlePress={back}
              containerStyles="mt-7"
            />
          </View>
        )}
        
      />
    </SafeAreaView>
  )
}

export default Profile