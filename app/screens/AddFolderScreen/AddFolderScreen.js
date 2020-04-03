/**
* <h1>Add Folder screen</h1>
* Add folder screen for positive affirmation app
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
import { parseImage, defaultCategoryImages } from '../../components/Main/ImageHandler.js';
import { checkValidity } from '../../components/Main/TextValidity.js';
// screen style import
import { styles } from './styles';

// 3rd party import
import { Dialog, DialogDefaultActions, Button, IconToggle } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';

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

export default class AddFolderScreen extends React.Component {
    // default constructor
	constructor(props) {
      // calling super
      super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ addCategory: this.addCategory, confirmDeleteCategory: this.confirmDeleteCategory });
  }

  componentWillMount() {
      var item = this.props.navigation.getParam('category', null);
      this.setState({
          category: item,
          imageURI: 'happiness',
          defaultImagePicker: false
      });
      console.log('loaded category: ');
      console.log(item);
      if (item != null) {
          console.log('item is not null');
          this.setState({title: item.title});
          this.setState({imageURI: item.image_path});
      }
  }

  _pickFromGallery = () => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          this.setState({
            defaultImagePicker: true
          });
        } else {
          const source = { uri: response.uri };
          this.setState({
              imageURI: JSON.stringify(source),
          });
        }
      });
  }

  addCategory = () => {
    // category object format
    var category = {
        title: this.state.title,
        image_path: this.state.imageURI,
    };
    // check if it meets the requirement
    if (checkValidity(category.title)) {
      // check if it is edit or add category
      if (this.state.category == null) {
          category.id = db.getCategoryPrimaryKey();
          category.position = db.getCategoryPrimaryKey();
          // call add category function from db object
          db.addCategory(category).then(() => {
              // display an alert that the folder has been added
              Alert.alert(
                'Success',
                'Folder has been added',
                [
                  {text: 'OK', onPress: () => this.props.navigation.pop()},
                ],
                { cancelable: false }
              );
          });
      } else {
          category.id = this.state.category.id;
          // call add category function from db object
          db.updateCategory(category).then(() => {
              // display an alert that the folder has been added
              Alert.alert(
                'Success',
                'Folder has been edited',
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
        'Please insert valid text',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
    }
    
  };

  confirmDeleteCategory = () => {
    Alert.alert(
      'Delete Category',
      'Are you sure to delete this category?',
      [
        {text: 'Yes', onPress: () => this.deleteCategory()},
        {text: 'No'}
      ],
      { cancelable: true }
    );
  }

  deleteCategory = () => {
    db.deleteCategory(this.state.category).then(() => {
        Alert.alert(
          'Success',
          'Category has been deleted',
          [
            {text: 'OK', onPress: () => this.props.navigation.pop()},
          ],
          { cancelable: false }
        );
    });
  }

	static navigationOptions = ({ navigation }) => {
      let navTitle;
      const { params = {} } = navigation.state
      if (params.category != null) {
        navTitle = 'Edit Category';
      } else {
        navTitle = 'Add New Category';
      }
      console.log('category: ');
      console.log(params.category);
	    return {
	      	title: navTitle,
          headerRight: <RightHeader action={() => params.addCategory()} deleteAction={() => params.confirmDeleteCategory()} category={params.category}/>
	    };
	};

	render() {
		return (
			<View>
          <SinglePickerMaterialDialog
            title="Pick an image from database"
            items={defaultCategoryImages}
            selectedItem={defaultCategoryImages[0]}
            visible={this.state.defaultImagePicker}
            onCancel={() => this.setState({ defaultImagePicker: false })}
            onOk={result => {
              this.setState({ defaultImagePicker: false });
              this.setState({ imageURI: result.selectedItem.value });
          }}/>
          <ScrollView>
            <View style={{margin: 20}}>
              <TextField label='Category' value={this.state.title} tintColor={Colors.app_primary} fontSize={18} autoFocus={true} onChangeText={ (text) => this.setState({ title: text }) }/>
            </View>
            <Text style={AppStyle.title2}>Pick an image:</Text>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <Button style={{container: { backgroundColor: Colors.app_primary }, text: { color: 'white' }}}raised text="Pick" onPress={this._pickFromGallery} />
            </View>
            <Text style={AppStyle.title2}>Display:</Text>
            <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                <GCard 
                      id={0}
                      title={this.state.title}
                      imageURI={parseImage(this.state.imageURI)}
                      action={() => {}} />
            </View>
          </ScrollView>
      </View>
		)
	}
}

class RightHeader extends React.Component {
  render() {
    var deleteButton;
    if (this.props.category != null) {
      deleteButton = <IconToggle color={Colors.app_tint} onPress={this.props.deleteAction} name="delete"/>;
    }
    return (
      <View style={{flexDirection: 'row'}}>
        {deleteButton}
        <IconToggle color={Colors.app_tint} onPress={this.props.action} name="check"/>
      </View>
      );
  }
}