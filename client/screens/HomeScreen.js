import React from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { MonoText } from '../components/StyledText';
import Editor from '../components/camera/Editor';
import CommentForm from '../components/comment/CommentForm.js';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Feed" 
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: '',
      current_user: '',
      refresh: '',
      content: '',
      photo: '',
      id: '',
      editor: false
    }
    this.refresh = this.refresh.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.buildHeaders = this.buildHeaders.bind(this);
  }
  async buildHeaders() {
    return {
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
    }
  }
  getPhotos = async () => {
    const resp = await axios.get('http://531b356c.ngrok.io/posts');
    await this.setState({photos: resp.data});
  }
  async delete() {
    let headers = await this.buildHeaders();
    const resp = await axios({
      method: 'delete',
      url: `http://531b356c.ngrok.io/posts/${this.state.id}`,
      headers
    });
    await this.refresh();
    this.setState({photo: '', content: '', id: '', editor: false})

  }
  async update() {
    let headers = await this.buildHeaders();
    const resp = await axios({
      method: 'put',
      url: `http://531b356c.ngrok.io/posts/${this.state.id}`,
      data: {
        content: this.state.content 
      },
      headers
    });
    await this.refresh();
    this.setState({photo: '', content: '', id: '', editor: false})
  }
  componentDidMount = async () => {
    await this.getPhotos();
  }
  async decode() {
    let user = jwt_decode(await AsyncStorage.getItem('token'));
    this.setState({current_user: user.sub});
  }
  handleChange(content) {
    this.setState({content});
  }
  async handleEdit(photo, content, id, editor) {
    await this.setState({photo, content, id, editor});
  }
  async refresh() { // thanks to leo
    this.setState({refresh: true});
    await this.getPhotos();
    this.setState({refresh: false})
  }
  render() {
    let { height, width } = Dimensions.get('window');
    if (!this.state.current_user) this.decode().then();
    if (this.state.editor) {
      return (
        <Editor
          uri={{uri: this.state.photo}}
          onChange={this.handleChange}
          text={this.state.content}
          handleSubmit={this.update}
          handleDelete={this.delete}
          handleCancel={() => this.handleEdit('','','',false)}
          canUpdate={true}
        /> 
      )
    }
    else {
      return (
        <ScrollView showsHorizontalScrollIndicator={false} refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.refresh}/>} horizontal={true} pagingEnabled={true} decelerationRate={0} snaptoInterval={width} snapToAlignment={"center"} style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.photos ? this.state.photos.map(photo => {
            return (
              <ScrollView key={photo.id} style={{height}}>
                <Image source={{uri: photo.photo}} style={{width, height: width}}/>
                <View style={{flexDirection: 'row', marginLeft: height / 30, marginTop: height / 60}}>
                  <Text style={{fontSize: 16, fontWeight: '600', color: 'blue'}}>{photo.username + "     "}</Text>
                  <Text style={{fontSize: 16}}>{photo.content}</Text>
                </View>
                {photo.user_id === this.state.current_user ? <Button title="EDIT" onPress={async () => await this.handleEdit(photo.photo, photo.content, photo.id, true)}/> : null}
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, margin: height / 60}}/>
                {photo.comments.map(comment => {
                  return (
                    <View key={comment.id} style={{flexDirection: 'row', marginLeft: height / 30, marginTop: height / 60}}>
                      <Text style={{fontSize: 16, fontWeight: '600', color: 'blue'}}>{comment.user.username + "     "}</Text>
                      <Text style={{fontSize: 16}}>{comment.content}</Text>
                    </View>
                  )
                })}
                <CommentForm post={photo.id} refresh={this.refresh}/>
              </ScrollView>
            )
          }): null}  
        </ScrollView>
      );
    }  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
