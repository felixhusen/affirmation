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
    ImageBackground
} from 'react-native';
import { Button, Icon } from 'react-native-material-ui';
import { Colors } from '../../config/styles';

export default class CircularButton extends Component {

    render() {
        return(
            <View style={{borderRadius: 100, backgroundColor: 'white', margin: 10}}>
            	<TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View>
                      <Icon name={this.props.icon} style={{margin: 3, color: Colors.app_primary}} size={50}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

