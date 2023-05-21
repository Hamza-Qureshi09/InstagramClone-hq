import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { NewPostScreenControl } from '../../../../store/appControls';

const CreateNewPost = () => {
    const dispatch=useDispatch()
    const { NewPostImageUri, NewPostImageBase64 } = useSelector((state) => state.appControls)
    const [tagInput, settagInput] = useState('')
    const [descriptionInput, setdescriptionInput] = useState('')
    // console.log(NewPostImageUri, NewPostImageBase64.slice(0,150),'newpage');
    const closeThePost = () => {
        dispatch(NewPostScreenControl({ newVal: false }))
        return;
    }
    const postThePost = () => {
        // console.log('hamza');
    }
    return (
        <View className='flex-1 bg-black'>
            {/* navbar */}
            <View className='w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900'>
                <View className="ml-6 flex flex-row space-x-3">
                    <TouchableOpacity onPress={closeThePost}><Ionicons name="close" size={24} color="white" /></TouchableOpacity>
                    <Text className='font-Lato_Regular text-white text-lg'>New Post</Text>
                </View>
                <View className=" flex flex-row justify-center items-center mr-6 ">
                    <TouchableOpacity onPress={postThePost} className='bg-blue-600 px-4 py-2.5 rounded-lg'>
                        <Text className='text-white font-Lato_Bold'>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* new post  */}
            <View className='flex flex-col justify-start items-start'>
                {/* image */}
                <View className='h-40 w-full px-4 py-2 flex flex-col'>
                    <View className='relative flex flex-col justify-center items-center h-max overflow-hidden'>
                        <Image source={{ uri: NewPostImageUri }} className='w-full h-full rounded-lg' resizeMode='cover' />
                        <View className='absolute bg-indigo-600 top-0 left-0 bottom-0 right-0 opacity-30 rounded-lg'>

                        </View>
                    </View>
                    <Text className='px-4 py-2.5 bg-white text-black rounded-lg z-10 absolute top-[50%] left-[50%] -translate-x-14 -translate-y-4'>
                        Your Selected Image
                    </Text>
                </View>

                {/* input field */}
                <View className='w-full h-max bg-black px-4 mt-2'>
                    <View className=' flex flex-col justify-center items-start'>
                        {/* Owner image */}
                        <View className='rounded-full h-10 w-10 absolute left-2 border border-sky-500 z-10 p-1'>
                            <Image source={{ uri: NewPostImageUri }} className='h-full w-full rounded-full' resizeMode='stretch' />
                        </View>
                        {/* tag input field */}
                        <TextInput
                            placeholderTextColor={'#d3d3d2'}
                            className='border border-zinc-800 rounded-lg pr-2 pl-14 h-16 w-full text-sm font-Nunito_Regular text-white capitalize bg-zinc-900'
                            placeholder="Write Tags (e.g:- nature)"
                            onChangeText={text => settagInput(text)}
                            value={tagInput}
                            focusable={true}
                        />
                    </View>

                    {/* description */}
                    <TextInput
                        multiline
                        numberOfLines={6}
                        onChangeText={text => setdescriptionInput(text)}
                        value={descriptionInput}
                        placeholder="Enter your Post Description..."
                        className='h-max w-full border border-zinc-800 rounded-lg font-Lato_Regular capitalize pl-4 text-white text-base mt-2 bg-zinc-900'
                        placeholderTextColor={'#d3d3d2'}
                    />
                </View>
            </View>
        </View>
    )
}

export default CreateNewPost