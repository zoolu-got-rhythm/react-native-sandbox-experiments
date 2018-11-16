import React from "react";
import { View, StyleSheet, TextInput, Text, Image, Button } from "react-native";
import { marshalledMoviesObjectShape } from "../utils/getFacebookMoviesApiRequest";

export interface Props {
    moviePojo: marshalledMoviesObjectShape
}

// interface State {
  
// }

export class FilmItemComponent extends React.Component<Props> {
  constructor(props: Props) {
      super(props); 
  }

  render(){
      return (
          <View style={{flex: 1, flexDirection: "row", alignItems: "stretch", height: 140}}> 
              {/* // image wrapper */}
              <View style={{backgroundColor: "lime", padding: 5, flex: 1}}> 
              <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={{uri: this.props.moviePojo.posterImgUrl}}
        />

                  </View>

                  {/* image content wrapper */}
                  <View style={{flex: 4}}>  
                      <Text> {this.props.moviePojo.title} </Text> 
                          <Text> {this.props.moviePojo.releaseYear} </Text>
                      </View> 
              
          </View>
      ); 
  }
}

const styles = StyleSheet.create({}); 