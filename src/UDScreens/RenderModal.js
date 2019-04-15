import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Dimensions, Modal, TouchableHighlight} from 'react-native'
import { Animated } from 'react-native'


export default class RenderModal extends Component {
    render() {
        return (
            <Animated.View style={[StyleSheet.absoluteFill, styles.modal]} pointerEvents="none">
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text>Jason Brown</Text>
              </View>
              <Image source={picture} style={styles.image} resizeMode="cover" />
              <View style={styles.footer}>
                <View style={styles.footerContent}>
                  <Text style={styles.text}>Like</Text>
                  <Text style={styles.text}>Comment</Text>
                  <Text style={styles.text}>Share</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,.5)",
    },
    main: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    thumbnail: {
      width: 100,
      height: 100,
    },
    modal: {
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainer: {
      width: "90%",
      height: "60%",
    },
    header: {
      backgroundColor: "#FFF",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      overflow: "hidden",
      padding: 8,
    },
    footer: {
      backgroundColor: "#FFF",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      overflow: "hidden",
      padding: 8,
    },
    footerContent: {
      justifyContent: "space-around",
      flexDirection: "row",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    text: {
      flex: 1,
      fontSize: 18,
      textAlign: "center",
    },
    bold: {
      fontWeight: "bold",
    },
  });