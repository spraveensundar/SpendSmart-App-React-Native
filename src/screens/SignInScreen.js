import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import BackButton from '../components/backButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../redux/slice/user';
import Loading from '../components/loading';


const SignInScreen = () => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSubmit = async ()=>{
    if(email && password){
      //navigation.goBack();
      //navigation.navigate("Home"); 
     try{
            dispatch(setUserLoading(true));
            await signInWithEmailAndPassword(auth,email,password);
            dispatch(setUserLoading(false))
     }catch(e){
              dispatch(setUserLoading(false))
              Snackbar.show({
              text: e.message,
               backgroundColor:"red",
              });
     }
    }else{
      Snackbar.show({
        text: 'Email and Password are required',
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
                
                <Text className="text-2xl text-center font-bold text-neutral-950">Sign In</Text>
            </View>



        <View className="flex justify-center items-center">
                  <Image source={require("../../asstes/4.png")} className="w-80 h-80"/>
        </View>
        <View className="space-y-2 mx-4">
             <Text className=" text-2xl text-neutral-900 font-bold mb-2">Email</Text>
             <TextInput value={email}  onChangeText={value => setEmail(value)} className="p-3 bg-white rounded-full mb-4" />
             <Text  className=" text-2xl text-neutral-900 font-bold mb-2">Password</Text>
             <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-3 bg-white rounded-full mb-3" />
             <TouchableOpacity className="flex-row justify-end">
                        <Text className="text-neutral-900 text-lg">Forget Password?</Text>
            </TouchableOpacity>
        </View>


        <View className="relative h-44 w-full">
        <View className="flex justify-center items-center  text-center mx-4 absolute inset-x-0 bottom-0" >
           {
             userLoading? (
              <Loading/>
             ):
             (
              
              <TouchableOpacity onPress={handleSubmit} className="w-full p-4 rounded-full shadow-sm" style={{backgroundColor:"rgb(46, 163, 74)"}}>
                   <Text className="text-center text-xl font-bold text-white">Sign In ?</Text>
              </TouchableOpacity>
           
             )
           }
           </View>
        </View>

      </ScrollView>
    </View>
  


  )
}

export default SignInScreen; 