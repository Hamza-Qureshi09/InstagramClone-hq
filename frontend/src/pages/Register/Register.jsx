import { View, TextInput, TouchableOpacity, Text, StatusBar, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import NavigationBarColor from 'react-native-navigation-bar-color';
import { createUserReq } from '../../../https';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthDataLoginHint } from '../../../store/appControls';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [userName, setuserName] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [Submitting, setSubmitting] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch()

    // submittin record
    const SubmitRecord = async () => {
        if (!userName || !userEmail || !userPassword) {
            return Alert.alert('Values Missing! 💩',
                'Please fill all the field values first.')
        }
        // sending response to server
        const data = {
            userName,
            userEmail,
            userPassword
        };

        try {
            setSubmitting(true)
            const response = await createUserReq(data)
            if (response?.status === 201) {
                setSubmitting(false)
                setuserName('')
                setuserEmail('')
                setuserPassword('')
                navigation.navigate('Login')
                return Alert.alert('Success✔️',
                    'Your are successfully Registered!\n Now You can Login to your account.')
            }
        } catch (error) {
            setSubmitting(false)
            return Alert.alert('Failed! ✖️',
                error ? `${error.message}\nReason:-${error?.response.data.message}` : error?.message)
        }
    }

    useEffect(() => {
        // console.log('comming');
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
                    navigation.navigate('Register'); // Navigate to login screen
                } else {
                    dispatch(AuthDataLoginHint({ newVal: true }));
                    setLoading(true)
                    navigation.navigate('Main'); // Navigate to main screen
                }
            }
        };

        checkValueExistence();
    }, [])

    if (Loading) {
        return (
            <View className='flex flex-1 flex-col justify-center items-center bg-black'><Text className='text-white'>Loading...</Text></View>
        )
    }
    return (
        <View className='flex-1 bg-orange-500 flex flex-col'>
            <StatusBar style='light' animated={true}
                hidden={false} networkActivityIndicatorVisible={true} backgroundColor='black' hideTransitionAnimation='slide'

            />

            <View className={`flex-1 bg-black items-center justify-center p-6`}>
                <View className={`bg-gray-800 p-8 rounded-lg w-full`}>
                    <Text className={`text-white text-3xl mb-6 font-BillaBong `}>Instagram</Text>

                    <TextInput
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg mb-4 font-Lato_Regular`}
                        placeholder="Username"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setuserName(text)}
                        value={userName}
                    />


                    <TextInput
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg mb-4 font-Lato_Regular`}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        keyboardType="email-address"
                        onChangeText={(text) => setuserEmail(text)}
                        value={userEmail}
                    />

                    <TextInput
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg mb-6 font-Lato_Regular`}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        onChangeText={(text) => setuserPassword(text)}
                        value={userPassword}
                    />

                    <TouchableOpacity
                        disabled={Submitting}
                        className={` ${Submitting ? 'bg-blue-600' : 'bg-blue-500'} py-3 rounded-lg items-center`}
                        activeOpacity={0.8}
                        onPress={() => { SubmitRecord() }}
                    >
                        <Text className={`text-white text-lg font-Lato_Bold`}>{Submitting ? 'Registering...' : 'Register'}</Text>
                    </TouchableOpacity>

                    <View className='flex flex-row justify-start items-end'>
                        <Text className={`text-gray-500 mt-4 font-Nunito_Regular`}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            className=''><Text className='text-blue-500 '>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default Register