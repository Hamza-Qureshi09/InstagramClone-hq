import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { loginUserReq } from '../../../https';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthDataLoginHint } from '../../../store/appControls';


const Login = () => {
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [Submitting, setSubmitting] = useState(false);
    const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);
    const [Loading, setLoading] = useState(true);
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { UserLogin } = useSelector((state) => state.appControls)

    // submittin record
    const SubmitRecord = async () => {
        if (!userEmail || !userPassword) {
            return Alert.alert('Values Missing! 💩',
                'Please fill all the field values first.')
        }
        // sending response to server
        const data = {
            userEmail,
            userPassword
        };

        try {
            setSubmitting(true)
            const response = await loginUserReq(data)
            // console.log(response.data);
            if (response?.status === 200) {
                const { authorization, activation, userInfo, accessToken } = response.data
                const value = {
                    newVal: {
                        authorization: authorization,
                        activation: activation,
                        userInfo: userInfo,
                        accessToken: accessToken
                    }
                }
                dispatch(AuthDataLoginHint({ newVal: true }))
                setSubmitting(false)
                setuserEmail('')
                setuserPassword('')
                const jsonValue = JSON.stringify(value);
                AsyncStorage.setItem('userAuth', jsonValue);
                navigation.navigate('Main')
                return Alert.alert('Success✔️',
                    'Your are successfully Login to your account.')
            }
        } catch (error) {
            setSubmitting(false)
            return Alert.alert('Failed! ✖️',
                error ? `${error.message}\nReason:-${error?.response.data.message}` : error?.message)
        }
    }


    useEffect(() => {
        const retrieveData = async (key) => {
            try {
                const jsonValue = await AsyncStorage.getItem(key);
                if (jsonValue !== null) {
                    const value = JSON.parse(jsonValue);
                    return value;
                } else {
                    return null;
                }
            } catch (error) {
                return null;
            }
        };

        const checkValueExistence = async () => {
            if (!isInitialCheckDone) {
                setIsInitialCheckDone(true);
                const retrievedNewVal = await retrieveData('userAuth');
                if (retrievedNewVal === null) {
                    dispatch(AuthDataLoginHint({ newVal: false }));
                    setLoading(false)
                    navigation.navigate('Login'); // Navigate to login screen
                } else {
                    dispatch(AuthDataLoginHint({ newVal: true }));
                    setLoading(true)
                    navigation.navigate('Main'); // Navigate to main screen
                }
            }
        };

        checkValueExistence();
    }, [isInitialCheckDone]);

    if (Loading) {
        return (
            <View className='flex flex-1 flex-col justify-center items-center bg-black'><Text className='text-white'>Loading...</Text></View>
        )
    }

    return (
        <View className='flex flex-col flex-1'>
            {/* <StatusBar style="" /> */}

            <View className={`flex-1 bg-black items-center justify-center p-6`}>
                <View className={`bg-gray-800 p-8 rounded-lg w-full`}>
                    <Text className={`text-white text-3xl font-bold mb-6`}>Instagram</Text>

                    <TextInput
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg mb-4`}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        keyboardType="email-address"
                        onChangeText={(text) => setuserEmail(text)}
                        value={userEmail}
                    />

                    <TextInput
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg mb-6`}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        onChangeText={(text) => setuserPassword(text)}
                        value={userPassword}
                    />

                    <TouchableOpacity
                        disabled={Submitting}
                        className={`${Submitting ? 'bg-blue-600' : 'bg-blue-500'} py-3 rounded-lg items-center`}
                        activeOpacity={0.8}
                        onPress={() => { SubmitRecord() }}
                    >
                        <Text className={`text-white text-lg font-bold`}>Login</Text>
                    </TouchableOpacity>

                    {/* <Text className={`text-gray-500 mt-4`}>Don't have an account? Register</Text> */}
                    <View className='flex flex-row justify-start items-end'>
                        <Text className={`text-gray-500 mt-4 font-Nunito_Regular`}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            className=''><Text className='text-blue-500 '>Register</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login