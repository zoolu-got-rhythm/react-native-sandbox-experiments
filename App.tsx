/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Hello } from './components/Hello';
import hexGenerator from './utils/hexGenerator';
import { Image } from 'react-native'
import { TextInputComponent } from './components/TextInputComponent';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {};


interface State {
  backgroundColour: string; 
}; 

export default class App extends Component<Props, State> {

  constructor(props: Props){
    super(props); 

    this.state = {
      backgroundColour: hexGenerator()
    }
  }

  componentDidMount(){
    window.setInterval(()=>{
      this.setState({backgroundColour: hexGenerator()}); 
    }, 200)
  }

  render() {

    const containerStyles: object = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      backgroundColor: this.state.backgroundColour,
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', 
      justifyContent: "flex-start", borderWidth: 5, borderColor: "red", maxHeight: 200, 
      alignItems: "stretch"}}>

        <TextInputComponent />
        <View style={{flex: 2, margin: 5, borderRadius: 5, backgroundColor: 'powderblue'}} />
        <View style={{width: Dimensions.get("window").width / 2, flex: 8, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, flex: 2, backgroundColor: 'steelblue'}} />
       
        <Text> hello </Text>
        {/* <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
