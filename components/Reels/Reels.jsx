import { View, Text, Image, FlatList } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YourImage from '../../assets/images/image1.png'

const Reels = () => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '2',
            title: 'Third Item',
        },
        {
            id: '3',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Third Item',
        },
    ];
    return (
        <View className="w-full h-28 flex flex-row items-center bg-black border-b border-zinc-900">
            {/* static real circle card */}
            <View className="w-24 h-full flex flex-col justify-center items-center">
                <View className=" h-[70px] w-[70px] rounded-full p-[2px] relative">
                    <Image source={YourImage} className="h-full w-full rounded-full object-cover " />
                    <View className=" absolute bottom-0 right-0 border border-gray-800 rounded-full bg-blue-500">
                        <Entypo name={'plus'} size={20} style={{ color: "white" }} />
                    </View>
                </View>
                <Text className="text-white font-Nunito_Regular text-xs mt-1">Your Story</Text>
            </View>

            {/* flat list reels scrollable */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 10 }}
                data={DATA}
                renderItem={({ item }) => <View className="flex flex-col justify-center items-center px-[6px] h-full ">
                    <LinearGradient
                        colors={['#DD2A7B', '#FFC371']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            height: 60,
                            width: 60,
                            borderWidth: 2,
                            padding: 2,
                            borderRadius: 100,
                        }}
                    >
                        <Image source={YourImage} className="h-full w-full rounded-full object-cover " />
                    </LinearGradient>
                    <Text className="text-white font-thin text-xs">{item.title}</Text>
                </View>}
                keyExtractor={item => item.id}
                className=" h-full px-2 mr-1"
            />
        </View>
    )
}

export default Reels