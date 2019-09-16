import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class AddEvent extends Component {

  constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        eventName: '',
        isDateTimePickerVisibleStart: false,
        isDateTimePickerVisibleEnd: false,
        startDateText: '',
        endDateText: '',
        startDate:'',
        endDate: '',
        startdateTimeStamp: 0,
        enddateTimeStamp: 0,
        eventInfo: '',
      }
  }

  _showDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: true });
  _showDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: true });


  _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: false });
  _hideDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: false });


  _handleStartDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log (typeof date)
    console.log (date.getTime() / 1000)

    var timeStampTime = date.getTime() / 1000;
    console.log (typeof timeStampTime)
    var dateString = date.toString();
    this._hideDateTimePickerStart();
    this.setState({
      startDateText: dateString,
      startdateTimeStamp:date.getTime() / 1000,
    })
  };

  _handleEndDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log (typeof date)
    console.log (date.getTime() / 1000)

    var timeStampTime = date.getTime() / 1000;
    console.log (typeof timeStampTime)
    var dateString = date.toString();
    this._hideDateTimePickerEnd();
    this.setState({
      endDateText: dateString,
      enddateTimeStamp:date.getTime() / 1000,
    })
  };

  // _handleEndDatePicked = (date) => {
  //   console.log('A date has been picked: ', date);
  //   this._hideDateTimePicker();
  //   console.log (typeof date)
  //   console.log (date.getTime() / 1000)
  // };


  alertAddEvent = () => {
    Alert.alert(
      //title
      'Add Event',
      //body
      'Sure to add event?',
      [
        ,
        {text: 'ADD EVENT', onPress: () => {this.buttonClickListener()}},
        {text: 'CANCEL', onPress: () => {this.resetStates()}},
      ],
      { cancelable: true }
    );
  }

  getRandomUID = (length) => {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
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


  buttonClickListener = () => {
      const { TextInputValue }  = this.state ;
      const { TextInputValueClass } = this.state;
      // Alert.alert(TextInputValue+TextInputValueClass);

      var db = firebase.firestore()

      var that = this;

    // generate random uid first
    var randUID = this.uniqueId()
    console.log ("Randrom UID" + randUID)

    console.log (that.state.TextInputValue)
    console.log (that.state.dateTimeStamp)
    console.log (that.state.eventInfo)

      db.collection('Events').doc(randUID).set({
        dateOfConductStart: that.state.startdateTimeStamp,
        dateOfConductEnd: that.state.enddateTimeStamp,
        info: that.state.eventInfo,
        name: that.state.eventName,
        url:'',
      }).then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    Alert.alert('Event Successfully added!')
    this.resetStates();

  }

  resetStates = () => {

    console.log ('States resetted')

    this.setState({
        TextInputValue: '',
        TextInputValueClass: '',
        isDateTimePickerVisible: false,
        startDateText: '',
        endDateText: '',
        startDate:'',
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
         Add Event 
        </Text>

        {/* <TextInput
          style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2}}
          // Adding hint in TextInput using Placeholder option.
          placeholder=" Enter Class"


          //set the value in state.
          onChangeText={TextInputValue => this.setState({TextInputValue})}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        /> */}
        <TextInput
          style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2}}
          // Adding hint in TextInput using Placeholder option.
          placeholder=" Enter Event Name"
          //set the value in state.
          onChangeText={eventName => this.setState({eventName})}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2}}
          // Adding hint in TextInput using Placeholder option.
          placeholder=" Enter Event Info"
          //set the value in state.
          onChangeText={eventInfo => this.setState({eventInfo})}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity style={styles.DateButton} onPress={this._showDateTimePickerStart}>
            <Text style={{color: 'white'}}>Select Start Date</Text>
        </TouchableOpacity>
        <View>
          <Text>{this.state.startDateText}</Text>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisibleStart}
          onConfirm={this._handleStartDatePicked}
          onCancel={this._hideDateTimePickerStart}
        />
        <TouchableOpacity style={styles.DateButton} onPress={this._showDateTimePickerEnd}>
            <Text style={{color: 'white'}}>Select End Date</Text>
        </TouchableOpacity>
        <View>
          <Text>{this.state.endDateText}</Text>
        </View>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisibleEnd}
          onConfirm={this._handleEndDatePicked}
          onCancel={this._hideDateTimePickerEnd}
        />
        
        {/* <View>
          <Text>{this.state.endDateText}</Text>
        </View> */}

        {/* <TouchableOpacity style={styles.DateButton} onPress={this._showDateTimePicker}>
            <Text style={{color: 'white'}}>Select End Date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleEndDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        <View>
          <Text>{this.state.endDateText}</Text>
        </View> */}

        <View style={[{ width: "93%", margin: 15, backgroundColor: "red" }]}>
          <Button
          onPress={this.alertAddEvent}
          title="PUSH EVENT"
          color="#00B0FF"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    padding: 3,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  DateButton: {
    alignItems: 'center',
    backgroundColor: '#00B0FF',
    height: 45,
    width: "95%",
    padding: 5,
    margin: 1,
  },
});