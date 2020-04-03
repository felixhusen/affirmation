import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text
} from 'react-native';

export default class EmptyState extends React.Component {

	render() {
		return (
			<View style={styles.container}>
        <Image source={require('../../assets/imgs/Empty_state.png')} style={styles.image}/>
        <Text style={styles.title}>{this.props.text}</Text>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 24,
    marginBottom: 10,
    lineHeight: 35,
    letterSpacing: 1,
    textAlign: 'center'
  },
  container: {
    height: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 125,
    height: 125
  }
})