import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home/Home';
import Profile from './src/pages/Profile/Profile'
import Settings from './src/pages/Settings/Settings'
import Search from './src/pages/Search/Search'
import NewPost from './src/pages/NewPost/NewPost'
import { Ionicons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';


const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black', borderTopColor: '#303030', paddingVertical: 2 },
        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === 'Home') {
            if (focused) {
              return <Ionicons name={'home'} size={24} style={{ color: "white" }} />
            } else {
              return <Ionicons name={'home-outline'} size={24} style={{ color: "gray" }} />
            }
          } else if (route.name === 'Settings') {
            if (focused) {
              return <Ionicons name={'settings'} size={24} style={{ color: "white" }} />
            } else {
              return <Ionicons name={'settings-outline'} size={24} style={{ color: "gray" }} />
            }
          } else if (route.name === 'Profile') {
            if (focused) {
              return <FontAwesome name="user-circle" size={24} color="white" />
            } else {
              return <FontAwesome name="user-circle-o" size={24} color="gray" />
            }
          } else if (route.name === 'Search') {
            if (focused) {
              return <AntDesign name="search1" size={24} color="white" />
            } else {
              return <AntDesign name="search1" size={24} color="gray" />
            }
          } else if (route.name === 'NewPost') {
            if (focused) {
              return <Entypo name="squared-plus" size={24} color="white" className='text-lg text-white' />
              // <View className=" h-[70px] w-[70px] mb-4 rounded-tl-full rounded-tr-full flex flex-col justify-center items-center border border-black" style={{backgroundColor:'#050505'}}></View>
            } else {
              return <Entypo name="squared-plus" size={24} color="gray" />
              // <View className=" h-[70px] w-[70px] mb-4 rounded-full flex flex-col justify-center items-center" style={{backgroundColor:'#050505',borderTopWidth:1, borderLeftWidth:1,borderRightWidth:1, borderColor:'#101010'}}></View>
            }
          }
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name="Search" component={Search} options={{ headerShown: false, title: 'Search' }} />
      <Tab.Screen name="NewPost" component={NewPost} options={{ headerShown: false, title: 'NewPost' ,tabBarLabel:"New Post"}} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, title: 'Profile' }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, title: 'Settings' }} />
    </Tab.Navigator >
  );
}

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className='bg-white flex-1 '>
        <MyTabs />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;