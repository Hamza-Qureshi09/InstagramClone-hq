import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import Image1 from '../../assets/images/image1.jpg'
import { LinearGradient } from 'expo-linear-gradient';

const Post = (props) => {
    const widthOfScreen = Dimensions.get('window').width
    const heightOfScreen = Dimensions.get('window').height
    // console.log(`w-[${widthOfScreen}px]`);
    const [like, setlike] = useState(false)
    return (
        <View className=' mb-1 flex flex-col'>
            {/* top portion */}
            <View className={`flex flex-row justify-between items-center w-[${widthOfScreen}px] h-14 px-2 `}>
                {/* left side */}
                <View className='flex flex-row justify-center items-center'>
                    <LinearGradient
                        colors={['#DD2A7B', '#FFC371']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            height: 40,
                            width: 40,
                            borderWidth: 2,
                            padding: 2,
                            borderRadius: 100,
                        }}
                    >
                        <Image source={Image1} className="h-full w-full rounded-full object-cover " />
                    </LinearGradient>
                    <View className='ml-1 flex flex-col justify-start items-start'>
                        <Text className='text-white  text-sm font-Nunito_Medium tracking-tight lowercase'>Hamza_Qureshi</Text>
                        <Text className='text-white  text-[10px] font-Nunito_Regular tracking-tight capitalize'>sponsored</Text>
                    </View>
                </View>
                {/* right side */}
                <Entypo name="dots-three-vertical" size={20} color="white" />
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