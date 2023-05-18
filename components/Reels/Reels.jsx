import { View, Text, Image, FlatList } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';
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
        <View className="w-full h-28 flex flex-row items-center bg-black" style={{borderBottomColor:'#303030', borderBottomWidth:1}}>
            {/* static real circle card */}
            <View className="w-24 h-full flex flex-col justify-center items-center">
                <View className=" h-20 w-20 rounded-full p-[2px] relative">
                    <Image source={YourImage} className="h-full w-full rounded-full object-cover " />
                    <View className=" absolute bottom-0 right-0 border border-gray-800 rounded-full bg-blue-500">
                        <Entypo name={'plus'} size={20} style={{ color: "white" }} />
                    </View>
                </View>
                <Text className="text-white">Your Story</Text>
            </View>

            {/* flat list reels scrollable */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 10 }}
                data={DATA}
                renderItem={({ item }) => <View className="flex flex-col justify-center items-center px-[6px] h-full ">
                    <View className=" h-16 w-16 rounded-full border-2 border-orange-400 p-[2px] relative">
                        <Image source={YourImage} className="h-full w-full rounded-full object-cover " />
                    </View>
                    <Text className="text-white">{item.title}</Text>
                </View>}
                keyExtractor={item => item.id}
                className=" h-full px-2 mr-1"
            />
        </View>
    )
}

export default Reels