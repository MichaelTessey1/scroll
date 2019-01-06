/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PostView from './components/post/PostView';
import styles from './styles.js';
import { getPosts } from './services/apiservices';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [] 
    }
  }
  async componentDidMount() {
    let posts = await getPosts();
    this.setState({posts});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
        <PostView posts={this.state.posts} />  
      </View>
    )
  }
}
