import React, { Component } from 'react'
import { Alert, TextInput, ActivityIndicator,Keyboard, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import ImagePicker from 'react-native-image-picker'
import TopNavigation from '../TopNavigators/TopNavigation'

export default class Upload extends Component {


    constructor(props)
    {
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSelected: false,
            uploading: false,
            caption: '',
            progress: 0,
            uri: '',
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
            if (!response.didCancel) {
                console.log ('Upload Image')
                this.setState({
                    imageSelected: true,
                    imageId: this.uniqueId(),
                    uri: response.uri,
                })
                // this.uploadImageToStorage(response.uri);
            } else {
                console.log ('Cancelled')
                this.setState({
                    imageSelected: false,
                })
            }
        })
    }

    handleChooseVideo = () => {
        const options = {
            noData: true,
            mediaType: 'video',
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log ("response ====> ", response)
            if (!response.didCancel) {
                console.log ('Upload Image')
                this.setState({
                    imageSelected: true,
                    imageId: this.uniqueId(),
                    uri: response.uri,
                })
                // this.uploadImageToStorage(response.uri);
            } else {
                console.log ('Cancelled')
                this.setState({
                    imageSelected: false,
                })
            }
        })
    }

    handleCameraPhoto = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchCamera(options, (response) => {
            console.log ("Camera Response Image =========> ", response)
            console.log ("response ====> ", response)
            if (!response.didCancel) {
                console.log ('Upload Image')
                this.setState({
                    imageSelected: true,
                    // imageId: this.imageId,
                    imageId: this.uniqueId(),
                    uri: response.uri,
                })
                // this.uploadImageToStorage(response.uri);
            } else {
                console.log ('Cancelled')
                this.setState({
                    imageSelected: false,
                })
            }
        })
    }


    uploadImageToStorage = async (uri) => {
        // code to upload image to firebase
        var that = this;
        var userid = firebase.auth().currentUser.uid;
        // var imageId = this.state.imageId;
        // var imageId = this.uniqueId()
        var imageId = this.state.imageId;
        console.log ("IMAGE ID $$$$$$$$$$$$$$$$$$$$$$ >>>> " + imageId)

        var re = /(?:\.([^.]+))?$/;

        var ext = re.exec(uri)[1];
        this.setState({
            currentFileType : ext,
            uploading: true,
        });

        // turning image into blob
        const response = await fetch(uri);
        const blob = await response.blob();
        var FilePath = imageId+'.'+that.state.currentFileType;

        const storage = firebase.storage();

        if (ext.includes('mp4') || ext.includes('MP4')) {
            var uploadTask = storage.ref('user/'+userid+'/video/').child(FilePath).put(blob)

        // var snapshot = ref.put(blob).on('state_changed', snapshot => {
        //     console.log ('Progress', snapshot.bytesTransferred, snapshot.totalBytes)
        // })

        uploadTask.on('state_changed', function(snapshot) {
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log ('Uploading is ' + progress + '% complete')
            that.setState ({
                progress: progress,
            })
        }, function(error) {
            console.log ('error with upload - ' + error)
        }, function() {
            // upload is completed
            that.setState({
                progress: 100,
            });
            
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log (downloadURL);
                // alert(downloadURL);
                that.processVideoUpload(downloadURL);
            })
        })
        } else {
            var uploadTask = storage.ref('user/'+userid+'/img/').child(FilePath).put(blob)

        // var snapshot = ref.put(blob).on('state_changed', snapshot => {
        //     console.log ('Progress', snapshot.bytesTransferred, snapshot.totalBytes)
        // })

        uploadTask.on('state_changed', function(snapshot) {
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log ('Uploading is ' + progress + '% complete')
            that.setState ({
                progress: progress,
            })
        }, function(error) {
            console.log ('error with upload - ' + error)
        }, function() {
            // upload is completed
            that.setState({
                progress: 100,
            });
            
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log (downloadURL);
                // alert(downloadURL);
                that.processUpload(downloadURL);
            })
        })
        }

        // // const ref = firebase.storage.ref('/user'+userid+'/img').child(FilePath);
        // var uploadTask = storage.ref('user/'+userid+'/img/').child(FilePath).put(blob)

        // // var snapshot = ref.put(blob).on('state_changed', snapshot => {
        // //     console.log ('Progress', snapshot.bytesTransferred, snapshot.totalBytes)
        // // })

        // uploadTask.on('state_changed', function(snapshot) {
        //     var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        //     console.log ('Uploading is ' + progress + '% complete')
        //     that.setState ({
        //         progress: progress,
        //     })
        // }, function(error) {
        //     console.log ('error with upload - ' + error)
        // }, function() {
        //     // upload is completed
        //     that.setState({
        //         progress: 100,
        //     });
            
        //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //         console.log (downloadURL);
        //         // alert(downloadURL);
        //         that.processUpload(downloadURL);
        //     })
        // })
    }


    processUpload =  (url) => {
        // process here

        // set needed info
        var imageId = this.state.imageId;
        var userId = firebase.auth().currentUser.uid;
        var caption = this.state.caption;
        var dateTime = Date.now();
        var timestamp = Math.floor(+new Date() / 1000)
        var imageUrl = url
        var displayName = firebase.auth().currentUser.displayName
        
       console.log ("Befor Image ID ##################>>>>> "+this.state.imageId)

        // build photo object
        // author, caption, posted, url

        var photoObj = {
            dispName : displayName,
            author: displayName,
            caption: caption,
            posted: timestamp,
            url: imageUrl,
        }

        console.log ("Image ID --------->  "+imageId)
        console.log ("User ID ----------------->" + userId)
        console.log ("Time Stamp ******************************> ", timestamp)


        // create firestore variables
        var db = firebase.firestore();


        // update to database
        


        // add to main feed
        db.collection('Photos').doc(imageId).set(photoObj)


        // set users photos objects
        db.collection('Teachers').doc(userId).collection('Photos').doc(imageId).set(photoObj);

        alert("Image Uploaded")

        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: '',
        }); 

    }

    processVideoUpload = (url) => {
        var imageId = this.state.imageId;
        var userId = firebase.auth().currentUser.uid;
        var caption = this.state.caption;
        var dateTime = Date.now();
        var timestamp = Math.floor(+new Date() / 1000)
        var imageUrl = url
        var displayName = firebase.auth().currentUser.displayName
        
       console.log ("Befor Image ID ##################>>>>> "+this.state.imageId)

        // build photo object
        // author, caption, posted, url

        var photoObj = {
            dispName : displayName,
            author: displayName,
            caption: caption,
            posted: timestamp,
            url: imageUrl,
        }

        console.log ("Image ID --------->  "+imageId)
        console.log ("User ID ----------------->" + userId)
        console.log ("Time Stamp ******************************> ", timestamp)


        // create firestore variables
        var db = firebase.firestore();


        // update to database
        


        // add to main feed
        db.collection('Videos').doc(imageId).set(photoObj)


        // set users photos objects
        db.collection('Teachers').doc(userId).collection('Videos').doc(imageId).set(photoObj);

        alert("Video Uploaded")

        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: '',
        }); 

    }

    cancelUpload = () => {
        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: '',
        }); 
    }

    uploadPublish = () => {

        if (this.state.uploading == false) {
            if (this.state.caption != '') {
                this.uploadImageToStorage(this.state.uri)
            } else {
                alert('Please enter the caption')
            }
        } else {
            console.log ('Ignore button tap as already uploading')
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
        const {goBack} = this.props.navigation;

        return (
            <View style={styles.fullOuterComp}>     
                { this.state.loggedin == true ? (
                    // you are logged in

                    <View style={{flex: 1}}>
                    {/* check if an image is selected */}
                    { this.state.imageSelected == true ? (
                        <View style={{flex: 1}}>
                            <View style={{padding: 5}}>
                                <Text style={{marginTop: 5}}>Description:</Text>

                                <TextInput 
                                editable={true}
                                placeholder={'Enter your caption...'}
                                maxLength={150}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => this.setState({caption: text})}
                                style={styles.inputCaptionText}
                                />

                                <TouchableOpacity 
                                onPress={() => this.uploadPublish()}
                                style={styles.uploadOpButton}
                                >
                                    <Text style={{textAlign: 'center', color: 'white'}}>Publish</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => this.cancelUpload()}
                                style={styles.CancelOpButton}
                                >
                                    <Text style={{textAlign: 'center', color: 'white'}}>Cancel</Text>
                                </TouchableOpacity>

                            { this.state.uploading == true ? (
                                    <View style={{marginTop: 10}}>
                                        <Text>{this.state.progress}%</Text>
                                        { this.state.progress != 100 ? ( <ActivityIndicator size="small" color="blue" /> ) : ( <Text>Processing</Text> )}
                                        
                                    </View>
                                ) : (
                                    <View></View>
                                )}

                                <Image 
                                source={{uri: this.state.uri}}
                                style={{marginTop: 10, resizeMode: 'cover', width: '100%', height: 275}}
                                />

                            </View>
                        </View>
                    ) : (
                        <View style={styles.fullOuterCompUpload}>
                            <Text style={styles.uploadHeader}>Upload</Text>

                            <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 5, margin: 10}} onPress={this.handleChoosePhoto}>
                                <Text style={{color: 'white'}}>Select Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 5}} onPress={this.handleCameraPhoto}>
                                <Text style={{color: 'white'}}>Take Picture</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{padding: 10, backgroundColor: 'blue', borderRadius: 5, marginTop: 10}} onPress={this.handleChooseVideo}>
                                <Text style={{color: 'white'}}>Upload Video</Text>
                            </TouchableOpacity>
                            
                        </View>

                    )}
                    
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
    inputCaptionText: {
        marginVertical: 10,
        height: 100,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'white',
        color: 'black',
    },
    uploadOpButton: {
        // alignSelf: 'center',
        width: 170,
        marginHorizontal: 'auto',
        backgroundColor: 'purple',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    CancelOpButton : {
        width: 170,
        marginHorizontal: 'auto',
        backgroundColor: 'purple',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
})