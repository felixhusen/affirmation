import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import { IconToggle } from 'react-native-material-ui';
import { Colors, AppStyle } from '../../config/styles.js';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class RightHeader extends React.Component {
	_menu = null;
 
	setMenuRef = ref => {
	    this._menu = ref;
	};
	 
	hideMenu = () => {
	    this._menu.hide();
	};
	 
	showMenu = () => {
	    this._menu.show();
	};

	selectAll = () => {
		this._menu.hide();
		this.props.selectAllAction();
	}

	deselectAll = () => {
		this._menu.hide();
		this.props.deselectAllAction();
	}

	reorder = () => {
		this._menu.hide();
		this.props.reorderAction();
	}

	deleteChecked = () => {
		this._menu.hide();
		this.props.deleteCheckedAction();
	}


	render() {
		return (
			<View style={{flexDirection:'row'}}>
				<IconToggle name={this.props.loopIcon} color={Colors.app_tint} onPress={this.props.loopAction}/>
				<IconToggle name="play-arrow" color={Colors.app_tint} onPress={this.props.playAction}/>
				<Menu
		          ref={this.setMenuRef}
		          button={<IconToggle name="more-vert" color={Colors.app_tint} onPress={this.showMenu}/>}
		        >
		          <MenuItem onPress={this.selectAll}>Select All</MenuItem>
		          <MenuItem onPress={this.deselectAll}>Deselect All</MenuItem>
		          <MenuDivider />
		          <MenuItem onPress={this.reorder}>Reorder/Edit</MenuItem>
		          <MenuItem onPress={this.deleteChecked}>Delete</MenuItem>
		        </Menu>
			</View>
		);
	}
}

export default RightHeader;
