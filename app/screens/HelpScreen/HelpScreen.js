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
import { Dialog, DialogDefaultActions, Button, IconToggle } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';

// import default react native component
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  Image,
  Platform,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import DatabaseHandler from '../../components/Main/DatabaseHandler';

var ImagePicker = require('react-native-image-picker');

var db = new DatabaseHandler();

export default class HelpScreen extends React.Component {
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
	      	title: 'Help',
          headerLeft: <DrawerButton action={() => { navigation.openDrawer()}}/>
	    };
	};

	render() {
		return (
			<View>
        <ScrollView>
          <View style={{margin: 20}}>
            <Text style={styles.descriptionText}>This affirmation app with inbuilt brainwaves sound and white noise can be used regularly for developing positive mindset.</Text>
            <Text style={styles.descriptionText}>This application can further help you to keep focussed on your core desirable values therefore empowering you to become better and achieve your goals. The brainwaves synchronization has been found to enhance relaxation response and positive influence cognitive abilities.</Text>
            <Text style={styles.descriptionText}>The six categories of affirmations included are happiness, health, success, wealth, relationship and weight loss.</Text>
            <Text style={styles.descriptionText}>Each of these categories have 15 affirmations which can be further edited to give it more personal touch for improved effectiveness. You can even add more categories and affirmations or edit or delete the existing ones to have unique user experience and customization.</Text>
            <Text style={styles.headerText}>Main Features:</Text>
            <Text style={styles.descriptionText}>Add new affirmation categories </Text>
            <Text style={styles.descriptionText}>Modify or delete existing affirmation categories</Text>
            <Text style={styles.descriptionText}>Add new affirmation</Text>
            <Text style={styles.descriptionText}>Modify or delete existing affirmation </Text>
            <Text style={styles.descriptionText}>Add voice recording to written affirmations for additional effect</Text>
            <Text style={styles.descriptionText}>Add or modify affirmation background images within application </Text>
            <Text style={styles.descriptionText}>Over 50 background images are included within the app </Text>
            <Text style={styles.descriptionText}>Play alpha, theta or delta brainwaves in the background</Text>
            <Text style={styles.descriptionText}>Play white noise sound in the background</Text>
            <Text style={styles.descriptionText}>Mix the background music, brainwaves binaural sound and white noise</Text>
            <Text style={styles.descriptionText}>Control individually the volume for background music, brainwaves sound and white noise</Text>
            <Text style={styles.descriptionText}>You can also just choose to listen to only brainwaves sound for relaxation and meditation</Text>
            <Text style={styles.headerText}>How it works</Text>
            <Text style={styles.descriptionText}>The affirmations are displayed on your device along with relaxing background music with brainwaves (alpha, theta or delta) binaural sound and white noise. You can choose between alpha, theta or delta brainwaves based on your preference. The default brainwaves is set to alpha.</Text>
            <Text style={styles.descriptionText}>You can also change the volume of the background music, brainwaves, or white noise separately to create a most convenient mix to best suit your affirmations. If you prefer to have no background sound then you can lower the volume for all sounds or mute your phone. </Text>
            <Text style={styles.descriptionText}>To experience the brainwaves binaural fully it is recommended to use headphone.</Text>
            <Text style={styles.headerText}>Important</Text>
            <Text style={styles.descriptionText}>Please note that the volume control bar within the app is independent of your device's main volume, so if there is no sound or it's too high, please adjust your device's volume to balance the sound.</Text>
          </View>
        </ScrollView>
      </View>
		)
	}
}