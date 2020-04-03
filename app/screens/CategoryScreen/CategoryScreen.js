/**
* <h1>Category screen</h1>
* category screen for positive affirmation app
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
import RightHeader from './RightHeader';

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
import FSwitch from '../../components/FSwitch/FSwitch';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';
import EmptyState from '../../components/EmptyState/EmptyState';

var db = new DatabaseHandler()

export default class CategoryScreen extends React.Component {
    // default constructor
  constructor(props) {
      // calling super
      super(props);
      // getting category
      this.category = this.props.navigation.getParam('category', null);
      // initialize state
      this.state = {
        affirmations: [],
        checked: [],
        showLoopMessage: false,
        loopMessage: 'Loop is active',
        loop: true,
        isFetching: true,
        selectedBrainwave: 'alpha'
      };
      // bind some methods
      this.getData = this.getData.bind(this);
      this.onRefresh = this.onRefresh.bind(this);
      this.mapChecked = this.mapChecked.bind(this);
      this.getCheckedAffirmations = this.getCheckedAffirmations.bind(this);
      this.deleteCheckedAffirmations = this.deleteCheckedAffirmations.bind(this);
  }

  componentWillMount() {
      this.subs = [
          this.props.navigation.addListener('didFocus', this.componentDidFocus),
      ];
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.getData() });
  }

  mapChecked() {
    // check all of the affirmations
    if (this.state.checked.length == 0 || this.state.checked == null) {
      this.setState({checked: this.state.affirmations.map((item) => true)});
    }
  }

  getData() {
      // retrieve categories from database
      db.getAffirmations(this.category).then((result) => {
          // set the result to the state
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
    this.props.navigation.setParams({ loop: this.loop, loopIcon: 'sync-disabled', selectAll: this.selectAll, deselectAll: this.deselectAll, reorder: this.reorder, deleteChecked: this.deleteChecked, playSlideshow: this.playSlideshow })
  }

  componentDidFocus = () => {
    this.getData();
  }

  componentWillUnmount() {
      this.subs.forEach(sub => sub.remove());
  }

    // navigation options
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
          // header: <Toolbar centerElement="Searchable" searchable={{ autoFocus: true, placeholder: 'Search',}} rightElement={{ menu: { icon: "more-vert", labels: ["item 1", "item 2"]}}} onRightElementPress={ (label) => { console.log(label) }}/>,
          title: navigation.getParam('category', 'NO-ID').title,
          headerRight: <RightHeader loopIcon={params.loopIcon} playAction={() => params.playSlideshow()} loopAction={() => params.loop()} selectAllAction={() => params.selectAll()} deselectAllAction={() => params.deselectAll()} reorderAction={() => params.reorder()} deleteCheckedAction={() => params.deleteChecked()}/>
      };
  };

  playSlideshow = () => {
    // filter out affirmations that are checked
    let checkedAffirmations = this.getCheckedAffirmations();
    // check if the filter is more than 1
    if (checkedAffirmations.length >= 1) {
      this.props.navigation.navigate('SlideShow', { affirmations: checkedAffirmations, loop: this.state.loop, brainwave: this.state.selectedBrainwave });
    } else {
      Alert.alert(
        'Error',
        'You have to tick at least an affirmation',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
    }
    
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

  deleteChecked = () => {
    this.props.navigation.navigate('DeleteCategory', {category: this.category});
  }

  deleteCheckedAffirmations() {
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
        {text: 'OK', onPress:this.getData()},
      ],
      { cancelable: false }
    );
  }

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

  loop = () => {
    if (this.state.loop == false) {
      // loop is just activated
      this.setState({ loopMessage: 'Loop has been activated!', showLoopMessage: true, loop: true});
      this.props.navigation.setParams({loopIcon: 'sync-disabled'});
    } else {
      // loop is just deactivated
      this.setState({ loopMessage: 'Loop has been disabled!', showLoopMessage: true, loop: false});
      this.props.navigation.setParams({loopIcon: 'loop'});
    }
    
  }

  handleChange = (index) => {
    // handle check on press
    let { checked } = this.state;
    checked[index] = !checked[index];
    this.setState({ checked });
  }

  reorder = () => {
    this.props.navigation.navigate('ReorderCategory', {category: this.category});
  }

  _renderItem = ({ item, index, move, moveEnd, isActive }) => {
      return(
          <View style={styles.card}>
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
      ) 
  }

  _renderHeader = () => {
    return(
        <View>
          <Text style={{margin: 10, textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Please choose preferred brainwave for affirmation/meditation:</Text> 
          <FSwitch onPress={(result) => this.setState({ selectedBrainwave: result })}/>
        </View>
    );
  }

  _onMoveEnd = ({ data }) => {
      this.setState({ categories: data });
  };

  render() {
    return (
      <View style={styles.container}>
          <FlatList
              data={this.state.affirmations}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.id}`}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              contentContainerStyle={{paddingBottom:50}}
              ListHeaderComponent={this._renderHeader}
              ListEmptyComponent=<EmptyState text="No Affirmation" />
          />
          <ActionButton icon="add" onPress={() => this.props.navigation.navigate('EditAffirmation')} />
          <View>
            <Snackbar visible={this.state.showLoopMessage} message={this.state.loopMessage} onRequestClose={() => this.setState({ showLoopMessage: false })} />
          </View>
      </View>
    )
  }
}