import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Camera } from 'expo';
import { MonoText } from '../components/StyledText';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      preview: false
    } 
  }
  static navigationOptions = {
    header: null,
  };

  snap = async () => {
    if(this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true });
      this.setState({photo, preview: true});
      console.log(this.state);
    }
  }
  render() {
    console.log(Camera.constants);
    if (!this.state.preview) {
      return (
        <Camera 
          ref={cam => { this.camera = cam; }}
          style={styles.preview} 
        > 
          <Text style={styles.capture}
            onPress={this.snap}> [CAPTURE] </Text>
        </Camera>
      )
    }
    else {
      return (
        <Image 
          style={{width: 500, height: 500}}
          source={{uri: `data:image/png;base64,${this.state.photo.base64}`}}
        /> 
      ) 
    }
  }
}

const styles = StyleSheet.create({ 
  preview: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
  },  
  capture: { 
    flex: 0, 
    backgroundColor: '#fff', 
    borderRadius: 5, 
    color: '#000',
    padding: 10,
    margin: 40
  }   
});
