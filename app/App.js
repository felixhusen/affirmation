/**
 * Felix Husen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// react native imports
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createAppContainer, StackNavigator, DrawerNavigator } from 'react-navigation';

// screen imports
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import HelpScreen from './screens/HelpScreen/HelpScreen';
import ManageFolderScreen from './screens/ManageFolderScreen/ManageFolderScreen';
import CategoryScreen from './screens/CategoryScreen/CategoryScreen';
import ReorderCategoryScreen from './screens/ReorderCategoryScreen/ReorderCategoryScreen';
import DeleteCategoryScreen from './screens/DeleteCategoryScreen/DeleteCategoryScreen';
import AddFolderScreen from './screens/AddFolderScreen/AddFolderScreen';
import AudioRecorderScreen from './screens/AudioRecorderScreen/AudioRecorderScreen';
import EditAffirmationScreen from './screens/EditAffirmationScreen/EditAffirmationScreen';
import SlideShowScreen from './screens/SlideShowScreen/SlideShowScreen';

// import drawer component
import drawerContentComponents from './components/DrawerComponent/DrawerContentComponent';

// global import
import { Colors, AppStyle } from './config/styles.js';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ManageFolder: {
    screen: ManageFolderScreen,
  },
  Category: {
    screen: CategoryScreen
  },
  EditAffirmation: {
    screen: EditAffirmationScreen
  },
  AddFolder: {
    screen: AddFolderScreen
  },
  ReorderCategory: {
    screen: ReorderCategoryScreen
  },
  DeleteCategory: {
    screen: DeleteCategoryScreen
  },
  AudioRecorder: {
    screen: AudioRecorderScreen
  }
}, {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor: Colors.app_tint,
      headerStyle: {
        backgroundColor: Colors.app_primary,
      },
    },
});

const AboutNavigator = createStackNavigator({
  About: {
    screen: AboutScreen
  }
}, {
  initialRouteName: "About",
    defaultNavigationOptions: {
      headerTintColor: Colors.app_tint,
      headerStyle: {
        backgroundColor: Colors.app_primary,
      },
    },
})

const HelpNavigator = createStackNavigator({
  Help: {
    screen: HelpScreen
  }
}, {
  initialRouteName: "Help",
    defaultNavigationOptions: {
      headerTintColor: Colors.app_tint,
      headerStyle: {
        backgroundColor: Colors.app_primary,
      },
    },
})

const ModalNavigator = createStackNavigator({
  Home: {
    screen: HomeNavigator
  },
  SlideShow: {
    screen: SlideShowScreen
  },
}, {
  mode: 'modal',
  headerMode: 'none',
})


const MainNavigator = createDrawerNavigator({
  Home: {
    screen: ModalNavigator,
  },
  Help: {
    screen: HelpNavigator,
  },
  About: {
    screen: AboutNavigator,
  }
}, {
  contentComponent: drawerContentComponents
});

export default createAppContainer(MainNavigator);