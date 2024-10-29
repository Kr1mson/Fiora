import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const ProductCard = ({id,title,price,stock}) => {
  const mrp = parseFloat(price) + 50; 
  const discountPercentage = ((mrp - parseFloat(price)) / mrp * 100).toFixed(0);
  const isInStock = stock === 'True';
  return (
      <TouchableOpacity className="flex-1 h-80 justify-center items-center bg-white rounded-lg shadow-md"
        activeOpacity={isInStock ? 0.7 : 1}
        onPress={isInStock?() => router.push(`product/${id}`):null}
      >
        <Image 
        source={images.stock}
        className="h-[120px] w-full"
        resizeMode='contain'/>
        <Text className="text-lg font-pbold text-gray-800">{title}</Text>
        <View className="flex-row justify-between w-full">
          <View className="flex-col px-4 items-center">
            <Text className="text-lg font-psemibold text-gray-800">Sale</Text>
            <Text className="bg-red-800 px-[5px] py-[4px] text-white">{discountPercentage}%</Text>
          </View>
            
          <View className="flex-col px-4 items-end ">
            <Text className="text-lg font-psemibold text-green-800 mb-0">${price}</Text>
            <Text className="text-sm text-gray-600 font-pregular line-through mt-0">
              MRP: <Text className="font-psemibold text-red-800">${(mrp).toFixed(2)}</Text>
            </Text>
            
            
          </View>
        </View>
        <View>
          
        </View>
        {!isInStock && (
          <Text className="text-red-500 font-bold absolute bottom-2">Out of Stock</Text>
        )}
        
      </TouchableOpacity>
    


    
  )
}

export default ProductCard