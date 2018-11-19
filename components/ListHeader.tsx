import React from "react";
import { View, Text } from "react-native";
import hexGenerator from "../utils/hexGenerator";


interface Props{
    letter: string; 
}

export default function(props: Props){

    let childrenBoxesArr: JSX.Element[] = []; 
    for(let i: number = 0; i <= 10; i++){
        const letter: string | null = i === 0 ? props.letter.toUpperCase() : null; 
        childrenBoxesArr.push(
            <View style={{flex: 1, backgroundColor: hexGenerator()}} key={i}> 
                <Text style={{fontWeight: "bold", color: "white", textAlign: "center"}}> 
                    {letter} 
                </Text>
            </View>
        ) 
    }
        
    return (
        <View style={{flexDirection: "row", alignItems: "stretch"}}> 
            {childrenBoxesArr}
        </View>
    )
}
