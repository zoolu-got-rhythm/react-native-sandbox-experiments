import { number } from "prop-types";


export default function(min: number, max: number): string{
    // hex val is 16bit, base 16, 16 * 16 = 256, 15 * 16 = 240 + a = 11 = 251 for e.g 
    if(max > 255 || min > max)
        throw new Error("max number too high or min is higher than max"); 

    let range: number = max - min; 
    let hexColour: string = "#"; 

    for(let i: number = 0; i < 3; i++){
        let hexDecimal: string = (min + Math.floor(Math.random() * range)).toString(16); 
        let hexChar: string = hexDecimal.length === 1 ? `0${hexDecimal}` : hexDecimal;  
        hexColour += hexChar; 
    }
    return hexColour; 
}
