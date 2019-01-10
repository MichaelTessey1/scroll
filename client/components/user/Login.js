import React from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder={"password"}
          secureTextEntry={true}
        />
        <Button title="SUBMIT"
          onPress={() => this.props.submit(this.state)}/>
        <Button 
          title="RETURN"
          onPress={() => this.props.reset()}
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
