import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Image1 from '../../../../assets/images/image1.jpg'

const EditUserProfile = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [links, setLinks] = useState('');

    const closeTheEditProfileModal = () => {
        props.onHide()
        return;
    }

    const updateProfileData = () => {
        // props.onHide()
        console.log('update');
        return;
    }
    return (
        // visible={visible}
        <Modal animationType="slide"
            className='absolute top-0 bottom-0 flex-1 left-0 right-0 flex flex-col'>
            {/* navbar */}
            <View className='w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900'>
                <View className="ml-6 flex flex-row space-x-3">
                    <TouchableOpacity onPress={closeTheEditProfileModal}><Ionicons name="close" size={24} color="white" /></TouchableOpacity>
                    <Text className='font-Lato_Regular text-white text-lg'>New Post</Text>
                </View>
                <View className=" flex flex-row justify-center items-center mr-6 ">
                    <TouchableOpacity onPress={updateProfileData} className='bg-blue-600 px-4 py-2.5 rounded-lg'>
                        <Text className='text-white font-Lato_Bold'>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* edit profile */}
            <View className={`flex-1 bg-black p-6`}>

                <View className={`flex flex-row justify-center items-center mb-4 h-max`}>
                    <View className='flex flex-col justify-center items-center'>
                        <Image source={Image1} resizeMode='cover' className='h-20 w-20 rounded-full' />
                        <View className='flex flex-row justify-center items-center mt-1'>
                            <Feather name="edit" size={20} color="#5a83c7" className={`mr-2`} />
                            <Text className={`text-sm font-bold ml-1 text-blue-500 font-Lato_Bold`}>Update Profile Image</Text>
                        </View>
                    </View>
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Name</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='Your Name'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Username</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='username'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>


                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Bio</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='Enter your biography'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Links</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='paste your socila media link'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={links}
                        onChangeText={setLinks}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default EditUserProfile