import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

// importing explicit screens
import Feed from '../UDScreens/Feed'
import Upload from '../UDScreens/Upload'
import GalleryScreen from '../UDScreens/GalleryScreen'
import ImageGallery from '../Gallery/ImageGallery/ImageGallery'
import VideoGallery from '../Gallery/VideoGallery/VideoGallery'
import MyUploads from '../Gallery/MyUploads/MyUploads'


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
      GalleryScreen: { screen: createStackNavigator({
          ImageGallery: {
              screen: ImageGallery
          },
          VideoGallery: {
              screen: VideoGallery
          },
          MyUploads: {
              screen: MyUploads
          },
          GalleryScreen: {
              screen: GalleryScreen
          },
      }, {
            initialRouteName: "GalleryScreen",
            headerMode: 'none',
            navigationOptions: {
                headerVisible: false,
            }
      }),  
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
    initialRouteName: "GalleryScreen",  
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },
    
  },  
);

export default createAppContainer(TabNavigator);