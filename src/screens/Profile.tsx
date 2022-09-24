// @ts-nocheck
import { View, Text, ScrollView, Pressable } from 'react-native'
import React,{useState, useEffect} from 'react'
import Footer from '../components/Footer';
import GlobalStyles from '../utils/GlobalStyles'
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import SettingList from '../components/SettingList'
import { TouchableRipple } from 'react-native-paper';
import { useAuth } from '../utils/useAuth';

const placeholderImageURL = "https://firebasestorage.googleapis.com/v0/b/remoteers-360d0.appspot.com/o/icons8-selfies-100.png?alt=media&token=da1fef51-7ede-4f32-a559-1270ba1fe95f"

export default function Profile() {
  const {currentUserDetails, loading, getCurrentUserDetails} = useAuth()
  const [userData, setUserData] = useState(currentUserDetails)
  const [profileImage, setProfileImage] = useState(placeholderImageURL)
  const navigation = useNavigation()

  useEffect(() => {
    try {
        getCurrentUserDetails().then((data) => setUserData(data))
    } catch(error) {
        console.log(error)
    }
  },[currentUserDetails])
  
  if(loading && !currentUserDetails) return

  return (
    <>
        <ScrollView className="flex-1 ">
            <View className="flex self-center pt-[6%]">
                <Avatar imageURL={profileImage} size={200}/>
            </View>
            {!loading && 
            (<View className="flex self-center pt-[2%] pb-[6%]">
                <Text 
                    className="text-center text-2xl text-[#141bab] font-bold"
                    style={GlobalStyles.CustomFont}
                >
                    {userData && userData.username}
                </Text>
            </View>)}
            {/* Edit Profile and Show Profile */}
            <View className="flex flex-row justify-around w-full bg-white h-[60] items-center">
                <TouchableRipple 
                    className="w-[50%] border-r-[1rem] h-full justify-center border-r-[#b6b6b6]"
                    onPress={() => navigation.navigate('EditProfile',{userData, setUserData})}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                   
                        <Text 
                            className="text-xl text-center"
                            style={GlobalStyles.CustomFont}
                        >
                            Edit Profile
                        </Text>
                </TouchableRipple>
                <TouchableRipple 
                    className="w-[50%] h-full justify-center"
                    onPress={() => navigation.navigate('PreviewProfile',{userData, setUserData})}
                >
                     <Text 
                            className="text-xl text-center"
                            style={GlobalStyles.CustomFont}
                        >
                            Show Profile
                        </Text>
                </TouchableRipple>
            </View>

            {/* Account Setting */}
            <View className="">
                <Text className="text-2xl pt-[10%] pl-[4%]" style={GlobalStyles.CustomFont}>Account Settings</Text>
            </View>
            <SettingList iconName="person-outline" text="Personal information"/>
        </ScrollView>
        <Footer screen="Profile"/>
    </>
  )
}