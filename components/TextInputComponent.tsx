import React from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

export interface Props {
   
  }
  
  interface State {
    text: string; 
  }
  
  export class TextInputComponent extends React.Component<{}, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    render(){
        return (
            <View> 
                

                <Text> {`chars: ${this.state.text.length}`}</Text>

                 <TextInput
                    style={styles.textInput}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    />

                    <Button
              title="submit"
              onPress={() => this.setState({text: ""})}
              accessibilityLabel="decrement"
              color="red"
              
           />

            </View>
        ); 
    }
  }


  const styles = StyleSheet.create({
    textInput: {

    }, 
    
    textInputInfo: {

    }
  })