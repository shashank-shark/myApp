/*This is an Example of Grid Image Gallery in React Native*/
import * as React from 'react';
//import React in our project
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
//import all the needed components

import PhotoGrid from 'react-native-image-grid';

import * as firebase from 'firebase';
import 'firebase/firestore';

class MyUploads extends React.Component {
  constructor() {
    super();
    this.state = {
      imageuri: '',
      ModalVisibleStatus: false,
      items: [],
    };
    // this.state = { items: [] };
    // this.state = {
    //   items: [],
    // }
  }

  componentDidMount() {
    

    let totCount = 0;
    var db = firebase.firestore()
    var teacherUid = firebase.auth().currentUser.uid;

    var that = this;

    // // get the count of documents
    // var docRef = db.collection("Photos").doc("total")
    // docRef.get().then(function(doc) {
    //   totCount = doc.data().value
    // })

    db.collection('Teachers').doc(teacherUid).collection('Photos').orderBy('posted','desc').get().then(function(querySnapshot){
      var items = that.state.items;
      var idCount = 0;
      querySnapshot.docs.forEach(doc => {
        console.log (doc.data().url)
        items.push({
           id: idCount, src: doc.data().url
        })

        console.log (items)
        idCount = idCount + 1;
        console.log (idCount)
      })
      that.setState(items)
    })

    // let items = Array.apply(null, Array(60)).map((v, i) => {
    //   //Using demo placeholder images but you can add your images here
    //   return { id: i, src: 'http://placehold.it/200x200?text=' + (i +1) };
    // });
    // console.log (items)
    // that.setState({ items });

    // db.collection('Photos').orderBy('posted','desc').get().then(function(snapshot) {
    //   let total_count = 0;
    //   snapshot.forEach(doc => {
    //     total_count += doc.data().count;
    //   })

    //   console.log (total_count)
    // })
  }

  loadGallery = () => {
    let totCount = 0;
    var db = firebase.firestore()

    // get the uid of the teacher
    var teacherUid = firebase.auth().currentUser.uid;

    var that = this;

    // get the count of documents
    // var docRef = db.collection("Photos").doc("total")
    // docRef.get().then(function(doc) {
    //   totCount = doc.data().value
    // })

    db.collection('Teachers').doc(teacherUid).collection('Photos').orderBy('posted','desc').get().then(function(querySnapshot){
      var items = that.state.items;
      var idCount = 0;
      querySnapshot.docs.forEach(doc => {
        console.log (doc.data().url)
        items.push({
           id: idCount, src: doc.data().url
        })

        console.log (items)
        idCount = idCount + 1;
        console.log (idCount)
      })
      that.setState(items)
    }).then(dcum => {
        console.log (items)
    }).catch(err => {
        console.log ("ERROR occurred" + err)
    })
  }

  renderHeader() {
    //Header of the Screen
    return <Text style={{padding:16, fontSize:20, color:'white', backgroundColor:'green'}}>Image Gallery</Text>;
  }
  ShowModalFunction(visible, imageURL) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
    });
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    //Single item of Grid
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
          this.ShowModalFunction(true, item.src);
        }}>
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.src }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.ModalVisibleStatus) {
      //Modal to show full image with close button 
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
          }}>
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
              }}>
              <Image
                source={{
                  uri:
                    'https://aboutreact.com/wp-content/uploads/2018/09/close.png',
                }}
                style={{ width: 25, height: 25, marginTop:16 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      //Photo Grid of images
      return (
        <View style={styles.containerStyle}>
        <PhotoGrid
          data={this.state.items}
          itemsPerRow={3}
          //You can decide the item per row
          itemMargin={1}
          itemPaddingHorizontal={1}
          renderItem={this.renderItem.bind(this)}
        />
        </View>
      );
    }
  }
}

export default MyUploads;
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
});
