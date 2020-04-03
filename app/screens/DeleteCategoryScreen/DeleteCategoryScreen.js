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
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import RightHeader from './RightHeader';
import EmptyState from '../../components/EmptyState/EmptyState';

var db = new DatabaseHandler()

export default class DeleteCategoryScreen extends React.Component {
    // default constructor
  constructor(props) {
    // calling super
    super(props);
    // calling test code
    this.category = this.props.navigation.getParam('category', null);
    this.state = {
      affirmations: [],
      checked: [],
      isFetching: true
    };
    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.mapChecked = this.mapChecked.bind(this);
    this.getCheckedAffirmations = this.getCheckedAffirmations.bind(this);
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

  mapChecked() {
    // check all of the affirmations
    this.setState({checked: this.state.affirmations.map((item) => false)});
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
        this.mapChecked();
    }).catch((error) => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error: ' + error);
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ loop: this.loop, selectAll: this.selectAll, deselectAll: this.deselectAll, deleteChecked: this.deleteChecked })
  }

  componentDidFocus = () => {
    this.getData();
  }

  // navigation options
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
          title: 'Delete Affirmations',
          headerRight: <RightHeader selectAllAction={() => params.selectAll()} deselectAllAction={() => params.deselectAll()} deleteCheckedAction={() => params.deleteChecked()}/>
      };
  };

  selectAll = () => {
    // select all affirmations
    let checks = this.state.checked;
    checks = this.state.affirmations.map(item => true);
    this.setState({ checked: checks });
  }

  deselectAll = () => {
    // deselect all
    let checks = this.state.checked;
    checks = this.state.affirmations.map(item => false);
    this.setState({ checked: checks });
  }

  getCheckedAffirmations() {
    // initialize new array
    var filteredAffirmations = [];
    // loop the array search which one is checked
    for (var i = 0; i < this.state.affirmations.length; i++) {
      if (this.state.checked[i] == true) {
        // insert to the array if it's checked
        filteredAffirmations.push(this.state.affirmations[i]);
      }
    }
    return filteredAffirmations;
  }

  confirmDeleteCheck = () => {
    Alert.alert(
      'Delete Affirmations',
      'Are you sure to delete ticked affirmations?',
      [
        {text: 'Yes', onPress:() => this.deleteChecked()},
        {text: 'No'}
      ],
      { cancelable: true }
    );
  }

  deleteChecked = () => {
    // delete ticked affirmations
    var checkedAffirmations = this.getCheckedAffirmations();
    for (let affirmation of checkedAffirmations) {
      db.deleteAffirmation(affirmation);
    }
    // inform they are deleted!
    Alert.alert(
      'Successful',
      'Affirmations have been deleted',
      [
        {text: 'OK', onPress:() => this.getData()},
      ],
      { cancelable: false }
    );
  }

  _renderItem = ({ item, index }) => {
      return(
        <View>
          <View>
              <Card>
                  <View>
                      <Checkbox
                          label={item.text}
                          value="Value"
                          checked={this.state.checked[index]}
                          style={{icon: {color: Colors.app_primary}, label: AppStyle.title2}} 
                          onCheck={() => this.handleChange(index)}/>
                  </View>
              </Card>
            </View>
        </View>
      ) 
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.getData() });
  }

  handleChange = (index) => {
    // handle check on press
    let { checked } = this.state;
    checked[index] = !checked[index];
    this.setState({ checked });
  }

  _onMoveEnd = ({ data }) => {
      this.setState({ affirmations: data });
  };

  _renderHeader = () => {
    return(
        <View>
          <Text style={{margin: 10, textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Please tick the affirmations that you want to delete and press delete button shown above</Text> 
          
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={this.state.affirmations}
            renderItem={this._renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item, index) => `draggable-item-${item.title}`}
            ListHeaderComponent={this._renderHeader}
            ListEmptyComponent=<EmptyState text="No Affirmation" />
          />
      </View>
    )
  }
}