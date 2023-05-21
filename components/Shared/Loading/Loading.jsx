import { ActivityIndicator, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const Loading = () => {
    return (
        <SafeAreaView className=''>
            <Text>Loading...</Text>
            {/* <ActivityIndicator size="large" color="#18932b" /> */}
        </SafeAreaView>
    )
}

export default Loading