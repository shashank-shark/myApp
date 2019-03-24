import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View,Button, Platform, AppRegistry, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { Header } from 'react-native-elements'
import { Component } from 'react'

export default class HomeScreen extends React.Component {

  render() {  
      return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.welcome}>Welcome to React Native</Text>
            <Text style={styles.welcome}>Welcome to React Native</Text>
            <Text style={styles.welcome}>Welcome to React Native</Text>
       </View>
      );  
  }  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor: 'white',
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:300,
        borderRadius:30,
        backgroundColor:'transparent'
      },
      loginButton: {
        backgroundColor: "#00b5ec",
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
    
        elevation: 19,
      },
     header: {
        flex: 1,
        marginTop: 0,
        backgroundColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    welcome: {
      flex: 1,
      margin: 20,
      backgroundColor: 'orange',
      margin: 10,
      textAlign: 'center',
      fontSize: 20,
      paddingTop: 70,
    }
  });
