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
    console.log(this.camera);
    let photo = await this.camera.takePictureAsync({ base64: true });
    console.log(photo);
  }
  render() {
    console.log(Camera.constants);
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
