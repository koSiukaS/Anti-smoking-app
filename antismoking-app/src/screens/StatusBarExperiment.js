import React from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
// import { connect } from 'react-redux';

// import { count } from '../actions';

class StatusBarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Status bar thingy',
      headerRight: (
        // <Button
        //   title='Count +1'
        //   onPress={() => {navigation.getParam('increaseCount')();}}
        // />
        <Button
          title='Count -1'
          onPress={() => {navigation.getParam('increaseCount')();}}
        />
      )
    };
  };

  state = {
    counter: 0,
  };

  componentDidMount() {
    console.log('MOUNT');
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    console.log('INCREASE');
    this.setState({ counter: this.state.counter + 1 });
    //this.props.decreaseCounter();
    //this.props.dispatch(count(this.state.counter));
  };

  // increaseCountWithRedux = () => {
  //   this.props.dispatch(count(this.state.counter));
  // };

  // decreaseCountWithRedux = () => {
  //   this.props.dispatch(count('DECREASE_COUNT'));
  // };

  render() {
    console.log('Rendering');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#6a51ae'
        />
        <Text>Status bar thing</Text>
        <Text>{this.props.counter}</Text>
        <Button
          title='INCREASE ME'
          onPress={() => this.props.increaseCounter()}
          // onPress={() => this.props.increaseCountWithRedux()}
        />
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { counter } = state;
//   return { counter };
// };

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
//     decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' })
//   };
// }

// export default connect(mapStateToProps)(StatusBarScreen);
export default StatusBarScreen;
// // export default connect()(StatusBarScreen);
