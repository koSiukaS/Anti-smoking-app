import React from 'react';
import { Button, Text, View, Image, CameraRoll, ImageBackground, ActivityIndicator, Linking } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';

import { increaseScoreSpecial, increaseSmokeCount } from '../actions';
import { backgrounds } from '../constants/Constants';

mapStateToProps = (state) => {
  return {
    smoke: state.smoke,
    score: state.score,
    takenImage: null
  };
}

mapDispatchToProps = (dispatch) => {
  return {
    increaseSmokeCount: () => dispatch(increaseSmokeCount()),
    increaseScoreSpecial: (customAmount) => dispatch(increaseScoreSpecial(customAmount))
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MessageModal extends React.Component {
  state = {
    responseYes: false,
    responseNo: false,
    photoTaken: false,
    loadingSmall: false
  }

  _handleResponseYes = (content, sharing, rewardAmount) => {
    console.log(`content: ${content}`);
    console.log(`sharing: ${sharing}`);
    console.log(`reward amount: ${rewardAmount}`);
    if (sharing) this.props.increaseSmokeCount();
    this.props.increaseScoreSpecial(rewardAmount);
    this.setState({ responseYes: true });
  }

  _launchCameraAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    console.log(`status: ${status}`);
    const img = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    console.log('Trying to save to camera roll');
    console.log(img);
    CameraRoll.saveToCameraRoll(img.uri, 'photo');
    console.log('saved');
    this.props.increaseScoreSpecial(5000);
    this.setState({ takenImage: img });
    this.setState({ photoTaken: true });
  }

  render() {
    const { navigation } = this.props;
    const message = JSON.parse(navigation.getParam('message', '{"content": "no message"}'));
    const messagePhoto = JSON.parse(navigation.getParam('messagePhoto', '{"content": "no message for photo"}'));
    const responseYes = JSON.parse(navigation.getParam('responseYes', '{"content": "no yes response"}'));
    const responseNo = JSON.parse(navigation.getParam('responseNo', '{"content": "no no response"}'));
    if (this.state.responseNo) {
      this.timeoutHandle = setTimeout(()=>{
        navigation.goBack();
      }, 5000);
      return (
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
        <ImageBackground source={backgrounds[2].source} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 0, 0.0)', height: '80%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, color: 'rgb(68,68,68)' }}>{responseNo.content}</Text>
          </View>
          </ImageBackground>
          </View>
        );
    } else if (this.state.responseYes && message.photo && !this.state.photoTaken) {
      return (
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
        <ImageBackground source={backgrounds[2].source} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 0, 0.0)', height: '80%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'rgb(68,68,68)' }}>{messagePhoto.content}</Text>
            <View style={{ flexDirection: 'row' }}>
            <Button
              onPress={() => this._launchCameraAsync()}
              title='Įamžinti'
            />
            <Button
              onPress={() => this.setState({ responseNo: true })}
              title='Gal kitą kart...'
            />
            </View>
          </View>
          </ImageBackground>
          </View>
        );
    } else if (this.state.responseYes || this.state.photoTaken) {
      this.timeoutHandle = setTimeout(()=>{
        navigation.goBack();
      }, 5000);
      return (
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
        <ImageBackground source={backgrounds[2].source} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 0, 0.0)', height: '80%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
              {this.state.takenImage && <Image
                source={{ uri: this.state.takenImage.uri }}
                style={{ height: 100, width: 100 }}
               />}
            <Text style={{ fontSize: 20, color: 'rgb(68,68,68)' }}>{responseYes.content}</Text>
          </View>
          </ImageBackground>
          </View>
        );
    } else {
      return (
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
          <ImageBackground source={backgrounds[2].source} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'rgba(255, 255, 0, 0.0)', height: '80%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            {this.state.loadingSmall
              && <View style = {{
                width: 100,
                height: 100,
                justifyContent: 'center',
              }}>
                <ActivityIndicator />
              </View>
            }
            {message.pictureURL && <Image style={
              this.state.loadingSmall
                ? {}
                : {
                  width: 100,
                  height: 100,
                }}
              source={{ uri: message.pictureURL }}
              onLoadStart={() => this.setState({ loadingSmall: true })}
              onLoad={() => this.setState({ loadingSmall: false })}
              resizeMode='contain'
              resizeMethod='scale' />}

              {message.linkURL && <Button title="Paspausk mane" onPress={ ()=>{ Linking.openURL(message.linkURL);}} />}
              <Text style={{ fontSize: 20, color: 'rgb(68,68,68)' }}>{message.content}</Text>
              {message.confirm &&
              <View>
                <View style={{ flexDirection: 'row' }}>
                <Button
                  title='Taip'
                  onPress={() => this._handleResponseYes(responseYes.content, message.sharing, message.rewardAmount)}
                />
                <Button
                  title='Ne'
                  onPress={() => this.setState({ responseNo: true })}
                />
                </View>
              </View>}
            </View>
          </ImageBackground>
              </View>
      );
    }
  }
}
