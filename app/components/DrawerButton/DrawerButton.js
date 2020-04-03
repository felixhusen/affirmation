import React from 'react';
import {
	StyleSheet,
	Text,
	FlatList,
	View,
	TouchableOpacity,
	StatusBar,
	Platform
} from 'react-native';
import { Card, Icon, Button, ActionButton, IconToggle } from 'react-native-material-ui';
import { Colors, AppStyle } from '../../config/styles.js';

class DrawerButton extends React.Component {
	render() {
		return (
			<View style={{marginLeft: 5, marginRight: 0}}>
				<IconToggle color={Colors.app_tint} onPress={this.props.action} name="menu"/>
			</View>
			);
	}
}

export default DrawerButton;
