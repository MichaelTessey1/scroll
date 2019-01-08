import React from 'react';
import {
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
import axios from 'axios';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Feed" 
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: ''
    }
    this.getPhotos = this.getPhotos.bind(this);
  }
  getPhotos = async () => {
    const resp = await axios.get('http://3e4a7a98.ngrok.io/posts');
    return resp.data;
  }
  componentDidMount = async () => {
    let photos = await this.getPhotos();
    await this.setState({photos});
  }
  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.state.photos ? this.state.photos.map(photo => {
          return (
            <Image source={{uri: photo.photo}} style={{height: width / 3, width: width / 3}}/>
          )
        }): null}  
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
