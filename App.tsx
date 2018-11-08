/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';  
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Hello } from './components/Hello';
import hexGenerator from './utils/hexGenerator';
import { Image } from 'react-native'

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
      <View style={containerStyles}>
        {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text> */}
        <Image source={require("./kisspng-cat.jpg")} style={{width: 100, height: 100}}/>
        <Hello name="world" enthusiasmLevel={5}/>
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
