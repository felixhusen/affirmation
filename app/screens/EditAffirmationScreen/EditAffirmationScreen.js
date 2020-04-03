/**
* <h1>Edit and Add affirmation screen</h1>
* Edit or add affirmation screen for positive affirmation app
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
import { parseImage, defaultCategoryImages, getDefaultImages } from '../../components/Main/ImageHandler.js';
import { checkValidity } from '../../components/Main/TextValidity.js';
// screen style import
import { styles } from './styles';

// 3rd party import
import { ListItem, Icon, ActionButton, Card, Checkbox, Button, IconToggle, Toolbar } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
var RNFS = require('react-native-fs');

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
  TextInput,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Modal
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import from the app components
import GCard from '../../components/GridCard/GCard';
import DrawerButton from '../../components/DrawerButton/DrawerButton';
import CircularButton from '../../components/CircularButton/CircularButton';
import RightHeader from './RightHeader';
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

export default class EditAffirmationScreen extends React.Component {
    // default constructor
	constructor(props) {
      // calling super
      super(props);
      // initialize default state
      this.state = {
        affirmation: [],
        defaultImagePicker: false,
        selectFolderDialog: false,
        image: { value: 'happiness', label: 'Happiness'},
        text: '',
        categories: [],
        selectedCategory: {},
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
        audio_path: '',
        isDeleteAudio: true
      }
  }

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done, confirmDeleteAffirmation: this.confirmDeleteAffirmation });
  }

  componentWillMount() {
    // get affirmation from param
    var aff = this.props.navigation.getParam('affirmation', null);
    // initialize categories
    var cat = [];
    let catSelected = {};
    // get all categories
    db.getCategories().then(result => {
      // transform each category into single picker dialog format
      for (var i = 0; i < result.length; i++) {
        var item = {
          label: result[i].title,
          value: result[i].id
        };
        cat.push(item);
        if (aff != null && Number(item.value) == Number(aff.category_id)) {
          catSelected = item;
        }
      }
      this.setState({
        categories: cat,
        selectedCategory: cat[0],
        folderSecText: cat[0].label
      });
      if (aff != null) {
        this.setState({selectedCategory: catSelected, folderSecText: catSelected.label});
      }
    });
    
    if (aff != null) {
      // set to the state
      this.setState({ affirmation: aff, text: aff.text, audio_path: aff.voice_path});
      console.log('image_path: ' + aff.image_path);
      this.setState({ image: {value: aff.image_path}, imgSecText: 'Image Picked'});
      if (aff.voice_path != '') {
        this.setState({voiceSecText: 'Voice Recorded'});
        this.state.isDeleteAudio = false;
      } else {
        this.state.voiceSecText = 'Record your affirmation that you want to play';
      }
    } else {
      this.state.imgSecText = 'Choose a background image for this affirmation';
      this.state.voiceSecText = 'Record your affirmation that you want to play';
    }
  }

    // navigation options
	static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      // change the navigation title
      let navTitle = "Edit Affirmation";
      // if there is no affirmation parameter, then add affirmation
      if (params.affirmation == null) {
          navTitle = "Add Affirmation";
      }
	    return {
	      	title: navTitle,
          headerRight: <RightHeader affirmation={params.affirmation} saveAction={() => params.done()} deleteAction={() => params.confirmDeleteAffirmation()}/>
	    };
	};

  done = () => {
      // build affirmation object
      var affirmation = {
          id: db.getAffirmationPrimaryKey(),
          category_id: this.state.selectedCategory.value,
          text: this.state.text,
          image_path: this.state.image.value,
          voice_path: this.state.audio_path,
          position: db.getAffirmationPrimaryKey()
      };
      // check validity of the string
      if (checkValidity(affirmation.text) && checkValidity(affirmation.image_path)) {
        // check if the all of the requirements have been made
        if (this.props.navigation.getParam('affirmation', null) == null) {
            // new affirmation
            db.addAffirmation(affirmation).then(() => {
                // display an alert that the folder has been added
                Alert.alert(
                  'Success',
                  'Affirmation has been added',
                  [
                    {text: 'OK', onPress: () => this.props.navigation.pop()},
                  ],
                  { cancelable: false }
                );
            });
        } else {
            // update affirmation
            affirmation.id = this.state.affirmation.id;
            affirmation.position = this.state.affirmation.position;
            // update affirmation
            db.updateAffirmation(affirmation).then(() => {
                // display an alert that the folder has been added
                Alert.alert(
                  'Success',
                  'Affirmation has been edited',
                  [
                    {text: 'OK', onPress: () => this.props.navigation.pop()},
                  ],
                  { cancelable: false }
                );
            });
        }
      } else {
        Alert.alert(
          'Error',
          'Please insert valid text or image',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        );
      }
      
  }

  confirmDeleteAffirmation = () => {
    // inform the user confirm delete
    Alert.alert(
      'Delete Affirmation',
      'Are you sure to delete this affirmation?',
      [
        {text: 'Yes', onPress: () => this.deleteAffirmation()},
        {text: 'No'}
      ],
      { cancelable: true }
    );
  }

  deleteAffirmation = () => {
    db.deleteAffirmation(this.state.affirmation).then(() => {
      Alert.alert(
        'Success',
        'Affirmation has been deleted',
        [
          {text: 'OK', onPress: () => this.props.navigation.pop()},
        ],
        { cancelable: false }
      );
    });
  }

  _pickImage = () => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          this.setState({ defaultImagePicker: true });
        } else {
          const source = { uri: response.uri };
          this.setState({
              image: { value: JSON.stringify(source), label: 'Custom Image' },
              imgSecText: 'Image Picked'
          });
        }
      });
  }

  _pickFolder = () => {
      this.setState({ selectFolderDialog: true });
  }

  _keyExtractor = (item, index) => item.id.toString();

  updateAffirmation = () => {
    // rebuild affirmation object
    var affirmation = {
        id: this.state.affirmation.id,
        category_id: this.state.affirmation.category_id,
        text: this.state.affirmation.text,
        image_path: this.state.affirmation.image_path,
        voice_path: '',
        position: this.state.affirmation.position
    };
    // update the category
    db.updateAffirmation(affirmation).then(() => {
        // display an alert that the folder has been added
        this.setState({ voiceSecText: 'Record your affirmation that you want to play', isDeleteAudio: true });
    });
  }

  _deleteAudioButton = async () => {
    let path = Platform.select({
          ios: this.state.audio_path + '.m4a',
          android: '/sdcard/Android/data/com.paffirmation/' + this.state.audio_path + '.mp4'
    });

    RNFS.unlink(path).then(() => {
      // delete the audio path
      this.setState({ audio_path: ''});
      // save the affirmation if it has been saved
      if (this.props.navigation.getParam('affirmation', null) == null) {
        this.setState({ voiceSecText: 'Record your affirmation that you want to play', isDeleteAudio: true });
      } else {
        this.updateAffirmation();
      }
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      Alert.alert(
        'Error',
        'Audio has not been deleted: ' + err.message,
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
    });
  }

  _renderItem = ({ item, index }) => {
    return(
        <GCard
            title=''
            imageURI={item}
            numColumns="2"
            action={() => { this.setState({ image: { value: JSON.stringify(item) }, defaultImagePicker: false, imgSecText: 'Image Picked'})}}
        />
    )
  }

	render() {
		return (
			<View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.defaultImagePicker}
            onRequestClose={() => {
              this.setState({ defaultImagePicker: false })
            }}>
            <View>
              <FlatList
                data={getDefaultImages()}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns="2"
                contentContainerStyle={{padding:10}}/>
            </View>
          </Modal>
          
          <SinglePickerMaterialDialog
            title="Choose a folder to save the affirmation"
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            visible={this.state.selectFolderDialog}
            onCancel={() => this.setState({ selectFolderDialog: false })}
            scrolled={true}
            onOk={result => {
              this.setState({ selectFolderDialog: false });
              this.setState({ selectedCategory: result.selectedItem });
              this.setState({ folderSecText: result.selectedItem.label});
            }}/>
            <ScrollView>
          <View style={{margin: 20}}>
            <TextField multiline
              label='Affirmation' value={this.state.text} onChangeText={ (t) => this.setState({ text: t }) } tintColor={Colors.app_primary} fontSize={18}
            />
          </View>
          <Image source={parseImage(this.state.image.value)} style={{height: 200, width: undefined}}/>
          <ListItem
            divider
            style={{container: {height: 80}, primaryText: {fontSize: 18}}}
            leftElement=<Icon name="image" size={35}/>
            centerElement={{
              primaryText: 'Background',
              secondaryText: this.state.imgSecText,
            }}
            onPress={this._pickImage}
          />
          <ListItem
            divider
            style={{container: {height: 80}, primaryText: {fontSize: 18}}}
            leftElement=<Icon name="record-voice-over" size={35}/>
            centerElement={{
              primaryText: 'Voice (Optional)',
              secondaryText: this.state.voiceSecText
            }}
            rightElement=<IconToggle name="close" size={25} style={{marginRight: 5}} onPress={this._deleteAudioButton} disabled={this.state.isDeleteAudio}/>
            onPress={() => {
              let affText;
              if (this.state.text == '' || this.state.text == null) {
                affText = 'Record Audio';
              } else {
                affText = this.state.text;
              }
              this.props.navigation.navigate('AudioRecorder', { path: this.state.audio_path, text: affText, onPress: (path) => {
                this.setState({audio_path: path});
                if (path != '') {
                  this.setState({voiceSecText: 'Voice Recorded', isDeleteAudio: false});
                }
              }});

            }}
          />
          <ListItem
            divider
            style={{container: {height: 80}, primaryText: {fontSize: 18}}}
            leftElement=<Icon name="folder" size={35}/>
            centerElement={{
              primaryText: 'Folder',
              secondaryText: this.state.folderSecText
            }}
            onPress={this._pickFolder}
          />
          <Text style={styles.tips}>Tip: Use voice recording of the affirmation if you want to do close eye meditation alternatively</Text>
          </ScrollView>
			</View>
		)
	}
}