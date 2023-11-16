import { View, Text } from 'react-native'
import React from 'react';
import { styelCategory } from '../style/them';

const ExpenseCard = ({item}) => {
  return (
    <View style={{backgroundColor:styelCategory[item.category]}}  className="flex flex-row justify-between p-3 px-5 items-center mb-5 bg-red-300 rounded-2xl">
      <View>

        <Text className="text-xl font-bold text-neutral-900">{item.title}</Text>
        <Text className="text-lg text-neutral-900">{item.category}</Text>
      </View>

      <View>
         <Text  className="text-lg text-neutral-900">${item.amount}</Text>
      </View>

    </View>
  )
}

export default ExpenseCard;