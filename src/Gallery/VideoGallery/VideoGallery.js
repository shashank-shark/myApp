import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import Video from 'react-native-af-video-player'

import * as firebase from 'firebase';
import 'firebase/firestore';
import { throwStatement } from '@babel/types';

export default class Users extends Component {

 

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      items: [],

    };
  }

  componentDidMount() {
    
    let totCount = 0;
    var db = firebase.firestore()

    var that = this;
    var itemsVideos = new Array();

    var simItems = new Array();

    db.collection('Videos').orderBy('posted','desc').get().then(function(querySnapshot){
      var idCount = 0;
      var items;
      querySnapshot.docs.forEach(doc => {
        itemsVideos.push ({
          id: idCount,
          name: doc.data().author,
          position: doc.data().caption,
          image: doc.data().url,
          about: doc.data().caption,
        })
        simItems = itemsVideos;
        idCount = idCount + 1;
        that.setState({
          items: simItems.slice()
        })
      })
      
    }).then(dcum => {
      console.log (items)
  }).catch(err => {
      console.log ("ERROR occurred" + err)
  })

    console.log (simItems)

    this.setState ({
      items: itemsVideos
    })
  }



  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
          
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.items}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              {/* <Video url='https://firebasestorage.googleapis.com/v0/b/myptmtrial1.appspot.com/o/user%2FRecHPOCNzmYXt6pPoILPLTaAp683%2Fvideo%2F58ca5b-815-80-25c-2b6.mp4?alt=media&token=a1ca1935-d927-4763-aa28-5fd91b164065' /> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.position}>{item.position}</Text>
                {/* <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Follow</Text>  
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          )}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                {/* <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView> */}
                <Video url={{uri: this.state.userSelected.image}} />

              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});