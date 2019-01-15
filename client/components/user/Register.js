import React from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      bio: ''
    }
  }
  render() {
    return (
      <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#52aefc'}}>
      <View style={{alignItems: "center", marginTop: Dimensions.get('window').height / 10}}>  
      <Image source={require('../../assets/images/scroll-icon.png')} style={{height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3}}/>
      <TextInput
          style={styles.formBox}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder={"email"}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.formBox}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder={"username"}
        />
        <TextInput
          style={styles.formBox}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder={"password"}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.formBox}
          onChangeText={(password_confirmation) => this.setState({password_confirmation})}
          value={this.state.password_confirmation}
          placeholder={"password confirmation"}
          secureTextEntry={true}
        />
        <Button 
          title="SUBMIT"
          onPress={() => this.props.submit(this.state)}
          color='#ffffff'
        />
        <Button 
          title="RETURN"
          onPress={this.props.reset}
          color='#ffffff'
        />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formBox: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10
  }
})
