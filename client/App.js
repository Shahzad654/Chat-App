import React, {useState, useEffect} from 'react'
import {View, ActivityIndicator} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from './Firebase/index'
import Home from './screens/Home';
import Chat from './screens/Chat';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState('')
  const [user, setUser] = useState('')

  useEffect(()=>{
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>unsubscribe
  }, [])

  if(loading){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF7841" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
      {/* <Stack.Navigator initialRouteName="Home"> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

