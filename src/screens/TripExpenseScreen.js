import React, { useEffect, useState } from 'react';
import {View,Text,StatusBar,TouchableOpacity,Image, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EmptyList from '../components/emptyList';
import {useIsFocused,useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import ExpenseCard from '../components/expenseCard';
import { doc, getDocs, query, where } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';


const items =[
  {
    id:1,
    title:"sandwitch",
    amount: 4,
    category:"food"
  },
  {
    id:2,
    title:"Jacket",
    amount: 4,
    category:"shopping"
  },
  {
    id:3,
    title:"movie",
    amount: 4,
    category:"entertainment",
  },

]

const TripExpensescreen = (props) => {
  const navigation = useNavigation();
  const {id,place,country} = props.route.params;
  const [expence,setExpence]=useState([]);



  const fetchExpence = async ()=>{
    const q = query(expensesRef, where("tripId","==",id));
    const querySnapshot = await getDocs(q);
    let data=[];
      querySnapshot.forEach(doc=>{
          data.push({...doc.data(), id: doc.id})
      })
      setExpence(data);
     }

      useEffect(()=>{
          
            fetchExpence();
      },[])

  return (
    <>
     <View className="flex-1 bg-slate-200">
      <View className="px-4">

      <View className="relative mt-5">
                <View className="absolute top-0 left-0 z-10">
                    <BackButton />
                </View>
                <View>
                   <Text className="text-2xl text-center font-bold text-neutral-950">{country}</Text>
                   <Text className="text-center text-neutral-900">{place}</Text>
                </View>
      </View>

            <View className="flex-row justify-center items-center mt-5 rounded-md">
                 <Image source={require("../../asstes/7.png")} className="w-80 h-80" style={styels.imgbanner}/>
            </View>


       <View className="flex-row justify-between items-center p-4 mb-4">

            <Text className="font-bold text-2xl text-neutral-900" style={{fontFamily:'AmericanTypewriter-Bold'}}>Expense</Text>
            
            <TouchableOpacity onPress={()=>navigation.navigate("AddExpense",{id,place,country})} className="p-2 px-4 bg-white border border-gray-200 rounded-full cursor-pointer">
                 <Text className="text-neutral-900 text-md">Add Expense</Text>
            </TouchableOpacity>
      </View>

        <FlatList
            data={expence}
            ListEmptyComponent={<EmptyList message={"You haven't  recorded any expence yet"}/>}
            showsVerticalScrollIndicator={false}
            keyExtractor={item =>item.id}
            className="mx-2"
            renderItem={({item})=>{
                return(
                  <ExpenseCard item={item}/>
                )
           }}
           
          />

      </View>
     </View>
    </>
  )
}

export default TripExpensescreen;



const styels=StyleSheet.create({
  imgbanner:{
    width:300,
    height:250
  }
})