import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import BackButton from '../components/backButton';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';


const AddTripScreen = () => {

  const[place, setPlace] = useState("");
  const[country, setCountry] = useState("");
  const[userloading,setLoading]=useState(false);
  const {user} = useSelector(state=> state.user);

  const navigation = useNavigation();

  const handleAddTrip = async ()=>{
    if(place && country){
      //navigation.navigate("Home")
      setLoading(true);
      let doc = await addDoc(tripsRef,{
        place,
        country,
        userId:user.uid
      })
      if(doc && doc.id){
        navigation.goBack();
      }
    }else{
      Snackbar.show({
        text: 'Place and Country are required',
        backgroundColor:"red",
      });
    }
  }

  return (
    <View className="flex-1 bg-slate-200">

         <ScrollView>
         <View className="relative mt-5 mx-4">
                <View className="absolute top-0 left-0 z-10">
                    <BackButton />
                </View>
                
                <Text className="text-2xl text-center font-bold text-neutral-950">Add Trip</Text>
            </View>



        <View className="flex justify-center items-center">
                  <Image source={require("../../asstes/4.png")} className="w-80 h-80"/>
        </View>
        <View className="space-y-2 mx-4">
             <Text className=" text-2xl text-neutral-900 font-bold mb-2">Where On Earth?</Text>
             <TextInput value={place}  onChangeText={value => setPlace(value)} className="p-3 bg-white rounded-full mb-4" />
             <Text  className=" text-2xl text-neutral-900 font-bold mb-2">Which country</Text>
             <TextInput value={country} onChangeText={value => setCountry(value)} className="p-3 bg-white rounded-full mb-3" />

        </View>


        <View className="relative h-52 w-full">
        <View className="flex justify-center items-center  text-center mx-4 absolute inset-x-0 bottom-0" >
       {
          userloading? (
            <Loading/>
          ):(
          
            <TouchableOpacity onPress={handleAddTrip} className="w-full p-4 rounded-full shadow-sm" style={{backgroundColor:"rgb(46, 163, 74)"}}>
                 <Text className="text-center text-xl font-bold text-white">Add Trip</Text>
            </TouchableOpacity>
        
          )
       }
        </View>
        </View>
         </ScrollView>

</View>
  


  )
}

export default AddTripScreen;