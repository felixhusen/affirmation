import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import { IconToggle } from 'react-native-material-ui';
import { Colors, AppStyle } from '../../config/styles.js';

class RightHeader extends React.Component {
	render() {
		let deleteButton;
		if (this.props.affirmation != null) {
			deleteButton = <IconToggle name="delete" color={Colors.app_tint} onPress={this.props.deleteAction}/>;
		}
		return (
			<View style={{flexDirection:'row'}}>
				{deleteButton}
				<IconToggle name="check" color={Colors.app_tint} onPress={this.props.saveAction}/>
			</View>
		);
	}
}

export default RightHeader;
