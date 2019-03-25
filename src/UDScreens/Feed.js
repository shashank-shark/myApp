import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { white } from 'ansi-colors';

export default class Feed extends Component {

    constructor(props)
    {
        super(props);

        // adding states
        this.state = {
            photo_feed: [0,1,2,3,4],
            refresh: false,
        }
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