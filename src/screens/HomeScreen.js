import React, { useEffect, useState } from 'react';
import {View,Text,StatusBar,TouchableOpacity,Image, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import randromimages from '../../asstes/randromimages';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut} from 'firebase/auth'
import { useSelector } from 'react-redux';
import { tripsRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';

const item =[
  {
    id:1,
    place:"Tenkasi",
    country:"India"
  },
  {
    id:2,
    place:"New York",
    country:"America",
  },
  {
    id:3,
    place:"Lodon",
    country:"England"
  },
  {
    id:4,
    place:"Washington dc",
    country:"America"
  }

]

const HomeScreen = () => {

  const navigation = useNavigation();
  const {user} = useSelector(state=> state.user);
  const [trips,setTripts]=useState(item);

  const isFocused = useIsFocused();

  const fetchTrips = async ()=>{
    const q = query(tripsRef, where("userId","==",user.uid));
    const querySnapshot = await getDocs(q);
    let data=[];
      querySnapshot.forEach(doc=>{
          data.push({...doc.data(), id: doc.id})
      })
      setTripts(data);
     }

      useEffect(()=>{
          if(isFocused)
            fetchTrips();
      },[isFocused])

   const handleLogout = async()=>{
       await signOut(auth)
       
   }


  return (
    <>
    <StatusBar translucent={false} barStyle="dark-content" backgroundColor={"rgb(226 232 240)"}/>
     <View className="flex-1 bg-slate-200">

        <View className="flex-row justify-between items-center p-4">

            <Text className="font-bold text-3xl text-neutral-900" style={{fontFamily:'AmericanTypewriter-Bold'}}>Spendsmart</Text>
            
            <TouchableOpacity onPress={handleLogout} className="p-2 px-4 bg-white border border-gray-200 rounded-full">
                 <Text className="text-neutral-900 text-lg">Logout</Text>
            </TouchableOpacity>
        </View>

       <View className="flex-row justify-center items-center bg-blue-200  mx-4 rounded-md">
          <Image source={require("../../asstes/banner.png")} className="w-60 h-60" style={styels.imgbanner}/>
       </View>


       <View className="flex-row justify-between items-center p-4">

            <Text className="font-bold text-2xl text-neutral-900" style={{fontFamily:'AmericanTypewriter-Bold'}}>Recent Trips</Text>
            
            <TouchableOpacity onPress={()=>navigation.navigate("AddTrip")} className="p-2 px-4 bg-white border border-gray-200 rounded-full cursor-pointer">
                 <Text className="text-neutral-900 text-md">Add Trip</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't  recorded any trips yet"}/>}
            showsVerticalScrollIndicator={false}
            keyExtractor={item =>item.id}
            columnWrapperStyle={{
              justifyContent:"space-between"
            }}
            className="mx-4"
            renderItem={({item})=>{
                return(
                  <TouchableOpacity onPress={()=>navigation.navigate("TripExpense",{...item})} className="bg-white mb-4 p-5 rounded-xl shadow-sm">
                      <View>
                        <Image source={randromimages()} className="w-36 h-36"/>
                            <Text className="font-bold text-zinc-900 text-xl">{item.country}</Text>
                            <Text className="text-neutral-900">{item.place}</Text>
                      </View>
                  </TouchableOpacity>
                )
           }}
           
          />


     </View>
    </>
  )
}

export default HomeScreen;



const styels=StyleSheet.create({
  imgbanner:{
    width:300,
    height:250
  }
})