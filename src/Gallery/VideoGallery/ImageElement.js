import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video'

export default class GridLayoutSample extends Component{
  render(){
    return(
        <TouchableOpacity>
            <Video source={{uri: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'}} style={[{width: null, height: null, flex: 1}]} paused />
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    flex:1,
    width: null,
    alignSelf: 'stretch',
  }
})