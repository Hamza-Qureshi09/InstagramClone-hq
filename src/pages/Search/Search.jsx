import { View, ScrollView, TextInput, Image, Dimensions, RefreshControl, Text } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons';

// dummy images
import Simage1 from '../../../assets/images/simage1.jpg'
import Simage2 from '../../../assets/images/simage2.jpg'
import Simage3 from '../../../assets/images/simage3.jpg'
import Simage4 from '../../../assets/images/simage4.jpg'
import Simage5 from '../../../assets/images/simage5.jpg'

const Search = () => {
  const widthOfScreen = Dimensions.get('window').width
  const [refreshing, setRefreshing] = useState(false);
  // on refresh fetch data
  const onRefresh = () => {
    setRefreshing(true);
    // FetchAllCowsFunc() ✅
    setTimeout(() => {
      setRefreshing(false)
    }, 3000);
  };
  return (
    <View className=" flex-1">
      <StatusBar style='light' animated={true}
        hidden={false} networkActivityIndicatorVisible={true} backgroundColor='black' hideTransitionAnimation='slide' />

      {/* screen design */}
      <View className={'flex flex-col justify-start items-center flex-1 bg-black'}>
        <View className={'w-full p-3 px-3'}>
          <View className={'flex flex-row items-center bg-zinc-800 rounded-lg px-2 py-2'}>
            <Feather name="search" size={24} color="white" className={'mx-2'} />
            <TextInput
              className={'flex-1 text-white pl-1.5 pr-2 font-Lato_Regular'}
              placeholder="Search"
              placeholderTextColor="gray"
            />
            {/* <Feather name="x" size={24} color="white" className={'mx-2'} /> */}
          </View>
        </View>
        <ScrollView
          className={'flex-1 w-full'}
          contentContainerclassName={'flex items-center'}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Display pictures here */}
          <View className='flex flex-row justify-evenly items-start flex-wrap gap-[2px] flex-1'>
            {/* 1st portion */}
            <View className='flex flex-row justify-evenly items-start flex-wrap gap-[2px]'>
              {/* 1st image */}
              <View className={`h-[110px] flex-1 min-w-[112px]`}>
                <Image source={Simage1}
                  resizeMode='stretch'
                  resizeMethod='auto'
                  className='h-full w-full object-cover' />
              </View>
              {/* 2nd image */}
              <View className={`h-[110px] flex-1 min-w-[112px]`}>
                <Image source={Simage2}
                  resizeMode='stretch'
                  resizeMethod='auto'
                  className='h-full w-full object-cover' />
              </View>
              {/* 3rd image */}
              <View className={`h-[110px] flex-1 min-w-[112px]`}>
                <Image source={Simage3}
                  resizeMode='stretch'
                  resizeMethod='auto'
                  className='h-full w-full object-cover' />
              </View>
            </View>
            {/* 2nd portion */}
            <View className='flex flex-row justify-evenly items-start flex-wrap gap-[2px]'>
              {/* 4th image */}
              <View className={`h-[110px] flex-1 min-w-[112px]`}>
                <Image source={Simage4}
                  resizeMode='stretch'
                  resizeMethod='auto'
                  className='h-full w-full object-cover' />
              </View>
              {/* 5th image */}
              <View className={`h-[110px] flex-1 min-w-[112px]`}>
                <Image source={Simage5}
                  resizeMode='stretch'
                  resizeMethod='auto'
                  className='h-full w-full object-cover' />
              </View>
            </View>

          </View>
        </ScrollView>
        {refreshing &&
          <View className='absolute bottom-10 px-6 py-4 rounded-xl bg-zinc-900'>
            <Text className='text-white capitalize tracking-wide font-Nunito_Medium'>refreshing ...</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default Search