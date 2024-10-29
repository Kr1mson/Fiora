import React from 'react';
import { View, Text } from 'react-native';

const CountdownTimer = ({ hours,minutes,seconds }) => {
  if (timeLeft <= 0) return null; 
  

  return (
    <View className="flex-row gap-2">
      <View className="w-20 h-20 bg-secondary rounded-xl justify-center items-center">
        <Text className="text-bold text-[25px] text-white">{hours}</Text>
        <Text className="text-pmedium text-gray-500">Hours</Text>
      </View>
      <View className="w-20 h-20 bg-secondary rounded-xl justify-center items-center">
        <Text className="text-bold text-[25px] text-white">{minutes}</Text>
        <Text className="text-pmedium text-gray-500">Minutes</Text>
      </View>
      <View className="w-20 h-20 bg-secondary rounded-xl justify-center items-center">
        <Text className="text-bold text-[25px] text-white">{seconds}</Text>
        <Text className="text-pmedium text-gray-500">Seconds</Text>
      </View>
      
      

    </View>
  );
};

export default CountdownTimer;
