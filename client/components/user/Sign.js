import React from 'react';
import { AsyncStorage, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

export default class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
      login: false
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.setView = this.setView.bind(this);
  }
  buildHeaders() {
    return {
      'Authorization': `Bearer ${AsyncStorage.getItem('token')}`
    }
  }
  async login(auth) {
    const resp = await axios.post(`http://powerful-fjord-66775.herokuapp.com/user_token`, { auth }); 
    if (resp.data.jwt != null) {
      await AsyncStorage.setItem('token', resp.data.jwt);
      this.props.getToken(); 
    }
  }
  async register(user) {
    await axios.post(`http://powerful-fjord-66775.herokuapp.com/users`, { user });
    const auth = {
      email: user.email,
      password: user.password
    };
    await this.login(auth);
  }
  setView(view, sign) {
    this.setState({splash: view, login: sign});
  }
  render() {
    if (this.state.splash) {
      return (
        <View style={{backgroundColor: '#52aefc', width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center"}}>    
        <Image source={require('../../assets/images/scroll-icon.png')} style={{height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3}}/>
          <Button 
            title="Login" 
            color="#ffffff"
            onPress={() => this.setView(false,true)} 
            />
          <Button 
            title="Register"
            color="#ffffff"
            onPress={() => this.setView(false,false)} 
          />
        </View>
        </View>
      )
    }
    else {
      return (
        <View>
          {this.state.login ? <Login submit={this.login} reset={() => this.setView(true,true)}/> : <Register submit={this.register} reset={() => this.setView(true,false)}/>}
        </View>
      )
    }
  }
}

