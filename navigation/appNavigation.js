import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/HomeScreen";
import LoginScreen from "../src/screens/LoginScreen";
import AddTripScreen from "../src/screens/AddTripScreen";
import TripExpensescreen from "../src/screens/TripExpenseScreen";
import AddExpenseScreen from "../src/screens/AddExpenseScreen";
import WelcomeScreen from "../src/screens/WelcomeScreen";
import SignInScreen from "../src/screens/SignInScreen";
import SignUpScreen from "../src/screens/SignUpScreen";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/config/firebase";
import { setUser } from "../src/redux/slice/user";



const Stack = createStackNavigator();

export default function AppNavigation(){

    const {user} = useSelector(state=> state.user);

    const dispatch = useDispatch();

    onAuthStateChanged(auth, u=>{   
        dispatch(setUser(u))
    })
  
    if(user){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
                    <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen}/>
                    <Stack.Screen options={{headerShown:false}}  name="AddTrip" component={AddTripScreen}/>
                    <Stack.Screen options={{headerShown:false}}  name="TripExpense" component={TripExpensescreen}/>
                    <Stack.Screen options={{headerShown:false}} name="AddExpense" component={AddExpenseScreen}/>
    
                </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen options={{headerShown:false,presentation:"modal"}} name="SignIn" component={SignInScreen}/>
                    <Stack.Screen options={{headerShown:false,presentation:"modal"}} name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}