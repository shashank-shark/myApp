import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

export default class EventScreen extends React.Component {  
    render() {  
      return (  
          <View style={styles.container}>  
            <Text>Event Screen</Text>
          </View>  
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