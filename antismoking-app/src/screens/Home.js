import React from 'react';
import {
  Button,
  Text,
  View, 
  AsyncStorage,
  Switch,
  TextInput,
  Image,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import { UrlConstants, backgrounds } from '../constants/Constants';
import { fetchData } from '../helpers/api';
import {
  increaseSmokeCount,
  clearSmokeCount,
  increaseScoreSpecial,
  increaseScoreSmoking,
  increasemultiplierReward
} from '../actions';

import Item from '../components/Item';
import Cigarette from '../components/Cigarette';
import MoneyBoard from '../components/MoneyBoard';

mapStateToProps = (state) => {
  return {
    smoke: state.smoke,
    score: state.score
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    increaseSmokeCount: () => dispatch(increaseSmokeCount()),
    clearSmokeCount: () => dispatch(clearSmokeCount()),
    increaseScoreSpecial: (customAmount) => dispatch(increaseScoreSpecial(customAmount)),
    increaseScoreSmoking: () => dispatch(increaseScoreSmoking()),
    increasemultiplierReward: () => dispatch(increasemultiplierReward())
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class HomeScreen extends React.Component {
  state = {
    messages: null,
    messagesPhoto: null,
    responsesYes: null,
    responsesNo: null,
    smoking: false
  }

  componentWillMount(){
    // this._loadValuesFromStorage();
    this._prepareData();
  }

  _saveToStorage = async() => {
    try {
      const data = {
        smokeCount: this.props.smoke.smokeCount,
        totalScore: this.props.score.totalScore,
        multiplierReward: this.props.score.multiplierReward
      };
      AsyncStorage.setItem('appValues', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
    console.log('Values saved');
  }

  _loadValuesFromStorage = async() => {
    try {
      const valuesFromStorage = await AsyncStorage.getItem('appValues');
      if (valuesFromStorage) {
        console.log('App values found in memory');
        console.log(valuesFromStorage);
        //return JSON.parse(valuesFromStorage);
      } else {
        console.log('No data nowhere :\")');
      }
    } catch (error) {
      console.log(error);
    }
  }

  _prepareData = async() => {
    let messages = null;
    let messagesPhoto = null;
    let responsesYes = null;
    let responsesNo = null;

    this.setState({ messages: await this._getData(null, 'messages') });
    this.state.messages ? console.log('messages from memory have been prepared') : console.log('messages have have failed to be prepared');
    this.setState({ messagesPhoto: await this._getData(null, 'messagesPhoto') });
    this.state.messages ? console.log('messagesPhoto from memory have been prepared') : console.log('messagesPhoto have have failed to be prepared');
    this.setState({ responsesYes: await this._getData(null, 'responsesYes') });
    this.state.responsesYes ? console.log('responsesYes from memory have been prepared') : console.log('responsesYes have have failed to be prepared');
    this.setState({ responsesNo: await this._getData(null, 'responsesNo') });
    this.state.responsesNo ? console.log('responsesNo from memory have been prepared') : console.log('responsesNo have have failed to be prepared');

    if (!this.state.offline) {
      messages = await fetchData(UrlConstants.MESSAGES);
      messagesPhoto = await fetchData(UrlConstants.MESSAGES_PHOTO);
      responsesYes = await fetchData(UrlConstants.YES_RESPONSES);
      responsesNo = await fetchData(UrlConstants.NO_RESPONSES);
    }

    this.setState({ messages: await this._getData(messages, 'messages') });
    this.state.messages ? console.log('messages have been updated') : console.log('Messages have have failed to be prepared');
    this.setState({ messagesPhoto: await this._getData(messagesPhoto, 'messagesPhoto') });
    this.state.messagesPhoto ? console.log('messagesPhoto have been updated') : console.log('Photo messages have have failed to be prepared');
    this.setState({ responsesYes: await this._getData(responsesYes, 'responsesYes') });
    this.state.responsesYes ? console.log('responsesYes have been updated') : console.log('responsesYes have have failed to be prepared');
    this.setState({ responsesNo: await this._getData(responsesNo, 'responsesNo') });
    this.state.responsesNo ? console.log('responsesNo have been updated') : console.log('responsesNo have have failed to be prepared');
  }

  _getData = async (data, dataName) => {
    try {
      if (data && !this.state.offline) {
        console.log(`${dataName} have been fetched from the server`);
        AsyncStorage.setItem(`offline${dataName}`, JSON.stringify(data));
      } else {
        console.log(`Getting ${dataName} from memory`);
        try {
          const asyncStorageData = await AsyncStorage.getItem(`offline${dataName}`);
          if (asyncStorageData) {
            console.log(`${dataName} was found in memory`);
            return JSON.parse(asyncStorageData);
          } else {
            console.log(`Can't find ${dataName} in memory`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      return data;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  _getMessages = async () => {
    this.setState({ data: await fetchData(UrlConstants.MESSAGES) });
  }

  _smoke = () => {
    const { messages, messagesPhoto, responsesYes, responsesNo } = this.state;
    const { navigation, smoke } = this.props;

    if (messages && messagesPhoto && responsesYes && responsesNo) {
      this.setState({ smoking: true });
      this.timeoutHandle = setTimeout(()=>{
        this.setState({ smoking: false });
      }, 5000);
      this.props.increaseScoreSmoking();
      this.props.increasemultiplierReward();
      this.props.increaseSmokeCount();
      let randomMessageInt = '';
      let message = {};
      do {
        randomMessageInt = this._getRandomInt(messages.length);
        message = messages[randomMessageInt];
        console.log(`Message: ${randomMessageInt}`);
      } while (smoke.smokeCount < message.minCount);
      const randomMessagePhotoInt = this._getRandomInt(messagesPhoto.length);
      console.log(`Photo message: ${randomMessagePhotoInt}`);
      const randomResponseYesInt = this._getRandomInt(responsesYes.length);
      console.log(`Yes Response: ${randomResponseYesInt}`);
      const randomResponseNoInt = this._getRandomInt(responsesNo.length);
      console.log(`No Response: ${randomResponseNoInt}`);
      console.log(messages[randomMessageInt]);
      navigation.navigate('Message', {
        message: JSON.stringify(message),
        messagePhoto: JSON.stringify(messagesPhoto[randomMessagePhotoInt]),
        responseYes: JSON.stringify(responsesYes[randomResponseYesInt]),
        responseNo: JSON.stringify(responsesNo[randomResponseNoInt])
      });
      } else {
        Alert.alert('Trūksta pranešimo duomenų');
      }
  }

  _getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  _setScoreWithAsync = async () => {
    const message = await fetchData(UrlConstants.MESSAGES);
    this.props.increaseScoreSpecial(message[1].id);
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
    this.setState({ takenImage: img });
  }

  render() {
    const { navigation, smoke, score } = this.props;
    const { smoking } = this.state;
    return (
      <ImageBackground source={
        smoking ? backgrounds[1].source : backgrounds[0].source
        } style={{ width: '100%', height: '100%' }}>
        <View style={{ flex: 1}}>
          <View style={{ backgroundColor:'rgba(255, 255, 0, 0.0)', width: '100%', height: '38%', flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <View style={{ backgroundColor:'rgba(0, 0, 255, 0.0)', width: '50%', height: '100%' }}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => AsyncStorage.clear()}>
              <View style={{ backgroundColor:'rgba(255, 0, 255, 0.0)', width: '50%', height: '100%' }}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor:'rgba(0, 255, 0, 0.0)', width: '100%', height: '10%' }}>
            <View style={{ backgroundColor:'rgba(0, 0, 255, 0.0)', width: '35%', height: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <MoneyBoard smokes={smoke.smokeCount}/>
            </View>
          </View>
          <View style={{ backgroundColor:'rgba(255, 0, 0, 0.0)', width: '100%', height: '37%', alignItems: 'center', justifyContent: 'center' }}>
            <Item
                smokes={smoke.smokeCount * smoke.cigarettePrice}
              />
          </View>
          <View style={{ backgroundColor:'rgba(0, 0, 255, 0.0)', width: '100%', height: '15%' }}>
            <Cigarette
              smoke={() => this._smoke()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
