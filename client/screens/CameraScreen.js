import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Camera, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      preview: false,
      type: Camera.Constants.Type.back
    } 
  }
  static navigationOptions = {
    header: null,
  };

  snap = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1,1],
      base64: true
    });
    photo.cancelled ? null : this.setState({photo});
    this.setState({preview : true});
  }

  check = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
      base64: true
    });
    photo.cancelled ? null : this.setState({photo});
    this.setState({preview : true});
  }
  getPermissions = async () => {
    console.log('yeet'); 
  }
  render() {
    let { preview } = this.state;
    if (!preview) {
        return (
          <View>
            <Button title="OPEN CAMERA" onPress={this.snap}/>
            <Button title="OPEN PHOTOS" onPress={this.check}/>
          </View>
         )
    } else {
      let { height, width } = Dimensions.get('window');
        return (
          <View>
            <Image 
              style={{width, height: width}} 
              resizeMode="contain"
              source={{uri: this.state.photo.uri}}/>
          </View>
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
