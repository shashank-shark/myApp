import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import ImagePicker from 'react-native-image-picker'

export default class Upload extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
        }
    }

    randomIdGenerator = () => {
        return Math.floor ((1 * Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    uniqueId = () => {
        return (this.randomIdGenerator() + this.randomIdGenerator() + '-' + this.randomIdGenerator() + '-'
        + this.randomIdGenerator() + '-' + this.randomIdGenerator() + '-' + this.randomIdGenerator());
    }

    findNewImage = () => {
        // Upload new images to firebase storage
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log ("response ====> ", response)
        })
    }

    componentDidMount = () => {
        var that = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // Logged in
                that.setState ({
                    loggedin: true,
                })
            } else {
                // Logged Out
                that.setState ({
                    loggedin: false,
                })
            }
        })
    }

    render () 
    {
        return (
            <View style={styles.fullOuterComp}>     
                { this.state.loggedin == true ? (
                    // you are logged in
                    <View style={styles.fullOuterCompUpload}>
                        <Text style={styles.uploadHeader}>Upload</Text>
                        <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 5}} onPress={this.handleChoosePhoto}>
                            <Text style={{color: 'white'}}>Select Photo</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                ) : (
                    // you are not logged in
                    <View style={styles.userNotLoggedIn}>
                        <Text>You are not logged in</Text>
                        <Text>Please Login to view your profile</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    fullOuterComp: {  
        flex: 1,  
    },
    fullOuterCompUpload: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userNotLoggedIn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadHeader: {
        fontSize: 28,
        paddingBottom: 15,
    },
})