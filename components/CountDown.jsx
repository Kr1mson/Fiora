import React from 'react';
import { View, Text } from 'react-native';
import CountDown from 'react-native-countdown-component';

const CountdownTimer = ({ timeLeft }) => {
  if (timeLeft <= 0) return null; 

  return (
    <View className="flex-row items-center justify-center">
      <Text>Order in </Text>
      <CountDown
        until={timeLeft}
        onFinish={() => alert('Finished!')}
        size={20}
        timeToShow={['H', 'M', 'S']}
      />
      <Text>
        for{' '}
        <Text className="text-green-800">Same Day Delivery</Text>
      </Text>
    </View>
  );
};

export default CountdownTimer;
