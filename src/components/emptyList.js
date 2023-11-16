import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyList = ({message}) => {
  return (
    <View className="flex justify-center items-center my-5">
         <Image  className="w-36 h-36" source={require("../../asstes/empty.png")}/>
         <Text className="font-bold text-gray-400">{message|| "data not found"}</Text> 
    </View>
  )
}

export default EmptyList;

