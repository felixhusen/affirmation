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
import { Colors, AppStyle, defaultImage } from '../../config/styles.js';

// screen style import
import { styles } from './styles';

// 3rd party import
import { Button, IconToggle, Avatar } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';

// import default react native component
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';

//image picker options
const options = {
  title: 'Select Picture',
  customButtons: [{ name: 'adb', title: 'Choose Photo from App Database' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

var ImagePicker = require('react-native-image-picker');

var db = new DatabaseHandler();

export default class AboutScreen extends React.Component {
    // default constructor
	constructor(props) {
      // calling super
      super(props);

  }

  componentDidMount() {
    this.props.navigation.setParams({ addCategory: this.addCategory })
  }

  componentWillMount() {

  }

	static navigationOptions = ({ navigation }) => {
	    return {
	      	title: 'About',
          headerLeft: <DrawerButton action={() => { navigation.openDrawer()}}/>
	    };
	};

  confirmReset = () => {
    Alert.alert(
        'Reset',
        'Are you sure to reset all affirmations and categories?',
        [
          {text: 'Yes', onPress: () => this.resetDatabase() },
          {text: 'No'}
        ],
        { cancelable: true }
      );
  }

  resetDatabase = () => {
    db.clearDatabase().then(() => {
      Alert.alert(
        'Successful',
        'Affirmations and categories have been reseted, Please restart the application to re-initialise default affirmations',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
    });
  }

	render() {
		return (
			<View>
        <ScrollView>
          <View style={{margin: 20}}>
            <Image source={require('../../assets/imgs/ic_launcher_circle.png')} style={{width: 200, height: 200, alignSelf: 'center', marginBottom: 20}}/>
            <Text style={styles.appName}>Affirmation Brainwaves Meditation</Text>
            <Text style={styles.headerText}>Version 1.0</Text>
            <Text style={styles.headerText}>Description</Text>
            <Text style={styles.descriptionText}>This affirmation app with inbuilt brainwaves sound and white noise can be used regularly for developing positive mindset.</Text>
            <Text style={styles.descriptionText}>This application can further help you to keep focussed on your core desirable values therefore empowering you to become better and achieve your goals. The brainwaves synchronization has been found to enhance relaxation response and positive influence cognitive abilities.</Text>
            <Text style={styles.headerText}>Developed By</Text>
            <Text style={styles.descriptionText}>Best Value House and Land</Text>
            <Text style={styles.headerText}>Disclaimer</Text>
            <Text style={styles.descriptionText}>The information contained within Affirmation Brainwaves Meditation mobile app (the "Service") is for general information purposes only and assumes no responsibility for any errors or omissions in the contents of the Service</Text>
            <Text style={styles.descriptionText}>In no event Affirmation Brainwaves Meditation App, its developer or owners shall be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service and reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice</Text>
            <Text style={styles.descriptionText}>Last updated: January 16, 2019</Text>
            <View style={styles.clearButton}>
              <Button raised primary text="Reset" onPress={this.confirmReset} style={{container: {backgroundColor: Colors.app_primary}}}/>
            </View>
            <Text style={styles.descriptionText}>© 2018 - 2019 Best Value House and Land</Text>
          </View>
        </ScrollView>
      </View>
		)
	}
}