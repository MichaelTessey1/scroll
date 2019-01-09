import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView
} from 'react-native';

export default function Editor(props) {
  let { height, width } = Dimensions.get('window');
  return (
      <ScrollView>
        <Image 
          style={{width, height: width}} 
          resizeMode="contain"
          source={props.uri}/>
        <TextInput
          style={{width, height: width / 2, color: 'black', borderColor: 'gray'}}
          onChangeText={(text) => props.onChange(text)}
          value={props.text}
          placeholder={'Enter your caption!'}
          multiline={true}
        />
        <TouchableHighlight 
          onPress={props.handleSubmit}>
          <Text>Submit!</Text>
        </TouchableHighlight>
      </ScrollView>
  )
}
