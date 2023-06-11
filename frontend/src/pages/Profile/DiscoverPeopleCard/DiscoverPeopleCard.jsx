import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Image1 from '../../../../assets/images/image1.jpg'

const DiscoverPeopleCard = () => {
    return (
        <View className='h-40 bg-zinc-800 w-32 rounded-lg flex flex-col justify-center items-center mt-1'>
            <Image source={Image1} resizeMode='cover' className='h-16 w-16 bg-teal-300 rounded-full' />
            <View className='flex flex-col justify-center items-center '>
                <Text className='font-Lato_Bold text-xs mt-1 text-white'>Hamza Qureshi 🍁</Text>
                <Text className='text-[10px] text-white font-Nunito_Regular'>instagram recommended</Text>
            </View>
            <TouchableOpacity className='mt-2 px-8 py-1.5 bg-blue-500 rounded-lg'>
                <Text className='text-white font-Nunito_Regular'>Follow</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DiscoverPeopleCard