import { View, ScrollView, TextInput, Image, TouchableOpacity, RefreshControl, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import Image1 from '../../../assets/images/image1.jpg'
import DiscoverPeopleCard from './DiscoverPeopleCard/DiscoverPeopleCard';
import { useDispatch } from 'react-redux';
// import { NewPostScreenControl } from '../../../store/appControls';
import EditUserProfile from './EditUserProfile/EditUserProfile';


const Profile = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [ProfileEditModalShow, setProfileEditModalShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // on refresh fetch data
  const onRefresh = () => {
    setRefreshing(true);
    // FetchAllCowsFunc() ✅
    setTimeout(() => {
      setRefreshing(false)
    }, 3000);
  };

  const EditProfileScreen = () => {
    setProfileEditModalShow(true)
    // console.log('comming');
    // dispatch(NewPostScreenControl({ newVal: true }))
    // return navigation.navigate('EditUserProfile');
  }

  const data = [
    { id: '1', name: 'Hamza Qureshi 🍁', description: 'instagram recommended' },
    { id: '2', name: 'John Doe', description: 'Lorem ipsum dolor sit amet' },
    { id: '3', name: 'John Doe', description: 'Lorem ipsum dolor sit amet' },
    { id: '4', name: 'John Doe', description: 'Lorem ipsum dolor sit amet' },
    { id: '5', name: 'John Doe', description: 'Lorem ipsum dolor sit amet' },
    // Add more data objects here
  ];
  return (
    <View className=" flex-1">
      <StatusBar style='light' animated={true}
        hidden={false} networkActivityIndicatorVisible={true} backgroundColor='black' hideTransitionAnimation='slide' />

      {/* screen design */}
      <View className={'flex flex-col justify-start items-center flex-1 bg-black'}>
        {/* profile navbar */}
        <View className='w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900'>
          <TouchableOpacity className='ml-6 flex flex-row justify-center items-center lowercase space-x-0'>
            <Text className='font-semibold font-Nunito_SemiBold text-white text-sm'>Hamza_qureshi09</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </TouchableOpacity>
          <View className=" flex flex-row justify-center items-center mr-6  space-x-3.5">
            <TouchableOpacity className=''>
              <Entypo name="squared-plus" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className=''>
              <Feather name="menu" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* profile */}
        <ScrollView
          className={'flex-1 w-full px-4'}
          contentContainerclassName={'flex items-center'}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >

          {/* top portion */}
          <View className='w-full flex flex-col mt-1'>
            {/* part1 */}
            <View className='flex flex-row justify-between items-center'>
              {/* left side */}
              <View className='h-20 w-20 rounded-full'>
                <Image source={Image1} resizeMode='cover' className='h-full w-full rounded-full' />
              </View>
              {/* right side */}
              <View className='flex-1 flex flex-row justify-evenly items-center ml-2 space-x-1'>
                <View className='flex flex-col justify-center items-center flex-1'>
                  <Text className='font-Alaktra_Bold text-xs text-white'>12</Text>
                  <Text className='font-Lato_Regular text-xs text-white'>Posts</Text>
                </View>
                <View className='flex flex-col justify-center items-center flex-1'>
                  <Text className='font-Alaktra_Bold text-xs text-white'>64</Text>
                  <Text className='font-Lato_Regular text-xs text-white'>Followers</Text>
                </View>
                <View className='flex flex-col justify-center items-center flex-1'>
                  <Text className='font-Alaktra_Bold text-xs text-white'>81</Text>
                  <Text className='font-Lato_Regular text-xs text-white'>Following</Text>
                </View>
              </View>
            </View>
            {/* part2 */}
            <View className='flex flex-col'>
              <Text className='text-white font-Alaktra_Bold pt-1 text-xs tracking-wide'>Hamza Qureshi09</Text>
              <Text className='text-white font-Lato_Regular pt-1 text-xs tracking-wide'>Mern Stack || Backend Developer || React Native Developer</Text>
              <Text className='text-white font-Lato_Regular pt-1 text-xs tracking-wide'>Feel the fear, and do it anyway 🍁</Text>
              <View className=' flex flex-row justify-start items-center w-max space-x-2 pt-1'>
                <AntDesign name="link" size={16} color="white" className='mr-1' />
                <Text className='text-blue-500 font-Lato_Regular text-xs tracking-wide'>https://hamzaqureshi09.com</Text>
              </View>
            </View>
            {/* part3 */}
            <View className='flex flex-col'>
              {/* part3.1 */}
              <View className='flex flex-row space-x-2 justify-evenly items-center py-2'>
                <TouchableOpacity onPress={EditProfileScreen} className='flex-1 bg-zinc-800 h-8 flex flex-col justify-center items-center rounded-lg'>
                  <Text className='text-white'>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-1 bg-zinc-800 h-8 flex flex-col justify-center items-center rounded-lg'>
                  <Text className='text-white'>Share Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-1 max-w-[40px] bg-zinc-800 h-8 flex flex-col justify-center items-center rounded-lg'>
                  <AntDesign name="adduser" size={24} color="white" />
                </TouchableOpacity>
              </View>
              {/* part3.2 */}
              <View className=''>
                <View className='py-1 flex flex-row justify-between items-center'>
                  <Text className='text-white'>Discover People</Text>
                </View>
                {/* discover people card */}
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className=''
                  ItemSeparatorComponent={<View className='w-4'></View>}
                  renderItem={({ item }) => (
                    <DiscoverPeopleCard />
                  )}
                />

              </View>
            </View>
          </View>


        </ScrollView>
        {refreshing &&
          <View className='absolute bottom-10 px-6 py-4 rounded-xl bg-zinc-900'>
            <Text className='text-white capitalize tracking-wide font-Nunito_Medium'>refreshing ...</Text>
          </View>
        }

        {/* modals */}
        {ProfileEditModalShow && <EditUserProfile onHide={() => setProfileEditModalShow(false)} />}
      </View>
    </View>
  )
}

export default Profile