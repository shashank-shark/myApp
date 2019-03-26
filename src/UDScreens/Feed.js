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

    pluralCheck = (s) => {
        if (s == 1) {
            return ' ago'
        } else {
            return 's ago'
        }
    }

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds  = Math.floor((new Date() - a) / 1000);

        // check for years
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year' + this.pluralCheck(interval)
        }
        
        // check for months
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' month' + this.pluralCheck(interval)
        }

        // check for days
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' day' + this.pluralCheck(interval)
        }

        // check for hours
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hour' + this.pluralCheck(interval)
        }

        // check for minutes
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minute' + this.pluralCheck(interval)
        }

        // check for seconds
        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds)
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
                    photo_feed.push({
                        url: doc.data().url,
                        posted: that.timeConverter(doc.data().posted),
                        author: dataDocs.data().author,
                        caption: doc.data().caption,
                    });
                    console.log (photo_feed)

                    that.setState({
                        refresh: false,
                        loading: false,
                    });

                 })
               }).catch(function(error) {
                   console.log ("ERROR INNER  ", error)
               })
            })
        }).catch(function(error) {
            console.log ("ERROR OUTER  ", error)
        })
    }

    // Refresh or add new content
    loadNew = () => {
        this.loadFeed();
    }

    render () 
    {
        return (
            <View style={{flex: 1}}>


            { this.state.loading == true ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading..</Text>
                </View>
            ) : (
            <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={this.state.photo_feed}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatListHere}
            renderItem={({item, index}) => (
            <View key={index} style={styles.PhotoFeed}>
                    <View style={styles.TimeUploader}>
                        <Text>{item.posted}</Text>
                        <Text>{item.author}</Text>
                    </View>

                    <View>
                        <Image
                        source={{uri: item.url }}
                        style={styles.imageFeed}
                        />
                    </View>

                    <View style={styles.CaptionComment}>
                        <Text>{item.caption}</Text>
                        <Text style={styles.CommentsHere}>View Comments .. </Text>
                    </View>
            </View>

            )}
            />
            )}
              
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