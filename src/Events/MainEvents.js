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

import firebase from '@firebase/app'
import '@firebase/auth'

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      items: [],
      isFetching: false,
    };
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.loadEvents() });
 }

  componentDidMount() {
    
    let totCount = 0;
    var db = firebase.firestore()

    var that = this;
    var itemsVideos = new Array();

    var simItems = new Array();
    var todayDate = new Date();

    todayDate.setDate(todayDate.getDate() - 1);

    // calculate the timestamp of yesterday and parse it to number
    var timeStampYestNum = todayDate.getTime();
    timeStampYestNum = timeStampYestNum / 1000;

    console.log (timeStampYestNum)

    db.collection('Events').orderBy('dateOfConduct').where('dateOfConduct','>=', timeStampYestNum).get().then(function(querySnapshot){
      var idCount = 0;
      var items;

      console.log (querySnapshot)

      querySnapshot.docs.forEach(doc => {

        var dateString = new Date((doc.data().dateOfConduct) * 1000).toDateString()

        console.log (dateString)
        console.log (typeof dateString)

        itemsVideos.push ({
          id: idCount,
          name: doc.data().name,
          position: dateString,
          image: 'https://png.icons8.com/bar-chart/dusk/50/ffffff',
          about: doc.data().info,
        })

        console.log (itemsVideos)

        simItems = itemsVideos;
        idCount = idCount + 1;
        that.setState({
          items: simItems.slice()
        })
      })
      
    })

    console.log (simItems)

    this.setState ({
      items: itemsVideos.slice()
    })
  }

  loadEvents = () => {
    
    let totCount = 0;
    var db = firebase.firestore()

    var that = this;
    var itemsVideos = new Array();

    var simItems = new Array();
    var todayDate = new Date();

    todayDate.setDate(todayDate.getDate() - 1);

    // calculate the timestamp of yesterday and parse it to number
    var timeStampYestNum = todayDate.getTime();
    timeStampYestNum = timeStampYestNum / 1000;

    console.log (timeStampYestNum)

    db.collection('Events').orderBy('dateOfConductEnd').where('dateOfConductEnd','>=', timeStampYestNum).get().then(function(querySnapshot){
      var idCount = 0;
      var items;

      console.log (querySnapshot)

      querySnapshot.docs.forEach(doc => {

        var dateString = new Date((doc.data().dateOfConductStart) * 1000).toDateString()

        console.log (dateString)
        console.log (typeof dateString)

        itemsVideos.push ({
          id: idCount,
          name: doc.data().name,
          position: dateString,
          image: 'https://png.icons8.com/bar-chart/dusk/50/ffffff',
          about: doc.data().info,
        })

        console.log (itemsVideos)

        simItems = itemsVideos;
        idCount = idCount + 1;
        that.setState({
          items: simItems.slice()
        })
      })
      
    })

    console.log (simItems)

    this.setState ({
      items: itemsVideos.slice()
    })

    this.setState ({
      isFetching: false,
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
          onRefresh={() => this.loadEvents()}
          refreshing={this.state.isFetching}
          data={this.state.items}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: item.image}}/>
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
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
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