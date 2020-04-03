/**
* <h1>Grid Card Component</h1>
* The Grid Card component implements a card that
* simply displays a text in a grid list.
* <p>
* It uses the library react-native-material-ui in order to make the card work.
* 
*
* @author  Felix Husen
* @version 1.0
* @since   2018-12-8
*
* COPYRIGHT (C) 2018-2019 FFX (FELIX HUSEN).
*
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    Image,
    View,
    ImageBackground,
} from 'react-native';
import { styles } from './styles';

export default class GCard extends Component {
    render() {
        return(
        	<TouchableWithoutFeedback onPress={this.props.action}>
                <View style={styles.card}>
    	            <ImageBackground source={this.props.imageURI} style={styles.image} imageStyle={{ borderRadius: 5 }}>
                        <View style={styles.backgroundTint}></View>
    				    <Text style={styles.title}>{this.props.title}</Text>
    				</ImageBackground>
                </View>
			</TouchableWithoutFeedback>
        );
    }
}

