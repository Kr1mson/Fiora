import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { useDataContext } from '../../data/DataContext';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import CountDown from 'react-native-countdown-component';

const Product = () => {
  const [pin, setPin] = useState('');
  const [counterReq, setCounterReq] = useState(false)
  const [pinMatch, setPinMatch] = useState(false);
  const [pinDetails, setPinDetails] = useState({ provider: '', tat: '' });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const { query } = useLocalSearchParams();
  const { pinData, productData, stockData } = useDataContext();

  const getData = (id) => {
    const product = productData.find(item => item[0] === id);
    const stockItem = stockData.find(item => item[0] === id);
    return {
      productName: product ? product[1] : 'Not available',
      price: product ? product[2] : 'N/A',
      stock: stockItem ? stockItem[1] : 'Out of Stock',
    };
  };

  useEffect(() => {
    const match = pinData.find(item => item[0] === pin);
    if (match) {
      setPinMatch(true);
      setPinDetails({ provider: match[1], tat: match[2] });
    } else {
      setPinMatch(false);
      setPinDetails({ provider: '', tat: '' });
    }
  }, [pin, pinData]);

  const itemData = getData(query);
  const mrp = parseFloat(itemData.price) + 50;
  const discountPercentage = ((mrp - parseFloat(itemData.price)) / mrp * 100).toFixed(0);

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const now = new Date();
      let estimatedDate = '';

      if (pinDetails.provider && itemData.stock) {
        if (pinDetails.provider === "Provider A") {
          setCounterReq(true);
          estimatedDate = new Date(now);
          if (now.getHours() >= 17) {
            estimatedDate.setDate(now.getDate() + 1); // Next day
          }
        } else if (pinDetails.provider === "Provider B") {
          estimatedDate = new Date(now);
          setCounterReq(true);
          if (now.getHours() >= 9) {
            estimatedDate.setDate(now.getDate() + 1); // Next day
          }
        } else {
          // General Partners - use TAT
          setCounterReq(false);
          estimatedDate = new Date(now);
          const tatDays = parseInt(pinDetails.tat, 10);
          estimatedDate.setDate(now.getDate() + tatDays); // Add TAT days
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setDeliveryDate(estimatedDate.toLocaleDateString(undefined, options));
      }
    };

    calculateDeliveryDate();
  }, [pinDetails, itemData]);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetHour = pinDetails.provider === "Provider B" ? 9 : 17; // 9 AM for Provider B, 5 PM for Provider A
    const targetDate = new Date(now);
    targetDate.setHours(targetHour, 0, 0, 0); // Set to 9 AM or 5 PM today

    if (now.getHours() >= targetHour) {
      targetDate.setDate(now.getDate() + 1); // Set to next day if the time has already passed
    }

    const difference = targetDate - now;

    if (difference > 0) {
      return Math.floor(difference / 1000); // Return total seconds
    } else {
      return 0; // If time has already passed, return 0
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [pinDetails.provider]);

  return (
    <SafeAreaView className="px-7 py-5 bg-primary h-full items-center">
      <ScrollView className="h-full w-full">
        <View className="w-full h-[300px] bg-white rounded-xl">
          <Image
            source={images.stock}
            resizeMode='contain'
            className="w-full h-full"
          />
        </View>
        <Text className="font-psemibold text-[50px]">{itemData.productName}</Text>
        <View className="flex-row justify-between">
          {itemData.stock ? (
            <Text className="text-green-800 font-pmedium text-[25px]">In Stock</Text>
          ) : (
            <Text className="text-red-800 font-pmedium text-[25px]">Out of Stock</Text>
          )}
          <View className="flex-col items-end">
            <Text className="text-red-800 text-[30px] font-pmedium">
              -{discountPercentage}%{' '}
              <Text className="text-green-800">${itemData.price}</Text>
            </Text>
            <Text className="line-through text-black-100 font-pmedium text-[20px] mt-0">MRP: ${mrp.toFixed(2)}</Text>
            <Text className="text-gray-500 font-pregular text-[15px]">No Cost EMI</Text>
            <Text className="text-gray-500 font-pregular text-[15px]">Inclusive of all Taxes</Text>
          </View>
        </View>
        <View className="w-full h-[1px] bg-gray-500"></View>
        <Text className="text-gray-500 mt-5">Ships from</Text>
        <Text className="text-black-100 text-semibold text-[25px]">
          {pinDetails.provider ? pinDetails.provider : 'Enter a Pincode\nto see Sellers'}
        </Text>
        <Text className="font-pmedium text-[20px] mt-10 text-blue">
          Delivery By{' '}
          <Text className="text-green-800">{deliveryDate || 'Calculating...'}</Text>
        </Text>
        {counterReq &&(
          <View className="flex-row items-center justify-center">
          <Text>Order in </Text>
          <CountDown
            until={timeLeft} 
            onFinish={() => alert('finished')}
            size={20}
            timeToShow={['H', 'M', 'S']}
          />
          <Text>
             for{' '} 
             <Text className="text-green-800">Same Day Delivery</Text>
              </Text>

        </View>
        )}
        
        
        <FormField 
          title="Pincode"
          placeholder="Enter a valid Pincode"
          otherStyles="mt-7"
          value={pin}
          handleChangeText={setPin}
          valid={pinMatch}
        />
        <CustomButton
          title="Buy Now"
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;