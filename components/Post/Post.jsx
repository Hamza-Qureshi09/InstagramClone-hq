import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import Image1 from '../../assets/images/image1.jpg'

const Post = (props) => {
    const widthOfScreen = Dimensions.get('window').width
    const heightOfScreen = Dimensions.get('window').height
    // console.log(`w-[${widthOfScreen}px]`);
    const [like, setlike] = useState(false)
    return (
        <View className=' mb-1 flex flex-col'>
            {/* top portion */}
            <View className={`flex flex-row justify-between items-center w-[${widthOfScreen}px] h-12 px-2 `}>
                {/* left side */}
                <View className='flex flex-row justify-center items-center'>
                    <View className=' h-10 w-10 bg-gray-600 rounded-full flex flex-col justify-center items-center border-2 border-red-500'>
                        <Image source={Image1} className="h-full w-full rounded-full object-cover " />
                    </View>
                    <Text className='text-white ml-2 text-sm '>Hamza Qureshi</Text>
                </View>
                {/* right side */}
                <Entypo name="dots-three-vertical" size={24} color="white" />
            </View>
            {/* mid protion */}
            <View className={`max-h-[300px] w-[${widthOfScreen}px] flex flex-col justify-center items-center`}>
                <Image source={props.image} className="h-full w-full object-cover " />
            </View>
            {/* bottom portion */}
            <View className=''>
                {/* bottom 1 */}
                <View className={`flex flex-row justify-between items-center w-[${widthOfScreen}px] h-12 bg-black pr-2`}>
                    <View className='flex flex-row space-x-4 pl-4'>
                        {like ? <AntDesign
                            onPress={() => setlike(false)} name="heart" size={24} color="white" /> : <AntDesign onPress={() => setlike(true)} name="hearto" size={24} color="white" />}
                        <Feather name="message-circle" size={24} color="white" />
                        <Ionicons name="paper-plane-outline" size={24} color="white" />
                    </View>
                    <AntDesign name="tagso" size={24} color="white" />
                </View>
                {/* bottom 2 */}

            </View>

        </View>
    )
}

export default Post