import React from 'react';
import {
  AsyncStorage,
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
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Feed" 
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: '',
      current_user: ''
    }
    this.getPhotos = this.getPhotos.bind(this);
  }
  getPhotos = async () => {
    const resp = await axios.get('http://531b356c.ngrok.io/posts');
    return resp.data;
  }
  componentDidMount = async () => {
    let photos = await this.getPhotos();
    await this.setState({photos});
  }
  async decode() {
    let user = jwt_decode(await AsyncStorage.getItem('token'));
    console.warn(user);
    this.setState({current_user: user.sub});
  }
  render() {
    let { height, width } = Dimensions.get('window');
    if (!this.state.current_user) this.decode().then();
    return (
      <ScrollView horizontal={true} pagingEnabled={true} decelerationRate={0} snaptoInterval={width} snapToAlignment={"center"} style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.state.photos ? this.state.photos.reverse().map(photo => {
          return (
            <ScrollView style={{height}}>
              <Image source={{uri: photo.photo}} style={{width, height: width}}/>
              <Text style={{fontSize: 16}}>{photo.content}</Text>
              {photo.comments.map(comment => {
                return (
                  <Text>{`${comment.user.username}: ${comment.content}`}</Text>
                )
              })}
              {photo.user_id === this.state.current_user ? <Button title="EDIT" onPress={console.warn('yeety')}/> : null}
            </ScrollView>
          )
        }): null}  
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
