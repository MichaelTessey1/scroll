import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
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
    const resp = await axios.post('http://531b356c.ngrok.io/user_token', { auth }); 
    if (resp.data.jwt != null) {
      await AsyncStorage.setItem('token', resp.data.jwt);
      this.props.getToken(); 
    }
  }
  async register(user) {
    await axios.post('http://531b356c.ngrok.io/users', { user });
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
        <View style={{flex: 1, justifyContent: "center", textAlign: "center"}}>
          <Button 
            title="Login" 
            onPress={() => this.setView(false,true)} 
            />
          <Button 
            title="Register" 
            onPress={() => this.setView(false,false)} 
            />
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

