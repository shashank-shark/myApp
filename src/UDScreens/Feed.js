import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { white } from 'ansi-colors'
// import { f, auth, database, storage } from '../../config/config'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
        }
        

    }

    componentDidMount = () => {

        // Load Feed
        this.loadFeed();

    }

    loadFeed = () => {
        
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var db = firebase.firestore()

        var that = this;

        db.collection('Photos').orderBy('posted').get().then(function(querySnapshot) {

            var photo_feed = that.state.photo_feed;

            querySnapshot.docs.forEach(doc => {
               db.collection('Teachers').where("author","==",doc.data().author).get().then(function(subDoc) {
                 subDoc.docs.forEach(function(dataDocs) {
                   var teacherObj = dataDocs.data()

                    photo_feed.push({
                        url: teacherObj.url,
                        caption: teacherObj.caption,
                        posted: teacherObj.posted,
                        author: teacherObj.author,
                    });

                    that.setState({
                        refresh: false,
                        loading: false,
                    });

                 })
               }).catch(function(error) {
                   console.log ("ERROR INNER  ", error)
               }).catch(function(error) {
                   console.log ("ERROR OUTER  ", error)
               })
            })
        })
    }

    // Refresh or add new content
    loadNew = () => {
        this.setState ({
            refresh: true,
        });

        this.setState ({
            photo_feed: [5,6,7,8,9],
            refresh: false
        });
    }

    render () 
    {
        return (
            <View style={{flex: 1}}>
            <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={this.state.photo_feed}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatListHere}
            renderItem={({item, index}) => (
            <View key={index} style={styles.PhotoFeed}>
                    <View style={styles.TimeUploader}>
                        <Text>Time Ago</Text>
                        <Text>@Teacher1</Text>
                    </View>

                    <View>
                        <Image
                        source={{uri: 'https://source.unsplash.com/random/500x' + Math.floor(((Math.random() * 800) + 500))}}
                        style={styles.imageFeed}
                        />
                    </View>

                    <View style={styles.CaptionComment}>
                        <Text>Caption Text here....</Text>
                        <Text style={styles.CommentsHere}>View Comments .. </Text>
                    </View>
            </View>

            )}
            />
              
            </View>
        );
    }
}


const styles = StyleSheet.create({  
    imageFeed: {  
        resizeMode: 'cover',
        width: '100%',
        height: 275,
    },
    flatListHere: {
        flex: 1,
        backgroundColor: '#eee',
    },
    PhotoFeed: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    TimeUploader: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CaptionComment: {
        padding: 5,
    },
    CommentsHere: {
        marginTop: 10,
        textAlign: 'center',
    },
  });