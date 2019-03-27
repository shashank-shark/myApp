import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Profile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedin: false,

        }
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
            <View>
                { this.state.loggedin == true ? (
                    // you are logged in
                    <Text>Profile Page</Text>
                ) : (
                    // you are not logged in
                    <View>
                        <Text>You are not logged in</Text>
                        <Text>Please Login to view your profile</Text>
                    </View>
                )}
            </View>
        );
    }
}