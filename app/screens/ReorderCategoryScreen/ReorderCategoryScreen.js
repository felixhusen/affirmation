/**
* <h1>Home screen</h1>
* Home screen for positive affirmation app
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

// screen style import
import { styles } from './styles';

// 3rd party import
import { ListItem, Icon, ActionButton, Checkbox, Card, Button, IconToggle, Toolbar, Subheader, Snackbar } from 'react-native-material-ui';


// import CheckBox from 'react-native-check-box';

// import default react native component
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';
import DraggableFlatList from 'react-native-draggable-flatlist'

var db = new DatabaseHandler()

export default class ReorderCategoryScreen extends React.Component {
    // default constructor
  constructor(props) {
      // calling super
      super(props);
      // calling test code
      this.category = this.props.navigation.getParam('category', null);
      this.state = {
        affirmations: []
      };
      this.getData = this.getData.bind(this);
      this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
      this.subs = [
          this.props.navigation.addListener('didFocus', this.componentDidFocus),
      ];
  }

  componentWillUnmount() {
      db.updateAffirmationsPosition(this.state.affirmations);
      this.subs.forEach(sub => sub.remove());
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.getData() });
  }

  getData() {
      // retrieve categories from database
      db.getAffirmations(this.category).then((result) => {
        console.log('result affirmations is');
        console.log(result.length);
          this.setState({
            affirmations: result,
            isFetching: false
          });
      }).catch((error) => {
          //this callback is executed when your Promise is rejected
          console.log('Promise is rejected with error: ' + error);
      });
  }

  componentDidMount() {
    this.props.navigation.setParams({ loop: this.loop })
  }

  componentDidFocus = () => {
    this.getData();
  }

    // navigation options
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
          title: 'Edit Affirmations',
      };
  };

  _renderItem = ({ item, index, move, moveEnd, isActive }) => {
      return(
        <View>
          <Card>
              <ListItem
                      onPress={() => this.props.navigation.push('EditAffirmation', {affirmation: item})}
                      style={{primaryText: styles.title2}}
                      centerElement={{
                        primaryText: item.text,
                      }}
                      leftElement=<TouchableWithoutFeedback onPressIn={move} onPressOut={moveEnd}><View><Icon name="menu"/></View></TouchableWithoutFeedback>
              />
          </Card>
        </View>
      ) 
  }

  _onMoveEnd = ({ data }) => {
      this.setState({ affirmations: data });
  };

  render() {
    return (
      <View style={styles.container}>
          <DraggableFlatList
              data={this.state.affirmations}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.title}`}
              onMoveEnd={this._onMoveEnd}
              scrollPercent={1}
          />
      </View>
    )
  }
}