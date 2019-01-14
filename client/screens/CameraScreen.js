import React from 'react';
import {
  AsyncStorage,
  Button,
  CameraRoll,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, ImagePicker, Permissions } from 'expo';
import Editor from '../components/camera/Editor.js';
import axios from 'axios';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      preview: false,
      text: ''
    }
    this.conditions = this.conditions.bind(this);
    this.permissions = this.permissions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static navigationOptions = {
    title: 'Camera',
  };
  handleChange = (text) => {
    this.setState({text});
  }
  conditions = () => {
    return {
      allowsEditing: true,
      aspect: [1,1],
      base64: true,
      exif: true
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
      CameraRoll.saveToCameraRoll(photo.uri);
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
    const content = this.state.text;
    const token = await AsyncStorage.getItem('token');
    const resp = await axios({
      method: 'post',
      url: `http://fc4616c1.ngrok.io/posts`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        content,
        data,
        name
      }
    });
    this.setState({preview: false})
    this.props.navigation.navigate('Home');
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
      return (
        <Editor
          uri={{uri: this.state.photo.uri}}
          onChange={this.handleChange}
          text={this.state.content}
          handleSubmit={this.publish}
        />
        )
      } 
    }
  }

const styles = StyleSheet.create({ 
  preview: {
    flex: 1, 
    justifyContent: 'center', 
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
