import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { white } from 'ansi-colors';

export default class Feed extends Component {

    constructor(props)
    {
        super(props);
    }

    render () 
    {
        return (
            <View style={{flex: 1}}>
                <View>
                    <View>
                        <Text>Time Ago</Text>
                        <Text>@Teacher1</Text>
                    </View>

                    <View>
                        <Image
                        source={{uri: 'https://source.unsplash.com/random/500x' + Math.floor(((Math.random() * 800) + 500))}}
                        style={styles.imageFeed}
                        />
                    </View>

                    <View>
                        <Text>Caption Text herer....</Text>
                        <Text>View Comments .. </Text>
                    </View>
                </View>
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
  });