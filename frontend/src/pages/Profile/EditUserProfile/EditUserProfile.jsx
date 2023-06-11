import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { NewPostImageBase64Control, NewPostImageUriControl } from '../../../../store/appControls';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { updateUserProfile } from '../../../../https';


const EditUserProfile = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [links, setLinks] = useState('');
    const [yourWebsiteLink, setyourWebsiteLink] = useState('');
    const [Submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch()
    const { NewPostImageUri, NewPostImageBase64 } = useSelector((state) => state.appControls)
    const [galleryPermission, setGalleryPermission] = useState(null);
    const navigation = useNavigation()


    const closeTheEditProfileModal = () => {
        props.onHide()
        return;
    }

    // convert image into base64
    const convertImageToBase64 = async (imageUri) => {
        try {
            const manipulatedImage = await manipulateAsync(
                imageUri,
                [{ resize: { width: 400 } }], // Resize the image if needed
                { format: 'jpeg', base64: true } // Convert to JPEG format and include base64 data
            );
            return `data:image/jpeg;base64,${manipulatedImage.base64}`;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            throw error;
        }
    };

    // gallery image picker
    const galleryImagePick = async () => {
        if (galleryPermission) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                const selectedAsset = result.assets[0];
                const base64Image = await convertImageToBase64(selectedAsset.uri);
                dispatch(NewPostImageBase64Control({ newVal: base64Image }))
                dispatch(NewPostImageUriControl({ newVal: selectedAsset.uri }))
                // navigation.navigate('NewPost')
                return;
            }
        }
    }

    const updateProfileData = async () => {
        const data = await AsyncStorage.getItem('userAuth')
        if (data !== null) {
            const parsedData = JSON.parse(data);
            // userName, fullName, Bio, userImage, socialAccounts
            const { userInfo, accessToken } = parsedData.newVal
            if (!userInfo._id) {
                return Alert.alert('Alert!',
                    'Information is missing')
            }

            try {
                setSubmitting(true)
                const response = await updateUserProfile({
                    userName: username,
                    fullName: name,
                    accessToken,
                    userId: userInfo._id,
                    userBio: bio,
                    socialLinks: links.length >= 1 ? links?.split(' ') || links?.split(',') : [],
                    yourWebsite: yourWebsiteLink,
                    userImage: NewPostImageBase64,
                })

                if (response?.status === 200) {
                    const { authorization, activation, userInfo, accessToken } = response.data
                    await AsyncStorage.removeItem('userAuth');
                    const value = {
                        newVal: {
                            authorization: authorization,
                            activation: activation,
                            userInfo: userInfo,
                            accessToken: accessToken
                        }
                    }
                    const jsonValue = JSON.stringify(value);
                    AsyncStorage.setItem('userAuth', jsonValue);
                    setName('')
                    setUsername('')
                    setBio('')
                    setLinks('')
                    setyourWebsiteLink('')
                    setSubmitting(false)
                    props.refFunc(response)
                    props.onHide()
                    dispatch(NewPostImageUriControl({ newVal: '' }))
                    dispatch(NewPostImageBase64Control({ newVal: '' }))
                    navigation.navigate('Profile')
                    return Alert.alert('Success✔️',
                        'Your Profile is updated successfully..')
                } else if (response?.status === 401) {
                    await AsyncStorage.removeItem('userAuth');
                    navigation.navigate('Login');
                    return;
                }
            } catch (error) {
                props.refFunc(error)
                setSubmitting(false)
                return Alert.alert('Failed! ✖️',
                    error ? `${error.message}\nReason:-${error?.response.data.message}` : error?.message)
            }
        }
        return;
    }

    useEffect(() => {
        const getUserDetails = async () => {
            const data = await AsyncStorage.getItem('userAuth')
            if (data !== null) {
                const parsedData = JSON.parse(data);
                // console.log(parsedData?.newVal)
                const { userName, fullName, Bio, userImage, socialAccounts } = parsedData?.newVal?.userInfo

                setName(fullName)
                setUsername(userName)
                setBio(Bio ? Bio : '')
                setLinks(socialAccounts.length >= 1 ? socialAccounts.join(',') : '')
            }
        }
        getUserDetails()
    }, [])

    // getting permissions
    const permisionFunction = async () => {
        const galleryImagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(galleryImagePermission.status === 'granted');
        if (
            galleryImagePermission.status !== 'granted'
        ) {
            Alert.alert(
                'Permissions Required ✋',
                'Go to settings and allow the camera and media to accessed by instagram clone app.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            galleryImagePermission.canAskAgain === true
                            return;
                        }
                    }
                ]
            )
            return;
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            permisionFunction();
        }, [])
    );


    return (
        // visible={visible}
        <Modal animationType="slide"
            className='absolute top-0 bottom-0 flex-1 left-0 right-0 flex flex-col'>
            {/* navbar */}
            <View className='w-full bg-black flex flex-row justify-between items-center h-[60px] border-b border-zinc-900'>
                <View className="ml-6 flex flex-row space-x-3">
                    <TouchableOpacity onPress={closeTheEditProfileModal}><Ionicons name="close" size={24} color="white" /></TouchableOpacity>
                    <Text className='font-Lato_Regular text-white text-lg'>Update Profile</Text>
                </View>
                <View className=" flex flex-row justify-center items-center mr-6 ">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={Submitting}
                        onPress={updateProfileData} className={` ${Submitting ? 'bg-blue-600' : 'bg-blue-500'} px-4 py-2.5 rounded-lg`}>
                        <Text className='text-white font-Lato_Bold'>{Submitting ? 'Updating...' : 'Update'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* edit profile */}
            <View className={`flex-1 bg-black p-6`}>

                <View className={`flex flex-row justify-center items-center mb-4 h-max`}>
                    <View className='flex flex-col justify-center items-center'>
                        {
                            NewPostImageUri ?
                                <Image source={{ uri: NewPostImageUri }} resizeMode='cover' className='h-20 w-20 rounded-full' />
                                :
                                <View className='h-20 w-20 rounded-full flex flex-col justify-center items-center'>
                                    <Text className='text-white'>Not set</Text>
                                </View>
                        }

                        <View className='flex flex-row justify-center items-center mt-1'>
                            <Feather name="edit" size={20} color="#5a83c7" className={`mr-2`} />
                            <TouchableOpacity onPress={galleryImagePick}>
                                <Text className={`text-sm font-bold ml-1 text-blue-500 font-Lato_Bold`}>Update Profile Image</Text>
                            </TouchableOpacity>

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
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Username</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='username'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>


                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Bio</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='Enter your biography'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                    />
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Social Links</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='paste your socila media link'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={links}
                        onChangeText={(text) => setLinks(text)}
                    />
                </View>

                <View className={`mb-4`}>
                    <Text className={`text-sm font-semibold text-white font-Nunito_SemiBold`}>Website Link</Text>
                    <TextInput
                        placeholderTextColor={'#adaeb1'}
                        placeholder='paste your socila media link'
                        className={`border-b border-gray-300 py-1 text-white font-Lato_Regular`}
                        value={yourWebsiteLink}
                        onChangeText={(text) => setyourWebsiteLink(text)}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default EditUserProfile