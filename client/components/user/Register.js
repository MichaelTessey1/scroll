import React from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    }
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.formBox}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder={"email"}
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
        <Button title="SUBMIT"/>
        <Button 
          title="RETURN"
          onPress={this.props.reset}
        />
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
