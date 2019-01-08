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
import axios from 'axios';
export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      preview: false,
      type: Camera.Constants.Type.back
    }
    this.conditions = this.conditions.bind(this);
    this.permissions = this.permissions.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  conditions = () => {
    return {
      allowsEditing: true,
      aspect: [1,1],
      base64: true
    }
  }
  permissions = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  snap = async () => {
    await this.permissions();
    let photo = await ImagePicker.launchCameraAsync(this.conditions());
    if (!photo.cancelled) {
      this.setState({photo});
      this.setState({preview : true});
    }
  }

  check = async () => {
    await this.permissions();
    let photo = await ImagePicker.launchImageLibraryAsync(this.conditions());
    if (!photo.cancelled) {
      this.setState({photo});
      this.setState({preview : true});
    }
  }

  publish = async () => {
    const uri = this.state.photo.uri;
    const sections = uri.split('/'); 
    const name = sections[sections.length - 1];
    const data = this.state.photo.base64;
    const resp = await axios({
      method: 'post',
      url: 'http://3e4a7a98.ngrok.io/posts',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDcwNDU3MjksInN1YiI6MSwiZW1haWwiOiJhQGEuY28ifQ.AirhXQYVeIHbc5MYq-E2QctRRWguSML2b9UDaQ7kGX4'
      },
      data: {
        content: "hooby",
        data,
        name,
        user_id: 1
      }
    });
  }
  render() {
    let { preview } = this.state;
    if (!preview) {
        return (
          <View style={styles.preview}>
            <Button title="OPEN CAMERA" onPress={this.snap}/>
            <Button title="OPEN PHOTOS" onPress={this.check}/>
          </View>
         )
    } else {
      let { height, width } = Dimensions.get('window');
      console.log(this.state.photo);
      this.publish();
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
