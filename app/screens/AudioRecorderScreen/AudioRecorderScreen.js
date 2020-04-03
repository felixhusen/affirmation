import React, { Component, SyntheticEvent } from 'react';
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
  Alert
} from 'react-native';

import { Colors } from '../../config/styles.js';

// screen style import
import { styles, ratio, screenWidth } from './styles';

import CircularButton from '../../components/CircularButton/CircularButton';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Toolbar } from 'react-native-material-ui';

export default class AudioRecorderScreen extends React.Component {

  constructor(props) {
    super(props);
    // get audio path if it has existed
    let audioFilePath = this.props.navigation.getParam('path', null);
    let affirmationText  = this.props.navigation.getParam('text', 'Record Audio');
    // initialize state
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      path: audioFilePath,
      text: affirmationText
    };
    // new recorder player
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    
  }

  // navigation options
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
          header: () => {
            return (
              <View>
                { Platform.OS == 'ios' ? <View style={{ height: 30, width: '100%', backgroundColor: Colors.app_primary}}></View> : null }
                <Toolbar leftElement="arrow-back" onLeftElementPress={ (label) => { params.moveBack() }} style={{ container: { backgroundColor: Colors.app_primary, elevation: 0 }}}/>
              </View>
            )
          }
      };
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.moveBack();
    return true;
  }

  componentDidMount() {
    this.props.navigation.setParams({ moveBack: this.moveBack });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  moveBack = () => {
    const onPress = this.props.navigation.getParam('onPress', null);
    onPress(this.state.path);
    this.props.navigation.pop();
  }

  render() {
    const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) * (screenWidth - 56 * ratio);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.titleTxt}>{this.state.text}</Text>
          <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
            <View style={styles.viewRecorder}>
              <View style={styles.recordBtnWrapper}>
                <CircularButton onPress={this.onStartRecord} icon="fiber-manual-record"/>
                <CircularButton onPress={this.onStopRecord} icon="stop"/>
              </View>
            </View>
          <View style={styles.viewPlayer}>
            <TouchableOpacity
              style={styles.viewBarWrapper}
              onPress={this.onStatusPress}
            >
              <View style={styles.viewBar}>
                <View style={[
                  styles.viewBarPlay,
                  { width: playWidth },
                ]}/>
              </View>
            </TouchableOpacity>
            <Text style={styles.txtCounter}>{this.state.playTime} / {this.state.duration}</Text>
            <View style={styles.playBtnWrapper}>
                <CircularButton onPress={this.onStartPlay} icon="play-arrow"/>
                <CircularButton onPress={this.onStopPlay} icon="stop"/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onStatusPress = (e) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) * (screenWidth - 56 * ratio);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);
    console.log(`currentPosition: ${currentPosition}`);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round((currentPosition + 3000));
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round((currentPosition - 3000));
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  }

  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    // set the path if it does not exist
    if (this.state.path == '') {
      this.setState({ path: Math.floor(Date.now() / 1000).toString()});
    }
    // path for both platforms
    let path = Platform.select({
          ios: this.state.path + '.m4a',
          android: 'sdcard/Android/data/com.paffirmation/' + this.state.path + '.mp4'
    });
    const uri = await this.audioRecorderPlayer.startRecorder(path);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    console.log(`uri: ${uri}`);
  }

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  }

  onStartPlay = async () => {
    // check if the path is not empty
    if (this.state.path != '') {
      console.log('onStartPlay');
      let path = Platform.select({
            ios: this.state.path + '.m4a',
            android: 'sdcard/Android/data/com.paffirmation/' + this.state.path + '.mp4'
      });
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.audioRecorderPlayer.stopPlayer();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
        return;
      });
    } else {
      // the path is empty
      Alert.alert(
          'Error',
          'No audio to play',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      );
    }
    
  }

  onPausePlay = async () => {
    this.audioRecorderPlayer.pausePlayer();
  }

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  }
}
