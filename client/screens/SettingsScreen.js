import React from 'react';
import { AsyncStorage, Button, View, Text }from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return ( 
      <View>
        <Text>SHMOOPY</Text>
        <Button title="LOG OUT" onPress={() => AsyncStorage.removeItem('token')}/>
      </View>
    )
  }
}
