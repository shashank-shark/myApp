import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Dimensions, Modal, TouchableHighlight} from 'react-native'
import { white } from 'ansi-colors'
// import { f, auth, database, storage } from '../../config/config'
import * as firebase from 'firebase';
import 'firebase/firestore';
import ZoomableImage from '../Utilities/ZoomableImage'
import ImageZoom from 'react-native-image-pan-zoom';
import { ScrollView } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import SingleImageZoomViewer from 'react-native-single-image-zoom-viewer'

export default class Feed extends Component {


    constructor(props) {
        super(props);

        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
            images:[],
            isModelVisible: true,
        }

        this.layout = {};

        this.likeRef = React.createRef();
        this.shareRef = React.createRef();
        this.commentRef = React.createRef();
    }

    componentDidMount = () => {
        console.log ("============================   COMPONENT LOADED ===================")
        // Load Feed
        this.loadFeed();

    }

    pluralCheck = (s) => {
        if (s == 1) {
            return ' ago'
        } else {
            return 's ago'
        }
    }

    handleMeasure = (key, ref) => () => {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          this.layout[key] = { x, y, width, height, pageX, pageY };
        });
      };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds  = Math.floor((new Date() - a) / 1000);

        // check for years
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year' + this.pluralCheck(interval)
        }
        
        // check for months
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' month' + this.pluralCheck(interval)
        }

        // check for days
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' day' + this.pluralCheck(interval)
        }

        // check for hours
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hour' + this.pluralCheck(interval)
        }

        // check for minutes
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minute' + this.pluralCheck(interval)
        }

        // check for seconds
        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds)
    }


    // addToFlatList = (photo_feed, doc) => {
    //     var that = this;

    //     // querySnapshot.docs.forEach(doc => {
    //         db.collection('Teachers').where("author","==",doc.data().author).get().then(function(subDoc) {
    //           subDoc.docs.forEach(function(dataDocs) {
    //              photo_feed.push({
    //                  url: doc.data().url,
    //                  posted: that.timeConverter(doc.data().posted),
    //                  author: dataDocs.data().author,
    //                  caption: doc.data().caption,
    //              });
    //              console.log (photo_feed)

    //              that.setState({
    //                  refresh: false,
    //                  loading: false,
    //              });

    //           })
    //         }).catch(function(error) {
    //             console.log ("ERROR INNER  ", error)
    //         })
    //     //  })
        

    // }


    loadFeed = () => {
        
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var db = firebase.firestore()

        var that = this;

        db.collection('Photos').orderBy('posted','desc').get().then(function(querySnapshot) {

            var photo_feed = that.state.photo_feed;
            // var zoomImageFeed = that.state.zoomImageFeed;
            var images = that.state.images;

            querySnapshot.docs.forEach(doc => {
            //    db.collection('Teachers').where("author","==",doc.data().author).get().then(function(subDoc) {
                //  subDoc.docs.forEach(function(dataDocs) {
                //     photo_feed.push({
                //         url: doc.data().url,
                //         posted: that.timeConverter(doc.data().posted),
                //         author: dataDocs.data().author,
                //         caption: doc.data().caption,
                //     });
                //     console.log (photo_feed)

                //     that.setState({
                //         refresh: false,
                //         loading: false,
                //     });

                //  })

                console.log (photo_feed)

                photo_feed.push({
                    url: doc.data().url,
                    posted: that.timeConverter(doc.data().posted),
                    author: doc.data().author,
                    caption: doc.data().caption,
                });

                images.push({
                    url: doc.data().url,
                })

                

                // zoomImageFeed.push({
                //     source: {
                //         uri: doc.data().url,
                //     },
                //     title: doc.data().author,
                //     width: 806,
                //     height: 720,
                //     posted: that.timeConverter(doc.data().posted),
                //     author: doc.data().author,
                //     caption: doc.data().caption,
                // })

                console.log (photo_feed)

                that.setState({
                    refresh: false,
                    loading: false,
                });

            //    }).catch(function(error) {
            //        console.log ("ERROR INNER  ", error)
            //    })
            })
        }).catch(function(error) {
            console.log ("ERROR OUTER  ", error)
        })

        // that.addToFlatList(photo_feed, doc) 
    }

    // Refresh or add new content
    loadNew = () => {
        this.loadFeed();
    }

    ShowModalFunction(visible) {
        this.setState({ isModelVisible: false });
      }


    render () 
    {
        return (
            <View style={{flex: 1}}>


            { this.state.loading == true ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading..</Text>
                </View>
            ) : (
            <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={this.state.photo_feed}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatListHere}
            renderItem={({item, index}) => (
            <View key={index} style={styles.PhotoFeed}>
                    <View style={styles.TimeUploader}>
                        <Text>{item.posted}</Text>
                        <Text>{item.author}</Text>
                    </View>

                    <View>

                    {/* <Modal
                        visible={this.state.isModelVisible}
                        transparent={false}
                        onRequestClose={() => this.ShowModalFunction()}>
                        <ImageViewer imageUrls={this.state.images} />
                    </Modal> */}

                       {/* <Image
                        source={{uri: item.url }}
                        style={styles.imageFeed}
                        resizeMethod={"scale"}
                        /> */}

                        <TouchableHighlight>
                            <Image
                                source={{uri: item.url }}
                                style={styles.imageFeed}
                                resizeMethod={"resize"}
                                resizeMode={"stretch"}
                            />
                        </TouchableHighlight>


                        {/* <SingleImageZoomViewer source={{uri:item.url}}/> */}
                        {/* <ImageView
                            images={images}
                            imageIndex={0}
                            isVisible={this.state.isImageViewVisible}
                            renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                        /> */}
                        {/* <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={200}
                        imageHeight={200}>
                            <Image style={{width:200, height:200}}
                                source={{uri:item.url}}/>
                        </ImageZoom> */}
                    </View>

                    <View style={styles.CaptionComment}>
                        <Text>{item.caption}</Text>
                    </View>
            </View>

            )}
            />
            )}
              
            </View>
        );
    }
}


const styles = StyleSheet.create({  
    imageFeed: {  
        width: '100%',
        height: 400,
    },
    flatListHere: {
        flex: 1,
        backgroundColor: '#eee',
    },
    PhotoFeed: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    TimeUploader: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CaptionComment: {
        padding: 5,
    },
    CommentsHere: {
        marginTop: 10,
        textAlign: 'center',
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
      },
});