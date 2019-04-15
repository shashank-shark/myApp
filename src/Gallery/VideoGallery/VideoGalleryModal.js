import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback, Modal, Dimensions, ScrollView} from 'react-native';

import ImageElement from './ImageElement';

export default class GridLayoutSample extends Component{
  constructor(){
    super()
  this.state={
    modalVisible: false,
    // modalImage: require('./download (1).jpeg'),
    modalImage: 'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
    images:[
      'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
      'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
      'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
    //   require('./android/app/img/51049911-nice-france-august-15-2015-subway-fast-food-restaurant-interior-subway-is-an-american-fast-food-rest.jpg'),
    //   require('./android/app/img/dominos.jpg'),
    //   require('./android/app/img/0.jpeg'),
      //{ uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                //{ url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                //{ URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
    ]
  }
}

setModalVisible(visible, imagekey){
  this.setState({modalImage: this.state.images[imagekey]});
  this.setState({modalVisible: visible});
}

getImage(){
  return this.state.modalImage;
}
  render(){
    let images = this.state.images.map((val,key) => {
      return<TouchableWithoutFeedback key={key}
      onPress={()=> {this.setModalVisible(true, key)}}>
      <View style={styles.imagewrap}>
      <ImageElement imgsource={val}></ImageElement>
      </View>
      </TouchableWithoutFeedback>
    });
    return(
      <View style={styles.container}>


      <Modal style={styles.modal} animationType={'fade'}
      transparent={true} visible={this.state.modalVisible} onRequestClose={()=>{}}>

      <View style={styles.modal}>
      <Text style={styles.text} onPress={()=>{
        this.setModalVisible(false)}}>Close</Text>
        <ImageElement imgsource={this.state.modalImage}></ImageElement>   
      </View>

      </Modal>
      {images}
      </View>
    )
  }
}

const styles = StyleSheet.create({
container:{
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: '#eee',
},
imagewrap:{
  margin: 2,
  padding: 2,
  height: (Dimensions.get('window').height/3)-12,
  width: (Dimensions.get('window').width/2)-4,
  backgroundColor: '#fff',
},
modal:{
  flex:1,
  padding: 40,
  backgroundColor: 'rgba(0,0,0, 0.9)',
},
text:{
  color: '#fff',
},
})