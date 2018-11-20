import React from "react";
import { View, StyleSheet, TextInput, Text, Image, Button, TouchableWithoutFeedback } from "react-native";
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
                        width: 500,
                        height: 200,
                    }}
                    >
                        <Image
                            style={{
                            flex: 1,
                            opacity: 0.3,
                            resizeMode:"cover",
                            }}
                            source={{ uri: this.props.moviePojo.posterBackgroundImgUrl}}
                        />

                    </View>



              {/* // image wrapper */}
              <View style={
                //   {backgroundColor: '#11111190', 
                  {padding: 10, flex: 1}}> 
              <Image
          style={{flex: 1, borderColor: "#111", borderWidth: 5}}
          resizeMode="contain"
          source={{uri: this.props.moviePojo.posterImgUrl}}
        />

                  </View>

                  {/* image content wrapper */}
                  <View style={{flex: 4, marginTop: 10}}>  

                    <View style={{backgroundColor: "#11111190", alignSelf: "baseline", padding: 5,}}> 

                      <Text style={styles.movieDescription}> {this.props.moviePojo.title} </Text> 
                        <Text style={styles.movieReleaseYear}> {this.props.moviePojo.releaseYear} </Text>

                        </View> 
                      </View> 
              
          </View>
      ); 
  }
}

const styles = StyleSheet.create({
    movieDescription: {
        fontWeight: "bold", 
        color: "white"
    }, 

    movieDescriptionContainer: {
        marginTop: 5
    },

    movieReleaseYear: {
        color: "white",
        fontStyle: "italic"
    }
}); 