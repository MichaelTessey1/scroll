import React, { Component } from 'react';
import { View } from 'react-native';
import Post from './Post';

export default class PostView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.posts);
    return (
      <View>
        {this.props.posts.map(post => {
        return (
          <Post post={post}/>
        )
      })}
      </View>
    )
  }
}
