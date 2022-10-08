import React from "react";
import { View, Image } from "react-native";
import { styles } from "../Styles";

export function ProgressiveImage(props: any) {

    return (

        <>
            <Image
                {...props}
                source={props.thumbnailSource}
                blurRadius={2}/>
            <Image
                {...props}
                source={props.source}
                style={[styles.imageOverlay, props.style]}/>
        </>

    );
  }