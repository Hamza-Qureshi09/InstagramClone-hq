import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <View className="w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900" >
            <View className="ml-6">
                <Text className="text-4xl text-white font-BillaBong tracking-widest">Instagram</Text>
            </View>
            <View className=" flex flex-row justify-center items-center mr-6 space-x-4">
                <Ionicons name={'ios-heart-outline'} size={26} style={{ color: "white" }} />
                <MaterialCommunityIcons name={'facebook-messenger'} size={26} style={{ color: "white" }} />
            </View>
        </View>
    )
}

export default Navbar