import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react'

export default class VideoFeed extends Component {

    constructor(props)
    {
        super(props);
    }

    render () 
    {
        return (
            <View>
                <Text>VideoFeed Here</Text>
            </View>
        );
    }
}