/**
* <h1>Manage Folder screen</h1>
* Manage folder screen for positive affirmation app
* <p>
*
* @author  Felix Husen
* @version 1.0
* @since   2018-12-8
*
* COPYRIGHT (C) 2018-2019 FFX (FELIX HUSEN).
*
*/

// global constant import
import { Colors, AppStyle } from '../../config/styles.js';
import { parseImage } from '../../components/Main/ImageHandler.js';

// screen style import
import { styles } from './styles';

// 3rd party import
import { ListItem, Icon, ActionButton, Divider } from 'react-native-material-ui';
import DraggableFlatList from 'react-native-draggable-flatlist'

// import default react native component
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  Image,
  Platform
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';
import EmptyState from '../../components/EmptyState/EmptyState';
// import screen
import AddFolderScreen from '../AddFolderScreen/AddFolderScreen';
import HomeScreen from '../HomeScreen/HomeScreen';

var db = new DatabaseHandler()

export default class ManageFolderScreen extends React.Component {
    // default constructor
	constructor(props) {
        // calling super
        super(props);
        // initialize the categories record
        this.state = {
            categories: [],
            isFetching: true,
        }
        this.getData = this.getData.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
      this.setState({ isFetching: true }, function() { this.getData() });
    }

    // it's like viewdidappear
    componentWillMount() {
        this.subs = [
          this.props.navigation.addListener('didFocus', this.componentDidFocus),
        ];
    }

    componentDidFocus = () => {
        this.getData();
    }

    componentWillUnmount() {
        // save the order before the screen is closed
        db.updateCategoriesPosition(this.state.categories);
        this.subs.forEach(sub => sub.remove());
    }

    getData() {
        // get the categories from database

        db.getCategories().then((result) => {
            // set the state categories to the result
            this.setState({
              categories: result,
              isFetching: false,
            });
        }).catch((error) => {
            //this callback is executed when your Promise is rejected
            console.log('Get Categories error: ' + error);
        });
    }

    // navigation options
	static navigationOptions = ({ navigation }) => {
	    return {
	      	title: "Manage Folder",
	    };
	};

    _renderItem = ({ item, index, move, moveEnd, isActive }) => {

        return(
                <View>
                    <ListItem
                        divider
                        style={{container: {height: 80}, primaryText: {fontSize: 18, marginLeft: 10}}}
                        onPress={() => this.props.navigation.push('AddFolder', {category: item})}
                        centerElement={{
                          primaryText: item.title,
                        }}
                        leftElement=<Image source={parseImage(item.image_path)} style={{width: 50, height: 50, borderRadius:5}}/>
                        rightElement=<TouchableWithoutFeedback onPressIn={move} onPressOut={moveEnd}><View style={{margin: 10}}><Icon name="menu"/></View></TouchableWithoutFeedback>
                    />
                </View>
            
        )
        
    }

    _onMoveEnd = ({ data }) => {
        this.setState({ categories: data })
    };

    _addCategory = () => {
        this.props.navigation.push('AddFolder');
    };

	render() {
		return (
			<View style={styles.container}>
                <DraggableFlatList
                    data={this.state.categories}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.title}`}
                    onMoveEnd={this._onMoveEnd}
                    scrollPercent={1}
                    ListEmptyComponent=<EmptyState text="No Categories"/>
                />
                <ActionButton icon="add" onPress={this._addCategory} />
			</View>
		)
	}
}