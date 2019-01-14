import React from 'react';
import { AsyncStorage, Button, Dimensions, TextInput, View } from 'react-native';
import axios from 'axios';
export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.submit = this.submit.bind(this);
  }
  async buildHeaders() {
    return {
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
    }
  }
  async submit() {
    if (!this.state.content) return;
    const headers = await this.buildHeaders();
    const resp = await axios({
      method: 'post',
      url: `http://0c80ee5c.ngrok.io/comments`,
      data: {
        content: this.state.content,
        post_id: this.props.post
      },
      headers
    });
    this.setState({content: ''})
    this.props.refresh();
  }
  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={{margin: width / 30}}>
          <TextInput
            style={{width: (28 * width) / 30, height: width / 30 }}
            value={this.state.content}
            onChangeText={(content) => this.setState({ content })}
            placeholder="Enter your comment!"/>
          <Button title="SUBMIT" onPress={this.submit}/>
        </View>
    )
  }
}
