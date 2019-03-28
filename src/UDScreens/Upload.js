import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Upload extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedin: false,

        }
    }

    findNewImage = () => {
        // Upload new images to firebase storage
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
                        <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 5}} onPress={() => this.findNewImage()}>
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