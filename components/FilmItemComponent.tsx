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
            <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    >
                        <Image
                            style={{
                            flex: 1,
                            opacity: 0.3,
                            resizeMode:"stretch",
                            }}
                            source={{ uri: this.props.moviePojo.posterBackgroundImgUrl}}
                        />

                    </View>



              {/* // image wrapper */}
              <View style={{backgroundColor: '#11111190', padding: 10, flex: 1}}> 
              <Image
          style={{flex: 1, borderColor: "#111", borderWidth: 3}}
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