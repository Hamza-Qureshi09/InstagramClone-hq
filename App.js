import React, { useEffect, useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home/Home';
import Profile from './src/pages/Profile/Profile'
import Settings from './src/pages/Settings/Settings'
import Search from './src/pages/Search/Search'
import NewPost from './src/pages/NewPost/NewPost'
import CreateNewPost from './src/pages/NewPost/CreateNewPost/CreateNewPost'
import { Ionicons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import Loading from './components/Shared/Loading/Loading';
import store from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { NewPostScreenControl } from './store/appControls';


// tabs navigation
const Tab = createBottomTabNavigator();
// stack navigation
const Stack = createNativeStackNavigator()

const OpenStackNavigator = () => {
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(NewPostScreenControl({ newVal: true }))
  }, [])
  return;
}

function MyTabs() {
  const { NewPostScreen } = useSelector(state => state.appControls);

  if (NewPostScreen) {
    return <Stack.Navigator >
      <Stack.Screen name='NewPost' component={NewPost} options={{ headerShown: false }} />
      <Stack.Screen name='CreateNewPost' component={CreateNewPost} options={{ headerShown: false }} />
    </Stack.Navigator>;
  } else {
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
            } else if (route.name === 'NewPostScreenBefore') {
              if (focused) {
                return <Entypo name="squared-plus" size={24} color="white" className='text-lg text-white' />
              } else {
                return <Entypo name="squared-plus" size={24} color="gray" />
              }
            }
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, title: 'Home' }} />
        <Tab.Screen name="Search" component={Search} options={{ headerShown: false, title: 'Search' }} />
        <Tab.Screen name="NewPostScreenBefore" component={OpenStackNavigator} options={({ route }) => ({
          headerShown: false, title: 'NewPost', tabBarLabel: 'New Post'
        })} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, title: 'Profile' }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, title: 'Settings' }} />
      </Tab.Navigator >
    );
  }

}

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // loading fonts
  const loadFont = async () => {
    await Font.loadAsync({
      'BillaBong': require('./assets/fonts/InstagramLogoFont/BillaBong.ttf'),//new

      'Alaktra-Bold': require('./assets/fonts/Alkatra/static/Alkatra-Bold.ttf'),
      'Alaktra-Regular': require('./assets/fonts/Alkatra/static/Alkatra-Regular.ttf'),

      'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),//new
      'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),//new
      'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),//new
      'Lato-Thin': require('./assets/fonts/Lato/Lato-Thin.ttf'),//new

      'Nunito-ExtraBold': require('./assets/fonts/Nunito/static/Nunito-ExtraBold.ttf'),//new
      'Nunito-Bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf'),
      'Nunito-SemiBold': require('./assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
      'Nunito-Regular': require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
      'Nunito-Medium': require('./assets/fonts/Nunito/static/Nunito-Medium.ttf'),
      'Nunito-Light': require('./assets/fonts/Nunito/static/Nunito-Light.ttf')
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFont();
  }, []);

  if (!fontsLoaded) {
    return <SafeAreaView className='flex-1 justify-center items-center bg-gray-100'>
      <Loading />
    </SafeAreaView>;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView className='bg-white flex-1 '>
          <MyTabs />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;