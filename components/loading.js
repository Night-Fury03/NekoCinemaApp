import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from 'react-native-progress'

var { width, height } = Dimensions.get('window')
export default function Loading() {
    return(
        <View style={{width, height}} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail thickness={4} size={80} color={"#FD9564"} />
        </View>
    )
}