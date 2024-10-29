import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState,useEffect } from 'react';import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { useLocalSearchParams } from 'expo-router';
import ProductList from '../../components/ProductList';
import { useDataContext } from '../../data/DataContext';
const Search = () => {
  const { query }=useLocalSearchParams();
  const { productData, stockData } = useDataContext();
  const filteredProducts = productData.filter(item => item[0] === query);
  const getStockAvailability = (product) => {
    const stockItem = stockData.find(item => item[0] === product[0]);
    return stockItem ? stockItem[1] : 0;
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredProducts.slice(0,20)}
        keyExtractor={(item)=>item[0]}
        renderItem={({item})=>{
          const stockAvailability = getStockAvailability(item);
          return(
          <ProductList
            id={item[0]}
            title={item[1]}
            price={item[2]}
            stock={stockAvailability}   
          />
          );
        }}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4">
              
            <Text className="font-pmedium text-sm text-gray-500">Search Results</Text>
            <Text className="text-2xl font-psemibold text-black-100">{query}</Text>
              
            <View className="mt-6 mb-8">
              <SearchInput intitialQuery={query}/>
            </View>
            
            
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
          title="No Items Found"
          subtitle="No items found for this search query"/>
        )}
        
      />
    </SafeAreaView>
  )
}

export default Search