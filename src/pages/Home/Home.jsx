import { View, Text, ScrollView ,Dimensions} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Navbar from '../../../components/Shared/Navbar/Navbar'
import Reels from '../../../components/Reels/Reels'
import Post from '../../../components/Post/Post'
import Image1 from '../../../assets/images/image1.jpg'
import Image2 from '../../../assets/images/image2.jpg'
import Image3 from '../../../assets/images/image3.jpg'

const Home = () => {
    return (
        <View className=" flex-1">
            <StatusBar style='light' animated={true}
                hidden={false} networkActivityIndicatorVisible={true} backgroundColor='black' hideTransitionAnimation='slide' />

            <View className='flex flex-col justify-start items-center flex-1 bg-black'>
                {/* navbar */}
                <Navbar />
                <ScrollView showsVerticalScrollIndicator={false} className='bg-black mb-1 w-full'>
                    <Reels />
                    <Post image={Image1}/>
                    <Post image={Image2}/>
                    <Post image={Image3}/>
                </ScrollView>

            </View>
        </View>
    )
}

export default Home