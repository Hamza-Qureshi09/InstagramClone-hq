import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createPost } from '../../../../https';
import { NewPostImageBase64Control, NewPostImageUriControl } from '../../../../store/appControls';

const CreateNewPost = () => {
    const dispatch = useDispatch()
    const { NewPostImageUri, NewPostImageBase64 } = useSelector((state) => state.appControls)
    const [tagInput, settagInput] = useState('')
    const [titleInput, settitleInput] = useState('')
    const [descriptionInput, setdescriptionInput] = useState('')
    const [Submitting, setSubmitting] = useState(false);
    const navigation = useNavigation()

    const postThePost = async () => {
        // console.log(NewPostImageBase64 && !tagInput )

        if (!NewPostImageBase64) {
            return Alert.alert('Alert!',
                'Kindly Select an Image!')
        }
        if (NewPostImageBase64 && !tagInput) {
            return Alert.alert('Alert!',
                'If You Select an image you must write the Tags.')
        }
        if (!titleInput) {
            return Alert.alert('Alert!',
                'Title is Neccessary Field!\nYou must write the title first')
        }
        const data = await AsyncStorage.getItem('userAuth')
        if (data !== null) {
            const parsedData = JSON.parse(data);
            // console.log(parsedData);
            const { userInfo, accessToken } = parsedData.newVal

            try {
                setSubmitting(true)
                const response = await createPost({
                    username: userInfo.userName,
                    accessToken,
                    title: titleInput, description: descriptionInput, tags: tagInput.split(' '), selectedImage: NewPostImageBase64, userId: userInfo._id
                })

                if (response?.status === 201) {
                    setSubmitting(false)
                    settagInput('')
                    settitleInput('')
                    setdescriptionInput('')
                    dispatch(NewPostImageUriControl({ newVal: '' }))
                    dispatch(NewPostImageBase64Control({ newVal: '' }))
                    navigation.navigate('Home')
                    return Alert.alert('Success✔️',
                        'Your Post is created successfully..')
                }
            } catch (error) {
                setSubmitting(false)
                return Alert.alert('Failed! ✖️',
                    error ? `${error.message}\nReason:-${error?.response.data.message}` : error?.message)
            }
        }
    }


    const OpenCameraScreen = () => {
        navigation.navigate('NewPostCameraScreen')
        return;
    }
    return (
        <View className='flex-1 absolute top-0 bottom-0 left-0 right-0 flex flex-col bg-black'>
            {/* navbar */}
            <View className='w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900'>
                <View className="ml-6 flex flex-row space-x-3">
                    <Text className='font-Lato_Regular text-white text-lg'>New Post</Text>
                </View>
                <View className=" flex flex-row justify-center items-center mr-6 ">
                    <TouchableOpacity onPress={postThePost}
                        activeOpacity={0.8}
                        disabled={Submitting}
                        className={`${Submitting ? 'bg-blue-600' : 'bg-blue-500'} px-4 py-2.5 rounded-lg`}>
                        <Text className='text-white font-Lato_Bold'>{Submitting ? 'Creating...' : 'Create Post'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* new post  */}
            <View className='flex flex-col justify-start items-start'>
                {/* image */}
                <View className='h-40 w-full px-4 py-2 flex flex-col'>
                    <View className='relative flex flex-col justify-center items-center h-max overflow-hidden'>
                        {NewPostImageUri ?
                            <Image source={{ uri: NewPostImageUri }} className='w-full h-full rounded-lg' resizeMode='cover' />
                            :
                            <View className='w-full h-full rounded-lg'></View>}

                        <View className='absolute bg-indigo-600 top-0 left-0 bottom-0 right-0 opacity-30 rounded-lg'>

                        </View>
                    </View>

                    {NewPostImageUri ?
                        <View className='px-4 py-2.5 bg-white text-black rounded-lg z-10 absolute top-[50%] left-[50%] -translate-x-14 -translate-y-4 flex flex-col justify-center items-center'>
                            <Text className='text-zinc-800  font-Lato_Regular'>
                                Your Selected Image
                            </Text>
                            <TouchableOpacity onPress={OpenCameraScreen} className=''>
                                <Text className='text-blue-500 font-Lato_Regular pt-[4px]'>Wanna Change?</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={OpenCameraScreen} className='px-4 py-2.5 bg-blue-500 rounded-lg z-10 absolute top-[50%] left-[50%] -translate-x-12 -translate-y-2'>
                            <Text className='text-white font-Lato_Regular'>Select An Image</Text>
                        </TouchableOpacity>
                    }
                </View>

                {/* input field */}

                <ScrollView className='w-full max-h-[33vh]  px-4 mt-2 '>

                    <View className={`mb-4`}>
                        <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Tags</Text>
                        <TextInput
                            className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                            placeholderTextColor={'#adaeb1'}
                            placeholder="Write Tags (e.g:- nature)"
                            onChangeText={text => settagInput(text)}
                            value={tagInput}
                            focusable={true}
                        />
                    </View>

                    <View className={`mb-4`}>
                        <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Title</Text>
                        <TextInput
                            className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                            placeholderTextColor={'#adaeb1'}
                            placeholder="Write Post Title.."
                            onChangeText={text => settitleInput(text)}
                            value={titleInput}
                        />
                    </View>

                    <View className={`mb-4`}>
                        <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Detailed Description</Text>
                        <TextInput
                            className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                            placeholderTextColor={'#adaeb1'}
                            multiline
                            numberOfLines={3}
                            onChangeText={text => setdescriptionInput(text)}
                            value={descriptionInput}
                            placeholder="Enter your Post Description..."
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateNewPost