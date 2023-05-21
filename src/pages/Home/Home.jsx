import { View, Text, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Navbar from '../../../components/Shared/Navbar/Navbar'
import Reels from '../../../components/Reels/Reels'
import Post from '../../../components/Post/Post'
import Image1 from '../../../assets/images/image1.jpg'
import Image2 from '../../../assets/images/image2.jpg'
import Image3 from '../../../assets/images/image3.jpg'

const Home = () => {
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

            <View className='flex flex-col justify-start items-center flex-1 bg-black'>
                {/* navbar */}
                <Navbar />
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    className='bg-black mb-1 w-full'>
                    <Reels />
                    <Post image={Image1} />
                    <Post image={Image2} />
                    <Post image={Image3} />
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

export default Home