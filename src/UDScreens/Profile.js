import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Profile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedin: false,
            loaded: false,
            user_info: [],
        }
    }

    checkParams = () => {
        var params = this.props.c
    }

    fetchUserInfo = (userId) => {
        
    }

    componentDidMount = () => {

        var that = this

        

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // Logged in
                var user = firebase.auth().currentUser

                that.state.user_info.push({
                    email: user.email,
                })

                console.log (that.state.user_info)
                
                console.log ("$$$$$$$$$$$$$$$$$$   USER   INFO $$$$$$$$$$$$");
                console.log (user.uid)
                console.log (user.displayName)
                console.log (user.email)
                console.log (user.phoneNumber)
                console.log (user.photoURL)

                that.setState ({
                    loggedin: true,
                })
            } else {
                // Logged Out
                console.log (user)
                that.setState ({
                    loggedin: false,
                })
            }
        })
    }

    render () 
    {
        return (
            <View style={styles.mainContainerLoggedIn}>
                { this.state.loggedin == true ? (
                    // you are logged in
                    <View style={styles.innerOne}>
                        <View style={styles.headerProfile}>
                            <Text>USER PROFILE</Text>
                        </View>
                        
                        <View style={styles.headerProfileAvatar}>
                            <Image source={{uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}}
                            style={styles.profileImage} 
                            />
                            
                            <View style={styles.userNameInfo}>
                                <Text>Name</Text>
                                <Text>@username</Text>
                            </View>
                        </View>

                        <View style={styles.buttonsProfile}>
                            <TouchableOpacity style={styles.opacityButtons}>
                                <Text style={{textAlign: "center"}}>Logout</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.opacityButtons}>
                                <Text style={{textAlign: "center"}}>Change Profile Picture</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.everyThingElse}>
                            <Text>Loading Information</Text>
                        </View>

                    </View>
                ) : (
                    // you are not logged in
                    <View style={styles.mainContainerNotLoggedIn}>
                        <Text>You are not logged in</Text>
                        <Text>Please Login to view your profile</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    mainContainerNotLoggedIn: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
    mainContainerLoggedIn: {
        flex: 1,
    },
    innerOne: {
        flex: 1,
    },
    headerProfile: {
        height: 45,
        paddingTop: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        alignItems: 'center'
    },
    headerProfileAvatar: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    profileImage: {
        marginLeft: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userNameInfo: {
        marginRight: 10,
    },
    buttonsProfile: {
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    opacityButtons: {
        marginTop: 10,
        marginHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1.5,
    },
    everyThingElse: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});