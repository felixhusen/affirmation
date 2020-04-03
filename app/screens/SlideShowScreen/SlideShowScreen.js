/**
* <h1>SlideShow screen</h1>
* Slideshow 'instagram' story style for PAffirmation APP
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
import { parseImage } from '../../components/Main/ImageHandler.js';

import React, { Component } from 'react';
import { Animated, View, StyleSheet, ImageBackground, Dimensions, ScrollView, StatusBar, Text, Platform, Button, Slider } from 'react-native';
import { IconToggle } from 'react-native-material-ui';
var SoundPlayer = require('react-native-sound');
import Swiper from 'react-native-swiper';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Sound from 'react-native-audio-exoplayer';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

export default class SlideShowScreen extends Component {

  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  constructor(props) {
    super(props);
    this.state = {
      affirmations: [],
      actionButton: 'pause',
      currentPage: 1,
      loop: true,
      affirmationDuration: 5,
      isPanelVisible: false,
      affirmationVoiceVolume: 1,
      autoplay: true,
      whiteNoiseVolume: 0,
      brainwaveVolume: 0,
      backgroundMusicVolume: 0.5
    };
    SoundPlayer.setCategory('Playback');
    this.playBackgroundMusic();
    this.playWhiteNoise();
    this.playAffirmation = this.playAffirmation.bind(this);
    this.indexChanged = this.indexChanged.bind(this);
  }

  playBackgroundMusic = () => {
    let path = require('../../assets/audio/background_music.mp3');
    if (Platform.OS === 'ios') {
      this.state.backgroundMusic = new SoundPlayer(path, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.state.backgroundMusic.getDuration() + 'number of channels: ' + this.state.backgroundMusic.getNumberOfChannels());
        this.state.backgroundMusic.setVolume(0.5);
        this.state.backgroundMusic.setNumberOfLoops(-1);
        // Play the sound with an onEnd callback
        this.state.backgroundMusic.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            this.state.backgroundMusic.reset();
          }
        });
      });
    } else {
      this.state.backgroundMusic = new Sound();
      try {
        this.state.backgroundMusic.loadAsync(path).then(() => {
          this.state.backgroundMusic.playAsync();
          this.state.backgroundMusic.setIsLoopingAsync(true);
          this.state.backgroundMusic.setVolumeAsync(0.5);
        });
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }

  playWhiteNoise = () => {
    let whiteNoisePath = require('../../assets/audio/white_noise.wav');
    if (Platform.OS === 'ios') {
      this.state.whiteNoise = new SoundPlayer(whiteNoisePath, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.state.whiteNoise.getDuration() + 'number of channels: ' + this.state.whiteNoise.getNumberOfChannels());
        this.state.whiteNoise.setNumberOfLoops(-1);
        this.state.whiteNoise.setVolume(0);
        // Play the sound with an onEnd callback
        this.state.whiteNoise.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            this.state.whiteNoise.reset();
          }
        });
      });
    } else {
      this.state.whiteNoise = new Sound();
      try {
        this.state.whiteNoise.loadAsync(whiteNoisePath).then(() => {
          this.state.whiteNoise.setVolumeAsync(0);
          this.state.whiteNoise.playAsync();
          this.state.whiteNoise.setIsLoopingAsync(true);
        });
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
    
  }

  playBrainwave = () => {
    // play brainwave sound according to the selected brainwave
    let brainwaveName;
    if (this.state.brainwave == 'alpha') {
      brainwaveName = require('../../assets/audio/alpha_brainwaves.wav');
      console.log('Alpha');
    } else if (this.state.brainwave == 'delta') {
      brainwaveName = require('../../assets/audio/delta_brainwaves.wav');
      console.log('Delta');
    } else {
      brainwaveName = require('../../assets/audio/theta_brainwaves.wav');
      console.log('Theta');
    }
    if (Platform.OS === 'ios') {
      this.state.brainwaveSound = new SoundPlayer(brainwaveName, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.state.brainwaveSound.getDuration() + 'number of channels: ' + this.state.brainwaveSound.getNumberOfChannels());
        this.state.brainwaveSound.setNumberOfLoops(-1);
        this.state.brainwaveSound.setVolume(0);
        // Play the sound with an onEnd callback
        this.state.brainwaveSound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            this.state.brainwaveSound.reset();
          }
        });
      });
    } else {
      this.state.brainwaveSound = new Sound();
      try {
        this.state.brainwaveSound.loadAsync(brainwaveName).then(() => {
          this.state.brainwaveSound.setVolumeAsync(0);
          this.state.brainwaveSound.playAsync();
          this.state.brainwaveSound.setIsLoopingAsync(true);
        });
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
    
  }

  playAffirmation(index) {
    let path = Platform.select({
          ios: '',
          android: 'file:///sdcard/Android/data/com.paffirmation/'
    });
    let file = Platform.select({
      ios: this.state.affirmations[index].voice_path + '.m4a',
      android: this.state.affirmations[index].voice_path + '.mp4'
    });
    if (Platform.OS === 'ios') {
      this.state.affirmationVoice = new SoundPlayer(file, path, (error) => {
        this.state.affirmationVoice.setVolume(this.state.affirmationVoiceVolume);
        let duration = this.state.affirmationVoice.getDuration();
        // if the duration is more than 5 sec, then set a custom duration
        if (duration != null && duration > 5) {
          this.setState({ affirmationDuration: duration });
        } else {
          this.setState({ affirmationDuration: 5 });
        }
        
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // Play the sound with an onEnd callback
        this.state.affirmationVoice.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            this.state.affirmationVoice.reset();
          }
        });
      });
    } else {
      // destroy the sound
      if (this.state.affirmationVoice != null && this.state.affirmationVoice._loaded == true) {
          this.state.affirmationVoice.stopAsync();
          this.state.affirmationVoice = null;
      }
      if (this.state.affirmations[index].voice_path != '') {
        
        this.state.affirmationVoice = new Sound();
        try {
          console.log('path: ' + path + file);
          this.state.affirmationVoice.loadAsync({ uri: path+file }).then(() => {
            this.state.affirmationVoice.setVolumeAsync(this.state.affirmationVoiceVolume);
            this.state.affirmationVoice.getStatusAsync().then(result => {
              let duration = result.durationMillis / 1000;
              // if the duration is more than 5 sec, then set a custom duration
              if (duration != null && duration > 5) {
                this.setState({ affirmationDuration: duration });
              } else {
                this.setState({ affirmationDuration: 5 });
              }
            })
            this.state.affirmationVoice.playAsync();
            
          });
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
      }
    }
    
  }

  componentDidMount(){
    // this.activeInterval = setInterval(this.scrolling, 5000);
    this.playAffirmation(0);
    this.playBrainwave();
  }

  componentWillUnmount(){
    // clearInterval(this.activeInterval);
    
    if (Platform.OS === 'ios') {
      this.state.whiteNoise.stop();
      this.state.brainwaveSound.stop();
      this.state.backgroundMusic.stop();
      this.state.affirmationVoice.stop();
    } else {
      this.state.whiteNoise.stopAsync();
      this.state.brainwaveSound.stopAsync();
      this.state.backgroundMusic.stopAsync();
      if (this.state.affirmationVoice != null) {
        this.state.affirmationVoice.stopAsync();
      }      // this.state.affirmationVoice.stop();
    }
    
  }

  componentWillMount() {
    let affs = this.props.navigation.getParam('affirmations', null);
    let isLooped = this.props.navigation.getParam('loop', true);
    let selectedBrainwave = this.props.navigation.getParam('brainwave', 'alpha');
    this.setState({ affirmations: affs, loop: isLooped, brainwave: selectedBrainwave });
  }

  indexChanged(index) {
    if (Platform.OS === 'ios') {
      this.state.affirmationVoice.stop();
      this.state.affirmationVoice.reset();
    }
    
    this.playAffirmation(index);
  }

  render() {
    let imageArray = []
    this.state.affirmations.forEach((affirmation, i) => {
      const aff = (
          <ImageBackground
            key={`image${i}`}
            source={parseImage(affirmation.image_path)}
            style={styles.affirmation}>
            <View style={styles.backgroundTint}></View>
            <Text style={styles.affirmationText}>{affirmation.text}</Text>
          </ImageBackground>
      );
      imageArray.push(aff);
    })

    return (
      <View
        style={styles.container}
        flex={1}>
        <StatusBar hidden />
        
        <Swiper onIndexChanged={(index) => this.indexChanged(index)} autoplay={this.state.autoplay} autoplayTimeout={this.state.affirmationDuration} containerStyle={{ width: '100%', height: '100%' }} showsButtons={false} showsPagination={false} loop={this.state.loop}>
          {imageArray}
        </Swiper>

        <SlidingUpPanel backdropOpacity={0}
          visible={this.state.isPanelVisible}
          onRequestClose={() => this.setState({isPanelVisible: false})}>
          <View style={styles.panel}>
            <View style={{flexDirection: 'row', marginTop: 20}}>

              <View style={{width: '45%'}}>
                <View style={styles.sliderPanel}>
                  <Slider thumbTintColor={Colors.app_primary} minimumTrackTintColor={Colors.app_primary}
                     minimumValue={0}
                     maximumValue={1}
                     value={this.state.backgroundMusicVolume}
                     onValueChange={val => {
                      {Platform.OS === 'ios' ? this.state.backgroundMusic.setVolume(val) : this.state.backgroundMusic.setStatusAsync({ volume: val })}
                      this.setState({ backgroundMusicVolume: val });
                    }}/>
                  <Text style={styles.sliderText}>Background Music</Text>
                </View>
                <View style={styles.sliderPanel}>
                  <Slider thumbTintColor={Colors.app_primary} minimumTrackTintColor={Colors.app_primary}
                     minimumValue={0}
                     maximumValue={1}
                     value={this.state.affirmationVoiceVolume}
                     onValueChange={val => { 
                        if (Platform.OS === 'ios') {
                          this.state.affirmationVoice.setVolume(val);
                        } else {
                          if (this.state.affirmationVoice != null) {
                            this.state.affirmationVoice.setStatusAsync({ volume: val });
                          }
                        } 
                        this.setState({ affirmationVoiceVolume: val });
                     }}/>
                  <Text style={styles.sliderText}>Affirmation</Text>
                </View>
              </View>

              <View style={{width: '45%'}}>
                <View style={styles.sliderPanel}>
                  <Slider thumbTintColor={Colors.app_primary} minimumTrackTintColor={Colors.app_primary}
                     minimumValue={0}
                     maximumValue={1}
                     value={this.state.whiteNoiseVolume}
                     onValueChange={val => {
                      {Platform.OS === 'ios' ? this.state.whiteNoise.setVolume(val) : this.state.whiteNoise.setStatusAsync({ volume: val })}

                      this.setState({ whiteNoiseVolume: val });
                    }}/>
                  <Text style={styles.sliderText}>White Noise Sound</Text>
                </View>
                <View style={styles.sliderPanel}>
                  <Slider thumbTintColor={Colors.app_primary} minimumTrackTintColor={Colors.app_primary}
                     minimumValue={0}
                     maximumValue={1}
                     value={this.state.brainwaveVolume}
                     onValueChange={val => {
                      if (Platform.OS === 'ios') {
                        this.state.brainwaveSound.setVolume(val);
                      } else {
                        this.state.brainwaveSound.setStatusAsync({ volume: val });
                      } 
                      this.setState({ brainwaveVolume: val });
                    }}/>
                  <Text style={styles.sliderText}>Brainwave: {this.state.brainwave}</Text>
                </View>
              </View>
            </View>

          </View>
        </SlidingUpPanel>

        <View style={styles.barContainer}>
          <IconToggle name={this.state.actionButton} color={Colors.app_tint} size={35} onPress={() => {
            if (this.state.actionButton == 'pause') {
              this.setState({ actionButton: 'play-arrow', autoplay: false});
              console.log('pause button pressed!');
              
              
              if (Platform.OS === 'ios') {
                this.state.whiteNoise.pause();
                this.state.brainwaveSound.pause();
                this.state.backgroundMusic.pause();
                this.state.affirmationVoice.pause();
              } else {
                this.state.whiteNoise.pauseAsync();
                this.state.backgroundMusic.pauseAsync();
                this.state.brainwaveSound.pauseAsync();
                if (this.state.affirmationVoice != null) {
                  this.state.affirmationVoice.pauseAsync();
                }
              }
            } else {
              this.setState({ actionButton: 'pause', autoplay: true});
              console.log('play button pressed!');
              
              if (Platform.OS === 'ios') {
                this.state.whiteNoise.play();
                this.state.brainwaveSound.play();
                this.state.backgroundMusic.play();
                this.state.affirmationVoice.play();
              } else {
                this.state.whiteNoise.playAsync();
                this.state.brainwaveSound.playAsync();
                this.state.backgroundMusic.playAsync();
                if (this.state.affirmationVoice != null) {
                  this.state.affirmationVoice.playAsync();
                }
              }
            }
          }}/>
          <IconToggle name="audiotrack" color={Colors.app_tint} size={35} onPress={() => {
            this.setState({isPanelVisible: true});
          }}/>
          { Platform.OS == 'ios' ? <IconToggle name="close" color={Colors.app_tint} size={35} onPress={() => this.props.navigation.pop()}/> : null }
        </View>

        
      </View>
    )
  }
}


const styles = StyleSheet.create({
  sliderPanel: {
    margin: '10%',
    width: '100%'
  },
  sliderText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white'
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    height: '38%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 100,
  },
  affirmationText: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 35,
    marginBottom: 10,
    lineHeight: 40,
    letterSpacing: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 75
  },
  affirmation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundTint: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundColor: 'black',
    zIndex: 50,
    opacity: 0.35,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    zIndex: 1,
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})