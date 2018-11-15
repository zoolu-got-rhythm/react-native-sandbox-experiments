import * as React from "react";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Platform, StyleSheet, Text, View, RippleBackgroundPropType, 
  ThemeAttributeBackgroundPropType, Alert, GestureResponderEvent, Image} from 'react-native';
import { Hello } from './components/Hello';
import hexGenerator from './utils/hexGenerator';
import { TextInputComponent } from './components/TextInputComponent';
// import getFacebookMoviesApiRequest, { marshalledMoviesObjectShape, MovieDataSectionsByLetter } from './utils/getFacebookMoviesApiRequest';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {};


interface movieSectionsShapeForSectionList{
  title: string, 
  data: marshalledMoviesObjectShape[]
}

interface State {
  backgroundColour: string; 
  movieSections: movieSectionsShapeForSectionList[]; 
}; 

// function getMoviesFromApiAsync() {
//   return fetch('https://facebook.github.io/react-native/movies.json')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.movies;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

type androidNativeButton = RippleBackgroundPropType | ThemeAttributeBackgroundPropType | undefined; 

export default class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props); 

    this.state = {
      backgroundColour: hexGenerator(),
      movieSections: []
    }
  }

  // private _onPressButton(e: GestureResponderEvent) {
  //   Alert.alert("you tapped on button"); 
  // }

  // private _onLongPressButton(e: GestureResponderEvent){
  //   Alert.alert("you long-pressed a button"); 
  // }

  

  componentDidMount(){
    // getMoviesFromApiAsync(); 
    // getFacebookMoviesApiRequest((moviesDataObjectGroupingArrOfObjectsByLetter: MovieDataSectionsByLetter)=>{
      
    //   let sectionsListDataArr: movieSectionsShapeForSectionList[] = []; 

    //   for(let prop in moviesDataObjectGroupingArrOfObjectsByLetter){
    //     sectionsListDataArr.push({
    //       title: prop,
    //       data: (moviesDataObjectGroupingArrOfObjectsByLetter[prop] as marshalledMoviesObjectShape[])
    //     })
    //   }

    //   console.log("api data for SectionsList"); 
    //   console.log(sectionsListDataArr)

    //   this.setState(
    //     {
    //       movieSections: sectionsListDataArr
    //     }
    //   )
    // }); 

    // window.setInterval(()=>{
    //   this.setState({backgroundColour: hexGenerator()}); 
    // }, 200)
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
      <View>

        <Text> my facebook movies list </Text>

      {/* [
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ] */}

        {/* <SectionList style={{height: 50}}
          sections={this.state.movieSections}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item: any, index: number) => index.toString()}
        /> */}

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
