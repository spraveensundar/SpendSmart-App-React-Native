import { View, Text, Image,StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

   const navigation = useNavigation();

  return (
   <>
    <StatusBar translucent={false} barStyle={"dark-content"} backgroundColor={"#fff"}/>
    <View className="flex h-full justify-around bg-white">
       <View className="flex-row justify-center items-center mt-10">
        <Image source={require("../../asstes/welcome1.jpg")} className="w-96 h-96"/>
       </View>

       <View className="mx-5 mb-20">
          <Text className="text-neutral-900 text-center text-3xl font-bold mb-10">SPENDSMART</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} className="shadow p-3 rounded-full bg-green-500">
            <Text className="text-center text-white text-xl">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} className="shadow p-3 rounded-full bg-green-500 mt-5">
            <Text className="text-center text-white text-xl">Sign up</Text>
          </TouchableOpacity>

       </View>
    </View>
    </>
  )
}

export default WelcomeScreen;