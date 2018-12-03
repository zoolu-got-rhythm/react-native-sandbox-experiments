import * as React from "react";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Platform, StyleSheet, Text, View, RippleBackgroundPropType, 
  ThemeAttributeBackgroundPropType, Alert, GestureResponderEvent, Image, SectionList, Dimensions} from 'react-native';
import hexGenerator from './utils/hexGenerator';
import getFacebookMoviesApiRequest, { marshalledMoviesObjectShape, MovieDataSectionsByLetter } from "./utils/getFacebookMoviesApiRequest";
import { FilmItemComponent } from "./components/FilmItemComponent";
import ListHeader from "./components/ListHeader";
// import getFacebookMoviesApiRequest, { marshalledMoviesObjectShape, MovieDataSectionsByLetter } from './utils/getFacebookMoviesApiRequest';
import {requireNativeComponent} from "react-native"; 
const RCTCustomApiRequestComponent = requireNativeComponent("RCTCustomApiRequestComponent") as any; 

// console.log(RCTCustomApiRequestLoaderComponent); 


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
  orientation: string; 
}; 

type androidNativeButton = RippleBackgroundPropType | ThemeAttributeBackgroundPropType | undefined; 

export default class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props); 

    this.state = {
      backgroundColour: hexGenerator(50, 100),
      movieSections: [], 
      orientation: "portrait"
    }

    let self = this; 

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
          //@ts-ignore
          orientation: "landscape"
      });

      Alert.alert("changing screen orientation"); 
      // self.forceUpdate(); 
  });
  }

  // private _onPressButton(e: GestureResponderEvent) {
  //   Alert.alert("you tapped on button"); 
  // }

  async componentDidMount(){

    // window.setInterval((): void=>{
    //   // this.forceUpdate(); 
    // }, 5000)


    let movies: MovieDataSectionsByLetter = await getFacebookMoviesApiRequest(); 

    let sectionsListDataArr: movieSectionsShapeForSectionList[] = []; 

    for(let prop in movies){
      sectionsListDataArr.push({
        title: prop,
        data: movies[prop] as marshalledMoviesObjectShape[]
      })
    }

    this.setState(
      {
        movieSections: sectionsListDataArr
      }
    )  
  }   


  render() {

    // const containerStyles: object = {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: 100,
    //   backgroundColor: this.state.backgroundColour,
    // }

    console.log(this.state.movieSections.length); 

    let moviesList = this.state.movieSections.length !== 0 ? <SectionList
          sections={this.state.movieSections}
          renderItem={({item}) => <FilmItemComponent moviePojo={item}/>}
          renderSectionHeader={({section}) => <ListHeader letter={section.title} />}
          keyExtractor={(item: any, index: number) => index.toString()}
        /> : null; 

    return (
      <View>
        {/* wrap custom component into js component class wrapper for type(props) inference with typescript */ }
        <View style={{ height:105, flexDirection: "row", backgroundColor: this.state.orientation === "portrait" ? "red" : "green"}}>
          <RCTCustomApiRequestComponent shouldScan={true} style={{flex: 1}}/>
        </View>
        <Text> my movies </Text>
        {moviesList}
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
