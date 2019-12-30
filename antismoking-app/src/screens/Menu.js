import React from 'react';
import {
  Button,
  Text,
  View,
  Alert,
  Image,
  Share,
  AppState,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Facebook } from 'expo';
import MCIicon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  changeUserName,
  resetmultiplierReward,
  setSmokeCount,
  clearSmokeCount,
  setScore,
  clearScore
} from '../actions';
import { avatars, facebookConstants, firebaseConfig, menuIcons } from '../constants/Constants';

firebase.initializeApp(firebaseConfig);

mapStateToProps = (state) => {
  return {
    user: state.user,
    score: state.score,
    smoke: state.smoke
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    changeUserName: () => dispatch(changeUserName()),
    resetmultiplierReward: () => dispatch(resetmultiplierReward()),
    setSmokeCount: (customSmokeAmount) => dispatch(setSmokeCount(customSmokeAmount)),
    clearSmokeCount: () => dispatch(clearSmokeCount()),
    setScore: (customScoreAmount) => dispatch(setScore(customScoreAmount)),
    clearScore: () => dispatch(clearScore())
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MenuScreen extends React.Component {
  state = {
    loggedIn: false,
    userData: null
  }

  componentDidMount() {
    this._checkTime();
    AppState.addEventListener('change', this._checkTime);
    this._authListener();
    // this._setupHighscoreListener();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.score.totalScore !== this.props.score.totalScore && this.state.loggedIn) {
        console.log('Highscore has changed :^o');
        this._storeHighScore(this.state.userData, this.props.score.totalScore, this.props.smoke.smokeCount);
        console.log(this.props.score.totalScore);
        console.log(this.props.smoke.smokeCount);
    }
  }

  _authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          loggedIn: true,
          userData: user
        });
        console.log('Logged in');
        // this._storeHighScore(user, this.props.score.totalScore);
        this._switchToOnlineScore(user);
        // this._setupHighscoreListener(user.uid);
      }
      else console.log('User not logged in');
    });
  }

  _checkTime = async() => {
    console.log('CHecking time');
    const currentDate = {
      date: new Date().getDate(),
      month: new Date().getMonth()
    };
    console.log('Current date: ');
         console.log(currentDate);
     try {
       const data = await AsyncStorage.getItem('date');
       if (data) {
         const dateFromStorage = JSON.parse(data);
         console.log('Date from storage: ');
         console.log(dateFromStorage);
         if (currentDate.date !== dateFromStorage.date || currentDate.month !== dateFromStorage.month) {
           console.log('OKay no');
           AsyncStorage.setItem('date', JSON.stringify(currentDate));
           this.props.resetmultiplierReward();
         } else {
           console.log('Is gucci');
         }
       } else {
         console.log('No time found, adding this one ');
         console.log(currentDate);
         AsyncStorage.setItem('date', JSON.stringify(currentDate));
       }
     } catch (error) {
       console.log(error);
    }
    const date = new Date();
    // console.log(date.getDate(), date.getMonth() + 1);
  }

  _switchToOnlineScore = async (user) => {
    const data = {
      smokeCount: this.props.smoke.smokeCount,
      totalScore: this.props.score.totalScore,
    };
    try {
      AsyncStorage.setItem('appOfflineValues', JSON.stringify(data));
      console.log('Offline values saved');
    } catch (error) {
      console.log(error);
    }
    firebase.database().ref('users/' + user.uid).once('value', (onlineData) => {
      if (!onlineData.val()) {
        console.log('No data online, creating new user');
        this._storeHighScore(user, 0, 0);
        this.props.setSmokeCount(0);
        this.props.setScore(0);
        this.setState({ onlineScore: true });
      } else {
        console.log('Data online found');
        this.props.setSmokeCount(onlineData.val().smokes);
        this.props.setScore(onlineData.val().highscore);
        console.log('Data set');
        this.setState({ onlineScore: true });
      }
    });
  }

  _switchToOfflineScore = async (user) => {
    try {
      const data = await AsyncStorage.getItem('appOfflineValues');
      if (data) {
        console.log('Offline data found');
        const parsedData = JSON.parse(data);
        this.props.setScore(parsedData.totalScore);
        this.props.setSmokeCount(parsedData.smokeCount);
      } else {
        console.log('No data stored offline somehow');
        this.props.setScore(0);
        this.props.setSmokeCount(0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // _setupHighscoreListener(userId) {
  //   console.log('Listenigng for scores');
  //   firebase.database().ref('users/' + userId).on('value', (snapshot) => {
  //     const highscore = snapshot.val().highscore;
  //     console.log("New high score: " + highscore);
  //   });
  // }

  _storeHighScore = (user, score, smokes) => {
    if (user != null) {
      console.log('Storing high score');
      firebase.database().ref('users/' + user.uid).set({
        username: user.displayName,
        highscore: score,
        smokes: smokes
      });
    }
  }

  _share = async() => {
    try {
      const result = await Share.share({
        message: `Ey, yo surinkau -${this.props.score.totalScore} taškų`
      });

      if (result.action === Share.sharedAction) {
        this.props.increaseScoreSpecial(10000);
      } else if (result.action === Share.dismissedAction) {
        console.log('Weak...');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  _loginWithFacebook = async () => {
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(facebookConstants.appId, { permissions: ['public_profile']});
    if (type == 'success') {
      this.props.resetmultiplierReward();
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error);
      });
    }
  }

  _logout = () => {
    firebase.auth().signOut();
    this.setState({ 
      loggedIn: false,
      userData: null
    });
    this.props.resetmultiplierReward();
    this._switchToOfflineScore();
  }

  render() {
    const { user, score } = this.props;
    const { userData, loggedIn } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(173,211,159)' }}>
        <View style={{ backgroundColor:'rgba(255, 255, 0, 0.0)', width: '100%', height: '10%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, color: 'rgb(68,68,68)' }}>{loggedIn ? userData.displayName : user.userNames[user.nameChoice]}</Text>
        </View>
        <View style={{ backgroundColor:'rgba(255, 0, 0, 0.0)', width: '100%', height: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ height: 120, width: 120 }} source={ 
            loggedIn ? { uri: userData.photoURL } : avatars[user.nameChoice].source
          }/>
        </View>
        <View style={{ 
          backgroundColor:'rgba(255, 255, 0, 0.0)',
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center' }}>
          <Text style={{ fontWeight: '600', fontSize: 20, color: 'rgb(68,68,68)' }}>-{score.totalScore} Taškai</Text>
        </View>
        <View style={{ backgroundColor:'rgba(255, 0, 0, 0.0)', width: '100%', height: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this._share()}>
            <View style={{ backgroundColor:'rgba(0, 0, 255, 0.0)', width: '100%', height: '100%' }}>
              <Image style={{ height: 220, width: 220 }} source={menuIcons[0].source}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor:'rgba(255, 255, 0, 0.0)', width: '100%', height: '15%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        {!loggedIn &&
          <TouchableOpacity onPress={() => this._loginWithFacebook()}>
            <MCIicon name={'earth'} size={60} color={'rgb(68,68,68)'}/>
          </TouchableOpacity>
          || <TouchableOpacity onPress={() => this._logout()}>  
            <MCIicon name={'earth-off'} size={60} color={'rgb(68,68,68)'}/>
          </TouchableOpacity>
        }
        {!loggedIn &&
          <TouchableOpacity onPress={() => this.props.changeUserName()}>
            <MCIicon name={'human-male-female'} size={60} color={'rgb(68,68,68)'}/>
          </TouchableOpacity>
        }
        </View>
      </View>
    );
  }
}
