import React from 'react';
import { AsyncStorage, Button, Dimensions, Image, ScrollView, Text, View }from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      user_photos: ''
    }
  } 
  async buildHeaders() {
    return {
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
    }
  }
  async decode() {
    let user = jwt_decode(await AsyncStorage.getItem('token'));
    this.setState({user});
  }
  async getUserPhotos() {
    let headers = await this.buildHeaders();
    const resp = await axios({
      method: 'get',
      url: `http://fc4616c1.ngrok.io/user_posts`,
      headers
    });
    this.setState({user_photos: resp.data});
  }
  async componentDidMount() {
    await this.decode();
    await this.getUserPhotos();
  }
  render() {
    let { height, width } = Dimensions.get('window');
    return ( 
      <ScrollView> 
        <Text style={{fontSize: 36}}>{this.state.user.username}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.state.user_photos ? this.state.user_photos.map(photo => {
          return (
            <Image key={photo.id} source={{uri: photo.photo}} style={{width: width / 3, height: width / 3}}/>
          )
        }) : null}
        </View>
        <Button title="LOG OUT" onPress={() => AsyncStorage.removeItem('token')}/>
      </ScrollView>
    )
  }
}
