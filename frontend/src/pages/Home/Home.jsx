import { View, Text, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Navbar from '../../../components/Shared/Navbar/Navbar'
import Reels from '../../../components/Reels/Reels'
import Post from '../../../components/Post/Post'
import Image1 from '../../../assets/images/image1.jpg'
import Image2 from '../../../assets/images/image2.jpg'
import Image3 from '../../../assets/images/image3.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerifySession, getOverAllPosts } from '../../../https'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [fetchedLatest, setfetchedLatest] = useState(false);
    const [allPosts, setallPosts] = useState([]);

    const navigation = useNavigation()
    // on refresh fetch data
    const onRefresh = () => {
        setRefreshing(true);
        setfetchedLatest(!fetchedLatest)
        // FetchAllCowsFunc() ✅
        setTimeout(() => {
            setRefreshing(false)
        }, 3000);
    };


    // verify myself
    useEffect(() => {
        const retrieveData = async (key) => {
            try {
                // const jsonValue = await AsyncStorage.getItem(key);
                const data = await AsyncStorage.getItem('userAuth')
                if (data !== null) {
                    const parsedData = JSON.parse(data);
                    const token = parsedData?.newVal?.accessToken
                    // console.log('accessToken:', token);
                    if (token) {
                        const verifyMe = await VerifySession({ accessToken: token })
                        // console.log(verifyMe.status, 'response');
                        if (verifyMe.status === 401) {
                            await AsyncStorage.removeItem('userAuth');
                            navigation.navigate('Login');
                            return;
                        }
                    }else{
                        await AsyncStorage.removeItem('userAuth');
                        navigation.navigate('Login');
                        return;
                    }
                } else {
                    await AsyncStorage.removeItem('userAuth');
                    navigation.navigate('Login');
                    return;
                }
            } catch (error) {
                await AsyncStorage.removeItem('userAuth');
                navigation.navigate('Login');
                return null;
            }
        };

        retrieveData()
    }, [])


    // fetching all the posts
    useEffect(() => {
        const fetchedPosts = async () => {
            const overallPosts = await getOverAllPosts()
            if (overallPosts.status === 200) {
                // console.log(overallPosts.data.allPosts);
                setallPosts(overallPosts.data.allPosts)
            }
        }
        fetchedPosts()
    }, [fetchedLatest])


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

                    {/* all posts */}
                    {
                        allPosts.length >= 1 ?
                            allPosts.map((val, index) => {
                                return (
                                    <Post key={index} image={Image1} postData={val} />
                                )
                            })
                            : <Text className='text-white'>No Post has been created Yet!</Text>
                    }

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