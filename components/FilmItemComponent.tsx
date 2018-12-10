import React from "react";
import { View, StyleSheet, TextInput, Text, Image, Button, TouchableWithoutFeedback, ScrollView, Platform, DeviceEventEmitter } from "react-native";
import { marshalledMoviesObjectShape } from "../utils/getFacebookMoviesApiRequest";

//@ts-ignore


import {NativeModules} from 'react-native';
import { relative } from "path";
const CustomToastModule = NativeModules.ToastExample;  
const CustomScreenDimentionsModule = NativeModules.UIManagerModule; 

export interface Props {
    moviePojo: marshalledMoviesObjectShape
}

// interface State {
  
// }

export class FilmItemComponent extends React.Component<Props> {
  constructor(props: Props) {
      super(props); 
      this.getAndroidScreenDimentions = this.getAndroidScreenDimentions.bind(this); 
      this.getAndroidScreenDimentionsAsync = this.getAndroidScreenDimentionsAsync.bind(this); 
  }

  getAndroidScreenDimentions(): void{
    CustomScreenDimentionsModule.measureLayout(
        100,
        100,
        (msg: string) => {
          console.log(msg);
        },
        (x: number, y: number, width: number, height: number) => {
          CustomToastModule.show(x + ':' + y + ':' + width + ':' + height, CustomToastModule.SHORT);
        },
      );
  }

  async getAndroidScreenDimentionsAsync(): Promise<void>{
    let {relativeX, relativeY, width, height} = await CustomScreenDimentionsModule.measureLayoutPromise(
        100,
        100,
      );

      CustomToastModule.show("from async: DIP" + relativeX + ':' + relativeY + ':' + width + ':' + height, CustomToastModule.SHORT)
  }

  componentDidMount(){
        DeviceEventEmitter.addListener('androidCounter', function(e: Event) {
          // handle event.
          // @ts-ignore
          console.log("ANDROID COUNT: " + e.count); 
        });

        DeviceEventEmitter.addListener('toastModuleOnResume', function(e: Event) {
            // handle event.
            // @ts-ignore
            console.log("ANDROID TOAST MODULE RESUME"); 
          });

          DeviceEventEmitter.addListener('toastModuleOnPause', function(e: Event) {
            // handle event.
            // @ts-ignore
            console.log("ANDROID TOAST MODULE PAUSE"); 
          });

          DeviceEventEmitter.addListener('toastModuleOnDestroy', function(e: Event) {
            // handle event.
            // @ts-ignore
            console.log("ANDROID TOAST MODULE DESTROY"); 
          });
  }

  render(){

        console.log(CustomToastModule); 
      return (
          <View style={{flex: 1, flexDirection: "row", alignItems: "stretch", height: 140, overflow: "hidden"}}> 
            <View onTouchStart={() => CustomToastModule.show("hellllllo", CustomToastModule.SHORT)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 500,
                        height: 200,
                        // zIndex: 5
                    }}
                    >
                        <Image
                            style={{
                            flex: 1,
                            opacity: 0.3,
                            resizeMode:"cover",
                            // zIndex: -5
                            }}
                            source={{ uri: this.props.moviePojo.posterBackgroundImgUrl}}
                        />

                    </View>



              {/* // image wrapper */}
              <View style={
                //   {backgroundColor: '#11111190', 
                  {padding: 10, flex: 1}}> 
              <Image
          style={{flex: 1, borderColor: "lime", borderWidth: 5}}
          resizeMode="contain"
          source={{uri: this.props.moviePojo.posterImgUrl}}
        />

                  </View>

                  <View style={{flex: 4, marginTop: 10,}}>  

                    <View onTouchStart={Platform.OS === "android" ? this.getAndroidScreenDimentionsAsync : ()=>{}} style={{backgroundColor: "#11111190", alignSelf: "baseline", padding: 5}}> 

                      <Text style={styles.movieDescription}> {this.props.moviePojo.title} </Text> 
                        <Text style={styles.movieReleaseYear}> {this.props.moviePojo.releaseYear} </Text>

                        </View> 
                        <ScrollView style={{backgroundColor: "#11111190", alignSelf: "baseline", padding: 5, 
                            marginTop: 5, marginRight: 10, marginBottom: 10, maxHeight: 65}}> 
                            <Text style={styles.movieReleaseYear}> {(this.props.moviePojo.movieDescription as string).substring(0, 250)} </Text>

                            </ScrollView>
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