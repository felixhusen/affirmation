import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, Image, Platform } from 'react-native'
import { white } from 'ansi-colors';
import { Drawer, Avatar } from 'react-native-material-ui';

import { Colors, AppStyle, DefaultImage } from '../../config/styles.js';

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View>
                <ImageBackground source={require('../../assets/imgs/Drawer_image/DrawerImage.jpeg')} style={{width: undefined, height: undefined}}>
                    { Platform.OS == 'ios' ? <View style={{ height: 30, width: '100%'}}></View> : null }
                    <View style={AppStyle.backgroundTint}></View>
                    <Text style={AppStyle.drawerTitle}>Affirmation Brainwaves Meditation</Text>
                    <Text style={AppStyle.drawerSubtitle}>Subconscious Mind Programming</Text>
                </ImageBackground>
            </View>
            
            <Drawer.Section
                items={[
                    { icon: 'home', value: 'Home', onPress:this.navigateToScreen('Home')},
                    { icon: 'help', value: 'Help', onPress:this.navigateToScreen('Help') },
                    { icon: 'group', value: 'About', onPress:this.navigateToScreen('About') },
                ]}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {

    },
    backgroundTint: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        backgroundColor: 'black',
        zIndex: 50,
        opacity: 0.2,
        borderRadius:5,
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff8f8',
        zIndex: 100,
    },
    screenContainer: {
        paddingTop: 20
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },

});