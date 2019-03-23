import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation'  
import {StyleSheet, Text, View,Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>  
          <Text>Home Screen</Text>  
        </View>  
    )
  }
}

class EventScreen extends React.Component {  
  render() {  
    return (  
        <View style={styles.container}>  
          <Text>Event Screen</Text>  
        </View>  
    );  
  }  
}

class GalleryScreen extends React.Component {  
  render() {  
      return (  
          <View style={styles.container}>  
              <Text>Gallery Screen</Text>  
          </View>  
      );  
  }  
} 

class ProfileScreen extends React.Component {  
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

const TabNavigator = createMaterialBottomTabNavigator(  
  {  
      Home: { screen: HomeScreen,  
          navigationOptions:{  
              tabBarLabel:'Home',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                  </View>),  
          }  
      },  
      Events: { screen: EventScreen,  
          navigationOptions:{  
              tabBarLabel:'Events',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-calendar'}/>  
                  </View>),  
              activeColor: '#f60c0d',  
              inactiveColor: '#f65a22',  
              barStyle: { backgroundColor: '#f69b31' },  
          }  
      },  
      Gallery: { screen: GalleryScreen,  
          navigationOptions:{  
              tabBarLabel:'Gallery',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
                  </View>),  
              activeColor: '#615af6',  
              inactiveColor: '#46f6d7',  
              barStyle: { backgroundColor: '#67baf6' },  
          }  
      },  
      Profile: {  
          screen: ProfileScreen,  
          navigationOptions:{  
              tabBarLabel:'Profile',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                  </View>),  
          }  
      },  
  },  
  {  
    shifting: false,
    tabBarPosition: 'bottom',
    initialRouteName: "Home",  
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },
    
  },  
);  

export default createAppContainer(TabNavigator);  