import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import TopNavigation from '../TopNavigators/TopNavigation'

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['ViewPagerAndroid']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('ViewPagerAndroid') <= -1) {
    _console.warn(message);
  }
};

export default class ProfileScreen extends React.Component {  
    render() {  
        return (  
            <TopNavigation />
        );  
    }  
}

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
  });