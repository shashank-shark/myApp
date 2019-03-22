import { createMaterialBottomTabNavigator } from 'react-native-material-bottom-navigation'
import { createAppContainer } from 'react-navigation'
import { StyleSheet } from 'react-native'
import React from 'react'
import Tab1 from '../Screens/Tab1'
import Tab2 from '../Screens/Tab2'
import Tab3 from '../Screens/Tab3'
import Tab4 from '../Screens/Tab4'

// const Album = () => {
//     <View>
//         <Text style={{ fontSize: 30 }}>
//             ALBUM
//         </Text>
//     </View>
// }

// const Library = () => {
//     <View>
//         <Text style={{ fontSize: 30 }}>
//             LIBRARY
//         </Text>
//     </View>
// }

// const Favorites = () => {
//     <View>
//         <Text style={{ fontSize: 30 }}>
//             FAVOURITES
//         </Text>
//     </View>
// }

// const Purchased = () => {
//     <View>
//         <Text style={{ fontSize: 30 }}>
//             PURCHASED
//         </Text>
//     </View>
// }

class Album extends React.Component {

    render() {
      return <PhotoGrid id="album" />;
    }
  }
  
  class Library extends React.Component {

    render() {
      return <PhotoGrid id="library" />;
    }
  }
  
  class Favorites extends React.Component {
  
    render() {
      return <PhotoGrid id="favorites" />;
    }
  }
  
  class Purchased extends React.Component {
  
    render() {
      return <PhotoGrid id="purchased" />;
    }
  }
  
  const BottomMaterial =  createMaterialBottomTabNavigator(
    {
      Album: {
        screen: Tab1
      },
      Library: {
        screen: Tab2
      },
      Favorites: {
        screen: Tab3
      },
      Purchased: {
        screen: Tab4
      },
    },
    {
      shifting: false,
      activeColor: '#6200ee',
      inactiveColor: '#828792',
      barStyle: {
        backgroundColor: '#f8f7f9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#d0cfd0',
      },
    }
  );

  export default createAppContainer (BottomMaterial);