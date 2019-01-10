import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Register from './Register';

export default class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
      login: false
    }
    this.setView.bind(this);
  }
  setView(splash, login) {
    this.setState({splash, login});
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
          {this.state.login ? <Login reset={() => this.setView(true,true)}/> : <Register  reset={() => this.setView(true,false)}/>}
        </View>
      )
    }
  }
}

