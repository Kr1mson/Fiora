import { View, Text, ScrollView,Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import EmptyState from '../components/EmptyState'
import SearchInput from '../components/SearchInput'
import { useDataContext } from '../data/DataContext'
import { icons, images } from '../constants';
import { StatusBar } from 'react-native';
import { router } from 'expo-router';
import ProductCard from '../components/ProductCard'
import { TouchableOpacity } from 'react-native'
const Home = () => {
  const { productData, stockData } = useDataContext();
  
  const getStockAvailability = (product) => {
    const stockItem = stockData.find(item => item[0] === product[0]);
    return stockItem ? stockItem[1] : 0;
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      
      <FlatList
      className="px-4"
        data={productData.slice(1,21)}
        keyExtractor={(item) => item[1]}
        renderItem={({item})=>{
          const stockAvailability = getStockAvailability(item);
          return(
          <View className="w-1/2 p-2">
            <ProductCard 
            id={item[0]}
            title={item[1]} 
            price={item[2]} 
            stock={stockAvailability}
          />
          </View>
          );
        }}
        numColumns={2}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-500">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-black-100">User</Text>
              </View>
              <TouchableOpacity className=" bg-black-200 rounded-full px-1 py-1" activeOpacity={0.7} onPress={()=>router.push('/profile')}>
                <Image
                source={images.profile}
                className="w-[35px] h-[35px] rounded-full" 
                resizeMode='contain'  
                />
              </TouchableOpacity>
            </View>
            <SearchInput/>
            {/* <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                
              </Text>
              
              
            </View> */}
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          title="No Items Found"
          subtitle="Sit tight and wait for products to be restocked!"/>
        )}
      
      />
    </SafeAreaView>
  )
}

export default Home