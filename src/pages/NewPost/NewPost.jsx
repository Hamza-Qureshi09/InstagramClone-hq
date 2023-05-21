import { View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useDispatch } from 'react-redux'
import { NewPostScreenControl } from '../../../store/appControls'
import { NewPostImageUriControl } from '../../../store/appControls'
import { NewPostImageBase64Control } from '../../../store/appControls'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { manipulateAsync } from 'expo-image-manipulator';

const NewPost = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);


  const GoBack = () => {
    dispatch(NewPostScreenControl({ newVal: false }))
    return;
  }

  // convert image into base64
  const convertImageToBase64 = async (imageUri) => {
    try {
      const manipulatedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 500 } }], // Resize the image if needed
        { format: 'jpeg', base64: true } // Convert to JPEG format and include base64 data
      );
      return `data:image/jpeg;base64,${manipulatedImage.base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  // capture picture and set to base64 for upload
  const takePicture = async () => {
    if (cameraRef) {
      let options = { quality: 0.4, base64: true, aspect: '4:3', };
      const data = await cameraRef.takePictureAsync(options);
      const base64Image = await convertImageToBase64(data.uri);
      dispatch(NewPostImageUriControl({ newVal: data.uri }))
      dispatch(NewPostImageBase64Control({ newVal: base64Image }))
      setShowCamera(false)
      navigation.navigate('CreateNewPost')
      return;
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
        navigation.navigate('CreateNewPost')
        return;
      }
    }
  }

  // getting permissions
  const permisionFunction = async () => {
    setShowCamera(true)
    // if (cameraRef) {
    //   // Start the camera
    //   await cameraRef.resumePreviewAsync();
    // }
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
    const galleryImagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');
    setGalleryPermission(galleryImagePermission.status === 'granted');


    if (
      galleryImagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      Alert.alert(
        'Permissions Required ✋',
        'Go to settings and allow the camera and media to accessed by instagram clone app.',
        [
          {
            text: 'OK',
            onPress: () => {
              cameraPermission.canAskAgain === true
              galleryImagePermission.canAskAgain === true
              dispatch(NewPostScreenControl({ newVal: false }))
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

      return () => {
        // if (cameraRef) {
        //   // console.log(cameraRef.pausePreview());
        //   // Stop the camera
        //   cameraRef.pausePreview();
        // }
      };
    }, [cameraRef])
  );


  return (
    <View className="bg-black flex-1">
      <StatusBar style='light' animated={true}
        hidden={false} networkActivityIndicatorVisible={true} backgroundColor='black' hideTransitionAnimation='slide' />

      {/* screen design */}
      <View className={'flex flex-col justify-start items-center flex-1 bg-black absolute top-0 left-0 right-0 bottom-0'}>

        {(cameraPermission && galleryPermission) &&
          <View className='flex-1 absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col bg-black'>
            <Camera className='h-[100%] bg-orange-400' type={Camera.Constants.Type.back}
              ref={(ref) => setCameraRef(ref)}>
              <TouchableOpacity onPress={() => { setShowCamera(false); GoBack() }} className='absolute left-5 top-6 rounded-md h-7 w-7  bg-gray-900 flex flex-col justify-center items-center'>
                <FontAwesome name="close" size={22} color="white" />
              </TouchableOpacity>
              <View className='mb-9 flex-row flex-1 justify-center items-end'>
                {/* click image */}
                <TouchableOpacity className=' h-20 w-20 rounded-full bg-zinc-900 justify-center items-center' style={{ elevation: 2, }} onPress={takePicture}>
                  <AntDesign name="camera" size={36} color="white" />
                </TouchableOpacity>
                {/* choose from gallery */}
                <TouchableOpacity className='absolute bottom-1 left-8 h-14 w-14 rounded-full bg-zinc-900 justify-center items-center' style={{ elevation: 2 }} onPress={galleryImagePick}>
                  <MaterialIcons name="photo-size-select-actual" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        }
      </View>
    </View>
  )
}

export default NewPost