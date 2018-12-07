import React from "react";
import { requireNativeComponent } from "react-native";
const RCTCustomApiRequestComponent = requireNativeComponent("RCTCustomApiRequestComponent") as any; 

// these prop types map to the android native component view manager
export interface Props{
    shouldScan: boolean; 
    colourHex: string; 
    width: number; 
    messageToUser: string; 
    onTouchEnd: (e: Event) => void
}

export default class CustomApiLoaderVisual extends React.Component<Props> {
    constructor(props: Props) {
        super(props); 
    }

    render() {
        return (
            <RCTCustomApiRequestComponent {...this.props} style={{flex: 1}} />
        )
    }

    componentDidUpdate(prevProps: Props){
        // if(prevProps.width !== this.props.width)
            // this.forceUpdate(); 
    }
}