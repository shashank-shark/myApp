/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { f, auth, database, storage, firestore } from './config/config';

import { YellowBox } from 'react-native';
import _ from 'lodash';

import StartPage from './src/StartPage';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export default class App extends Component {

  constructor (props) {
    super (props);

    this.state = {
      loggedIn: false,
      email: '',
      password: '',
    }

    var that = this
    f.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log ('User is logged in',user);
        that.setState({
          loggedIn: true,
        })
      } else {
        // console.log ('User logged out',user);
        that.setState({
          loggedIn: false,
        })
      }
    });
  }

  logUserOut = () => {
    auth.signOut()
    .then (() => {
      console.log ('%%%%%%%%%%%%%%%%  The User is Logged out')
    }).catch((error) => {
      console.log ('%%%%%% ERROR', error)
    });
  }

  loginUser = async(email,password) => {
    if (email != '' && password != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email,password);
        console.log (user);
      } catch (errors) {
        console.log (errors);
      }
    } else {
      // If email or password is empty
      alert('Missing email or password')
    }
  }

  render() {
    return (
      this.state.loggedIn == true ? (
        <StartPage />
  ):(
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})} />
        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({password})} />
        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
      </View>
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginUser(this.state.email,this.state.password)}>
      <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      </View>
  )
  );
 }
}

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
  }
}); 