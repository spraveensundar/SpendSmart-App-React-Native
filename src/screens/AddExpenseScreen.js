import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import BackButton from '../components/backButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../constant';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';

const AddExpenseScreen = (props) => {

  const {id} = props.route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading,setLoading] = useState(false);

  const navigation = useNavigation();

  const handleAddTrip = async ()=>{
    if(title && amount && category){  

      //navigation.navigate("Home")
      setLoading(true);
      let doc =await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId:id
      })
      setLoading(false);
      if(doc && doc.id) navigation.goBack()
    }else{
      Snackbar.show({
        text: 'Please fill all the fields',
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
                
                <Text className="text-2xl text-center font-bold text-neutral-950">Add Expense</Text>
            </View>



        <View className="flex justify-center items-center">
                  <Image source={require("../../asstes/expenseBanner.png")} className="w-80 h-80"/>
        </View>

        <View className="space-y-2 mx-4">
             <Text className=" text-2xl text-neutral-900 font-bold">For What?</Text>
             <TextInput value={title}  onChangeText={value => setTitle(value)} className="p-3 bg-white rounded-full mb-4" />
             <Text  className=" text-2xl text-neutral-900 font-bold">How Much?</Text>
             <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-3 bg-white rounded-full mb-3" />
        </View>

        <View className="mx-4 space-y-2">
          <Text className="text-2xl text-neutral-900 font-bold mb-2">Category</Text>
          <View className="flex-row flex-wrap items-center">
            {
              categories.map((cat)=>{
                let bgColor = "bg-white";
                if(cat.value==category) bgColor = "bg-green-200"
                return(
                 <TouchableOpacity key={cat.value} onPress={()=>setCategory(cat.value)} className={`p-2 px-4 bg-white border border-gray-200 rounded-full mr-1 mb-1 ${bgColor}`}>
                   <Text className="text-neutral-900 text-lg">{cat.title}</Text>
                 </TouchableOpacity>
                )
              })
            }
          </View>
        </View>


        <View className="mt-6">
         <View className="flex justify-center items-center  text-center mx-4" >
           {
              loading ?(
                <Loading/>
              ):(
                <TouchableOpacity onPress={handleAddTrip} className="w-full p-4 rounded-full shadow-sm mb-2" style={{backgroundColor:"rgb(46, 163, 74)"}}>
                    <Text className="text-center text-xl font-bold text-white">Add Expense</Text>
               </TouchableOpacity>
              )
           }
        </View>
        </View>
      </ScrollView>
   </View>
  


  )
}

export default AddExpenseScreen;