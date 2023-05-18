import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <View className="w-full bg-black flex flex-row justify-between items-center h-14" style={{borderBottomColor:'#303030', borderBottomWidth:1}}>
            <View className="ml-4">
                <Text className="text-xl text-white">Instagram</Text>
            </View>
            <View className=" flex flex-row justify-center items-center mr-4 space-x-2">
                <Ionicons name={'ios-heart-outline'} size={26} style={{ color: "white" }} />
                <MaterialCommunityIcons name={'facebook-messenger'} size={26} style={{ color: "white" }} />
            </View>
        </View>
    )
}

export default Navbar