import {TouchableOpacity} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';


const BackButton = () => {
  const navigation = useNavigation();
  return ( 
      <TouchableOpacity onPress={()=>navigation.goBack()} className="bg-white rounded-full h-15 w-15 p-1 flex justify-center items-center border-gray-200 border">
        <ChevronLeftIcon size="30" color={"#111"}/>
      </TouchableOpacity>
  )
}

export default BackButton;