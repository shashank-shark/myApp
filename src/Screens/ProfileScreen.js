import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

export default class ProfileScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Profile Screen</Text>  
            </View>  
        );  
    }  
}

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'flex-end',  
        alignItems: 'center'  
    },  
  });