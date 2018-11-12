/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Dimensions, TouchableNativeFeedback, RippleBackgroundPropType, ThemeAttributeBackgroundPropType, Alert, GestureResponderEvent, ScrollView, FlatList, SectionList} from 'react-native';
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
  movies: string[]
}; 

function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

type androidNativeButton = RippleBackgroundPropType | ThemeAttributeBackgroundPropType | undefined; 

export default class App extends Component<Props, State> {

  constructor(props: Props){
    super(props); 

    this.state = {
      backgroundColour: hexGenerator(),
      movies: []
    }
  }

  private _onPressButton(e: GestureResponderEvent) {
    Alert.alert("you tapped on button"); 
  }

  private _onLongPressButton(e: GestureResponderEvent){
    Alert.alert("you long-pressed a button"); 
  }

  

  componentDidMount(){
    getMoviesFromApiAsync(); 
    window.setInterval(()=>{
      this.setState({backgroundColour: hexGenerator()}); 
    }, 200)
  }

  render() {

    // const containerStyles: object = {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: 100,
    //   backgroundColor: this.state.backgroundColour,
    // }

    return (
      <View style={{flex: 1, flexDirection: 'column', 
      justifyContent: "flex-start", borderWidth: 5, borderColor: "purple",  
      alignItems: "stretch"}}>

        <TextInputComponent />
        <View style={{height:80, margin: 5, borderRadius: 5, backgroundColor: this.state.backgroundColour}} />
        <View style={{width: Dimensions.get("window").width / 2, height: 20, flex: 8, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, flex: 2, backgroundColor: 'steelblue'}} />


        <ScrollView pagingEnabled={true} style={{height:50, borderWidth: 5}}> 
          <Text> hello </Text>       
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
          <Text> hello </Text>
        </ScrollView>
       
        {/* <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} /> */}

        <SectionList style={{height: 50}}
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item: any, index: number) => index.toString()}
        />

        <View style={{flex: 4, flexDirection: "row", borderColor: "green", borderWidth: 4}}>  
          <TouchableNativeFeedback
              onPress={this._onPressButton}
              onLongPress={this._onLongPressButton}
              background={(Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : '') as androidNativeButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
            </View>
          </TouchableNativeFeedback>

          <FlatList style={{ borderWidth: 5}}
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        </View>
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
  button: {
    width:90,
    borderBottomWidth:5,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flex: 1
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#888',
    color: "#eee"
  }
});
