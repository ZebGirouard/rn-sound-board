/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 Platform,
 StyleSheet,
 Text,
 View,
 TouchableHighlight,
 Image,
} from 'react-native';

var Sound = require('react-native-sound');

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      pressed: false,
    }
  }

  componentDidMount() {
    // //this.soundObject.loadAsync(require('./cat_wow.mp3'));
    Sound.setCategory('Playback');
    this.wow = new Sound('cat_wow.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    });
  }

  onPress = () => {
    this.setState({
      pressed: !this.state.pressed,
    })
    // PlaySound('cat_wow')
    // Play the sound with an onEnd callback
    this.wow.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        // whoosh.reset();
      }
    });
    // //this.soundObject.playAsync();
    setTimeout(() => {
      this.setState({
        pressed: !this.state.pressed,
      })
    }, 250)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
         onPress={this.onPress.bind(this)}
        >
          <Image
            style={{width: 200, height: 200}}
            source={this.state.pressed ? require('./depressedButton.png') : require('./unpressedButton.png')}
          />
        </TouchableHighlight>
        <Text
          style={styles.welcome}
        >
          Click Me
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
