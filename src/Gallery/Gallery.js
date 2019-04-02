import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer'

import GalleryImage from './GalleryImage';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.openLightbox = (index) => {
      this.setState({
        index,
        shown: true,
      });
    };

    this.hideLightbox = () => {
      this.setState({
        index: 0,
        shown: false,
      });
    };
  }

  state = {
    index: 0,
    shown: false,
  };

  render() {
    const { images } = this.props;
    const { index, shown } = this.state;

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >

        {(() =>
          images.map((image, idx) =>
            <GalleryImage
              index={idx}
              key={idx}
              onPress={this.showLightbox}
              uri={image.uri}
            />
        )())}

        <ImageViewer          
          shown={shown}          
          imageUrls={images}          
          onClose={this.hideLightbox}
          index={index}        
        />
      </View>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array,
};