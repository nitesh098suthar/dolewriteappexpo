import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const SubjectDetails = () => {
    const { id } = useLocalSearchParams();
    console.log("id of the video", id)    
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default SubjectDetails