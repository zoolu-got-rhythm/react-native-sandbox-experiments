import * as React from "react";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Platform, StyleSheet, Text, View, RippleBackgroundPropType, 
  ThemeAttributeBackgroundPropType, Alert, GestureResponderEvent, Image, SectionList} from 'react-native';
import hexGenerator from './utils/hexGenerator';
import getFacebookMoviesApiRequest, { marshalledMoviesObjectShape, MovieDataSectionsByLetter } from "./utils/getFacebookMoviesApiRequest";
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

  

  async componentDidMount(){

    console.log("component did mount"); 
    getFacebookMoviesApiRequest((movies: MovieDataSectionsByLetter)=>{



        window.setTimeout(()=>{
          console.log("callback returned".toUpperCase()); 
          console.log(movies); 
          console.log(movies["I"]); 

          let sectionsListDataArr: movieSectionsShapeForSectionList[] = []; 

          for(let prop in movies){

            console.log(prop); 
            console.log("in movies"); 
            sectionsListDataArr.push({
              title: prop,
              data: movies[prop] as marshalledMoviesObjectShape[]
            })
          }

          console.log("api data for SectionsList"); 
          console.log(sectionsListDataArr)

          this.setState(
            {
              movieSections: sectionsListDataArr
            }
          )
        }, 800); 
        
      }); 
    }
    // getMoviesFromApiAsync(); 
    // getFacebookMoviesApiRequest((moviesDataObjectGroupingArrOfObjectsByLetter: MovieDataSectionsByLetter)=>{
      
      

    // window.setInterval(()=>{
    //   this.setState({backgroundColour: hexGenerator()}); 
    // }, 200)
  

  render() {

    // const containerStyles: object = {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: 100,
    //   backgroundColor: this.state.backgroundColour,
    // }


    console.log(this.state.movieSections.length); 


    let moviesList = this.state.movieSections.length != 0 ? <SectionList style={{height: 50}}
          sections={this.state.movieSections}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item: any, index: number) => index.toString()}
        /> : null; 

    return (
      <View>

        <Text> my facebook movies list </Text>
        {moviesList}

      {/* [
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ] */}

        

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
