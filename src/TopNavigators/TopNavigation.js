import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator} from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

// importing explicit screens
import Feed from '../UDScreens/Feed'
import Upload from '../UDScreens/Upload'
import VideoFeed from '../UDScreens/VideoFeed'


const TabNavigator = createMaterialTopTabNavigator(  
  {  
      Feed: { screen: Feed,  
          navigationOptions:{  
              tabBarLabel:'New Feed',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                  </View>),  
          }  
      },
      VideoFeed: { screen: VideoFeed,  
        navigationOptions:{  
            tabBarLabel:'Gallery',  
            tabBarIcon: ({ tintColor }) => (  
                <View>  
                    <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                </View>),  
        }  
     }, 
      Upload: { screen: Upload,  
          navigationOptions:{  
              tabBarLabel:'Upload',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-calendar'}/>  
                  </View>),  
              activeColor: '#f60c0d',  
              inactiveColor: '#f65a22',  
              barStyle: { backgroundColor: '#f69b31' },  
          }  
      },  
  },  
  {  
    shifting: false,
    tabBarPosition: 'top',
    initialRouteName: "Upload",  
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },
    
  },  
);  

export default createAppContainer(TabNavigator);  