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
    TouchableNativeFeedback,
    Text,
    Image,
    View,
    ImageBackground
} from 'react-native';
import { Button } from 'react-native-material-ui';
import { styles } from './styles';

export default class FSwitch extends Component {
    componentWillMount() {
        let buttonName = this.props.selectedButton;
        if (buttonName == 'first') {
            this.setState({ button1Style: styles.toggleSelected,
                        button2Style: styles.toggle,
                        button3Style: styles.toggle});
        } else if (buttonName == 'second') {
            this.setState({ button1Style: styles.toggle,
                        button2Style: styles.toggleSelected,
                        button3Style: styles.toggle});
        } else if (buttonName == 'third') {
            this.setState({ button1Style: styles.toggle,
                        button2Style: styles.toggle,
                        button3Style: styles.toggleSelected});
        } else {
            this.setState({ button1Style: styles.toggleSelected,
                        button2Style: styles.toggle,
                        button3Style: styles.toggle});
        }
    }

    buttonPressed(buttonName) {
        if (buttonName == 'first') {
            this.setState({ button1Style: styles.toggleSelected,
                        button2Style: styles.toggle,
                        button3Style: styles.toggle});
            this.props.onPress('alpha');
        } else if (buttonName == 'second') {
            this.setState({ button1Style: styles.toggle,
                        button2Style: styles.toggleSelected,
                        button3Style: styles.toggle});
            this.props.onPress('theta');
        } else if (buttonName == 'third') {
            this.setState({ button1Style: styles.toggle,
                        button2Style: styles.toggle,
                        button3Style: styles.toggleSelected});
            this.props.onPress('delta');
        }
    }

    render() {
        return(
        	<View style={styles.container}>
              <Button raised text="Alpha" style={this.state.button1Style} onPress={() => this.buttonPressed('first')}/>
              <Button raised text="Theta" style={this.state.button2Style} onPress={() => this.buttonPressed('second')}/>
              <Button raised text="Delta" style={this.state.button3Style} onPress={() => this.buttonPressed('third')}/>
            </View>
        );
    }
}

